import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useGSAPAnimation } from '@/hooks/useGSAPAnimation';
import { BookOpen, Brain, GraduationCap, Monitor, ShoppingCart, ArrowRight, Star, Filter, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Head from 'next/head';
import { DecorativeBackground } from '@/components/ui/decorative-background';

/* ────────── Data ────────── */
import { categories, allProducts } from '@/data/products';

const featuredIds = [1, 2, 3, 4];
const featuredProducts = allProducts.filter((p) => featuredIds.includes(p.id));

/* ────────── Component ────────── */
const Market = () => {
  const containerRef = useGSAPAnimation();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProducts =
    activeFilter === 'all'
      ? allProducts
      : allProducts.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Head>
        <title>Market | KELP Education</title>
        <meta name="description" content="Browse KELP's marketplace of learning resources, courses, and educational materials." />
      </Head>
      <Navbar />
      <main ref={containerRef}>

        {/* ═══════════ HERO ═══════════ */}
        <section className="pt-24 pb-20 section-padding bg-primary text-white relative overflow-hidden">
          <DecorativeBackground gridOpacity={0.03} gridSize={60} />

          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Empowering Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
                  Learning Journey
                </span>
              </h1>
              <p className="text-slate-300 text-xl leading-relaxed mb-10">
                Discover books and tools to boost your knowledge —{' '}
                <em className="text-accent font-medium not-italic">wige neza, utere imbere.</em>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="text-base px-8 py-6 h-auto hover:scale-105"
                >
                  <a href="#products">
                    Shop Now
                    <ShoppingCart size={18} className="ml-2" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/20 text-white hover:bg-white/10 text-base px-8 py-6 h-auto rounded-xl hover:scale-105 transition-all duration-300"
                >
                  <a href="#categories">Explore Categories</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ CATEGORIES ═══════════ */}
        <section id="categories" className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-16 animate-fade-up">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Browse By</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">
                Product <span className="text-primary">Categories</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Find exactly what you need to level up your learning experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveFilter(cat.id);
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group relative bg-white rounded-2xl p-8 text-left shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-primary/20 hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Gradient blob */}
                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${cat.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`} />

                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={24} className={cat.iconColor} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{cat.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{cat.description}</p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-xs font-semibold text-primary/70">{cat.count} items</span>
                        <ArrowRight size={16} className="text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════ FEATURED PRODUCTS ═══════════ */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16 animate-fade-up">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Top Picks</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">
                Featured <span className="text-primary">Products</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Our handpicked recommendations to kickstart your growth — <em className="text-secondary">bikore neza, wiyubake.</em>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.badge && (
                      <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
                      <Star size={12} className="text-accent fill-accent" />
                      <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-xs text-accent italic mb-4">&quot;{product.phrase}&quot;</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{product.price}</span>
                      <Link href={`/product/${product.id}`}>
                        <Button
                          size="sm"
                          className="rounded-xl text-xs px-4 hover:scale-105"
                        >
                          <ShoppingCart size={14} className="mr-1" />
                          Add to Cart
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ ALL PRODUCTS ═══════════ */}
        <section id="products" className="section-padding bg-muted/30 scroll-mt-32">
          <div className="container-custom">
            <div className="text-center mb-12 animate-fade-up">
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Full Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">
                All <span className="text-primary">Products</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
                Start learning today — every resource you need in one place.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-up">
              <button
                onClick={() => setActiveFilter('all')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === 'all'
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary'
                  }`}
              >
                <Filter size={14} />
                All
              </button>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeFilter === cat.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/25'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-primary/30 hover:text-primary'
                      }`}
                  >
                    <Icon size={14} />
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                      <Star size={11} className="text-accent fill-accent" />
                      <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-secondary/80">
                      {categories.find((c) => c.id === product.category)?.title}
                    </span>
                    <h3 className="font-bold text-slate-900 mt-1 mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-xs text-accent italic mb-4">&quot;{product.phrase}&quot;</p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <Link href={`/product/${product.id}`}>
                        <Button
                          size="sm"
                          className="rounded-xl text-xs px-4 hover:scale-105"
                        >
                          Buy Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section className="container-custom pb-16 pt-4 relative z-10">
          <div className="bg-gradient-to-br from-primary to-[hsl(193,92%,10%)] rounded-[2rem] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-xl">
            {/* Background blurs */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-1/4 -left-1/4 w-80 h-80 bg-secondary rounded-full blur-[100px]" />
              <div className="absolute -bottom-1/4 -right-1/4 w-80 h-80 bg-accent rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-8 animate-fade-up">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                Invest in Your Future —{' '}
                <span className="text-secondary">Ejo Heza Hatangirira Uyu Munsi</span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Every book, every tool, every resource brings you one step closer to the future you deserve. Start your journey with KELP today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="text-base px-8 py-6 h-auto hover:scale-105"
                >
                  <a href="#products">
                    Start Shopping
                    <ArrowRight size={18} className="ml-2" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-white/20 text-white hover:bg-white/10 text-base px-8 py-6 h-auto rounded-xl hover:scale-105 transition-all duration-300"
                >
                  <Link href="/contact">Contact Us</Link>
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

export default Market;
