"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Check, Sparkles, Star, MessageCircle, Mail } from 'lucide-react';

const Instagram = ({ size = 14 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FASTWORK_URL = "https://fastwork.co/user/whosbrandbkk/branding-66179568";

const BRANDS = [
  {
    name: "Shrimp Happens",
    category: "Seafood Restaurant",
    categoryTh: "ร้านอาหารทะเล",
    story: "A play on 'shit happens'. Turns a mishap into charm for a seafood spot that refuses to take itself too seriously.",
    img: "https://storage.googleapis.com/fastwork-static/0ad7bf68-f10e-4906-879b-46d811cdfc61.jpg",
    tag: "F&B",
  },
  {
    name: "SnuggleSquid",
    category: "Baby Apparel",
    categoryTh: "เสื้อผ้าเด็ก",
    story: "Alliterative comfort for baby sleepwear. Squid legs become soft hugs all night long.",
    img: "https://storage.googleapis.com/fastwork-static/0c90d131-59ea-4136-a0ad-02eca8014c0f.jpg",
    tag: "Lifestyle",
  },
  {
    name: "Munchy Mood",
    category: "Snack Brand",
    categoryTh: "ขนมขบเคี้ยว",
    story: "Cravings reframed as an emotional state. The name becomes the marketing angle.",
    img: "https://storage.googleapis.com/fastwork-static/42a69d96-9bdb-4409-84c8-aacce53a71c4.jpg",
    tag: "CPG",
  },
  {
    name: "ตำลานทอง",
    nameEn: "Tam Larn Thong",
    category: "Luxury Somtum",
    categoryTh: "ส้มตำพรีเมียม",
    story: "Literally 'pound a million gold'. Elevates a street food icon into a fine dining destination.",
    img: "https://storage.googleapis.com/fastwork-static/83e4a6dd-f756-4198-a842-c46af9ae4196.jpg",
    tag: "F&B",
  },
  {
    name: "Bye Blem",
    category: "Skincare",
    categoryTh: "ดูแลผิว",
    story: "Compresses 'goodbye blemishes' into a crisp command. Clear promise, clearer name.",
    img: "https://storage.googleapis.com/fastwork-static/66822bf4-3c57-4f9c-a6c1-288b918596bc.jpg",
    tag: "Beauty",
  },
  {
    name: "ละไมเล",
    nameEn: "Lamai Le",
    category: "Beach Resort",
    categoryTh: "รีสอร์ทริมทะเล",
    story: "Soft Thai syllables that feel like a sea breeze. Pure atmosphere in a single word.",
    img: "https://storage.googleapis.com/fastwork-static/768984e4-7c76-479e-ad4c-00a22c8ea614.jpg",
    tag: "Hospitality",
  },
  {
    name: "Ao no Ma",
    nameJa: "青の間",
    category: "Matcha Tea",
    categoryTh: "ชาเขียวมัทฉะ",
    story: "Japanese for 'the green room'. Minimal, deliberate, tasteful. Fits the ritual of matcha.",
    img: "https://storage.googleapis.com/fastwork-static/e7f20d2b-439d-41bd-9540-7c628738dbbc.jpg",
    tag: "F&B",
  },
];

const STATS = [
  { value: "58", label: "Brands Named", labelTh: "แบรนด์ที่ตั้งชื่อ" },
  { value: "4.8", label: "Average Rating", labelTh: "คะแนนรีวิว", suffix: "★" },
  { value: "100%", label: "Completion Rate", labelTh: "งานสำเร็จ" },
  { value: "10", label: "Repeat Clients", labelTh: "ลูกค้ากลับมาจ้างซ้ำ" },
  { value: "38", label: "Min Response", labelTh: "นาที ตอบกลับเฉลี่ย" },
];

// --- Hooks ---
const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId = null;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  return scrollY;
};

const useInView = (options = { threshold: 0.15, rootMargin: '-50px' }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

// --- Components ---

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s, transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const QuestionBadge = ({ size = 80, className = '', style = {} }) => (
  <div
    className={`inline-flex items-center justify-center rounded-full ${className}`}
    style={{
      width: size,
      height: size,
      backgroundColor: 'var(--red)',
      color: 'var(--pink-bg)',
      fontFamily: '"Archivo Black", sans-serif',
      fontSize: size * 0.5,
      lineHeight: 1,
      ...style,
    }}
  >
    ?
  </div>
);

const Header = ({ scrollY }) => {
  const scrolled = scrollY > 50;
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        backgroundColor: scrolled ? 'rgba(255, 209, 214, 0.75)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(232, 53, 63, 0.15)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span style={{ fontFamily: '"Archivo Black"', color: 'var(--red)', fontSize: 20, letterSpacing: '-0.04em' }}>
            whosbrand
          </span>
          <QuestionBadge size={22} />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#work" style={{ color: 'var(--ink)' }} className="text-sm font-medium hover:opacity-60 transition-opacity">Work</a>
          <a href="#process" style={{ color: 'var(--ink)' }} className="text-sm font-medium hover:opacity-60 transition-opacity">Process</a>
          <a href="#pricing" style={{ color: 'var(--ink)' }} className="text-sm font-medium hover:opacity-60 transition-opacity">Pricing</a>
          <a
            href={FASTWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--red)', color: 'var(--pink-bg)' }}
          >
            Hire on Fastwork <ArrowUpRight size={14} />
          </a>
        </nav>
        <a
          href={FASTWORK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="md:hidden inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ backgroundColor: 'var(--red)', color: 'var(--pink-bg)' }}
        >
          Hire <ArrowUpRight size={12} />
        </a>
      </div>
    </header>
  );
};

const Hero = ({ scrollY }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 500);
  const heroScale = Math.max(0.92, 1 - scrollY / 3000);
  const heroY = scrollY * 0.3;

  return (
    <section id="top" className="relative overflow-hidden" style={{ minHeight: '100vh', paddingTop: 80 }}>
      {/* Floating parallax shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Big ? - top right */}
        <div
          className="absolute float-anim"
          style={{
            top: '12%',
            right: '8%',
            transform: `translate(${mouse.x * 20}px, ${mouse.y * 20 + scrollY * -0.15}px) rotate(12deg)`,
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 140,
              height: 140,
              backgroundColor: 'var(--red)',
              color: 'var(--pink-bg)',
              fontFamily: '"Archivo Black"',
              fontSize: 90,
              lineHeight: 1,
              boxShadow: '0 20px 60px rgba(232, 53, 63, 0.25)',
            }}
          >
            ?
          </div>
        </div>

        {/* Small ? - bottom left */}
        <div
          className="absolute"
          style={{
            bottom: '18%',
            left: '6%',
            transform: `translate(${mouse.x * -30}px, ${mouse.y * -20 + scrollY * -0.25}px) rotate(-18deg)`,
            transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <QuestionBadge size={72} />
        </div>

        {/* Tiny ? - middle right */}
        <div
          className="absolute"
          style={{
            top: '55%',
            right: '14%',
            transform: `translate(${mouse.x * 40}px, ${scrollY * -0.2}px) rotate(35deg)`,
          }}
        >
          <QuestionBadge size={36} style={{ opacity: 0.5 }} />
        </div>

        {/* Decorative lines */}
        <svg
          className="absolute"
          style={{
            top: '40%',
            left: '10%',
            transform: `translateY(${scrollY * -0.1}px)`,
          }}
          width="180"
          height="60"
          viewBox="0 0 180 60"
        >
          <path d="M 2 30 Q 45 2, 90 30 T 178 30" stroke="var(--red)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* Main hero content */}
      <div
        className="relative max-w-7xl mx-auto px-6 md:px-10 pt-16 md:pt-24"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroY}px) scale(${heroScale})`,
          transition: 'none',
        }}
      >
        <div className="flex flex-col gap-4">
          {/* Small top label */}
          <Reveal>
            <div className="flex items-center gap-3 mb-2">
              <div style={{ width: 40, height: 2, backgroundColor: 'var(--red)' }} />
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase" style={{ color: 'var(--red-dark)' }}>
                Brand Naming Studio · Bangkok
              </span>
            </div>
          </Reveal>

          {/* Stacked huge title */}
          <Reveal delay={0.1}>
            <h1
              className="display"
              style={{
                color: 'var(--red)',
                fontSize: 'clamp(80px, 16vw, 240px)',
                lineHeight: 0.85,
              }}
            >
              Who's
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-4 md:gap-8 flex-wrap">
              <h1
                className="display"
                style={{
                  color: 'var(--red)',
                  fontSize: 'clamp(80px, 16vw, 240px)',
                  lineHeight: 0.85,
                }}
              >
                Brand
              </h1>
              <div style={{ transform: 'translateY(-8%)' }}>
                <div
                  className="rounded-full inline-flex items-center justify-center"
                  style={{
                    width: 'clamp(60px, 11vw, 160px)',
                    height: 'clamp(60px, 11vw, 160px)',
                    backgroundColor: 'var(--red)',
                    color: 'var(--pink-bg)',
                    fontFamily: '"Archivo Black"',
                    fontSize: 'clamp(40px, 7vw, 110px)',
                    lineHeight: 1,
                    boxShadow: '0 16px 48px rgba(232, 53, 63, 0.3)',
                  }}
                >
                  ?
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={0.3}>
            <div className="mt-6 md:mt-8 flex items-center gap-4">
              <div style={{ width: 60, height: 3, backgroundColor: 'var(--red)' }} />
              <h2
                className="display"
                style={{
                  color: 'var(--red-dark)',
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                MAKE THEM ASK.
              </h2>
            </div>
          </Reveal>

          {/* Description */}
          <Reveal delay={0.4}>
            <div className="mt-8 md:mt-10 max-w-2xl">
              <p className="text-lg md:text-2xl leading-snug" style={{ color: 'var(--ink)' }}>
                We craft brand names that make people stop, pause, and ask{' '}
                <span className="serif" style={{ color: 'var(--red)', fontSize: '1.1em' }}>who made this?</span>
              </p>
              <p className="thai mt-3 text-base md:text-lg" style={{ color: 'var(--red-dark)', opacity: 0.85 }}>
                เราคิดชื่อแบรนด์ที่ทำให้คนต้องหยุดดู จดจำ และอยากรู้จักคุณ
              </p>
            </div>
          </Reveal>

          {/* CTA buttons */}
          <Reveal delay={0.55}>
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href={FASTWORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 rounded-full font-bold transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  backgroundColor: 'var(--red)',
                  color: 'var(--pink-bg)',
                  fontSize: 18,
                  boxShadow: '0 12px 32px rgba(232, 53, 63, 0.35)',
                }}
              >
                Start your brand
                <span className="thai font-medium" style={{ opacity: 0.85, fontSize: 15 }}>เริ่มสร้างแบรนด์</span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full font-semibold transition-all hover:scale-[1.02]"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--red-dark)',
                  fontSize: 17,
                  border: '2px solid var(--red)',
                }}
              >
                See our work
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: heroOpacity }}
      >
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--red-dark)' }}>
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, var(--red), transparent)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
};

const StatsBar = () => {
  return (
    <section
      className="relative py-6 overflow-hidden border-y"
      style={{
        backgroundColor: 'var(--red)',
        borderColor: 'var(--red-dark)',
      }}
    >
      <div className="flex marquee whitespace-nowrap">
        {[...Array(2)].map((_, dupeIdx) => (
          <div key={dupeIdx} className="flex items-center gap-12 px-6">
            {STATS.map((stat, i) => (
              <div key={`${dupeIdx}-${i}`} className="flex items-center gap-4">
                <span
                  className="display"
                  style={{ color: 'var(--pink-bg)', fontSize: 36, lineHeight: 1 }}
                >
                  {stat.value}{stat.suffix || ''}
                </span>
                <span className="text-sm uppercase tracking-wider font-semibold" style={{ color: 'var(--pink-bg)', opacity: 0.9 }}>
                  {stat.label}
                </span>
                <span style={{ color: 'var(--pink-bg)', opacity: 0.4 }}>◆</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Brand Names",
      titleTh: "คิดชื่อแบรนด์",
      desc: "Five candidates per project. Each checked for meaning, sound, and ownability.",
      icon: <Sparkles size={28} />,
    },
    {
      title: "Concept Sheets",
      titleTh: "คอนเซ็ปต์แบรนด์",
      desc: "The story behind the name. What it means, how it sounds, why it sticks.",
      icon: <MessageCircle size={28} />,
    },
    {
      title: "Availability Checks",
      titleTh: "เช็กโดเมน + โซเชียล",
      desc: "Domain, handle, and trademark conflict checks before you commit.",
      icon: <Check size={28} />,
    },
    {
      title: "Slogans & Voice",
      titleTh: "สโลแกน + น้ำเสียงแบรนด์",
      desc: "Available in the premium package. Two taglines that carry the brand forward.",
      icon: <Star size={28} />,
    },
  ];

  return (
    <section className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <QuestionBadge size={28} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--red-dark)' }}>
                  What we do
                </span>
              </div>
              <h2
                className="display"
                style={{
                  color: 'var(--red)',
                  fontSize: 'clamp(44px, 7vw, 96px)',
                }}
              >
                Names that <span className="serif" style={{ fontWeight: 400 }}>stick.</span>
              </h2>
              <p className="thai mt-3 text-lg" style={{ color: 'var(--red-dark)' }}>
                ชื่อที่คนจำ ไม่ใช่แค่ชื่อที่ฟังดี
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className="group relative p-8 md:p-10 rounded-3xl transition-all hover:-translate-y-1 h-full"
                style={{
                  backgroundColor: 'var(--cream)',
                  border: '1.5px solid rgba(232, 53, 63, 0.12)',
                }}
              >
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                  style={{ backgroundColor: 'var(--red)', color: 'var(--pink-bg)' }}
                >
                  {s.icon}
                </div>
                <h3 className="display text-2xl md:text-3xl mb-1" style={{ color: 'var(--red)', letterSpacing: '-0.02em' }}>
                  {s.title}
                </h3>
                <p className="thai text-sm mb-4" style={{ color: 'var(--red-dark)', opacity: 0.8 }}>
                  {s.titleTh}
                </p>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--ink)' }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ scrollY }) => {
  const sectionRef = useRef(null);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    const updateTop = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };
    updateTop();
    window.addEventListener('resize', updateTop);
    return () => window.removeEventListener('resize', updateTop);
  }, []);

  // Relative scroll inside section
  const relY = Math.max(0, scrollY - sectionTop + 400);

  return (
    <section id="work" ref={sectionRef} className="relative py-24 md:py-36 px-6 md:px-10" style={{ backgroundColor: 'var(--pink-lt)' }}>
      {/* Decorative floating shapes */}
      <div
        className="absolute top-40 right-10 pointer-events-none opacity-60"
        style={{ transform: `translateY(${relY * -0.15}px) rotate(${relY * 0.05}deg)` }}
      >
        <QuestionBadge size={60} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 40, height: 2, backgroundColor: 'var(--red)' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--red-dark)' }}>
                  Selected Work · ผลงาน
                </span>
              </div>
              <h2
                className="display"
                style={{
                  color: 'var(--red)',
                  fontSize: 'clamp(44px, 7vw, 96px)',
                }}
              >
                Names we've made
              </h2>
            </div>
            <p className="max-w-sm text-base md:text-lg" style={{ color: 'var(--ink)', opacity: 0.8 }}>
              Every brand below started as a conversation. Here's what came out the other side.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {BRANDS.map((brand, i) => {
            const offset = i % 2 === 0 ? relY * -0.03 : relY * -0.06;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <a
                  href={FASTWORK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  style={{
                    transform: `translateY(${offset}px)`,
                    transition: 'transform 0.1s linear',
                  }}
                >
                  <div
                    className="relative overflow-hidden rounded-3xl"
                    style={{
                      aspectRatio: '16 / 10',
                      backgroundColor: 'var(--pink-deep)',
                      boxShadow: '0 18px 48px rgba(184, 21, 31, 0.12)',
                    }}
                  >
                    <img
                      src={brand.img}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8"
                      style={{
                        background: 'linear-gradient(to top, rgba(26, 10, 12, 0.85) 0%, transparent 60%)',
                      }}
                    >
                      <p className="text-white text-base md:text-lg leading-snug max-w-md">
                        {brand.story}
                      </p>
                    </div>
                    <div
                      className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                      style={{ backgroundColor: 'var(--pink-bg)', color: 'var(--red-dark)' }}
                    >
                      {brand.tag}
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <h3
                        className="display"
                        style={{
                          color: 'var(--red)',
                          fontSize: 'clamp(26px, 3vw, 38px)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1,
                        }}
                      >
                        {brand.name}
                      </h3>
                      <p className="mt-2 text-sm md:text-base" style={{ color: 'var(--ink)', opacity: 0.7 }}>
                        {brand.category} · <span className="thai">{brand.categoryTh}</span>
                      </p>
                    </div>
                    <ArrowUpRight
                      size={28}
                      style={{ color: 'var(--red)' }}
                      className="transition-transform group-hover:rotate-45 shrink-0 mt-1"
                    />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    {
      n: "01",
      title: "Tell us about your brand",
      titleTh: "เล่าเรื่องแบรนด์ให้เราฟัง",
      desc: "Product, audience, tone, the feeling you want to leave behind. We ask the right questions so nothing gets lost.",
    },
    {
      n: "02",
      title: "Receive five crafted names",
      titleTh: "รับ 5 ชื่อแบรนด์ในมือ",
      desc: "Each with concept, meaning, tone notes, and availability checks for domain and socials. 2 to 4 business days.",
    },
  ];

  return (
    <section id="process" className="relative py-24 md:py-36 px-6 md:px-10" style={{ backgroundColor: 'var(--red)' }}>
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 40, height: 2, backgroundColor: 'var(--pink-bg)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--pink-bg)', opacity: 0.8 }}>
                How it works · ขั้นตอนการทำงาน
              </span>
            </div>
            <h2
              className="display"
              style={{
                color: 'var(--pink-bg)',
                fontSize: 'clamp(44px, 7vw, 96px)',
              }}
            >
              Two steps. <span className="serif" style={{ fontWeight: 400 }}>Done.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div
                className="p-10 md:p-12 rounded-3xl h-full"
                style={{
                  backgroundColor: 'var(--pink-bg)',
                  border: '2px solid var(--red-dark)',
                }}
              >
                <div
                  className="display mb-6"
                  style={{ color: 'var(--red)', fontSize: 80, letterSpacing: '-0.04em', lineHeight: 0.9 }}
                >
                  {step.n}
                </div>
                <h3
                  className="display mb-2"
                  style={{ color: 'var(--red-dark)', fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}
                >
                  {step.title}
                </h3>
                <p className="thai text-base mb-6" style={{ color: 'var(--red-dark)', opacity: 0.85 }}>
                  {step.titleTh}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--ink)' }}>
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const packages = [
    {
      name: "Name Me Now",
      price: "2,999",
      days: "4 days",
      daysTh: "4 วัน",
      features: [
        "5 brand name candidates",
        "Concept sheet + meaning",
        "Tone & emotion analysis",
        "Domain + social handle check",
        "One revision round",
        "1:1 call to walk through names",
      ],
      featuresTh: "5 ชื่อแบรนด์ · คอนเซ็ปต์ · เช็กโดเมน · แก้ไข 1 รอบ",
      cta: "Start here",
      recommended: false,
    },
    {
      name: "Brand Me Better",
      price: "3,999",
      days: "4 days",
      daysTh: "4 วัน",
      features: [
        "Everything in Name Me Now",
        "2 crafted slogans",
        "Extended brand voice notes",
        "Usage guidelines per name",
        "One revision round",
        "1:1 call to walk through names",
      ],
      featuresTh: "ทุกอย่างใน Name Me Now · + 2 สโลแกน · + แนวทางแบรนด์",
      cta: "Go bigger",
      recommended: true,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center gap-3 justify-center mb-4">
              <QuestionBadge size={28} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--red-dark)' }}>
                Packages · แพ็กเกจ
              </span>
            </div>
            <h2
              className="display"
              style={{
                color: 'var(--red)',
                fontSize: 'clamp(44px, 7vw, 96px)',
              }}
            >
              Pick your pace.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className="relative p-10 md:p-12 rounded-3xl h-full flex flex-col"
                style={{
                  backgroundColor: pkg.recommended ? 'var(--red)' : 'var(--cream)',
                  color: pkg.recommended ? 'var(--pink-bg)' : 'var(--ink)',
                  border: pkg.recommended ? '2px solid var(--red-dark)' : '1.5px solid rgba(232, 53, 63, 0.12)',
                  boxShadow: pkg.recommended ? '0 24px 60px rgba(232, 53, 63, 0.25)' : 'none',
                }}
              >
                {pkg.recommended && (
                  <div
                    className="absolute -top-3 left-10 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: 'var(--pink-bg)', color: 'var(--red-dark)' }}
                  >
                    ★ Most Popular
                  </div>
                )}
                <h3
                  className="display mb-4"
                  style={{
                    color: pkg.recommended ? 'var(--pink-bg)' : 'var(--red)',
                    fontSize: 'clamp(32px, 4vw, 48px)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className="display"
                    style={{
                      color: pkg.recommended ? 'var(--pink-bg)' : 'var(--red)',
                      fontSize: 72,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    ฿{pkg.price}
                  </span>
                </div>
                <p className="text-sm mb-8 opacity-80">
                  {pkg.days} turnaround · <span className="thai">ส่งงานใน {pkg.daysTh}</span>
                </p>

                <ul className="space-y-3 mb-10 flex-1">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check
                        size={20}
                        className="shrink-0 mt-0.5"
                        style={{ color: pkg.recommended ? 'var(--pink-bg)' : 'var(--red)' }}
                      />
                      <span className="text-base">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={FASTWORK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: pkg.recommended ? 'var(--pink-bg)' : 'var(--red)',
                    color: pkg.recommended ? 'var(--red-dark)' : 'var(--pink-bg)',
                    fontSize: 17,
                  }}
                >
                  {pkg.cta}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: 'var(--pink-bg)' }}>
      {/* Floating ? shapes */}
      <div className="absolute top-20 left-10 opacity-40" style={{ animation: 'slowfloat 6s ease-in-out infinite' }}>
        <QuestionBadge size={80} />
      </div>
      <div className="absolute bottom-20 right-16 opacity-50" style={{ animation: 'slowfloat 5s ease-in-out infinite', animationDelay: '1s' }}>
        <QuestionBadge size={120} />
      </div>
      <div className="absolute top-40 right-32 opacity-30" style={{ animation: 'slowfloat 7s ease-in-out infinite', animationDelay: '2s' }}>
        <QuestionBadge size={50} />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <h2
            className="display mb-6"
            style={{
              color: 'var(--red)',
              fontSize: 'clamp(56px, 10vw, 160px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
            }}
          >
            Ready to make <br />them <span className="serif" style={{ fontWeight: 400 }}>ask?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="thai text-xl md:text-2xl mb-4" style={{ color: 'var(--red-dark)' }}>
            พร้อมทำให้คนต้องถามชื่อแบรนด์คุณรึยัง?
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'var(--ink)', opacity: 0.8 }}>
            Hire us through Fastwork with escrow protection.
            Chat first, pay only when you're ready.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href={FASTWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-4 px-12 py-7 rounded-full font-bold transition-all hover:scale-[1.04] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--red)',
              color: 'var(--pink-bg)',
              fontSize: 22,
              boxShadow: '0 20px 60px rgba(232, 53, 63, 0.35)',
            }}
          >
            <span>Start your brand on Fastwork</span>
            <ArrowUpRight size={26} className="transition-transform group-hover:rotate-45" />
          </a>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-6 text-sm" style={{ color: 'var(--red-dark)', opacity: 0.7 }}>
            No charge until you agree on scope · <span className="thai">ไม่เสียค่าใช้จ่ายจนกว่าจะตกลงจ้างงาน</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative py-16 px-6 md:px-10" style={{ backgroundColor: 'var(--ink)', color: 'var(--pink-bg)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontFamily: '"Archivo Black"', color: 'var(--pink-bg)', fontSize: 24, letterSpacing: '-0.04em' }}>
                whosbrand
              </span>
              <QuestionBadge size={26} />
            </div>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs">
              Brand naming studio based in Bangkok.
              <br />
              <span className="thai">สตูดิโอคิดชื่อแบรนด์ในกรุงเทพฯ</span>
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-60">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} /> hello@whosbrand.com
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={14} /> LINE: @whosbrand
              </li>
              <li className="flex items-center gap-2">
                <Instagram size={14} /> @whosbrandbkk
              </li>
            </ul>
            <p className="text-xs opacity-50 mt-3">Placeholder contact info · replace before launch</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-4 opacity-60">Hire us</h4>
            <a
              href={FASTWORK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
            >
              Fastwork Profile <ArrowUpRight size={14} />
            </a>
            <p className="text-xs opacity-60 mt-2">Response within 38 minutes</p>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ borderColor: 'rgba(255, 209, 214, 0.15)' }}>
          <p className="text-xs opacity-50">© {new Date().getFullYear()} Whosbrand. All rights reserved.</p>
          <p className="text-xs opacity-50 thai">สร้างด้วยความตั้งใจจากกรุงเทพฯ</p>
        </div>
      </div>
    </footer>
  );
};

// Root component with font loading
export default function Page() {
  const scrollY = useScrollY();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Archivo+Black&family=Instrument+Serif:ital@0;1&family=Prompt:wght@300;400;500;600;700&display=swap');

        :root {
          --pink-bg: #ffd1d6;
          --pink-lt: #ffe5e8;
          --pink-deep: #f8a7ae;
          --red: #e8353f;
          --red-dark: #b8151f;
          --ink: #1a0a0c;
          --cream: #fff5f0;
        }

        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        html { scroll-behavior: smooth; }
        body { background-color: var(--pink-bg); margin: 0; }

        .thai { font-family: "Prompt", "Archivo", sans-serif; font-weight: 500; }
        .display { font-family: "Archivo Black", sans-serif; font-weight: 900; letter-spacing: -0.03em; line-height: 0.95; }
        .serif { font-family: "Instrument Serif", serif; font-style: italic; font-weight: 400; }

        @keyframes slowfloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(4deg); }
        }
        .float-anim { animation: slowfloat 5s ease-in-out infinite; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.4; transform: scaleY(0.6); }
        }

        .marquee { animation: scrollX 38s linear infinite; }
        @keyframes scrollX {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        ::selection { background: var(--red); color: var(--pink-bg); }
      `}</style>

      <div style={{ backgroundColor: 'var(--pink-bg)', color: 'var(--ink)', fontFamily: '"Archivo", system-ui, sans-serif', overflow: 'hidden' }}>
        <Header scrollY={scrollY} />
        <Hero scrollY={scrollY} />
        <StatsBar />
        <Services />
        <Portfolio scrollY={scrollY} />
        <Process />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
