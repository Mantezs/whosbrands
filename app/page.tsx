"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, Check, Sparkles, Star, MessageCircle, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

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
    category: "Beach Resort",
    categoryTh: "รีสอร์ทริมทะเล",
    story: "Soft Thai syllables that feel like a sea breeze. Pure atmosphere in a single word.",
    img: "https://storage.googleapis.com/fastwork-static/768984e4-7c76-479e-ad4c-00a22c8ea614.jpg",
    tag: "Hospitality",
  },
  {
    name: "Ao no Ma",
    category: "Matcha Tea",
    categoryTh: "ชาเขียวมัทฉะ",
    story: "Japanese for 'the green room'. Minimal, deliberate, tasteful. Fits the ritual of matcha.",
    img: "https://storage.googleapis.com/fastwork-static/e7f20d2b-439d-41bd-9540-7c628738dbbc.jpg",
    tag: "F&B",
  },
];

const STATS = [
  { value: "58", label: "Brands Named", suffix: "" },
  { value: "4.8", label: "Average Rating", suffix: "★" },
  { value: "100%", label: "Completion Rate", suffix: "" },
  { value: "10", label: "Repeat Clients", suffix: "" },
  { value: "38", label: "Min Response", suffix: "" },
];

const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId) return;
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

const useInView = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.15, rootMargin: '-50px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
};

const Reveal = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
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

const QuestionBadge = ({ size = 80, className = '', style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) => (
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

const Header = ({ scrollY }: { scrollY: number }) => {
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
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
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

const Hero = ({ scrollY }: { scrollY: number }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const heroOpacity = Math.max(0, 1 - scrollY / 700);
  const whoY = scrollY * -0.08;
  const brandY = scrollY * -0.13;
  const questionY = scrollY * -0.22;
  const taglineX = scrollY * 0.15;

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{
        minHeight: '100vh',
        paddingTop: 80,
        paddingBottom: 140,
        background:
          'radial-gradient(ellipse at 75% 15%, rgba(232, 53, 63, 0.22) 0%, transparent 55%), radial-gradient(ellipse at 20% 90%, rgba(248, 167, 174, 0.5) 0%, transparent 50%), linear-gradient(180deg, #ffe5e8 0%, #ffd1d6 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute"
          style={{
            top: '10%',
            right: '5%',
            transform: `translate(${mouse.x * 20}px, ${mouse.y * 20 + scrollY * -0.2}px)`,
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        >
          <div style={{ animation: 'qFloat1 5s ease-in-out infinite' }}>
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 'clamp(70px, 11vw, 140px)',
                height: 'clamp(70px, 11vw, 140px)',
                backgroundColor: 'var(--red)',
                color: 'var(--pink-bg)',
                fontFamily: '"Archivo Black"',
                fontSize: 'clamp(44px, 7vw, 88px)',
                lineHeight: 1,
                boxShadow: '0 24px 70px rgba(232, 53, 63, 0.3)',
              }}
            >
              ?
            </div>
          </div>
        </div>

        <div
          className="absolute"
          style={{
            top: '18%',
            left: '5%',
            transform: `translate(${mouse.x * -12}px, ${scrollY * -0.35}px)`,
            opacity: 0.75,
          }}
        >
          <div style={{ animation: 'qFloat2 6.5s ease-in-out infinite 0.5s' }}>
            <QuestionBadge size={50} />
          </div>
        </div>

        <div
          className="absolute hidden md:block"
          style={{
            top: '58%',
            right: '4%',
            transform: `translate(${mouse.x * 26}px, ${scrollY * -0.3}px)`,
            opacity: 0.6,
          }}
        >
          <div style={{ animation: 'qFloat3 4.5s ease-in-out infinite 1s' }}>
            <QuestionBadge size={46} />
          </div>
        </div>

        <div
          className="absolute hidden md:block"
          style={{
            bottom: '14%',
            right: '14%',
            transform: `translate(${mouse.x * -16}px, ${scrollY * -0.5}px)`,
            opacity: 0.5,
          }}
        >
          <div style={{ animation: 'qFloat4 5.8s ease-in-out infinite 0.3s' }}>
            <QuestionBadge size={68} />
          </div>
        </div>

        <div
          className="absolute hidden lg:block"
          style={{
            top: '42%',
            right: '24%',
            transform: `translate(${mouse.x * 14}px, ${scrollY * -0.6}px)`,
            opacity: 0.4,
          }}
        >
          <div style={{ animation: 'qFloat5 4.2s ease-in-out infinite 0.7s' }}>
            <QuestionBadge size={30} />
          </div>
        </div>

        <div
          className="absolute hidden md:block"
          style={{
            top: '70%',
            left: '10%',
            transform: `translate(${mouse.x * -18}px, ${scrollY * -0.42}px)`,
            opacity: 0.35,
          }}
        >
          <div style={{ animation: 'qFloat2 6s ease-in-out infinite 1.5s' }}>
            <QuestionBadge size={38} />
          </div>
        </div>
      </div>

      <div
        className="relative max-w-5xl mx-auto px-6 md:px-10 pt-10 md:pt-14"
        style={{ opacity: heroOpacity, zIndex: 2 }}
      >
        <div className="flex flex-col gap-4">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 36, height: 2, backgroundColor: 'var(--red)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--red-dark)' }}>
                Brand Naming Studio · Bangkok
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="display"
              style={{
                color: 'var(--red)',
                fontSize: 'clamp(80px, 13vw, 200px)',
                lineHeight: 0.86,
                transform: `translateY(${whoY}px)`,
                willChange: 'transform',
              }}
            >
              Who&apos;s
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              <h1
                className="display"
                style={{
                  color: 'var(--red)',
                  fontSize: 'clamp(80px, 13vw, 200px)',
                  lineHeight: 0.86,
                  transform: `translateY(${brandY}px)`,
                  willChange: 'transform',
                }}
              >
                Brand
              </h1>
              <div
                style={{
                  transform: `translateY(calc(-6% + ${questionY}px)) rotate(${scrollY * 0.05}deg)`,
                  willChange: 'transform',
                }}
              >
                <div
                  className="rounded-full inline-flex items-center justify-center"
                  style={{
                    width: 'clamp(64px, 9vw, 130px)',
                    height: 'clamp(64px, 9vw, 130px)',
                    backgroundColor: 'var(--red)',
                    color: 'var(--pink-bg)',
                    fontFamily: '"Archivo Black"',
                    fontSize: 'clamp(42px, 6vw, 88px)',
                    lineHeight: 1,
                    boxShadow: '0 18px 56px rgba(232, 53, 63, 0.35)',
                  }}
                >
                  ?
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div
              className="mt-6 md:mt-8 flex items-center gap-4"
              style={{
                transform: `translateX(${taglineX}px)`,
                willChange: 'transform',
              }}
            >
              <div style={{ width: 48, height: 3, backgroundColor: 'var(--red)' }} />
              <h2
                className="display"
                style={{
                  color: 'var(--red-dark)',
                  fontSize: 'clamp(26px, 3.2vw, 44px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                MAKE THEM ASK.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-8 md:mt-10 max-w-xl">
              <p className="text-base md:text-xl leading-snug" style={{ color: 'var(--ink)' }}>
                We craft brand names that make people stop, pause, and ask{' '}
                <span className="serif" style={{ color: 'var(--red)', fontSize: '1.1em' }}>who made this?</span>
              </p>
              <p className="thai mt-3 text-sm md:text-base" style={{ color: 'var(--red-dark)', opacity: 0.85 }}>
                เราคิดชื่อแบรนด์ที่ทำให้คนต้องหยุดดู จดจำ และอยากรู้จักคุณ
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.55}>
            <div className="relative mt-8 md:mt-10 flex flex-col sm:flex-row gap-4" style={{ zIndex: 20 }}>
              <a
                href={FASTWORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full font-bold transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  backgroundColor: 'var(--red)',
                  color: 'var(--pink-bg)',
                  fontSize: 17,
                  boxShadow: '0 12px 32px rgba(232, 53, 63, 0.35)',
                }}
              >
                Start your brand
                <span className="thai font-medium" style={{ opacity: 0.85, fontSize: 14 }}>เริ่มสร้างแบรนด์</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold transition-all hover:scale-[1.02] backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255, 229, 232, 0.6)',
                  color: 'var(--red-dark)',
                  fontSize: 16,
                  border: '2px solid var(--red)',
                }}
              >
                See our work
              </a>
            </div>
          </Reveal>
        </div>
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
                  style={{ color: 'var(--pink-bg)', fontSize: 32, lineHeight: 1 }}
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: "Brand Names",
      titleTh: "คิดชื่อแบรนด์",
      desc: "Five candidates per project. Each checked for meaning, sound, and ownability.",
      icon: <Sparkles size={24} />,
    },
    {
      title: "Concept Sheets",
      titleTh: "คอนเซ็ปต์แบรนด์",
      desc: "The story behind the name. What it means, how it sounds, why it sticks.",
      icon: <MessageCircle size={24} />,
    },
    {
      title: "Availability Checks",
      titleTh: "เช็กโดเมน + โซเชียล",
      desc: "Domain, handle, and trademark conflict checks before you commit.",
      icon: <Check size={24} />,
    },
    {
      title: "Slogans & Voice",
      titleTh: "สโลแกน + น้ำเสียงแบรนด์",
      desc: "Available in the premium package. Two taglines that carry the brand forward.",
      icon: <Star size={24} />,
    },
  ];

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <QuestionBadge size={24} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--red-dark)' }}>
                  What we do
                </span>
              </div>
              <h2
                className="display"
                style={{
                  color: 'var(--red)',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                }}
              >
                Names that <span className="serif" style={{ fontWeight: 400 }}>stick.</span>
              </h2>
              <p className="thai mt-3 text-base" style={{ color: 'var(--red-dark)' }}>
                ชื่อที่คนจำ ไม่ใช่แค่ชื่อที่ฟังดูดี
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll left"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ border: '2px solid var(--red)', color: 'var(--red)' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll right"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                style={{ backgroundColor: 'var(--red)', color: 'var(--pink-bg)' }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        <div className="flex gap-5" style={{ width: 'max-content', paddingLeft: 'max(24px, calc((100vw - 1024px) / 2 + 40px))', paddingRight: 'max(24px, calc((100vw - 1024px) / 2 + 40px))' }}>
          {services.map((s, i) => (
            <div
              key={i}
              className="flex-shrink-0 p-8 rounded-3xl"
              style={{
                width: 'min(85vw, 300px)',
                backgroundColor: 'var(--cream)',
                border: '1.5px solid rgba(232, 53, 63, 0.12)',
                scrollSnapAlign: 'start',
              }}
            >
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5"
                style={{ backgroundColor: 'var(--red)', color: 'var(--pink-bg)' }}
              >
                {s.icon}
              </div>
              <h3 className="display text-xl md:text-2xl mb-1" style={{ color: 'var(--red)', letterSpacing: '-0.02em' }}>
                {s.title}
              </h3>
              <p className="thai text-sm mb-3" style={{ color: 'var(--red-dark)', opacity: 0.8 }}>
                {s.titleTh}
              </p>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="work" className="relative py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--pink-lt)' }}>
      <div className="max-w-5xl mx-auto relative">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 36, height: 2, backgroundColor: 'var(--red)' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--red-dark)' }}>
                  Selected Work · ผลงาน
                </span>
              </div>
              <h2
                className="display"
                style={{
                  color: 'var(--red)',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                }}
              >
                Names we&apos;ve made
              </h2>
            </div>
            <p className="max-w-xs text-sm md:text-base" style={{ color: 'var(--ink)', opacity: 0.8 }}>
              Every brand below started as a conversation. Here&apos;s what came out the other side.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {BRANDS.map((brand, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <a
                href={FASTWORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
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
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 md:p-7"
                    style={{
                      background: 'linear-gradient(to top, rgba(26, 10, 12, 0.85) 0%, transparent 60%)',
                    }}
                  >
                    <p className="text-white text-sm md:text-base leading-snug max-w-md">
                      {brand.story}
                    </p>
                  </div>
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: 'var(--pink-bg)', color: 'var(--red-dark)' }}
                  >
                    {brand.tag}
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className="display"
                      style={{
                        color: 'var(--red)',
                        fontSize: 'clamp(22px, 2.5vw, 30px)',
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                      }}
                    >
                      {brand.name}
                    </h3>
                    <p className="mt-2 text-sm" style={{ color: 'var(--ink)', opacity: 0.7 }}>
                      {brand.category} · <span className="thai">{brand.categoryTh}</span>
                    </p>
                  </div>
                  <ArrowUpRight
                    size={24}
                    style={{ color: 'var(--red)' }}
                    className="transition-transform group-hover:rotate-45 shrink-0 mt-1"
                  />
                </div>
              </a>
            </Reveal>
          ))}
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
      titleTh: "เล่าเรื่องแบรนด์ของคุณให้เราฟัง",
      desc: "Product, audience, tone, the feeling you want to leave behind. We ask the right questions so nothing gets lost.",
    },
    {
      n: "02",
      title: "Receive five crafted names",
      titleTh: "รับ 5 ชื่อแบรนด์ที่ใช่",
      desc: "Each with concept, meaning, tone notes, and availability checks for domain and socials. 2 to 4 business days.",
    },
  ];

  return (
    <section id="process" className="relative py-20 md:py-28 px-6 md:px-10" style={{ backgroundColor: 'var(--red)' }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 36, height: 2, backgroundColor: 'var(--pink-bg)' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--pink-bg)', opacity: 0.8 }}>
                How it works · ขั้นตอนการทำงาน
              </span>
            </div>
            <h2
              className="display"
              style={{
                color: 'var(--pink-bg)',
                fontSize: 'clamp(36px, 5vw, 64px)',
              }}
            >
              Two steps. <span className="serif" style={{ fontWeight: 400 }}>Done.</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div
                className="p-8 md:p-10 rounded-3xl h-full"
                style={{
                  backgroundColor: 'var(--pink-bg)',
                  border: '2px solid var(--red-dark)',
                }}
              >
                <div
                  className="display mb-5"
                  style={{ color: 'var(--red)', fontSize: 64, letterSpacing: '-0.04em', lineHeight: 0.9 }}
                >
                  {step.n}
                </div>
                <h3
                  className="display mb-2"
                  style={{ color: 'var(--red-dark)', fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.02em' }}
                >
                  {step.title}
                </h3>
                <p className="thai text-sm mb-5" style={{ color: 'var(--red-dark)', opacity: 0.85 }}>
                  {step.titleTh}
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
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
      cta: "Go bigger",
      recommended: true,
    },
  ];

  return (
    <section id="pricing" className="relative py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14 md:mb-16">
            <div className="flex items-center gap-3 justify-center mb-4">
              <QuestionBadge size={24} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--red-dark)' }}>
                Packages · แพ็กเกจ
              </span>
            </div>
            <h2
              className="display"
              style={{
                color: 'var(--red)',
                fontSize: 'clamp(36px, 5vw, 64px)',
              }}
            >
              Pick your pace.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className="relative p-8 md:p-10 rounded-3xl h-full flex flex-col"
                style={{
                  backgroundColor: pkg.recommended ? 'var(--red)' : 'var(--cream)',
                  color: pkg.recommended ? 'var(--pink-bg)' : 'var(--ink)',
                  border: pkg.recommended ? '2px solid var(--red-dark)' : '1.5px solid rgba(232, 53, 63, 0.12)',
                  boxShadow: pkg.recommended ? '0 24px 60px rgba(232, 53, 63, 0.25)' : 'none',
                }}
              >
                {pkg.recommended && (
                  <div
                    className="absolute -top-3 left-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{ backgroundColor: 'var(--pink-bg)', color: 'var(--red-dark)' }}
                  >
                    ★ Most Popular
                  </div>
                )}
                <h3
                  className="display mb-3"
                  style={{
                    color: pkg.recommended ? 'var(--pink-bg)' : 'var(--red)',
                    fontSize: 'clamp(26px, 3vw, 36px)',
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
                      fontSize: 56,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    ฿{pkg.price}
                  </span>
                </div>
                <p className="text-sm mb-7 opacity-80">
                  {pkg.days} turnaround · <span className="thai">ส่งงานใน {pkg.daysTh}</span>
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check
                        size={18}
                        className="shrink-0 mt-0.5"
                        style={{ color: pkg.recommended ? 'var(--pink-bg)' : 'var(--red)' }}
                      />
                      <span className="text-sm md:text-base">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={FASTWORK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: pkg.recommended ? 'var(--pink-bg)' : 'var(--red)',
                    color: pkg.recommended ? 'var(--red-dark)' : 'var(--pink-bg)',
                    fontSize: 16,
                  }}
                >
                  {pkg.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
    <section className="relative py-24 md:py-36 px-6 md:px-10 overflow-hidden" style={{ backgroundColor: 'var(--pink-bg)' }}>
      <div className="absolute top-16 left-4 md:left-10 opacity-40" style={{ animation: 'slowfloat 6s ease-in-out infinite' }}>
        <QuestionBadge size={60} />
      </div>
      <div className="absolute bottom-16 right-4 md:right-12 opacity-50" style={{ animation: 'slowfloat 5s ease-in-out infinite', animationDelay: '1s' }}>
        <QuestionBadge size={90} />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          <h2
            className="display mb-6"
            style={{
              color: 'var(--red)',
              fontSize: 'clamp(44px, 7vw, 104px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
            }}
          >
            Ready to make <br />them <span className="serif" style={{ fontWeight: 400 }}>ask?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="thai text-lg md:text-xl mb-4" style={{ color: 'var(--red-dark)' }}>
            พร้อมทำให้คนต้องถามชื่อแบรนด์ของคุณรึยัง?
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-base md:text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--ink)', opacity: 0.8 }}>
            Hire us through Fastwork with escrow protection.
            Chat first, pay only when you&apos;re ready.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href={FASTWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold transition-all hover:scale-[1.04] active:scale-[0.98]"
            style={{
              backgroundColor: 'var(--red)',
              color: 'var(--pink-bg)',
              fontSize: 19,
              boxShadow: '0 20px 60px rgba(232, 53, 63, 0.35)',
            }}
          >
            <span>Start your brand on Fastwork</span>
            <ArrowUpRight size={22} className="transition-transform group-hover:rotate-45" />
          </a>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="mt-5 text-sm" style={{ color: 'var(--red-dark)', opacity: 0.7 }}>
            No charge until you agree on scope · <span className="thai">ปรึกษาฟรีก่อนจ้างงาน</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative py-14 px-6 md:px-10" style={{ backgroundColor: 'var(--ink)', color: 'var(--pink-bg)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span style={{ fontFamily: '"Archivo Black"', color: 'var(--pink-bg)', fontSize: 22, letterSpacing: '-0.04em' }}>
                whosbrand
              </span>
              <QuestionBadge size={24} />
            </div>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs">
              Brand naming studio based in Bangkok.
              <br />
              <span className="thai">ฮูสแบรนด์</span>
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

        <div className="pt-6 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-3" style={{ borderColor: 'rgba(255, 229, 232, 0.15)' }}>
          <p className="text-xs opacity-50">© {new Date().getFullYear()} Whosbrand. All rights reserved.</p>
          <p className="text-xs opacity-50 thai">MAKE THEM ASK</p>
        </div>
      </div>
    </footer>
  );
};

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

        @keyframes qFloat1 {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-22px) rotate(15deg); }
        }
        @keyframes qFloat2 {
          0%, 100% { transform: translateY(0px) rotate(-20deg); }
          50% { transform: translateY(-14px) rotate(-24deg); }
        }
        @keyframes qFloat3 {
          0%, 100% { transform: translateY(0px) rotate(38deg); }
          50% { transform: translateY(-18px) rotate(42deg); }
        }
        @keyframes qFloat4 {
          0%, 100% { transform: translateY(0px) rotate(-8deg); }
          50% { transform: translateY(-24px) rotate(-5deg); }
        }
        @keyframes qFloat5 {
          0%, 100% { transform: translateY(0px) rotate(55deg); }
          50% { transform: translateY(-12px) rotate(62deg); }
        }

        @keyframes slowfloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(4deg); }
        }

        .marquee { animation: scrollX 38s linear infinite; }
        @keyframes scrollX {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        ::selection { background: var(--red); color: var(--pink-bg); }
      `}</style>

      <div style={{ color: 'var(--ink)', fontFamily: '"Archivo", system-ui, sans-serif', overflow: 'hidden' }}>
        <Header scrollY={scrollY} />
        <Hero scrollY={scrollY} />
        <StatsBar />
        <Services />
        <Portfolio />
        <Process />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}