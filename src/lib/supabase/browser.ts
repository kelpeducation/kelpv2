import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Browser client for the student portal. Unlike src/lib/supabase/server.ts,
 * this persists the auth session (localStorage) so users stay logged in
 * across page loads. Only import this from 'use client' components.
 */
export const supabaseBrowser = createClient(supabaseUrl, publishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
