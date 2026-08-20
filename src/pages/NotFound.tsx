'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import { DecorativeBackground } from '@/components/ui/decorative-background';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, HelpCircle } from "lucide-react";
import { useGSAPAnimation } from "@/hooks/useGSAPAnimation";

const NotFound = () => {
  const pathname = usePathname();
  const containerRef = useGSAPAnimation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main ref={containerRef} className="flex-grow flex items-center justify-center relative overflow-hidden bg-primary pt-16 pb-32">
        {/* Background Patterns */}
        <DecorativeBackground gridOpacity={0.03} gridSize={60} blobs={2} blobColor="secondary" />

        <div className="container-custom relative z-10 text-center px-4">
          <div className="animate-fade-up">
            <h1 className="text-[100px] md:text-[160px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-secondary to-primary/50 opacity-20 select-none">
              404
            </h1>

            <div className="-mt-10 md:-mt-16 relative z-20 space-y-6">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/10">
                <HelpCircle size={32} className="text-secondary" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Page <span className="text-secondary">Not Found</span>
              </h2>

              <p className="text-slate-300 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                It looks like you've ventured into uncharted waters. The page you are looking for might have been moved, removed, or never existed.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/">
                    <Home size={18} className="mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/10 text-white hover:bg-white/10">
                  <Link href="/contact">
                    Contact Support
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
