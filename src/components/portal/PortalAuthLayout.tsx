import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface PortalAuthLayoutProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
  /** Background photo for the brand panel, e.g. "/images/learning1.jpg". */
  image: string;
}

const BackToHomeButton = ({ className = '' }: { className?: string }) => (
  <Link
    href="/"
    className={`inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 hover:border-white/60 transition-colors ${className}`}
  >
    <ArrowLeft size={16} />
    Back to Home
  </Link>
);

const PortalAuthLayout = ({ eyebrow, title, description, children, footer, image }: PortalAuthLayoutProps) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col text-white overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-primary/95" />

        <div className="relative z-10 p-8">
          <BackToHomeButton />
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center">
          <div className="w-[26rem] aspect-square rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex flex-col items-center justify-center text-center px-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-side.png" alt="KELP Education" className="h-16 w-auto object-contain mb-4" />
            <span className="inline-flex items-center gap-1.5 text-secondary font-semibold text-sm uppercase tracking-wider">
              <Sparkles size={14} />
              English Learning Program
            </span>
            <h1 className="text-3xl font-bold mt-4 mb-4 leading-tight">{title}</h1>
            <p className="text-slate-200 text-sm leading-relaxed">{description}</p>
          </div>
        </div>

        <p className="relative z-10 text-slate-300 text-xs text-center pb-8">
          &copy; {new Date().getFullYear()} KELP Education. Kigali, Rwanda.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col p-6 sm:p-12 bg-muted/30">
        <div className="lg:hidden flex items-center justify-between mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-side.png" alt="KELP Education" className="h-11 w-auto object-contain" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">{eyebrow}</span>
            <h2 className="text-2xl font-bold mt-2 mb-2 text-foreground">{title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">{description}</p>

            {children}

            <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalAuthLayout;
