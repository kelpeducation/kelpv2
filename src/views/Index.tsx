'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { useCmsPagesContent } from '@/hooks/useCmsPagesContent';

const Index = () => {
  const pagesContent = useCmsPagesContent();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection content={pagesContent.home.hero} />
        <ServicesSection content={pagesContent.home.servicesSection} />
        <AboutSection content={pagesContent.home.aboutSection} />
        <TestimonialsSection content={pagesContent.home.testimonialsSection} />
        <CTASection content={pagesContent.home.ctaSection} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
