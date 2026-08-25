-- Run this in the Supabase SQL Editor after 0001_create_enrollments.sql.
-- Creates the subscribers table used by the "Stay Updated with KELP" newsletter
-- form on the Blog page and the admin subscribers view at /cms.

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

create index if not exists subscribers_subscribed_at_idx
  on public.subscribers (subscribed_at desc);

-- Row Level Security: enabled and locked down by default.
alter table public.subscribers enable row level security;

-- Anyone (using the public/publishable key) may subscribe...
create policy "Public can subscribe"
  on public.subscribers
  for insert
  to anon, authenticated
  with check (true);

-- ...but nobody may read, update, or delete rows using that same public key.
-- The admin view reads via the service_role key from the server, which bypasses
-- RLS entirely, so no SELECT policy is defined here on purpose. This keeps every
-- subscriber's email private even if the public key ever leaks.
