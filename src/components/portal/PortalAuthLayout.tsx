import { ReactNode } from 'react';
import { DecorativeBackground } from '@/components/ui/decorative-background';

interface PortalAuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

const PortalAuthLayout = ({ eyebrow, title, description, children, footer }: PortalAuthLayoutProps) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-primary text-white p-12 overflow-hidden">
        <DecorativeBackground gridOpacity={0.05} gridSize={60} blobs={2} blobColor="secondary" />
        <div className="relative z-10 max-w-md">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            English Learning Program
          </span>
          <h1 className="text-3xl font-bold mt-4 mb-4 leading-tight">
            Learn English with KELP, at your own pace.
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Book live classes with real teachers, track announcements, and grow your confidence —
            every Tuesday through Saturday.
          </p>
        </div>
        <p className="relative z-10 text-slate-400 text-xs">
          &copy; {new Date().getFullYear()} KELP Education. Kigali, Rwanda.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-muted/30">
        <div className="w-full max-w-sm">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">{eyebrow}</span>
          <h2 className="text-2xl font-bold mt-2 mb-2 text-foreground">{title}</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">{description}</p>

          {children}

          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>
    </div>
  );
};

export default PortalAuthLayout;
