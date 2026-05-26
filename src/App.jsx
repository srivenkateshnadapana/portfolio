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

  // Smooth mouse-following glow — damped spring so it trails naturally
  const glowX = useSpring(mouseX, { stiffness: 70, damping: 22 });
  const glowY = useSpring(mouseY, { stiffness: 70, damping: 22 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mouseX, mouseY]);

  return (
    /*
      IMPORTANT: Do NOT add overflow-hidden here — it breaks sticky positioning
      in Chrome/Safari. overflow-x-hidden is applied via CSS on html/body.
    */
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Global ambient mouse-follow glow — fixed so it tracks across sections */}
      <motion.div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full bg-radial-glow blur-[90px] z-0 opacity-60 mix-blend-screen"
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
