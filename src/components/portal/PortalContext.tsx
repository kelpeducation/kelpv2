'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { Profile, toProfile } from '@/lib/portal/types';

interface PortalContextValue {
  session: Session | null;
  profile: Profile | null;
  sessionLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const PortalContext = createContext<PortalContextValue | null>(null);

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionLoading(false);
    });

    const { data: listener } = supabaseBrowser.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session) return;
    const { data } = await supabaseBrowser.from('profiles').select('*').eq('id', session.user.id).single();
    if (data) setProfile(toProfile(data));
  }, [session]);

  useEffect(() => {
    if (session) {
      void refreshProfile();
    } else {
      setProfile(null);
    }
  }, [session, refreshProfile]);

  return (
    <PortalContext.Provider value={{ session, profile, sessionLoading, refreshProfile }}>
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error('usePortal must be used within a PortalProvider');
  return ctx;
};
