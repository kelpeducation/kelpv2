import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, ChevronDown, Youtube, Users, GraduationCap, ArrowRight, BookOpen, Building2, Globe, FileText, Edit, Clock, Lightbulb, Languages } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '@/assets/logo 0.2.png';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services & Programs', hasDropdown: true },
  { href: '/market', label: 'Market' },
  // Grow With Us hidden for now — re-add this entry (or manage via CMS) to bring it back.
  // { href: '/blog', label: 'Grow With Us', hasDropdown: true },
  // Success Stories hidden for now — re-add this entry (or manage via CMS) to bring it back.
  // { href: '/testimonials', label: 'Success Stories' },
  // Contact moved to the CTA button — re-add this entry to bring it back into the nav links.
  // { href: '/contact', label: 'Contact' },
];

const growLinks = [
  {
    title: 'YouTube Channel',
    icon: Youtube,
    href: 'https://youtube.com',
    isExternal: true,
    description: 'Watch our educational content and success stories'
  },
  {
    title: 'Community',
    icon: Users,
    href: '/contact',
    isExternal: false,
    description: 'Join our vibrant community of learners'
  },
  {
    title: 'E-Learning',
    icon: GraduationCap,
    href: '/contact',
    isExternal: false,
    description: 'Access our online learning resources'
  }
];

const serviceLinks = [
  {
    title: 'Global Language Mastery',
    icon: Languages,
    href: '/services#global-language-mastery',
    description: 'Rapid English mastery, Professional English & tutoring'
  },
  {
    title: 'School & Institutional Consultancy',
    icon: Building2,
    href: '/services#school-institutional-consultancy',
    description: 'Teacher training, curriculum design & school management'
  },
  {
    title: 'Youth Coaching',
    icon: Users,
    href: '/services#youth-coaching',
    description: 'Life skills, ethics, and career mentorship for youth'
  }
];

const SocialIcons = () => (
  <div className="flex items-center gap-4">
    <a href="https://wa.me/250795240664" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-secondary transition-colors duration-300 text-white/90">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-secondary transition-colors duration-300 text-white/90">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-secondary transition-colors duration-300 text-white/90">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-secondary transition-colors duration-300 text-white/90">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 hover:text-secondary transition-colors duration-300 text-white/90">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    </a>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const location = router.pathname;

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white border-b border-white/10">
        <div className="container mx-auto px-6 lg:px-12 py-2 flex justify-between items-center text-xs">

          {/* Contact info — hidden on mobile */}
          <div className="hidden sm:flex items-center gap-6">
            <span className="font-medium">📧 kelpeducation@gmail.com</span>
            <span className="hidden md:inline">📞 +250 795 240 664</span>
          </div>

          {/* Social icons — full width centered on mobile, right-aligned on sm+ */}
          <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
            <SocialIcons />
          </div>

        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200'
          : 'bg-white border-b border-slate-100'
          }`}
      >
        <nav className="container mx-auto px-4 xl:px-8 2xl:px-12">
          <div className="flex items-center justify-between h-20 xl:h-24">

            {/* Logo — big and prominent across all screen sizes */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <Image
                src={logo}
                alt="Kelp Education Logo"
                priority
                className="h-16 xl:h-20 2xl:h-24 w-auto object-contain transform transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden xl:flex items-center gap-0 2xl:gap-1">
              {navLinks.map((link) => {
                const isGrowWithUs = link.label === 'Grow With Us';
                const hasDrop = link.hasDropdown;

                return (
                  <li
                    key={link.href}
                    className="relative group/menu"
                    onMouseEnter={() => hasDrop && setActiveDropdown(link.label)}
                    onMouseLeave={() => hasDrop && setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`relative px-3 xl:px-4 2xl:px-5 py-2 text-xs xl:text-sm 2xl:text-base font-medium transition-all duration-300 rounded-md flex items-center gap-0.5 xl:gap-1 group whitespace-nowrap ${
                        location === link.href || (hasDrop && activeDropdown === link.label)
                          ? 'text-primary'
                          : 'text-slate-700 hover:text-primary/90'
                      }`}
                    >
                      {link.label}
                      {hasDrop && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 flex-shrink-0 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                        />
                      )}
                      <span
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary/90 transition-all duration-300 ${
                          location === link.href ? 'w-3/4' : 'w-0 group-hover:w-1/2'
                        }`}
                      />
                    </Link>

                    {/* Dropdown */}
                    {hasDrop && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 transform origin-top w-[460px] max-w-[92vw] xl:w-[480px] 2xl:w-[600px] ${
                          activeDropdown === link.label
                            ? 'opacity-100 visible translate-y-0'
                            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                        }`}
                      >
                        <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex">
                          {/* Left Side - Visual */}
                          <div className="w-5/12 bg-slate-900 relative overflow-hidden group">
                            <img
                              src={isGrowWithUs
                                ? "/images/GrowWithUs-DropDownImage.avif"
                                : "/images/ServicesAndPrograms-DropDownImage.avif"
                              }
                              alt={link.label}
                              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="relative z-10 p-6 flex flex-col justify-end h-full text-white">
                              <h3 className="text-xl font-bold mb-2">
                                {isGrowWithUs ? "Join Our Community" : "Educational Excellence"}
                              </h3>
                              <p className="text-sm text-slate-200 mb-4 whitespace-normal leading-relaxed">
                                {isGrowWithUs
                                  ? "Connect, learn, and grow with like-minded individuals."
                                  : "Transformative solutions tailored for modern educational needs."
                                }
                              </p>
                              <div className="h-1 w-12 bg-secondary rounded-full"></div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                          </div>

                          {/* Right Side - Links */}
                          <div className="w-7/12 p-6 bg-white">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                              {isGrowWithUs ? "Grow Intentionally" : "Our Programs"}
                            </h4>
                            <div className="grid gap-x-4 gap-y-2 grid-cols-1">
                              {(isGrowWithUs ? growLinks : serviceLinks).map((item, index) => {
                                const Icon = item.icon;
                                const isItemExternal = 'isExternal' in item && item.isExternal;

                                if (isItemExternal) {
                                  return (
                                    <a
                                      key={index}
                                      href={item.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Icon size={18} className="text-primary" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-1">
                                          <h5 className="font-semibold text-slate-900 group-hover:text-primary transition-colors text-xs">
                                            {item.title}
                                          </h5>
                                          <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary/90" />
                                        </div>
                                        <p className="text-[10px] text-slate-500 mt-0.5 leading-tight line-clamp-2">
                                          {item.description}
                                        </p>
                                      </div>
                                    </a>
                                  );
                                }

                                return (
                                  <Link
                                    key={index}
                                    href={item.href}
                                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                                  >
                                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                      <Icon size={18} className="text-primary" />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-1">
                                        <h5 className="font-semibold text-slate-900 group-hover:text-primary transition-colors text-xs">
                                          {item.title}
                                        </h5>
                                      </div>
                                      <p className="text-[10px] text-slate-500 mt-0.5 leading-tight line-clamp-2">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* CTA Button */}
            <div className="hidden xl:flex items-center gap-4 flex-shrink-0">
              <Button
                asChild
                shape="pill"
                className="group px-5 xl:px-6 2xl:px-7 py-2.5 xl:py-3 2xl:py-3.5 h-auto text-xs xl:text-sm 2xl:text-base whitespace-nowrap"
              >
                <Link href="/contact">
                  Contact Us
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1 flex-shrink-0" />
                </Link>
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`xl:hidden transition-all duration-300 bg-slate-50 border-t border-slate-200 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <div className="container mx-auto px-6 py-6 space-y-2">
            {navLinks.map((link) => (
              <div key={link.href}>
                {link.hasDropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(link.label)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                        mobileDropdowns[link.label] ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${mobileDropdowns[link.label] ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <div className={`overflow-hidden transition-all duration-300 ${mobileDropdowns[link.label] ? 'max-h-[500px] mt-2' : 'max-h-0'}`}>
                      <div className="pl-4 space-y-1">
                        {(link.label === 'Grow With Us' ? growLinks : serviceLinks).map((item, index) => {
                          const Icon = item.icon;
                          const isItemExternal = 'isExternal' in item && item.isExternal;

                          if (isItemExternal) {
                            return (
                              <a
                                key={index}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white transition-all text-sm text-slate-600 hover:text-primary"
                              >
                                <Icon size={16} />
                                <span>{item.title}</span>
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={index}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white transition-all text-sm text-slate-600 hover:text-primary"
                            >
                              <Icon size={16} />
                              <span>{item.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                      location === link.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                    {location === link.href && (
                      <ChevronRight size={18} className="text-primary/90" />
                    )}
                  </Link>
                )}
              </div>
            ))}

            <Button asChild shape="pill" className="mt-4 w-full h-auto py-3">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Contact Us
                <ChevronRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;