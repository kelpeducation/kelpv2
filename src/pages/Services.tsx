import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { BookOpen, Users, GraduationCap, Building2, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
const services = [
  {
    id: 'global-language-mastery',
    title: 'Global Language Mastery',
    subtitle: 'Master Languages for the Modern World',
    description:
      'We provide expert linguistic education designed to help you achieve absolute fluency and confidence, whether for business, expatriate living, or high-stakes public speaking.',
    image:
      '/images/ModernLanguagesConsultancy-Image.avif',
    benefits: [
      'KOEC Club: Rapid English mastery system.',
      'Professional English: Business-level fluency.',
      'Kinyarwanda for Expats: Local language & culture.',
      'One-on-One Tutoring: Private, personalized teaching.',
      'Public Speaking: Training for high-stakes meetings.',
    ],
  },
  {
    id: 'school-institutional-consultancy',
    title: 'School & Institutional Consultancy',
    subtitle: 'Elevating Educational Standards',
    description:
      'Partner with us to transform your educational institution. We offer comprehensive consultancy from curriculum design and teacher training to school management systems producing the best student results.',
    image:
      '/images/TeacherTrainingServices-Image.jfif',
    benefits: [
      'Teacher Training: High-standard workshops on 21st-century methods.',
      'Curriculum Architecture: Designing global-standard courses.',
      'Resource Creation: Writing easy-to-read textbooks & digital tools.',
      'Digital Media: Producing best educational videos',
      'School Management: Systems for better student results.',
    ],
  },
  {
    id: 'youth-coaching',
    title: 'Youth Coaching',
    subtitle: 'Empowering the Next Generation',
    description:
      'Our coaching programs focus on fundamental life skills, ethics, and career pathfinding, equipping youth with the tools they need to navigate modern challenges and succeed in life.',
    image:
      '/images/CoachingMentorship-Image.jfif',
    benefits: [
      'Literacy, Life Skills & Soft Skills: Neccessary skills for youth wellbeing and success in life',
      'Character & Ethics: Building high-integrity and well-mannered youth.',
      'Digital & Financial Literacy: Money & online safety skills.',
      'Career Mentorship: Pathfinding for teens & graduates.',
    ],
  },
];


const Services = () => {
  const containerRef = useGSAPAnimation();
  const router = useRouter();

  useEffect(() => {
    if (router.asPath.includes('#')) {
      const id = router.asPath.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [router.asPath]);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Services & Programs | KELP Education</title>
        <meta name="description" content="Explore KELP's education services and programs, including teacher training, school consultancy, English courses, and adult learning." />
      </Head>
      <Navbar />
      <main ref={containerRef}>
        {/* Hero */}
        <section className="pt-32 pb-20 section-padding bg-slate-900 relative overflow-hidden text-white">
          <div className="absolute inset-0">
            <img
              src="/images/HeroSection-Image.jfif"
              alt="Background"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,182,213,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,182,213,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="container-custom relative z-10">
            <div className="max-w-4xl animate-fade-up">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Comprehensive Education
                <span className="text-secondary block">Programs & Services</span>
              </h1>
              <p className="text-slate-300 text-xl leading-relaxed">
                From language mastery to institutional consultancy, our services are specifically designed to meet the evolving needs of modern learners and educational leaders.
              </p>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom space-y-32">
            {services.map((service, index) => {
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
                        className="h-[400px] w-full object-cover transition-transform duration-700 hover:scale-105"
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

                    <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                      {service.title}
                    </h2>

                    <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
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
                                <strong className="font-semibold text-slate-900 leading-relaxed font-outfit">{benefit.split(':')[0]}:</strong>
                                {benefit.substring(benefit.indexOf(':') + 1)}
                              </>
                            ) : (
                              benefit
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10">
                      <Button size="lg" variant="hero" asChild className="bg-secondary hover:bg-secondary/90 text-white border-none">
                        <Link href="/contact">
                          Inquire Now
                          <ArrowRight size={18} />
                        </Link>
                      </Button>
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
          <div className="bg-gradient-to-br from-primary to-[#0f2a4a] rounded-[2rem] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-xl">
            {/* Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
              <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-secondary rounded-full blur-[120px] mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-fade-up">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Not Sure Which Program Is <span className="text-secondary">Right for You?</span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Unlock your full potential with a personalized learning path. Our team is here to guide you to the perfect educational solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-white border-none text-base px-8 py-6 h-auto rounded-xl shadow-lg shadow-secondary/25 hover:scale-105 transition-all duration-300">
                  <Link href="/contact">
                    Schedule a Consultation
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 text-base px-8 py-6 h-auto rounded-xl hover:scale-105 transition-all duration-300">
                  <Link href="/contact">
                    Contact Us
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

