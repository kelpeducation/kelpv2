import { ReactNode } from 'react';
import { DecorativeBackground } from '@/components/ui/decorative-background';

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  highlight: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}

const PageHero = ({ eyebrow, title, highlight, description, children }: PageHeroProps) => (
  <section className="pt-28 pb-16 section-padding bg-primary text-white relative overflow-hidden">
    <DecorativeBackground gridOpacity={0.03} gridSize={60} />

    <div className="container-custom relative z-10">
      <div className="max-w-4xl mx-auto text-center animate-fade-up">
        <span className="text-secondary font-semibold text-sm uppercase tracking-wider">{eyebrow}</span>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 mb-6">
          {title}
          <span className="text-secondary block">{highlight}</span>
        </h1>
        <p className="text-slate-300 text-xl leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  </section>
);

export default PageHero;
