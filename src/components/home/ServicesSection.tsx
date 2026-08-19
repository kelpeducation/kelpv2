import Link from 'next/link';
import {
  BookOpen,
  Users,
  GraduationCap,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { useEffect } from 'react';
import gsap from 'gsap';

import { Button } from '@/components/ui/button';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';

const services = [
  {
    icon: BookOpen,
    title: 'English Courses',
    description:
      'Structured language programs focused on literacy, fluency, and confident communication.',
  },
  {
    icon: Users,
    title: 'Coaching',
    description:
      'Personalized guidance helping learners gain clarity, confidence, and direction.',
  },
  {
    icon: GraduationCap,
    title: 'Teacher Training',
    description:
      'Practical training that equips educators with modern teaching tools and leadership skills.',
  },
  {
    icon: Building2,
    title: 'School Consultancy',
    description:
      'Strategic advisory supporting schools to improve systems and learning outcomes.',
  },
];

const ServicesSection = () => {
  const sectionRef = useGSAPAnimation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.float-slow', {
        y: -12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.float-fast', {
        y: -18,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background section-padding overflow-hidden"
      style={{
        backgroundImage: 'url("/images/hero3.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      {/* Decorative learning shapes */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="float-slow absolute top-20 left-10 h-10 w-10 rounded-full bg-primary/20" />
        <div className="float-fast absolute top-1/2 right-20 h-14 w-14 rounded-xl bg-secondary/20" />
        <div className="float-slow absolute bottom-20 left-1/3 h-8 w-8 rounded-lg bg-accent/25" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <span className="block mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
            What We Do
          </span>

          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Learning services that
            <span className="block text-primary">
              feel alive
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Education should be engaging, human, and practical. Our services
            combine structure with creativity to help learners thrive.
          </p>
        </div>

        {/* Services */}
        <div className="grid gap-12 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative flex gap-6 rounded-3xl border border-border bg-card p-8 transition-all hover:shadow-xl"
              >
                {/* Floating icon block */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-2`}
                >
                  <Icon size={28} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <Link
                    href="/services"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Learn more
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                {/* Cartoon accent */}
                <div
                  aria-hidden
                  className={`absolute -right-6 -top-6 h-12 w-12 rounded-xl bg-primary/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                    index % 2 === 0 ? 'rotate-12' : '-rotate-12'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20">
          <Button size="lg" variant="hero" asChild>
            <Link href="/services">
              Explore all services
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;