import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import HolographicFace from './HolographicFace';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Track scroll timeline over the entire 300vh section to drive the 3D canvas and text layers
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Replicating scroll-linked opacity and transform over a compact, responsive 300vh track (no dead zones!)
  const y1 = useTransform(scrollYProgress, [0, 0.28], [0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.24], [1, 0]);

  const y2 = useTransform(scrollYProgress, [0.26, 0.38, 0.52, 0.64], [60, 0, 0, -60]);
  const opacity2 = useTransform(scrollYProgress, [0.26, 0.34, 0.52, 0.64], [0, 1, 1, 0]);

  const y3 = useTransform(scrollYProgress, [0.62, 0.74, 0.88, 0.96], [60, 0, 0, -60]);
  const opacity3 = useTransform(scrollYProgress, [0.62, 0.70, 0.88, 0.96], [0, 1, 1, 0]);

  // Mouse Parallax for 3D Image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  // Map mouse position to rotation and movement
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to [-0.5, 0.5]
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full relative overflow-hidden bg-[#0a0a0a]">
        
        {/* Glowing Background Trails (Replicated via CSS gradients) */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gradient-to-r from-[#f59e0b] to-transparent rounded-[100%] blur-[80px] rotate-[-15deg] animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[200px] bg-gradient-to-r from-transparent to-[#8b5cf6] rounded-[100%] blur-[80px] rotate-[15deg] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* 3D Holographic Neural Network Grid Layer */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none select-none">
          <HolographicFace scrollYProgress={scrollYProgress} />
        </div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20 pointer-events-none mix-blend-normal"
          style={{ opacity: opacity1, y: y1 }}
        >
          <p className="text-sm tracking-[0.4em] text-[#10b981] uppercase mb-4 font-semibold z-30">
            CREATIVE TECHNOLOGIST
          </p>
          <h1 className="text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tighter z-30 mix-blend-screen">
            <span className="text-white block">Sri Venkatesh</span>
            <span className="text-[#a855f7] block">Nadapana</span>
          </h1>
          <p className="mt-8 text-xl md:text-2xl text-white/40 font-light z-30">
            Robotics Engineer · AI Integration · Creative Front-End
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-center px-10 md:px-24 z-20 pointer-events-none"
          style={{ opacity: opacity2, y: y2 }}
        >
          <p className="text-xs tracking-[0.4em] text-[#6366f1] uppercase mb-3 font-semibold">
            WHAT I DO
          </p>
          <h2 className="text-5xl md:text-8xl font-bold leading-[1] max-w-3xl">
            <span className="text-white/80 block">I build digital</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6366f1] block">experiences.</span>
          </h2>
          <p className="mt-6 text-white/50 text-lg font-light max-w-md">
            MERN Stack · Cloud Infrastructure · AI
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-end justify-center px-10 md:px-24 z-10 pointer-events-none text-right"
          style={{ opacity: opacity3, y: y3 }}
        >
          <p className="text-xs tracking-[0.35em] text-[#f59e0b] uppercase mb-3 font-light">
            My Philosophy
          </p>
          <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight max-w-2xl">
            Bridging <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ef4444]">hardware</span> &amp; software.
          </h2>
          <p className="mt-5 text-white/50 text-lg font-light max-w-md">
            From complex software systems to physical hardware deployed at scale.
          </p>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
          <span className="text-white/40 text-[11px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
