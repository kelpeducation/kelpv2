import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  const containerRef = useGSAPAnimation();

  return (
    <section ref={containerRef} className="section-padding bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="container-custom relative z-10">
        <div className="relative bg-gradient-primary rounded-[2.5rem] p-12 lg:p-20 overflow-hidden animate-scale-in">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-background/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
           

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Unlock Your Potential?
            </h2>
            
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Join hundreds of students, educators, and institutions who have transformed their futures with KELP. Let's write your success story together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gold" size="xl" asChild>
                <Link href="/contact">
                  Get Started Now
                  <ArrowRight size={22} />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/services">Explore Programs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
