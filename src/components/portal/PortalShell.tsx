'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { PortalProvider, usePortal } from './PortalContext';
import PortalHeader from './PortalHeader';
import PortalSidebar from './PortalSidebar';
import PortalMobileTabs from './PortalMobileTabs';

const PortalShellInner = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { session, sessionLoading } = usePortal();

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push('/portal/login');
    }
  }, [sessionLoading, session, router]);

  if (sessionLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <PortalHeader />
      <PortalMobileTabs />
      <div className="flex">
        <PortalSidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
};

const PortalShell = ({ children }: { children: ReactNode }) => (
  <PortalProvider>
    <PortalShellInner>{children}</PortalShellInner>
  </PortalProvider>
);

export default PortalShell;
