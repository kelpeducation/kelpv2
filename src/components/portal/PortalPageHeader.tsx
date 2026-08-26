import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface PortalPageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

const PortalPageHeader = ({ icon: Icon, title, description, action }: PortalPageHeaderProps) => (
  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
    <div className="flex items-start gap-4">
      <span className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
        <Icon size={22} />
      </span>
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
    {action}
  </div>
);

export default PortalPageHeader;
