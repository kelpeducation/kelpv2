'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { portalNavItems } from '@/lib/portal/nav';

const PortalMobileTabs = () => {
  const pathname = usePathname();

  return (
    <div className="md:hidden sticky top-20 z-20 bg-white border-b border-border overflow-x-auto">
      <nav className="flex gap-1 px-4 py-2 min-w-max">
        {portalNavItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                active ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted',
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default PortalMobileTabs;
