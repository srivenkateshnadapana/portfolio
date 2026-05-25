import { motion } from 'framer-motion';
import { Award, Target, Zap, Cloud, ShieldCheck } from 'lucide-react';
import GlowCard from './GlowCard';

const Achievements = () => {
  return (
    <section id="achievements" className="relative py-32 px-6 md:px-24 bg-[#0d0d0d] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#6366f1] opacity-5 blur-[120px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[#a855f7] text-sm tracking-[0.3em] uppercase font-light">
          04 / Industry Validation
        </span>
        <div className="flex-1 h-px bg-white/10"></div>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 leading-tight"
      >
        In the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Spotlight</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {[
          { icon: Award, color: '#f59e0b', title: 'Felicitation for Excellence', desc: 'Felicitated by Aditya Degree College, Bhimavaram for Excellence in Technical Mentorship.' },
          { icon: Target, color: '#a855f7', title: 'K21Academy (GoogleAI SME)', desc: 'Approached directly by Atul Kumar (CEO) regarding technical alignment for Google AI curriculum paths.' },
          { icon: Zap, color: '#10b981', title: 'NxtWave Disruptive Tech', desc: 'Shortlisted & personally invited for high-impact technical instructor tracks (GenAI and MERN).' },
          { icon: Cloud, color: '#3b82f6', title: 'Google Cloud Tech Series', desc: 'Personally invited to Cloud Tech Series (AI in Action & OnBoard Edition).' }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: index * 0.1 }}
            className="h-full flex flex-col"
          >
            <GlowCard
              glowColor={item.color}
              className="p-8 rounded-3xl border border-white/10 text-center flex flex-col justify-between h-full"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="relative z-10 flex flex-col items-center h-full">
                <div 
                  className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    color: item.color,
                    boxShadow: `0 0 20px ${item.color}15`
                  }}
                >
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      <div>
        <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Badges &amp; Certifications</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Google Cloud Innovator | Legacy Community Badge',
            'Women Techmakers Program | Accepted Member',
            'Cybrary Professional Development | Security & Infrastructure',
            'Qualcomm Academy Certified | Professional Technical Modules'
          ].map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: index * 0.1 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/3 transition-all duration-300 hover:border-white/15"
            >
              <ShieldCheck size={18} className="text-[#a855f7] shrink-0" />
              <span className="text-white/60 text-sm">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
