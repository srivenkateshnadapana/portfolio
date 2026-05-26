import { motion } from 'framer-motion';
import SkillSphere from './SkillSphere';

// Splits text into individual word spans that animate in on scroll,
// exactly matching the reference site's word-reveal technique
const WordReveal = ({ text, className = '' }) => {
  const words = text.split(' ');
  return (
    <p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0.12, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: i * 0.025, ease: 'easeOut' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

// Exact reference-site GlowCard: mouse-tracking spotlight on border + background
const GlowCard = ({ children, glowColor = '#6366f1', className = '', style = {} }) => {
  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm rounded-3xl transition-all duration-300 hover:border-white/20 ${className}`}
      style={style}
    >
      {/* Background spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at var(--mx,0px) var(--my,0px), ${glowColor}14, transparent 80%)`,
        }}
      />
      {/* Border spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(120px circle at var(--mx,0px) var(--my,0px), ${glowColor}55, transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
};

const About = () => {
  const bio1 = "I am a Robotics Engineer and Technical Trainer with a passion for designing Industrial Mobile Robots and building real-time machine control systems. I have trained over 100 students weekly in robotics fundamentals and embedded IoT.";
  const bio2 = "My expertise extends into cloud architecture and DevOps, deploying scalable servers on AWS, GCP, and Azure. I'm highly proficient across diverse environments—from Linux distributions and Android x86 modding to virtualization with VMware.";
  const bio3 = "Whether I'm leveraging Python and Pandas for data analysis, exploring Generative AI and Prompt Engineering, or crafting clean web UIs, I thrive on simplifying complex concepts and bridging the gap between cutting-edge hardware and software.";

  const softSkills = [
    { label: 'Project-Based Learning', color: '#6366f1' },
    { label: 'Simplifying Complexity', color: '#a855f7' },
    { label: 'SEO & Optimization', color: '#10b981' },
    { label: 'Industrial Automation', color: '#f59e0b' },
    { label: 'Cloud Deployments', color: '#3b82f6' },
  ];

  return (
    <motion.section
      id="about"
      className="relative py-32 px-6 md:px-24 bg-[#0a0a0a]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[#6366f1] text-sm tracking-[0.3em] uppercase font-light">01 / About</span>
        <div className="flex-1 h-px bg-white/10" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

        {/* ── Bio Card (spans 2 cols) ── */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlowCard glowColor="#6366f1" className="p-8 h-full flex flex-col justify-between">
            <div className="relative z-10">
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                A developer who{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-300% animate-gradient">
                  bridges
                </span>{' '}
                hardware and software.
              </motion.h2>

              <WordReveal text={bio1} className="text-white/60 text-lg leading-relaxed mb-6" />
              <WordReveal text={bio2} className="text-white/60 text-lg leading-relaxed mb-6" />
              <WordReveal text={bio3} className="text-white/60 text-lg leading-relaxed mb-6" />
            </div>
          </GlowCard>
        </motion.div>

        {/* ── Skill Sphere Card ── */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlowCard glowColor="#6366f1" className="p-8 h-full flex flex-col items-center text-center">
            <div className="relative z-10 w-full h-full flex flex-col">
              <h3 className="text-white font-semibold text-lg mb-2">Technical Skills</h3>
              <p className="text-white/40 text-xs tracking-wider uppercase mb-4">Interactive 3D Sphere</p>
              <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
                <SkillSphere />
              </div>
              <p className="text-white/30 text-xs mt-2 italic">Hover to explore &amp; highlight skills</p>
            </div>
          </GlowCard>
        </motion.div>

        {/* ── Education Card ── */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlowCard glowColor="#6366f1" className="p-8 h-full flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#6366f1]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#6366f1] text-xs tracking-widest uppercase">Education</p>
                  <h3 className="text-white font-semibold">Academic Journey</h3>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium text-base">Swarnandhra College of Engineering &amp; Technology</h4>
                  <p className="text-white/60 text-sm mt-1">Bachelor of Technology (B.Tech) in Robotics Engineering</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                    <span>2020 – 2024</span><span>•</span><span>A.P, India</span>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.div>

        {/* ── Soft Skills Card (spans 2 cols) ── */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlowCard glowColor="#a855f7" className="p-8 h-full flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#a855f7]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 113.536 0V19h2v2h-2a3 3 0 01-3-3v-3.1m1.4-5.4a2 2 0 112.83 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#a855f7] text-xs tracking-widest uppercase">Core Capabilities</p>
                  <h3 className="text-white font-semibold">Strengths</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {softSkills.map((skill, i) => (
                  <motion.div
                    key={i}
                    className="group flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                  >
                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                      <div className="w-2 h-2 rounded-full" style={{ background: skill.color }} />
                    </div>
                    <span className="text-white/80 font-medium text-sm group-hover:text-white transition-colors duration-300">
                      {skill.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default About;
