-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

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

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;

-- Each user can only see and change their own rows.
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "progress_select_own" on public.lesson_progress
  for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.lesson_progress
  for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.lesson_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Create a profile automatically when someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
