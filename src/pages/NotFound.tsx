import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from "react";
import Head from 'next/head';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, HelpCircle } from "lucide-react";
import { useGSAPAnimation } from "@/hooks/useGSAPAnimation";

const NotFound = () => {
  const router = useRouter();
  const containerRef = useGSAPAnimation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", router.pathname);
  }, [router.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Page Not Found | KELP Education</title>
      </Head>
      <Navbar />

      <main ref={containerRef} className="flex-grow flex items-center justify-center relative overflow-hidden bg-primary pt-16 pb-32">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,182,213,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,182,213,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full blur-[150px] opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[150px] opacity-10 animate-pulse delay-700" />

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
                <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-white border-none text-base px-8 h-12 rounded-xl shadow-lg shadow-secondary/25 hover:scale-105 transition-all duration-300">
                  <Link href="/">
                    <Home size={18} className="mr-2" />
                    Back to Home
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/10 text-white hover:bg-white/10 text-base px-8 h-12 rounded-xl hover:scale-105 transition-all duration-300">
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
