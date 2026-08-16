import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import AboutSection from '@/components/home/AboutSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>KELP - Kennis Education for Literacy and Potential | Transformative Education</title>
        <meta name="description" content="KELP provides transformative, sustainable, and equitable education programs for parents, schools, organizations, and adult learners. Unlock your academic and personal potential." />
        <link rel="canonical" href="https://www.kelpeducation.com" />
      </Head>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
