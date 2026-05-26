import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const containerRef = useRef(null);

  // The outer section is 500vh tall — sticky child pins to viewport as user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // ── Individual slide Y-axis translations (simulates scrolling up) ──
  const slide1Y = useTransform(scrollYProgress, [0, 0.25, 0.35], ['0%', '0%', '-100%']);
  const slide2Y = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.55, 0.70], ['100%', '100%', '0%', '0%', '-100%']);
  const slide3Y = useTransform(scrollYProgress, [0, 0.55, 0.70, 0.90, 1.0], ['100%', '100%', '0%', '0%', '-10%']);

  // ── Individual slide fade opacity layers driven by scroll progress ──
  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0, 0.25, 0.35, 0.55, 0.70], [0, 0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0, 0.55, 0.70, 0.90, 1.0], [0, 0, 1, 1, 0]);

  // ── Premium slide horizontal parallax offsets ──
  const slide2X = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.65], [-80, 0, 0, -80]);
  const slide3X = useTransform(scrollYProgress, [0.55, 0.70, 0.90, 1.0], [80, 0, 0, 80]);

  // ── Mouse parallax ─────────────────────────────────────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 28, stiffness: 140 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mouseX, mouseY]);

  return (
    /* ── Outer scroll-track section: 500 viewport-heights tall ── */
    <section
      ref={containerRef}
      style={{ height: '500vh' }}
      className="relative"
    >
      {/* ── Sticky viewport: pins to top of screen while user scrolls through 500vh ── */}
      <div className="sticky top-0 h-screen w-full bg-[#0a0a0a]" style={{ overflow: 'clip' }}>

        {/* Layer 0 — subtle ambient nebula glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] rounded-[100%] blur-[130px] opacity-20 animate-pulse"
            style={{ background: 'linear-gradient(to right, #f59e0b, transparent)' }}
          />
          <div
            className="absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] rounded-[100%] blur-[130px] opacity-20 animate-pulse"
            style={{ background: 'linear-gradient(to left, #8b5cf6, transparent)', animationDelay: '1.2s' }}
          />
        </div>

        {/* Layer 2 — radial vignette */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at center, transparent 40%, rgba(10,10,10,0.85) 100%)',
          }}
        />

        {/* ── SLIDE 1 — Full-screen centred title card ── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
          style={{ opacity: opacity1, y: slide1Y }}
        >
          <p className="text-[11px] md:text-xs tracking-[0.4em] text-[#a3e635] uppercase mb-5 font-light">
            CREATIVE TECHNOLOGIST
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-none tracking-tight">
            Sri Venkatesh
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7]">
              Nadapana
            </span>
          </h1>
          <p className="mt-6 text-base md:text-xl text-white/50 font-light">
            Robotics Engineer&nbsp;·&nbsp;AI Integration&nbsp;·&nbsp;Creative Front-End
          </p>
        </motion.div>

        {/* ── SLIDE 2 — Left-aligned "What I Do" card ── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-start justify-center px-8 md:px-24"
          style={{ opacity: opacity2, x: slide2X, y: slide2Y }}
        >
          <div className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md max-w-2xl shadow-2xl shadow-black/50 overflow-hidden group select-text">
            {/* Subtle spotlight glow */}
            <div className="pointer-events-none absolute -inset-px bg-gradient-to-r from-[#10b981]/10 to-[#6366f1]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <p className="text-[11px] md:text-xs tracking-[0.4em] text-[#6366f1] uppercase mb-4 font-light relative z-10">
              WHAT I DO
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight relative z-10">
              I build digital{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6366f1]">
                experiences.
              </span>
            </h2>
            <p className="mt-5 text-white/50 text-sm md:text-base font-light relative z-10">
              MERN Stack&nbsp;·&nbsp;AI Integration&nbsp;·&nbsp;Creative Front-End
            </p>
          </div>
        </motion.div>

        {/* ── SLIDE 3 — Right-aligned Philosophy card ── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-end justify-center px-8 md:px-24 text-right"
          style={{ opacity: opacity3, x: slide3X, y: slide3Y }}
        >
          <div className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md max-w-2xl shadow-2xl shadow-black/50 overflow-hidden group text-right flex flex-col items-end select-text">
            {/* Subtle spotlight glow */}
            <div className="pointer-events-none absolute -inset-px bg-gradient-to-r from-[#f59e0b]/10 to-[#ef4444]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <p className="text-[11px] md:text-xs tracking-[0.4em] text-[#f59e0b] uppercase mb-4 font-light relative z-10">
              MY PHILOSOPHY
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight relative z-10">
              Bridging{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ef4444]">
                hardware
              </span>{' '}
              &amp; software.
            </h2>
            <p className="mt-5 text-white/50 text-sm md:text-base font-light relative z-10">
              Robotics&nbsp;·&nbsp;IoT Systems&nbsp;·&nbsp;High-Impact Mentorship
            </p>
          </div>
        </motion.div>

        {/* ── Scroll nudge indicator ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
          style={{ opacity: opacity1 }}
        >
          <span className="text-white/35 text-[10px] tracking-[0.35em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/35 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
