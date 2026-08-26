'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import logo from '@/assets/logo 0.2.png';
import { cn } from '@/lib/utils';
import { portalNavItems } from '@/lib/portal/nav';
import { supabaseBrowser } from '@/lib/supabase/browser';

const PortalSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    router.push('/portal/login');
  };

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 flex-shrink-0 border-r border-border bg-white z-40">
      <div className="h-20 flex items-center px-6 border-b border-border flex-shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="KELP Education" className="h-9 w-auto object-contain" />
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {portalNavItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                active ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border flex-shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-destructive transition-colors w-full"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default PortalSidebar;
