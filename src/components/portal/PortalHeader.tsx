'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import logo from '@/assets/logo 0.2.png';
import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { usePortal } from './PortalContext';

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const PortalHeader = () => {
  const router = useRouter();
  const { session, profile } = usePortal();

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    router.push('/portal/login');
  };

  const displayName = profile?.fullName || session?.user.email || 'Student';

  return (
    <header className="bg-white border-b border-border sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between h-20 px-6 md:px-10">
        <Link href="/" className="flex items-center gap-3 lg:hidden">
          <Image src={logo} alt="KELP Education" className="h-10 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-3 ml-auto">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
            {getInitials(displayName) || 'S'}
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-foreground leading-tight">{displayName}</p>
            <p className="text-xs text-muted-foreground">Student</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="ml-1 lg:hidden">
            <LogOut size={14} />
            Log Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
