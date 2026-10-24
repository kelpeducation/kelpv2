'use client';

import type { LucideIcon } from 'lucide-react';
import { ExternalLink, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CmsNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface CmsNavGroup {
  title?: string;
  items: CmsNavItem[];
}

interface CmsSidebarProps {
  groups: CmsNavGroup[];
  activeId: string;
  dirty?: boolean;
  onSelect: (id: string) => void;
  onLogout: () => void;
}

const CmsSidebar = ({ groups, activeId, dirty, onSelect, onLogout }: CmsSidebarProps) => {
  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 flex-shrink-0 border-r border-border bg-white z-40">
      <div className="flex flex-col items-center justify-center gap-1 py-4 px-6 border-b border-border flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-side.png" alt="KELP Education" className="h-14 w-auto object-contain" />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Admin Console</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-5 px-4 space-y-6">
        {groups.map((group, index) => (
          <div key={group.title ?? index} className="space-y-1">
            {group.title && (
              <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                {group.title}
              </p>
            )}
            {group.items.map((item) => {
              const active = activeId === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(item.id)}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full text-left',
                    active ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon size={18} />
                  <span className="flex-1">{item.label}</span>
                  {active && dirty && (
                    <span className="h-2 w-2 rounded-full bg-amber-400" title="Unsaved changes" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-border flex-shrink-0 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
        >
          <ExternalLink size={18} />
          View Live Site
        </a>
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
