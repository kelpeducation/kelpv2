import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Target, Eye, Heart, Lightbulb, Shield } from 'lucide-react';

const AboutSection = () => {
  const containerRef = useGSAPAnimation();

  return (
    <section 
      ref={containerRef} 
      className="section-padding bg-background relative overflow-hidden"
      style={{
        backgroundImage: 'url("/images/hero1.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Visual */}
          <div className="relative animate-slide-right">
            {/* Main card */}
            <div className="relative z-10 bg-primary rounded-3xl p-8 lg:p-12 text-background">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary rounded-2xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-secondary rounded-full -z-10" />
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center">
                  <Target size={28} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-background/60 text-sm">Our Mission</p>
                  <p className="font-bold text-lg">Empowering Through Education</p>
                </div>
              </div>

              <p className="text-background/80 text-lg leading-relaxed mb-8">
                To help individuals unlock their academic and personal potential through transformative, sustainable, and equitable education programs.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-background/20">
                <div>
                  <p className="text-3xl font-bold text-primary">8+</p>
                  <p className="text-background/60 text-sm">Years of Impact</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">500+</p>
                  <p className="text-background/60 text-sm">Lives Changed</p>
                </div>
              </div>
            </div>

            {/* Vision card */}
            <div className="absolute -bottom-8 -right-8 bg-card rounded-2xl p-6 shadow-xl border border-border max-w-xs animate-float z-20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <Eye size={24} className="text-accent-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Our Vision</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    To be a leading provider of transformative education, recognized for excellence and equity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="animate-slide-left">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About KELP</span>
            <h2 className="text-3xl md:text-4xl text-primary lg:text-5xl font-bold mt-4 mb-6">
              Education That
              <span className="text-gradient-primary block">Transforms Lives</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              KELP — Kennis Education for Literacy and Potential — is dedicated to providing high-quality, accessible education for parents, schools, organizations, and adult learners across Rwanda and beyond.
            </p>

            {/* Values */}
            <div className="space-y-6">
              {[
                {
                  icon: Lightbulb,
                  title: 'Excellence',
                  description: 'Continuous improvement and innovation in everything we do.',
                  color: 'bg-primary',
                },
                {
                  icon: Heart,
                  title: 'Equity',
                  description: 'Inclusive, accessible education tailored to diverse needs.',
                  color: 'bg-secondary',
                },
                {
                  icon: Shield,
                  title: 'Empowerment',
                  description: 'Unlocking potential through literacy and personal growth.',
                  color: 'bg-accent',
                },
              ].map((value) => {
                const Icon = value.icon;
                return (
                  <div key={value.title} className="flex items-start gap-4 group">
                    <div className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={22} className="text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-lg mb-1">{value.title}</h4>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;