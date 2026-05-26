-- Canonical schema for a new WC2026 Collector Supabase project.
-- This matches the data model used by app.js as of 2026-05-26.

create table if not exists public.user_sticker_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  sticker_id text not null,
  obtained boolean not null default false,
  duplicates integer not null default 0,
  updated_at timestamptz not null default now(),
  constraint user_sticker_progress_pkey primary key (user_id, sticker_id),
  constraint user_sticker_progress_valid_sticker_id_check check (
    sticker_id ~ '^(FWC([0-9]|1[0-9])|CC([1-9]|1[0-2])|(MEX|RSA|KOR|CZE|CAN|BIH|QAT|SUI|BRA|MAR|HAI|SCO|USA|PAR|AUS|TUR|GER|CUW|CIV|ECU|NED|JPN|SWE|TUN|BEL|EGY|IRN|NZL|ESP|CPV|KSA|URU|FRA|SEN|IRQ|NOR|ARG|ALG|AUT|JOR|POR|COD|UZB|COL|ENG|CRO|GHA|PAN)([1-9]|1[0-9]|20))$'
  ),
  constraint user_sticker_progress_duplicates_range_check check (
    duplicates between 0 and 99
  ),
  constraint user_sticker_progress_duplicates_require_obtained_check check (
    obtained or duplicates = 0
  )
);

create index if not exists user_sticker_progress_user_idx
  on public.user_sticker_progress (user_id);

alter table public.user_sticker_progress enable row level security;

drop policy if exists "users read own progress" on public.user_sticker_progress;
create policy "users read own progress"
  on public.user_sticker_progress
  for select
  using ((select auth.uid()) = user_id);

drop policy if exists "users insert own progress" on public.user_sticker_progress;
create policy "users insert own progress"
  on public.user_sticker_progress
  for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "users update own progress" on public.user_sticker_progress;
create policy "users update own progress"
  on public.user_sticker_progress
  for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "users delete own progress" on public.user_sticker_progress;
create policy "users delete own progress"
  on public.user_sticker_progress
  for delete
  using ((select auth.uid()) = user_id);
