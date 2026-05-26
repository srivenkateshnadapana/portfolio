import React from 'react';
import { motion, useTransform } from 'framer-motion';

const HolographicFace = ({ scrollYProgress }) => {
  // ── Scroll-linked transformations for the high-fidelity face portrait ──
  // Matches layout alignments: centered on Slide 1, shifted right on Slide 2 (left text),
  // shifted left on Slide 3 (right text), and extremely close-up zoom on transition.
  const scale = useTransform(scrollYProgress, [0, 0.24, 0.52, 0.80, 1.0], [1.08, 1.22, 1.35, 1.60, 1.85]);
  const x = useTransform(scrollYProgress, [0, 0.24, 0.52, 0.80, 1.0], ['0%', '14%', '-14%', '0%', '0%']);
  const y = useTransform(scrollYProgress, [0, 0.24, 0.52, 0.80, 1.0], ['0%', '-2%', '2%', '-4%', '-8%']);
  
  // Fade out face and trails gracefully during the About transition
  const opacity = useTransform(scrollYProgress, [0, 0.80, 0.88], [0.85, 0.85, 0]);
  
  // Neon glowing light streaks fade-in range (active during Slide 2 & 3)
  const trailsOpacity = useTransform(scrollYProgress, [0.20, 0.32, 0.76, 0.84], [0, 0.90, 0.90, 0]);
  
  // Light trails scale/rotation slightly shifts for dynamic parallax
  const trailsScale = useTransform(scrollYProgress, [0.20, 0.80], [0.95, 1.15]);
  const trailsRotate = useTransform(scrollYProgress, [0.20, 0.80], [-15, 25]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a0a0a] pointer-events-none select-none">
      {/* ── Background atmospheric color glow ── */}
      <div className="absolute inset-0 pointer-events-none z-[1] mix-blend-screen opacity-35">
        <div 
          className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 70%)' }}
        />
        <div 
          className="absolute top-1/2 right-[30%] translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Outer animated container: drives portrait positioning and scale ── */}
      <motion.div 
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{ scale, x, y, opacity }}
      >
        {/* Sri Venkatesh Nadapana's actual professional portrait */}
        <img 
          src="/face.jpg" 
          alt="Sri Venkatesh Nadapana Portrait" 
          className="w-full h-full object-cover md:object-contain select-none max-w-4xl"
          style={{
            filter: 'brightness(1.08) contrast(1.04) saturate(0.95)',
          }}
        />

        {/* ── Radial spotlight vignette: blends borders of face.jpg perfectly into #0a0a0a ── */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 45%, transparent 20%, rgba(10,10,10,0.3) 48%, rgba(10,10,10,0.95) 75%, #0a0a0a 96%)'
          }}
        />
      </motion.div>

      {/* ── Layer 2: Glowing Fiber-Optic Light Streaks (SVG curves wrapping the head) ── */}
      <motion.div 
        className="absolute inset-0 z-10 w-full h-full flex items-center justify-center"
        style={{ opacity: trailsOpacity, scale: trailsScale, rotate: trailsRotate }}
      >
        <svg 
          className="w-[120%] h-[120%] md:w-full md:h-full opacity-70 pointer-events-none" 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Soft intense glow filters */}
            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="15" result="blur1" />
              <feGaussianBlur stdDeviation="30" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Linear gradients for light trails */}
            <linearGradient id="glow-grad-amber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
              <stop offset="30%" stopColor="#fb923c" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#ef4444" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="glow-grad-violet" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#8b5cf6" stopOpacity="1" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="glow-grad-emerald" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Dynamic flowing SVG paths with infinite dashoffset transitions */}
          {/* Path 1: Amber-orange swooping loop */}
          <path 
            d="M 150 480 C 250 150, 480 300, 520 520 C 560 740, 780 850, 880 500" 
            fill="none" 
            stroke="url(#glow-grad-amber)" 
            strokeWidth="3.5"
            filter="url(#neon-glow)"
            className="animate-flow-fast"
            style={{
              strokeDasharray: '400',
              animation: 'glow-flow 12s linear infinite',
            }}
          />

          {/* Path 2: Cyan-violet wrapping loop */}
          <path 
            d="M 850 420 C 720 750, 480 700, 440 480 C 400 260, 220 200, 120 550" 
            fill="none" 
            stroke="url(#glow-grad-violet)" 
            strokeWidth="3.5"
            filter="url(#neon-glow)"
            style={{
              strokeDasharray: '450',
              animation: 'glow-flow 16s linear infinite reverse',
            }}
          />

          {/* Path 3: Teal-emerald orbital wave */}
          <path 
            d="M 250 820 C 350 600, 650 400, 750 180" 
            fill="none" 
            stroke="url(#glow-grad-emerald)" 
            strokeWidth="2.5"
            filter="url(#neon-glow)"
            style={{
              strokeDasharray: '350',
              animation: 'glow-flow 20s linear infinite',
            }}
          />
        </svg>
      </motion.div>

      {/* ── Global Styles for high-performance CSS flow animation ── */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes glow-flow {
          0% {
            stroke-dashoffset: 1200;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}} />
    </div>
  );
};

export default HolographicFace;
