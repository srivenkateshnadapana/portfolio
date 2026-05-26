import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  
  // Refs for the slides
  const slide1Ref = useRef(null);
  const slide2Ref = useRef(null);
  const slide3Ref = useRef(null);
  const scrollIndicatorRef = useRef(null);

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

  useGSAP(() => {
    // 1. Independent intro animation for Slide 1 (runs on load, not tied to scroll)
    gsap.from('.anim1', {
      y: 40,
      autoAlpha: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2
    });

    // 2. Initial state setup for Slides 2 and 3
    gsap.set(slide2Ref.current, { yPercent: 50, autoAlpha: 0 });
    gsap.set(slide3Ref.current, { yPercent: 50, autoAlpha: 0 });
    gsap.set('.anim2', { y: 60, autoAlpha: 0 });
    gsap.set('.anim3', { y: 60, autoAlpha: 0 });

    // 3. Create the master scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2000', // Shortened scroll length for a faster experience!
        scrub: 1, // Smooth scrubbing delay
        pin: true, // Pin the main container to the screen
      }
    });

    // Sequence 1: Slide 1 leaves
    tl.to(slide1Ref.current, { yPercent: -30, autoAlpha: 0, duration: 1 }, 0);
    tl.to(scrollIndicatorRef.current, { autoAlpha: 0, duration: 0.5 }, 0);

    // Sequence 2: Slide 2 wrapper enters, then text staggers in
    tl.to(slide2Ref.current, { yPercent: 0, autoAlpha: 1, duration: 1 }, 0.2);
    tl.to('.anim2', { y: 0, autoAlpha: 1, stagger: 0.15, duration: 1, ease: 'power2.out' }, 0.4);

    // Sequence 3: Slide 2 leaves
    tl.to(slide2Ref.current, { yPercent: -30, autoAlpha: 0, duration: 1 }, 2);
    tl.to('.anim2', { autoAlpha: 0, y: -20, stagger: 0.1, duration: 0.8 }, 2);

    // Sequence 4: Slide 3 wrapper enters, then text staggers in
    tl.to(slide3Ref.current, { yPercent: 0, autoAlpha: 1, duration: 1 }, 2.2);
    tl.to('.anim3', { y: 0, autoAlpha: 1, stagger: 0.15, duration: 1, ease: 'power2.out' }, 2.4);

    // Add dummy tween to extend the scroll so slide 3 stays on screen before unpinning
    tl.to({}, { duration: 1 });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden">
      
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
      <div
        ref={slide1Ref}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none"
      >
        <p className="anim1 text-[11px] md:text-xs tracking-[0.4em] text-[#a3e635] uppercase mb-5 font-light invisible">
          CREATIVE TECHNOLOGIST
        </p>
        <h1 className="anim1 text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-none tracking-tight invisible">
          Sri Venkatesh
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7]">
            Nadapana
          </span>
        </h1>
        <p className="anim1 mt-6 text-base md:text-xl text-white/50 font-light invisible">
          Robotics Engineer&nbsp;·&nbsp;AI Integration&nbsp;·&nbsp;Creative Front-End
        </p>
      </div>

      {/* ── SLIDE 2 — Left-aligned "What I Do" (Text Only) ── */}
      <div
        ref={slide2Ref}
        className="absolute inset-0 z-10 flex flex-col items-start justify-center px-8 md:px-24"
      >
        <div className="max-w-2xl select-text">
          <p className="anim2 text-[11px] md:text-xs tracking-[0.4em] text-[#6366f1] uppercase mb-4 font-light invisible">
            WHAT I DO
          </p>
          <h2 className="anim2 text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight invisible">
            I build digital{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6366f1]">
              experiences.
            </span>
          </h2>
          <p className="anim2 mt-6 text-white/50 text-base md:text-lg font-light invisible">
            MERN Stack&nbsp;·&nbsp;AI Integration&nbsp;·&nbsp;Creative Front-End
          </p>
        </div>
      </div>

      {/* ── SLIDE 3 — Right-aligned Philosophy (Text Only) ── */}
      <div
        ref={slide3Ref}
        className="absolute inset-0 z-10 flex flex-col items-end justify-center px-8 md:px-24 text-right"
      >
        <div className="max-w-2xl select-text flex flex-col items-end">
          <p className="anim3 text-[11px] md:text-xs tracking-[0.4em] text-[#f59e0b] uppercase mb-4 font-light invisible">
            MY PHILOSOPHY
          </p>
          <h2 className="anim3 text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight invisible">
            Bridging{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ef4444]">
              hardware
            </span>{' '}
            &amp; software.
          </h2>
          <p className="anim3 mt-6 text-white/50 text-base md:text-lg font-light invisible">
            Robotics&nbsp;·&nbsp;IoT Systems&nbsp;·&nbsp;High-Impact Mentorship
          </p>
        </div>
      </div>

      {/* ── Scroll nudge indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-white/35 text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/35 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
