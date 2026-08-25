import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';

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

const avatarRings = [
  'from-secondary to-accent',
  'from-accent to-primary',
  'from-primary to-secondary',
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

const TestimonialsSection = ({ content }: TestimonialsSectionProps) => {
  const containerRef = useGSAPAnimation();
  const loopItems = [...content.items, ...content.items];

  return (
    <section
      ref={containerRef}
      className="section-padding bg-primary text-background relative overflow-hidden"
      style={{
        backgroundImage: 'url("/images/hero2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay - lighter for visibility */}
      <div className="absolute inset-0 bg-primary/85 backdrop-blur-sm" />

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="container-custom text-center max-w-3xl mx-auto mb-16 animate-fade-up">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">{content.eyebrow}</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 mb-6 text-background">
            {content.title}
            <span className="text-gradient-gold block">{content.highlight}</span>
          </h2>
          <p className="text-background/70 text-sm leading-relaxed lg:text-base">
            {content.description}
          </p>
        </div>

        {/* Moving testimonials */}
        <div
          className="group/marquee relative overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          <div className="flex w-max gap-6 lg:gap-8 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {loopItems.map((testimonial, index) => (
              <div
                key={`${testimonial.author}-${index}`}
                className="w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] flex-shrink-0 rounded-full bg-background/5 border border-background/10 backdrop-blur-sm flex flex-col items-center justify-center text-center p-10"
              >
                {/* Circular avatar */}
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarRings[index % avatarRings.length]} flex items-center justify-center text-base font-bold text-white shadow-lg ring-4 ring-background/10 mb-4 flex-shrink-0`}
                >
                  {getInitials(testimonial.author)}
                </div>

                {/* Quote */}
                <blockquote className="text-background/90 text-xs leading-relaxed line-clamp-4 mb-4 max-w-[190px]">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div>
                  <p className="font-bold text-background text-sm">{testimonial.author}</p>
                  <p className="text-background/60 text-xs">{testimonial.role}</p>
                  <p className="text-primary text-xs mt-0.5">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
