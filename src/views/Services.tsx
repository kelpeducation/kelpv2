'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { DecorativeBackground } from '@/components/ui/decorative-background';
import { useCmsPagesContent } from '@/hooks/useCmsPagesContent';
import EnrollDialog from '@/components/EnrollDialog';


const Services = () => {
  const containerRef = useGSAPAnimation();
  const pagesContent = useCmsPagesContent();
  const servicesContent = pagesContent.servicesPage;

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main ref={containerRef}>
        {/* Hero */}
        <PageHero
          eyebrow={servicesContent.hero.eyebrow}
          title={servicesContent.hero.title}
          highlight={servicesContent.hero.highlight}
          description={servicesContent.hero.description}
        />

        {/* Services Detail */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom space-y-32">
            {servicesContent.items.map((service, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid items-center gap-16 lg:grid-cols-2 scroll-mt-32 ${isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                >
                  {/* Image */}
                  <div
                    className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                  >
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-[280px] sm:h-[340px] lg:h-[400px] w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    {/* Floating label */}
                    <div className="absolute -bottom-6 left-6 rounded-2xl bg-card/90 backdrop-blur px-6 py-3 shadow-lg">
                      <p className="text-sm font-semibold text-secondary">
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`${isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                  >
                    <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
                      {service.subtitle}
                    </span>

                    <h2 className="mt-3 text-2xl font-bold md:text-3xl">
                      {service.title}
                    </h2>

                    <p className="mt-6 text-sm leading-relaxed lg:text-base text-muted-foreground">
                      {service.description}
                    </p>

                    <ul className="mt-8 space-y-4">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-1 h-5 w-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-slate-700">
                            {benefit.includes(':') ? (
                              <>
                                <strong className="font-semibold text-slate-900 leading-relaxed">{benefit.split(':')[0]}:</strong>
                                {benefit.substring(benefit.indexOf(':') + 1)}
                              </>
                            ) : (
                              benefit
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 flex flex-wrap gap-4">
                      <Button size="lg" variant="secondary" asChild>
                        <Link href={service.ctaHref}>
                          {service.ctaLabel}
                          <ArrowRight size={18} />
                        </Link>
                      </Button>

                      {service.id === 'global-language-mastery' && (
                        <EnrollDialog
                          programName="the English Learning Program"
                          courseOptions={service.benefits.map((benefit: string) =>
                            benefit.includes(':') ? benefit.split(':')[0].trim() : benefit
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* CTA */}
        {/* CTA */}
        <section className="container-custom pb-16 relative z-10">
          <div className="bg-gradient-to-br from-primary to-[hsl(193,92%,10%)] rounded-[2rem] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-xl">
            {/* Background Pattern */}
            <DecorativeBackground grid={false} blobs={2} blobColor="secondary" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-fade-up">
              <h2 className="text-xl md:text-2xl font-bold leading-tight">
                {servicesContent.ctaTitle} <span className="text-secondary">{servicesContent.ctaHighlight}</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed lg:text-base">
                {servicesContent.ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href={servicesContent.ctaPrimaryHref}>
                    {servicesContent.ctaPrimaryLabel}
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                  <Link href={servicesContent.ctaSecondaryHref}>
                    {servicesContent.ctaSecondaryLabel}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};


export default Services;

