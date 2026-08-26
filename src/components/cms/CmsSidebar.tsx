'use client';

import type { LucideIcon } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CmsNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface CmsSidebarProps {
  items: CmsNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  onLogout: () => void;
}

const CmsSidebar = ({ items, activeId, onSelect, onLogout }: CmsSidebarProps) => {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 flex-shrink-0 border-r border-border bg-white z-40">
      <div className="flex items-center justify-center py-4 px-6 border-b border-border flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-side.png" alt="KELP Education" className="h-14 w-auto object-contain" />
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {items.map((item) => {
          const active = activeId === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left',
                active ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border flex-shrink-0">
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-destructive transition-colors w-full"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default CmsSidebar;
