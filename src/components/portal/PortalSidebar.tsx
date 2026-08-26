'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { portalNavItems } from '@/lib/portal/nav';

const PortalSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-border bg-white sticky top-20 h-[calc(100vh-5rem)] py-8 px-4">
      <nav className="space-y-1">
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
    </aside>
  );
};

export default PortalSidebar;
