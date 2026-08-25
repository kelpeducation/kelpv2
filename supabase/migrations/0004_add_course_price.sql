-- Run this in the Supabase SQL Editor. Adds a price (per class, in RWF) to
-- the courses table so students see the cost before booking.

alter table public.courses
  add column if not exists price integer not null default 5000;

-- Set specific prices for the seeded courses.
update public.courses set price = 5000 where title = 'KOEC Club';
update public.courses set price = 8000 where title = 'Professional English';
update public.courses set price = 6000 where title = 'Public Speaking';
