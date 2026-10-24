import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseBrowserConfigured = Boolean(supabaseUrl && publishableKey);

const notConfigured = (): SupabaseClient =>
  new Proxy({} as SupabaseClient, {
    get() {
      throw new Error('The database (Supabase) is not connected, so the student portal is unavailable.');
    },
  });

/**
 * Browser client for the student portal. Unlike src/lib/supabase/server.ts,
 * this persists the auth session (localStorage) so users stay logged in
 * across page loads. Only import this from 'use client' components.
 */
export const supabaseBrowser: SupabaseClient =
  isSupabaseBrowserConfigured
    ? createClient(supabaseUrl!, publishableKey!, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      })
    : notConfigured();
