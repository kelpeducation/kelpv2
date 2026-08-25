-- ═══════════════════════════════════════════════════════════════════════════
-- KELP Education — full database setup
-- ═══════════════════════════════════════════════════════════════════════════
--
-- One-shot version of everything in supabase/migrations/ (0001, 0002, 0003)
-- combined into a single file. Run this once you have access to the Supabase
-- project:
--
--   1. Open your project at https://supabase.com/dashboard
--   2. Go to SQL Editor -> New query
--   3. Paste this entire file
--   4. Click "Run"
--
-- It's safe to run more than once — every table uses "create table if not
-- exists" and every seed insert uses "on conflict do nothing".
--
-- What this creates:
--   - enrollments     "Join the English Learning Program" form + admin roster
--   - subscribers     "Stay Updated with KELP" newsletter form + admin list
--   - profiles        one row per registered student (auto-created on sign up)
--   - courses         course catalog with teacher bios, shown after login
--   - bookings        class bookings, restricted to Tuesday-Saturday
--   - announcements   messages shown to logged-in students
--
-- After running this, also set SUPABASE_SERVICE_ROLE_KEY in .env.local
-- (Project Settings -> API -> service_role secret key) so the admin views at
-- /cms can read enrollments and subscribers.
-- ═══════════════════════════════════════════════════════════════════════════


-- ─────────────────────────────────────────────────────────────────────────
-- 1. Enrollments — "Join the English Learning Program" form (Services page)
-- ─────────────────────────────────────────────────────────────────────────
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

alter table public.enrollments enable row level security;

drop policy if exists "Public can submit enrollments" on public.enrollments;
create policy "Public can submit enrollments"
  on public.enrollments
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT policy on purpose: nobody can read enrollments with the public
-- key. The admin roster at /cms reads via the service_role key on the
-- server, which bypasses RLS entirely.

-- Preserve the one real enrollment collected before this table existed.
insert into public.enrollments (name, email, phone, course, submitted_at)
values (
  'IGIRIMPUHWE Dositha',
  'igirimpuhwedositha@gmail.com',
  '0780396766',
  'KOEC Club',
  '2026-08-25T08:45:15.152Z'
)
on conflict do nothing;


-- ─────────────────────────────────────────────────────────────────────────
-- 2. Subscribers — "Stay Updated with KELP" newsletter form (Blog page)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

create index if not exists subscribers_subscribed_at_idx
  on public.subscribers (subscribed_at desc);

alter table public.subscribers enable row level security;

drop policy if exists "Public can subscribe" on public.subscribers;
create policy "Public can subscribe"
  on public.subscribers
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT policy on purpose, same reasoning as enrollments above.


-- ─────────────────────────────────────────────────────────────────────────
-- 3. Profiles — one row per registered student (English Learning Program)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Automatically create a profile row whenever someone signs up. Reads the
-- full_name/phone passed in supabase.auth.signUp({ options: { data } }).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'phone', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ─────────────────────────────────────────────────────────────────────────
-- 4. Courses — catalog with teacher bios, shown once a student logs in
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  level text not null default 'All Levels',
  description text not null,
  teacher_name text not null,
  teacher_bio text not null,
  teacher_avatar_initials text not null,
  created_at timestamptz not null default now()
);

alter table public.courses enable row level security;

drop policy if exists "Logged-in students can view courses" on public.courses;
create policy "Logged-in students can view courses"
  on public.courses for select
  to authenticated
  using (true);

insert into public.courses (title, level, description, teacher_name, teacher_bio, teacher_avatar_initials)
values
  (
    'KOEC Club',
    'Beginner - Intermediate',
    'Rapid English mastery system focused on everyday conversation, confidence, and classroom fundamentals.',
    'Aline Uwase',
    'Aline has taught English for over 8 years across Rwandan secondary schools and adult learning centers. She specializes in building speaking confidence for beginner learners through conversational practice.',
    'AU'
  ),
  (
    'Professional English',
    'Intermediate - Advanced',
    'Business-level fluency: emails, meetings, presentations, and workplace communication for career growth.',
    'Eric Mugisha',
    'Eric spent six years training corporate teams in business English and communication skills before joining KELP. He focuses on practical, workplace-ready English for professionals.',
    'EM'
  ),
  (
    'Public Speaking',
    'All Levels',
    'Training for high-stakes meetings, presentations, and public engagements, in a supportive small-group setting.',
    'Grace Ingabire',
    'Grace is a communications coach and former debate champion who helps learners find their voice, structure ideas clearly, and speak with confidence in English.',
    'GI'
  )
on conflict do nothing;


-- ─────────────────────────────────────────────────────────────────────────
-- 5. Bookings — class bookings, restricted to Tuesday-Saturday
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
-- 6. Announcements — visible to any logged-in student
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

-- ═══════════════════════════════════════════════════════════════════════════
-- Done. Six tables created: enrollments, subscribers, profiles, courses,
-- bookings, announcements — all with Row Level Security enabled.
-- ═══════════════════════════════════════════════════════════════════════════
