'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseBrowserConfigured, supabaseBrowser } from '@/lib/supabase/browser';

export const usePortalSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Without Supabase there is no one to log in; treat everyone as logged out.
    if (!isSupabaseBrowserConfigured) {
      setLoading(false);
      return;
    }

    supabaseBrowser.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabaseBrowser.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { session, loading };
};
