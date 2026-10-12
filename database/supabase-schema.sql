-- Ejecutar una sola vez en Supabase: SQL Editor > New query > Run.
-- Los datos quedan disponibles únicamente para usuarios autenticados.

create table if not exists public.uph_classes (
  record_id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.uph_rooms (
  record_id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.uph_settings (
  record_id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.uph_classes enable row level security;
alter table public.uph_rooms enable row level security;
alter table public.uph_settings enable row level security;

drop policy if exists "authenticated_all_classes" on public.uph_classes;
create policy "authenticated_all_classes" on public.uph_classes for all to authenticated using (true) with check (true);
drop policy if exists "authenticated_all_rooms" on public.uph_rooms;
create policy "authenticated_all_rooms" on public.uph_rooms for all to authenticated using (true) with check (true);
drop policy if exists "authenticated_all_settings" on public.uph_settings;
create policy "authenticated_all_settings" on public.uph_settings for all to authenticated using (true) with check (true);

create index if not exists uph_classes_updated_idx on public.uph_classes(updated_at);
create index if not exists uph_rooms_updated_idx on public.uph_rooms(updated_at);
create index if not exists uph_settings_updated_idx on public.uph_settings(updated_at);
