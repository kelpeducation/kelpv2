import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !publishableKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local'
  );
}

/**
 * Public client, scoped by Row Level Security. Safe for operations any site
 * visitor should be able to perform (e.g. submitting an enrollment).
 */
export const supabasePublic: SupabaseClient = createClient(supabaseUrl, publishableKey, {
  auth: { persistSession: false },
});

/**
 * Privileged client using the service_role secret key. This BYPASSES Row Level
 * Security entirely, so it must only ever be used in server-side code (API
 * routes, server components) and must never be sent to the browser.
 *
 * Set SUPABASE_SERVICE_ROLE_KEY (no NEXT_PUBLIC_ prefix) in .env.local from
 * Supabase Dashboard -> Project Settings -> API -> service_role secret key.
 */
let cachedAdminClient: SupabaseClient | null = null;

export const getSupabaseAdmin = (): SupabaseClient => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set in .env.local. Add it from Supabase Dashboard -> ' +
      'Project Settings -> API -> service_role secret key to enable admin reads (e.g. the ' +
      'course enrollments roster).'
    );
  }

  if (!cachedAdminClient) {
    cachedAdminClient = createClient(supabaseUrl!, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }

  return cachedAdminClient;
};
