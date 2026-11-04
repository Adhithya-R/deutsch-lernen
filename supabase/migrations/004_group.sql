-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Lets every logged-in learner see this week's XP ranking of the study group (names and XP only).

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
