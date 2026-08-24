'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { defaultSiteSettings, loadLiveSiteSettings, SiteSettings } from '@/lib/siteSettings';

const Contact = () => {
  const containerRef = useGSAPAnimation();
  const { toast } = useToast();
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  useEffect(() => {
    loadLiveSiteSettings().then(setSiteSettings);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main ref={containerRef}>
        {/* Hero */}
        <PageHero
          eyebrow="Contact Us"
          title="Let's Start a"
          highlight="Conversation"
          description="Ready to unlock your potential? Get in touch with our team and take the first step towards transformative education."
        />

        {/* Contact Section */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="animate-slide-right">
                <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
                  <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
                  
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
                <h2 className="text-xl font-bold mb-8">Get in Touch</h2>
                
                <div className="space-y-6 mb-12">
                  <a
                    href={`tel:${siteSettings.contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone size={24} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Phone</p>
                      <p className="text-foreground font-semibold text-lg">{siteSettings.contact.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${siteSettings.contact.email}`}
                    className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail size={24} className="text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Email</p>
                      <p className="text-foreground font-semibold text-lg">{siteSettings.contact.email}</p>
                    </div>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
