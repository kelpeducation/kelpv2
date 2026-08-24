'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { DecorativeBackground } from '@/components/ui/decorative-background';
const testimonials = [
  {
    quote: "KELP's English courses transformed my communication skills completely. Within six months, I gained the confidence to apply for international positions. The personalized approach and supportive instructors made all the difference in my learning journey.",
    author: "Marie Uwimana",
    role: "Marketing Professional",
    location: "Kigali, Rwanda",
    program: "English Courses",
    rating: 5,
  },
  {
    quote: "As a school principal, partnering with KELP for our teacher training program was one of the best decisions we made. Our educators are now more confident, innovative, and equipped with modern teaching methodologies.",
    author: "Jean-Pierre Habimana",
    role: "School Principal",
    location: "Nyanza, Rwanda",
    program: "Teacher Training",
    rating: 5,
  },
  {
    quote: "The coaching sessions helped my teenager develop effective study habits and build self-confidence. KELP truly understands how to unlock a student's potential. My son's grades improved dramatically.",
    author: "Claudine Mukamana",
    role: "Parent",
    location: "Huye, Rwanda",
    program: "Personal Coaching",
    rating: 5,
  },
  {
    quote: "KELP's school consultancy services helped us restructure our curriculum and improve our quality assurance systems. We've seen a 40% improvement in student outcomes since implementing their recommendations.",
    author: "Dr. Emmanuel Nzeyimana",
    role: "School Director",
    location: "Musanze, Rwanda",
    program: "School Consultancy",
    rating: 5,
  },
  {
    quote: "As an adult learner returning to education, I was nervous about starting fresh. KELP's supportive environment and flexible scheduling made it possible for me to balance work and studies successfully.",
    author: "Grace Ingabire",
    role: "Business Owner",
    location: "Rubavu, Rwanda",
    program: "Adult Learning",
    rating: 5,
  },
  {
    quote: "The teacher training workshop opened my eyes to new possibilities in education. I learned innovative ways to engage students and make learning more interactive and meaningful.",
    author: "Patrick Mugabo",
    role: "Secondary School Teacher",
    location: "Karongi, Rwanda",
    program: "Teacher Training",
    rating: 5,
  },
];

const Testimonials = () => {
  const containerRef = useGSAPAnimation();
  return (
    <div className="min-h-screen">
      <Navbar />
      <main ref={containerRef}>
        {/* Hero */}
        <section className="pt-28 pb-16 section-padding bg-primary text-white relative overflow-hidden">
          <DecorativeBackground gridOpacity={0.03} gridSize={60} />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-up">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Success Stories</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Voices of
                <span className="text-secondary block">Transformation</span>
              </h1>
              <p className="text-slate-300 text-xl leading-relaxed">
                Real stories from real people whose lives have been transformed through KELP's educational programs. Their success is our greatest achievement.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-card border border-border rounded-3xl p-8 hover:shadow-xl transition-all duration-500 ${
                    index === 1 || index === 4 ? 'lg:-translate-y-8' : ''
                  }`}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={18} className="fill-secondary text-secondary" />
                    ))}
                  </div>

                  {/* Quote icon */}
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Quote size={20} className="text-primary" />
                  </div>

                  {/* Program badge */}
                  <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {testimonial.program}
                  </span>

                  {/* Quote */}
                  <blockquote className="text-foreground leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="pt-4 border-t border-border">
                    <p className="font-bold text-foreground">{testimonial.author}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                    <p className="text-primary text-sm mt-1">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding bg-gradient-primary">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Our Impact in Numbers
              </h2>
              <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                Every number represents a life transformed, a goal achieved, a potential unlocked.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 stagger-children">
              {[
                { value: '500+', label: 'Students Trained' },
                { value: '98%', label: 'Satisfaction Rate' },
                { value: '50+', label: 'Partner Schools' },
                { value: '100%', label: 'Commitment' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</p>
                  <p className="text-primary-foreground/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-background">
          <div className="container-custom text-center animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Join the growing community of individuals and organizations who have transformed their futures with KELP.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link href="/contact">Start Your Journey</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Testimonials;
