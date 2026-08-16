import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Head from 'next/head';
import { DecorativeBackground } from '@/components/ui/decorative-background';

const Contact = () => {
  const containerRef = useGSAPAnimation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [test, setTestng]=useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit the form.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email address",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: '', email: '', message: '' });
    
    // Reset submitted state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen">
      <Head>
        <title>Contact Us | KELP Education</title>
        <meta name="description" content="Get in touch with KELP Education. We'll get back to you within 24 hours." />
      </Head>
      <Navbar />
      {test ? (
      <main ref={containerRef}>
        {/* Hero */}
        <section className="pt-32 pb-20 section-padding bg-primary text-white relative overflow-hidden">
          <DecorativeBackground gridOpacity={0.03} gridSize={60} />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-up">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                Let's Start a
                <span className="text-secondary block">Conversation</span>
              </h1>
              <p className="text-slate-300 text-xl leading-relaxed">
                Ready to unlock your potential? Get in touch with our team and take the first step towards transformative education.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="animate-slide-right">
                <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground">
                        Your message has been sent successfully. We'll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full h-14 px-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Enter your full name"
                          maxLength={100}
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full h-14 px-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Enter your email address"
                          maxLength={255}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                          placeholder="How can we help you?"
                          maxLength={1000}
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={20} />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="animate-slide-left">
                <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
                
                <div className="space-y-6 mb-12">
                  <a
                    href="tel:+250795240664"
                    className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Phone</p>
                      <p className="text-foreground font-semibold text-lg">+250 795 240 664</p>
                    </div>
                  </a>

                  <a
                    href="mailto:kelpeducation@gmail.com"
                    className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail size={24} className="text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Email</p>
                      <p className="text-foreground font-semibold text-lg">kelpeducation@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl">
                    <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Location</p>
                      <p className="text-foreground font-semibold text-lg">Busasamana, Nyanza</p>
                      <p className="text-muted-foreground">Southern Province, Rwanda</p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="aspect-video bg-muted rounded-3xl flex items-center justify-center border border-border">
                  <div className="text-center">
                    <MapPin size={40} className="text-primary mx-auto mb-2" />
                    <p className="text-muted-foreground">Map Location</p>
                    <a 
                      href="https://www.google.com/maps?q=Busasamana,+Nyanza,+Rwanda" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>):(<div className="min-h-screen w-full bg-red-500 flex items-center justify-center px-4">
  <div className="text-center space-y-4">
    <h1 className="text-white text-5xl md:text-7xl font-extrabold">
      Coming Soon
    </h1>
    <p className="text-white/80 text-lg md:text-xl">
      We’re working on something amazing
    </p>
  </div>
</div>
)}

      <Footer />
    </div>
  );
};

export default Contact;
