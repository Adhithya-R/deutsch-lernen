-- ONE script that sets up everything the app stores. Safe to run again at any time.
-- Supabase dashboard -> SQL Editor -> New query -> paste all of this -> Run.
-- (It replaces the older 001-004 scripts; if you already ran those, running this is still fine.)

-- ---------- tables ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  level text not null default 'A1' check (level in ('A1','A2')),
  created_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_slug text not null,
  status text not null default 'in_progress' check (status in ('in_progress','completed')),
  position integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_slug)
);

create table if not exists public.flashcard_state (
  user_id uuid not null references auth.users(id) on delete cascade,
  card_id text not null,
  ease real not null default 2.5,
  interval_days integer not null default 0,
  repetitions integer not null default 0,
  due_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create table if not exists public.daily_activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  xp integer not null default 0,
  primary key (user_id, day)
);

-- best result of every quiz, exam task, mock test and culture quiz
create table if not exists public.quiz_results (
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,
  ref text not null,
  score integer not null default 0,
  total integer not null default 0,
  attempts integer not null default 1,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind, ref)
);

-- writing practice drafts, so they follow you from phone to laptop
create table if not exists public.writing_drafts (
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id text not null,
  body text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, task_id)
);

-- ---------- row-level security: everyone only sees and changes their own rows ----------
alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.flashcard_state enable row level security;
alter table public.daily_activity enable row level security;
alter table public.quiz_results enable row level security;
alter table public.writing_drafts enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "progress_select_own" on public.lesson_progress;
create policy "progress_select_own" on public.lesson_progress for select using (auth.uid() = user_id);
drop policy if exists "progress_insert_own" on public.lesson_progress;
create policy "progress_insert_own" on public.lesson_progress for insert with check (auth.uid() = user_id);
drop policy if exists "progress_update_own" on public.lesson_progress;
create policy "progress_update_own" on public.lesson_progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "cards_select_own" on public.flashcard_state;
create policy "cards_select_own" on public.flashcard_state for select using (auth.uid() = user_id);
drop policy if exists "cards_insert_own" on public.flashcard_state;
create policy "cards_insert_own" on public.flashcard_state for insert with check (auth.uid() = user_id);
drop policy if exists "cards_update_own" on public.flashcard_state;
create policy "cards_update_own" on public.flashcard_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- XP can only be added through add_xp() below
drop policy if exists "activity_select_own" on public.daily_activity;
create policy "activity_select_own" on public.daily_activity for select using (auth.uid() = user_id);

drop policy if exists "results_select_own" on public.quiz_results;
create policy "results_select_own" on public.quiz_results for select using (auth.uid() = user_id);
drop policy if exists "results_insert_own" on public.quiz_results;
create policy "results_insert_own" on public.quiz_results for insert with check (auth.uid() = user_id);
drop policy if exists "results_update_own" on public.quiz_results;
create policy "results_update_own" on public.quiz_results for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "drafts_select_own" on public.writing_drafts;
create policy "drafts_select_own" on public.writing_drafts for select using (auth.uid() = user_id);
drop policy if exists "drafts_insert_own" on public.writing_drafts;
create policy "drafts_insert_own" on public.writing_drafts for insert with check (auth.uid() = user_id);
drop policy if exists "drafts_update_own" on public.writing_drafts;
create policy "drafts_update_own" on public.writing_drafts for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- a profile is created automatically when someone signs up ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- profiles for people who signed up before this script existed
insert into public.profiles (id, display_name)
select u.id, coalesce(u.raw_user_meta_data ->> 'display_name', '')
from auth.users u
on conflict (id) do nothing;

-- ---------- XP ----------
create or replace function public.add_xp(p_day date, p_xp integer)
returns void
language sql
security definer
set search_path = ''
as $$
  insert into public.daily_activity (user_id, day, xp)
  select auth.uid(), p_day, least(greatest(p_xp, 0), 200)
  where auth.uid() is not null
  on conflict (user_id, day)
  do update set xp = public.daily_activity.xp + excluded.xp;
$$;

revoke all on function public.add_xp(date, integer) from public, anon;
grant execute on function public.add_xp(date, integer) to authenticated;

-- ---------- study group ranking (first names and weekly XP only) ----------
create or replace function public.weekly_leaderboard()
returns table (display_name text, xp bigint, is_me boolean)
language sql
stable
security definer
set search_path = ''
as $$
  select
    coalesce(nullif(p.display_name, ''), 'Learner') as display_name,
    sum(a.xp)::bigint as xp,
    (a.user_id = auth.uid()) as is_me
  from public.daily_activity a
  join public.profiles p on p.id = a.user_id
  where auth.uid() is not null
    and a.day >= date_trunc('week', current_date)::date
  group by a.user_id, p.display_name
  having sum(a.xp) > 0
  order by xp desc
  limit 20;
$$;

revoke all on function public.weekly_leaderboard() from public, anon;
grant execute on function public.weekly_leaderboard() to authenticated;
