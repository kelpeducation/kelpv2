import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Target, Eye, Heart, Shield, Users, BookOpen, Award, Globe, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Head from 'next/head';
import { DecorativeBackground } from '@/components/ui/decorative-background';

const About = () => {
  const containerRef = useGSAPAnimation();

  const coreValues = [
    {
      icon: CheckCircle,
      title: 'Accountability',
      description: 'Uphold high standards and honor commitments.',
      color: 'bg-primary',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Continuously improve and innovate in programs and services.',
      color: 'bg-secondary', // Aqua
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Ensure honesty and transparency to build trust.',
      color: 'bg-primary',
    },
    {
      icon: Users,
      title: 'Equity',
      description: 'Provide inclusive and accessible education to meet the diverse needs of all students.',
      color: 'bg-secondary', // Aqua
    },
    {
      icon: Heart,
      title: 'Service',
      description: 'Exceed client expectations with impactful experiences.',
      color: 'bg-primary',
    }
  ];

  return (
    <div className="min-h-screen">
      <Head>
        <title>About Us | KELP Education</title>
        <meta name="description" content="Learn about KELP's mission to deliver transformative, sustainable, and equitable education programs across Rwanda." />
      </Head>
      <Navbar />
      <main ref={containerRef}>
        {/* Hero */}
        <section className="pt-32 pb-20 section-padding bg-primary text-white relative overflow-hidden">
          <DecorativeBackground gridOpacity={0.03} gridSize={60} />

          <div className="container-custom relative z-10 text-center animate-fade-up">
            <span className="text-secondary font-bold text-sm uppercase tracking-widest mb-4 block">Who We Are</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Unlocking Potential, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">Empowering Futures</span>
            </h1>
            <p className="text-slate-200 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-light">
              KELP is dedicated to providing transformative, sustainable, and accessible educational solutions that foster holistic development and lifelong growth.
            </p>
          </div>
        </section>

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
                <h3 className="text-3xl font-bold mb-6 text-primary">Our Mission</h3>
                <p className="text-slate-600 text-lg leading-relaxed relative z-10">
                  Empower individuals through education and holistic development by providing innovative and accessible learning solutions in literacy, communication, personal growth, and essential life skills.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 md:p-14 hover:shadow-xl transition-shadow duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700"></div>
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-secondary/20">
                  <Eye size={32} className="text-secondary-foreground" />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-primary">Our Vision</h3>
                <p className="text-slate-600 text-lg leading-relaxed relative z-10">
                  To become a leading provider of transformative, sustainable, and equitable education, recognized for excellence and inclusivity.
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
            <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
              <span className="text-secondary font-bold text-sm uppercase tracking-widest">Our DNA</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
                Core Values That <span className="text-secondary">Define Scucess</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children justify-center">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-10 text-center group hover:bg-white/10 transition-all duration-500 ${index >= 3 ? 'lg:col-span-1 lg:last:col-span-1 lg:last:col-start-auto' : ''}`}
                  >
                    <div className={`w-20 h-20 ${value.color === 'bg-secondary' ? 'bg-secondary shadow-secondary/30' : 'bg-white text-primary shadow-white/10'} rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={36} className={`${value.color === 'bg-secondary' ? 'text-secondary-foreground' : 'text-primary'}`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-slate-300 leading-relaxed text-lg">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-custom py-24 relative z-10 text-center">
          <div className="max-w-4xl mx-auto animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">
              Let's <span className="text-secondary">Grow Together</span>
            </h2>
            <p className="text-slate-600 text-xl mb-10 leading-relaxed">
              Experience the KELP difference. Whether you are a student, parent, or institution, we have a path for you.
            </p>
            <Button size="xl" shape="pill" asChild className="text-lg px-10 py-6 h-auto shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <Link href="/contact">Connect With Us</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
