import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const containerRef = useRef(null);

  // The outer section is 500vh tall — sticky child pins to viewport as user scrolls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // ── Scroll-linked vertical translation of the entire slides container ──
  const slidesY = useTransform(scrollYProgress, [0, 0.33, 0.40, 0.73, 0.80], ['0%', '-100%', '-100%', '-200%', '-200%']);

  // ── Individual slide fade opacity layers driven by scroll progress ──
  const opacity1 = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.18, 0.33, 0.40, 0.65], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.55, 0.73], [0, 1]);

  // ── Mouse parallax for the holographic canvas ─────────────────────────────
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
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]">

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


        {/* Layer 2 — radial vignette so particles fade elegantly at the edges */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at center, transparent 40%, rgba(10,10,10,0.85) 100%)',
          }}
        />

        {/* ── Scroll-linked Vertical Slides Container ── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col pointer-events-none select-none"
          style={{ y: slidesY }}
        >
          {/* SLIDE 1 — Full-screen centred title card (height: 100vh) */}
          <motion.div
            className="w-full h-screen shrink-0 flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: opacity1 }}
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

          {/* SLIDE 2 — Left-aligned "What I Do" card (height: 100vh) */}
          <motion.div
            className="w-full h-screen shrink-0 flex flex-col items-start justify-center px-8 md:px-24"
            style={{ opacity: opacity2 }}
          >
            <p className="text-[11px] md:text-xs tracking-[0.4em] text-[#6366f1] uppercase mb-3 font-light">
              WHAT I DO
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight max-w-2xl">
              I build digital{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6366f1]">
                experiences.
              </span>
            </h2>
            <p className="mt-5 text-white/45 text-base md:text-lg font-light max-w-sm">
              MERN Stack&nbsp;·&nbsp;AI Integration&nbsp;·&nbsp;Creative Front-End
            </p>
          </motion.div>

          {/* SLIDE 3 — Philosophy card (height: 100vh) */}
          <motion.div
            className="w-full h-screen shrink-0 flex flex-col items-end justify-center px-8 md:px-24 text-right"
            style={{ opacity: opacity3 }}
          >
            <p className="text-[11px] md:text-xs tracking-[0.4em] text-[#f59e0b] uppercase mb-3 font-light">
              MY PHILOSOPHY
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight max-w-2xl">
              Bridging{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ef4444]">
                hardware
              </span>{' '}
              &amp; software.
            </h2>
            <p className="mt-5 text-white/45 text-base md:text-lg font-light max-w-md">
              Robotics&nbsp;·&nbsp;IoT Systems&nbsp;·&nbsp;High-Impact Mentorship
            </p>
          </motion.div>
        </motion.div>

        {/* ── Scroll nudge indicator ──────────────────────────────────── */}
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
