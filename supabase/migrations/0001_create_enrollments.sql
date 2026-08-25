-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query -> paste -> Run).
-- Creates the enrollments table used by the "Join the English Learning Program" form
-- and the admin roster view at /cms.

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  course text not null,
  submitted_at timestamptz not null default now()
);

create index if not exists enrollments_submitted_at_idx
  on public.enrollments (submitted_at desc);

create index if not exists enrollments_course_idx
  on public.enrollments (course);
  

-- Row Level Security: enabled and locked down by default.
alter table public.enrollments enable row level security;

-- Anyone (using the public/publishable key) may submit a new enrollment...
create policy "Public can submit enrollments"
  on public.enrollments
  for insert
  to anon, authenticated
  with check (true);

-- ...but nobody may read, update, or delete rows using that same public key.
-- The admin roster reads via the service_role key from the server, which bypasses
-- RLS entirely, so no SELECT policy is defined here on purpose. This keeps every
-- enrollee's name/email/phone number private even if the public key ever leaks.

-- Preserve the one real enrollment already collected before this migration existed.
insert into public.enrollments (name, email, phone, course, submitted_at)
values (
  'IGIRIMPUHWE Dositha',
  'igirimpuhwedositha@gmail.com',
  '0780396766',
  'KOEC Club',
  '2026-08-25T08:45:15.152Z'
)
on conflict do nothing;
