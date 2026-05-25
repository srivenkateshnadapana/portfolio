import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  
  // Replicating scroll-linked opacity and transform from reference site
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);

  const y2 = useTransform(scrollY, [300, 800], [50, -50]);
  const opacity2 = useTransform(scrollY, [300, 500, 800], [0, 1, 0]);

  const y3 = useTransform(scrollY, [800, 1300], [50, -50]);
  const opacity3 = useTransform(scrollY, [800, 1000, 1300], [0, 1, 0]);

  return (
    <section className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas className="absolute inset-0" style={{ background: '#121212' }}></canvas>
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0, 0, 0, 0.75) 100%)'
          }}
        ></div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 pointer-events-none"
          style={{ opacity: opacity1, y: y1 }}
        >
          <p className="text-sm tracking-[0.35em] text-[#a3e635] uppercase mb-5 font-light">
            Creative Technologist
          </p>
          <h1 className="text-5xl md:text-8xl font-bold text-white leading-none tracking-tight">
            Sri Venkatesh<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
              Nadapana
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-white/55 font-light">
            Robotics Engineer &amp; Educator
          </p>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-start justify-center px-10 md:px-24 z-10 pointer-events-none"
          style={{ opacity: opacity2, y: y2 }}
        >
          <p className="text-xs tracking-[0.35em] text-[#6366f1] uppercase mb-3 font-light">
            What I Do
          </p>
          <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight max-w-2xl">
            I build intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6366f1]">systems.</span>
          </h2>
          <p className="mt-5 text-white/50 text-lg font-light max-w-md">
            Industrial Automation · Cloud Infrastructure · Robotics
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
            Ford · Adhoc Network · Be the Change
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
