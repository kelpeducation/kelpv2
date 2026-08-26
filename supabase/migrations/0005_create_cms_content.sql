-- Run this in the Supabase SQL Editor. Creates the table that will hold the
-- site's editable CMS content (Site Settings, Market Products, Chatbot
-- Knowledge, Pages Content), replacing the local JSON files as the source
-- of truth so edits actually persist in production (local files don't
-- survive a redeploy on most hosts).
--
-- After running this, tell Claude — the four sections will be seeded with
-- your current content automatically (no need to paste JSON here).

create table if not exists public.cms_content (
  section text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.cms_content enable row level security;

-- The public website needs to read this to render every page.
drop policy if exists "Anyone can read CMS content" on public.cms_content;
create policy "Anyone can read CMS content"
  on public.cms_content for select
  using (true);

-- No insert/update/delete policy for anon/authenticated on purpose — writes
-- only happen via the service_role key from the admin-password-gated
-- /api/cms/[section] route, never directly from the browser.
