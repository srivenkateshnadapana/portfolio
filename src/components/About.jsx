import { motion } from 'framer-motion';
import SkillSphere from './SkillSphere';
import GlowCard from './GlowCard';


const About = () => {
  return (
    <section id="about" className="relative py-32 px-6 md:px-24 bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[#6366f1] text-sm tracking-[0.3em] uppercase font-light">
          01 / About
        </span>
        <div className="flex-1 h-px bg-white/10"></div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Main Bio Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 h-full flex flex-col"
        >
          <GlowCard 
            glowColor="#6366f1"
            className="border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-between"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
                A developer who <span className="text-[#a855f7]">bridges</span> hardware and software.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                I'm Sri Venkatesh Nadapana, a Robotics Engineer and Senior Technical Trainer. I specialize in industrial automation, cloud infrastructure, and mentoring the next generation of engineers to build, deploy, and scale intelligent systems.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                I have delivered specialized technical modules spanning cloud infrastructure and advanced systems engineering, alongside hands-on hardware training for hundreds of students in robotics fundamentals and embedded IoT.
              </p>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                I thrive at the intersection of complex software architecture, real-time control systems, and impactful technical education.
              </p>
            </div>
          </GlowCard>
        </motion.div>
 
        {/* 3D Skill Sphere Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.1 }}
          className="lg:col-span-1 h-full flex flex-col"
        >
          <GlowCard 
            glowColor="#6366f1"
            className="border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-between items-center text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="relative z-10 w-full h-full flex flex-col">
              <h3 className="text-white font-semibold text-lg mb-2">Technical Skills</h3>
              <p className="text-white/40 text-xs tracking-wider uppercase mb-4">Interactive 3D Sphere</p>
              <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
                 <SkillSphere />
              </div>
            </div>
          </GlowCard>
        </motion.div>
 
        {/* Education Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.2 }}
          className="lg:col-span-1 h-full flex flex-col"
        >
          <GlowCard 
            glowColor="#6366f1"
            className="border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-between"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#6366f1]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[#6366f1] text-xs tracking-widest uppercase">Education</p>
                  <h3 className="text-white font-semibold">Academic Journey</h3>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium text-base">Swarnandhra College of Engineering and Technology</h4>
                  <p className="text-white/60 text-sm mt-1">Bachelor of Technology (B.Tech) in Robotics Engineering</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                    <span>2020 – 2024</span><span>•</span><span>A.P, India</span>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </motion.div>
 
        {/* Soft Skills Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.3 }}
          className="lg:col-span-2 h-full flex flex-col"
        >
          <GlowCard 
            glowColor="#a855f7"
            className="border border-white/10 rounded-3xl p-8 h-full flex flex-col justify-between"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#a855f7]">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 113.536 0V19h2v2h-2a3 3 0 01-3-3v-3.1m1.4-5.4a2 2 0 112.83 0"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-[#a855f7] text-xs tracking-widest uppercase">Core Capabilities</p>
                  <h3 className="text-white font-semibold">Strengths</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {['Curriculum Design', 'Technical Mentorship', 'System Architecture', 'Problem-Solving', 'Project-Based Learning'].map((skill, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                    <div className="p-2 rounded-xl bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-[#6366f1]"></div>
                    </div>
                    <span className="text-white/80 font-medium text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
