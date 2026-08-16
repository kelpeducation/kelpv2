import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '@/assets/logo 0.1.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer-gradient text-background relative overflow-hidden">
      {/* Subtle overlay texture/pattern for extra modern feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      {/* Main Footer */}
      <div className="section-padding pb-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block -mt-10 -mb-4 -ml-4">
                <img
                  src={typeof logo === 'string' ? logo : logo.src}
                  alt="KELP Education"
                  className="w-0 md:w-72 h-auto object-contain scale-110"
                />
              </Link>
              <p className="text-background/70 text-sm leading-relaxed mb-6 mt-2">
                Transformative, sustainable, and equitable education for all. Unlocking potential through literacy and growth.
              </p>
              <div className="flex gap-4">
                <a
                  href="#facebook"
                  className="w-10 h-10 rounded-full bg-slate-900/50 flex items-center justify-center border border-white/10 hover:bg-secondary hover:border-secondary hover:scale-110 hover:shadow-[0_0_15px_rgba(18,182,213,0.5)] transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook size={18} className="text-secondary group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#twitter"
                  className="w-10 h-10 rounded-full bg-slate-900/50 flex items-center justify-center border border-white/10 hover:bg-secondary hover:border-secondary hover:scale-110 hover:shadow-[0_0_15px_rgba(18,182,213,0.5)] transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <Twitter size={18} className="text-secondary group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#linkedin"
                  className="w-10 h-10 rounded-full bg-slate-900/50 flex items-center justify-center border border-white/10 hover:bg-secondary hover:border-secondary hover:scale-110 hover:shadow-[0_0_15px_rgba(18,182,213,0.5)] transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} className="text-secondary group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#instagram"
                  className="w-10 h-10 rounded-full bg-slate-900/50 flex items-center justify-center border border-white/10 hover:bg-secondary hover:border-secondary hover:scale-110 hover:shadow-[0_0_15px_rgba(18,182,213,0.5)] transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram size={18} className="text-secondary group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Market', 'Success Stories', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-').replace('home', '')}`}
                      className="text-background/70 hover:text-secondary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Global Language Mastery', id: 'global-language-mastery' },
                  { name: 'School & Institutional Consultancy', id: 'school-institutional-consultancy' },
                  { name: 'Youth Coaching', id: 'youth-coaching' },
                ].map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services#${service.id}`}
                      className="text-background/70 hover:text-secondary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <ArrowRight size={14} className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+250795240664"
                    className="flex items-start gap-3 text-background/70 hover:text-secondary transition-colors duration-300"
                  >
                    <Phone size={18} className="mt-0.5 text-secondary" />
                    <span>+250 795 240 664</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:kelpeducation@gmail.com"
                    className="flex items-start gap-3 text-background/70 hover:text-secondary transition-colors duration-300"
                  >
                    <Mail size={18} className="mt-0.5 text-secondary" />
                    <span>kelpeducation@gmail.com</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-background/70">
                  <MapPin size={18} className="mt-0.5 text-secondary flex-shrink-0" />
                  <span>Busasamana, Nyanza,<br />Southern Province, Rwanda</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container-custom py-6 px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/60 text-sm">
            © {currentYear} KELP Education. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <Link href="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-secondary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;