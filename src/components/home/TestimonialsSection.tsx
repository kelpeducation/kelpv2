import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  content: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    items: Array<{
      quote: string;
      author: string;
      role: string;
      location: string;
    }>;
  };
}

const TestimonialsSection = ({ content }: TestimonialsSectionProps) => {
  const containerRef = useGSAPAnimation();

  return (
    <section
      ref={containerRef}
      className="section-padding bg-foreground text-background relative overflow-hidden"
      style={{
        backgroundImage: 'url("/images/hero2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay - lighter for visibility */}
      <div className="absolute inset-0 bg-foreground/80 backdrop-blur-sm" />

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">{content.eyebrow}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6 text-background">
            {content.title}
            <span className="text-gradient-gold block">{content.highlight}</span>
          </h2>
          <p className="text-background/70 text-lg">
            {content.description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 stagger-children">
          {content.items.map((testimonial, index) => (
            <div
              key={`${testimonial.author}-${index}`}
              className={`relative bg-background/5 backdrop-blur-sm border border-background/10 rounded-3xl p-8 hover:bg-background/10 transition-all duration-500 ${index === 1 ? 'md:-translate-y-8' : ''
                }`}
            >
              {/* Quote icon */}
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Quote size={24} className="text-primary-foreground" />
              </div>

              {/* Quote */}
              <blockquote className="text-background/90 text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="pt-6 border-t border-background/10">
                <p className="font-bold text-background">{testimonial.author}</p>
                <p className="text-background/60 text-sm">{testimonial.role}</p>
                <p className="text-primary text-sm mt-1">{testimonial.location}</p>
              </div>

              {/* Decorative element */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-secondary/20 rounded-full opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;