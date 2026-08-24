'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { DecorativeBackground } from '@/components/ui/decorative-background';
import { useCmsPagesContent } from '@/hooks/useCmsPagesContent';

const Blog = () => {
  const containerRef = useGSAPAnimation();
  const pagesContent = useCmsPagesContent();
  const blogContent = pagesContent.blogPage;
  const blogPosts = blogContent.posts;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main ref={containerRef}>
        {/* Hero */}
        <section className="pt-28 pb-16 section-padding bg-primary text-white relative overflow-hidden">
          <DecorativeBackground gridOpacity={0.03} gridSize={60} />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-up">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">{blogContent.hero.eyebrow}</span>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4 mb-6">
                {blogContent.hero.title}
                <span className="text-secondary block">{blogContent.hero.highlight}</span>
              </h1>
              <p className="text-slate-300 text-xl leading-relaxed">
                {blogContent.hero.description}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="section-padding bg-muted/30 pt-0 -mt-8">
          <div className="container-custom">
            <div className="bg-primary text-background rounded-3xl p-8 lg:p-12 relative overflow-hidden animate-scale-in">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block bg-white/15 text-background text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {blogContent.featuredLabel}
                  </span>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-background">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-background/70 text-lg leading-relaxed mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-background/60 text-sm mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {blogPosts[0].date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <Button variant="gold" size="lg">
                    Read Article
                    <ArrowRight size={20} />
                  </Button>
                </div>
                <div className="hidden lg:block">
                  <div className="relative aspect-video bg-background/10 rounded-2xl overflow-hidden">
                    <img src={blogPosts[0].image} alt={blogPosts[0].title} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
              {blogPosts.slice(1).map((post, index) => (
                <article
                  key={post.id}
                  className={`bg-card border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 group ${
                    index === 0 ? 'lg:-translate-y-4' : index === 2 ? 'lg:-translate-y-4' : ''
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-video bg-muted overflow-hidden group-hover:bg-primary/10 transition-colors">
                    <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>

                  <div className="p-6">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      {post.category}
                    </span>
                    
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                      <span className="flex items-center gap-2">
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="bg-gradient-primary rounded-3xl p-12 lg:p-16 text-center animate-scale-in">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                {blogContent.newsletterTitle}
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                {blogContent.newsletterDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={blogContent.newsletterPlaceholder}
                  className="flex-1 h-14 px-6 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                />
                <Button variant="gold" size="lg">
                  {blogContent.newsletterButtonLabel}
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

export default Blog;
