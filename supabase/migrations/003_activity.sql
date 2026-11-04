-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Stores how much XP each learner earned on each day. Streaks are worked out from these days.

create table if not exists public.daily_activity (
  user_id uuid not null references auth.users(id) on delete cascade,
  day date not null,
  xp integer not null default 0,
  primary key (user_id, day)
);

alter table public.daily_activity enable row level security;

create policy "activity_select_own" on public.daily_activity
  for select using (auth.uid() = user_id);

-- Learners cannot write the table directly; they can only add XP through add_xp (small amounts at a time).
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
