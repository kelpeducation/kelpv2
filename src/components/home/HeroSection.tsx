import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Button } from '@/components/ui/button';
import { useHeroAnimation } from '@/hooks/useGSAPAnimation';

gsap.registerPlugin(ScrollTrigger);

// ── Floating badge wrapper ──────────────────────────────────────────────────
const FloatingBadge = ({ children, style }) => (
  <div
    style={{
      position: 'absolute',
      background: 'white',
      borderRadius: '16px',
      padding: '10px 14px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      zIndex: 20,
      animation: 'floatBadge 3.5s ease-in-out infinite',
      ...style,
    }}
  >
    {children}
  </div>
);

// ── Score gauge (left side top) ─────────────────────────────────────────────
const ScoreGauge = ({ label, state, footer }: { label: string; state: string; footer: string }) => (
  <FloatingBadge
    style={{
      top: '28px',
      left: '10px',
      flexDirection: 'column',
      alignItems: 'flex-start',
      minWidth: '165px',
      animationDelay: '0s',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
      <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>{label}</span>
      <span style={{
        background: '#044F63', borderRadius: '50%', width: 20, height: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
    <svg width="145" height="75" viewBox="0 0 145 75">
      <defs>
        <linearGradient id="gaugeG" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#044F63" />
          <stop offset="100%" stopColor="#F5A700" />
        </linearGradient>
      </defs>
      <path d="M12 72 A53 53 0 0 1 133 72" fill="none" stroke="#f1f5f9" strokeWidth="9" strokeLinecap="round" />
      <path d="M12 72 A53 53 0 0 1 133 72" fill="none" stroke="url(#gaugeG)" strokeWidth="9"
        strokeLinecap="round" strokeDasharray="166" strokeDashoffset="38" />
      <text x="72" y="62" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e293b">{state}</text>
      <text x="72" y="74" textAnchor="middle" fontSize="9" fill="#94a3b8">{footer}</text>
    </svg>
  </FloatingBadge>
);

// ── Students badge (left side bottom) ──────────────────────────────────────
const StudentsBadge = ({ count, label }: { count: string; label: string }) => (
  <FloatingBadge style={{ bottom: '52px', left: '8px', animationDelay: '0.8s' }}>
    <div style={{
      background: '#F5A700', borderRadius: '10px',
      width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
    }}>🎓</div>
    <div>
      <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{count}</div>
      <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>{label}</div>
    </div>
  </FloatingBadge>
);

// ── Video lessons badge (right side top) ───────────────────────────────────
const VideosBadge = ({ count, label }: { count: string; label: string }) => (
  <FloatingBadge style={{ top: '28px', right: '8px', animationDelay: '0.4s' }}>
    <span style={{
      background: '#E46350', borderRadius: '50%', width: 28, height: 28,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Play size={12} fill="white" color="white" />
    </span>
    <div>
      <div style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>{count}</div>
      <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>{label}</div>
    </div>
  </FloatingBadge>
);

// ══════════════════════════════════════════════════════════════════════════════
interface HeroSectionProps {
  content: {
    eyebrow: string;
    title: string;
    highlight: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
    leftPersonImage: string;
    rightPersonImage: string;
    leftPersonAlt: string;
    rightPersonAlt: string;
    courseProgressLabel: string;
    courseProgressState: string;
    courseProgressFooter: string;
    activeStudentsCount: string;
    activeStudentsLabel: string;
    videoLessonsCount: string;
    videoLessonsLabel: string;
    partners: Array<{ icon: string; name: string }>;
  };
}

const HeroSection = ({ content }: HeroSectionProps) => {
  const heroRef = useHeroAnimation();

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-fade',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.side-person',
        { opacity: 0, scale: 0.93 },
        { opacity: 1, scale: 1, duration: 1.1, stagger: 0.2, delay: 0.25, ease: 'power3.out' }
      );
    }, heroRef);
    return () => ctx.revert();
  }, [heroRef]);

  return (
    <>
      <style>{`
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes bgPulse {
          0%, 100% { opacity: .06; transform: scale(1); }
          50%       { opacity: .1;  transform: scale(1.06); }
        }
      `}</style>

      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{
          minHeight: 'calc(100vh - 80px)',
          background: 'linear-gradient(135deg, #ffffff 0%, hsl(193, 60%, 97%) 55%, hsl(41, 60%, 96%) 100%)',
        }}
      >
        {/* ── decorative blobs ── */}
        {[
          { s: 400, top: '-80px', left: '-60px', color: '#044F63', d: '0s' },
          { s: 280, top: '55%', right: '-40px', color: '#F5A700', d: '1s' },
          { s: 180, bottom: '-30px', left: '42%', color: '#044F63', d: '0.5s' },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute', width: b.s, height: b.s, borderRadius: '50%',
            background: b.color, opacity: 0.07,
            top: b.top, left: b.left, right: b.right, bottom: b.bottom,
            animation: `bgPulse 7s ease-in-out ${b.d} infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* ── dot field ── */}
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 3 === 0 ? 7 : 4, height: i % 3 === 0 ? 7 : 4,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#044F63' : '#F5A700',
            opacity: 0.13,
            top: `${7 + i * 5.8}%`,
            left: `${2 + (i % 5) * 2.5}%`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* ════════ 3-COLUMN LAYOUT ════════ */}
        <div
          className="mx-auto flex w-full max-w-[1380px] items-center gap-4 px-4 lg:px-8"
          style={{ minHeight: 'calc(100vh - 80px)' }}
        >

          {/* ── LEFT — person + 2 cards ── */}
          <div className="side-person hidden w-[310px] shrink-0 flex-col gap-3 xl:flex">
            {/* circle */}
            <div style={{ position: 'relative', height: '330px' }}>
              <div style={{
                width: '250px', height: '250px', borderRadius: '50%',
                background: 'linear-gradient(145deg, hsl(193, 85%, 35%), hsl(193, 92%, 20%))',
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                overflow: 'hidden',
                boxShadow: '0 20px 55px rgba(4,79,99,0.22)',
              }}>
                <img
                  src={content.leftPersonImage}
                  alt={content.leftPersonAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <ScoreGauge
                label={content.courseProgressLabel}
                state={content.courseProgressState}
                footer={content.courseProgressFooter}
              />
              <StudentsBadge
                count={content.activeStudentsCount}
                label={content.activeStudentsLabel}
              />
            </div>
          </div>

          {/* ── CENTER — text + CTAs ── */}
          <div className="hero-fade flex flex-1 flex-col items-center justify-center px-2 py-10 text-center lg:px-6">

            {/* eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span style={{ display: 'inline-block', width: 28, height: 2, background: '#F5A700', borderRadius: 2 }} />
              <span style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px',
                textTransform: 'uppercase', color: '#F5A700',
              }}>
                {content.eyebrow}
              </span>
              <span style={{ display: 'inline-block', width: 28, height: 2, background: '#F5A700', borderRadius: 2 }} />
            </div>

            {/* heading */}
            <h1
              className="mb-5 font-black leading-tight text-primary"
              style={{
                fontSize: 'clamp(24px, 3vw, 40px)',
                letterSpacing: '-1px', lineHeight: 1.15,
              }}
            >
              {content.title}
              <br />
              <span className="text-secondary" style={{ fontStyle: 'italic' }}>{content.highlight}</span>
            </h1>

            {/* subtext */}
            <p className="mb-8 max-w-[400px] text-sm leading-relaxed text-primary/60 lg:text-base">
              {content.description}
            </p>

            {/* CTAs */}
            <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
              <Button size="lg" asChild
                className="group rounded-full bg-primary px-8 font-bold text-white shadow-xl transition-all hover:-translate-y-1"
                style={{ boxShadow: '0 8px 28px rgba(4,79,99,0.32)' }}>
                <Link href={content.primaryCtaHref} className="flex items-center gap-2">
                  {content.primaryCtaLabel}
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </Button>

              <Link
                href={content.secondaryCtaHref}
                className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-primary/60 transition-colors hover:text-primary"
                style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none' }}
              >
                <span
                  style={{
                    width: 46, height: 46, borderRadius: '50%',
                    border: '2px solid rgba(4,79,99,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#F5A700';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(245,167,0,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(4,79,99,0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Play size={13} className="text-primary" fill="currentColor" />
                </span>
                {content.secondaryCtaLabel}
              </Link>
            </div>

            {/* divider + partner logos */}
            <div style={{ width: '100%', maxWidth: 420 }}>
              <div style={{ borderTop: '1.5px dashed rgba(4,79,99,0.15)', marginBottom: '18px' }} />
              <div className="flex flex-wrap items-center justify-center gap-6">
                {content.partners.map((b) => (
                  <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 17 }}>{b.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(4,79,99,0.38)' }}>{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — person + 2 cards ── */}
          <div className="side-person hidden w-[310px] shrink-0 flex-col gap-3 xl:flex">
            {/* circle */}
            <div style={{ position: 'relative', height: '330px' }}>
              <div style={{
                width: '250px', height: '250px', borderRadius: '50%',
                background: 'linear-gradient(145deg, hsl(41, 100%, 70%), hsl(41, 100%, 48%))',
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                overflow: 'hidden',
                boxShadow: '0 20px 55px rgba(245,167,0,0.28)',
              }}>
                <img
                  src={content.rightPersonImage}
                  alt={content.rightPersonAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 38%' }}
                />
              </div>
              <VideosBadge
                count={content.videoLessonsCount}
                label={content.videoLessonsLabel}
              />
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroSection;