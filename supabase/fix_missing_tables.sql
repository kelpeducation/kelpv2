-- Run this in the Supabase SQL Editor to add the two tables that are still
-- missing: bookings and announcements. (enrollments, subscribers, profiles,
-- and courses already exist — this only creates what's left.)
--
-- If this errors, please copy the exact error message Supabase shows so it
-- can be diagnosed precisely.

-- ─────────────────────────────────────────────────────────────────────────
-- Bookings (Tuesday-Saturday only; students manage their own)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references public.courses (id) on delete cascade,
  class_date date not null,
  time_slot text not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  -- Postgres extract(dow ...): Sunday = 0 ... Saturday = 6. Tuesday-Saturday = 2..6.
  constraint teaching_days_only check (extract(dow from class_date) between 2 and 6)
);

create index if not exists bookings_student_id_idx on public.bookings (student_id);

alter table public.bookings enable row level security;

drop policy if exists "Students can view their own bookings" on public.bookings;
create policy "Students can view their own bookings"
  on public.bookings for select
  using (auth.uid() = student_id);

drop policy if exists "Students can create their own bookings" on public.bookings;
create policy "Students can create their own bookings"
  on public.bookings for insert
  with check (auth.uid() = student_id);

drop policy if exists "Students can cancel their own bookings" on public.bookings;
create policy "Students can cancel their own bookings"
  on public.bookings for update
  using (auth.uid() = student_id);


-- ─────────────────────────────────────────────────────────────────────────
-- Announcements (visible to any logged-in student)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.announcements enable row level security;

drop policy if exists "Logged-in students can view announcements" on public.announcements;
create policy "Logged-in students can view announcements"
  on public.announcements for select
  to authenticated
  using (true);

insert into public.announcements (title, body)
values (
  'Welcome to the KELP English Learning Program!',
  'We''re thrilled to have you. Browse the available courses below, read a bit about each teacher, and book your first class any Tuesday through Saturday. See you in class!'
)
on conflict do nothing;
