-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.

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

alter table public.flashcard_state enable row level security;

create policy "cards_select_own" on public.flashcard_state
  for select using (auth.uid() = user_id);
create policy "cards_insert_own" on public.flashcard_state
  for insert with check (auth.uid() = user_id);
create policy "cards_update_own" on public.flashcard_state
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
