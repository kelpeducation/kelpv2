'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Target, Eye, Heart, Shield, Users, BookOpen, Award, Globe, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCmsPagesContent } from '@/hooks/useCmsPagesContent';

const iconMap = {
  CheckCircle,
  Award,
  Shield,
  Users,
  Heart,
};

const About = () => {
  const containerRef = useGSAPAnimation();
  const pagesContent = useCmsPagesContent();
  const aboutContent = pagesContent.aboutPage;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main ref={containerRef}>
        {/* Hero */}
        <PageHero
          eyebrow={aboutContent.hero.eyebrow}
          title={aboutContent.hero.title}
          highlight={aboutContent.hero.highlight}
          description={aboutContent.hero.description}
        />

        {/* Mission & Vision */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 stagger-children">
              {/* Mission */}
              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 hover:shadow-xl transition-shadow duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-primary/20">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-6 text-primary">{aboutContent.missionTitle}</h3>
                <p className="text-slate-600 text-lg leading-relaxed relative z-10">
                  {aboutContent.missionText}
                </p>
              </div>

              {/* Vision */}
              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 hover:shadow-xl transition-shadow duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-secondary/20">
                  <Eye size={32} className="text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-6 text-primary">{aboutContent.visionTitle}</h3>
                <p className="text-slate-600 text-lg leading-relaxed relative z-10">
                  {aboutContent.visionText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-primary text-white relative overflow-hidden">
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary via-transparent to-transparent opacity-30"></div>
          </div>

          <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-up">
              <span className="text-secondary font-bold text-sm uppercase tracking-widest">{aboutContent.valuesEyebrow}</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 leading-tight">
                {aboutContent.valuesTitle} <span className="text-secondary">{aboutContent.valuesHighlight}</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children justify-center">
              {aboutContent.coreValues.map((value, index) => {
                const Icon = iconMap[value.icon as keyof typeof iconMap] ?? CheckCircle;
                return (
                  <div
                    key={value.title}
                    className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-10 text-center group hover:bg-white/10 transition-all duration-500 ${index >= 3 ? 'lg:col-span-1 lg:last:col-span-1 lg:last:col-start-auto' : ''}`}
                  >
                    <div className={`w-20 h-20 ${value.color === 'bg-secondary' ? 'bg-secondary shadow-secondary/30' : 'bg-white text-primary shadow-white/10'} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={36} className={`${value.color === 'bg-secondary' ? 'text-secondary-foreground' : 'text-primary'}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-slate-300 leading-relaxed text-lg">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-custom py-16 relative z-10 text-center">
          <div className="max-w-4xl mx-auto animate-fade-up">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-primary">
              {aboutContent.ctaTitle} <span className="text-secondary">{aboutContent.ctaHighlight}</span>
            </h2>
            <p className="text-slate-600 text-xl mb-10 leading-relaxed">
              {aboutContent.ctaDescription}
            </p>
            <Button size="xl" shape="pill" asChild className="text-lg px-10 py-6 h-auto shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <Link href={aboutContent.ctaHref}>{aboutContent.ctaLabel}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
