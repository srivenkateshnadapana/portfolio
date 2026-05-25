import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Leadership from './components/Leadership';
import Contact from './components/Contact';

function App() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs to make the glow glide gracefully behind the mouse (with damping)
  const glowX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const glowY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative overflow-hidden min-h-screen bg-[#0a0a0a]">
      {/* Global Background Mouse Glow Tracker */}
      <motion.div
        className="pointer-events-none fixed w-[600px] h-[600px] rounded-full bg-radial-glow blur-[80px] z-0 opacity-75 mix-blend-screen"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          top: 0,
          left: 0,
        }}
      />
      
      <main className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <Leadership />
        <Contact />
      </main>
    </div>
  );
}

export default App;
