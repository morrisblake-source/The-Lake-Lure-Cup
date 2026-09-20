-- Legends of Lake Lure 8.6: shared event roster additions
create table if not exists public.event_players (
  event_id text not null,
  player_id text not null,
  first_name text not null,
  last_name text not null,
  team text not null check (team in ('Dyer','Bundrick')),
  created_at timestamptz not null default now(),
  primary key (event_id, player_id)
);
alter table public.event_players enable row level security;
drop policy if exists "event_players_read" on public.event_players;
drop policy if exists "event_players_insert" on public.event_players;
drop policy if exists "event_players_delete" on public.event_players;
create policy "event_players_read" on public.event_players for select using (true);
create policy "event_players_insert" on public.event_players for insert with check (true);
create policy "event_players_delete" on public.event_players for delete using (true);
do $$ begin
  alter publication supabase_realtime add table public.event_players;
exception when duplicate_object then null;
end $$;
