import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const spotlights = [
  {
    emoji: '🏆',
    title: 'Felicitation for Excellence',
    desc: 'Felicitated by Aditya Degree College, Bhimavaram for Excellence in Technical Mentorship.',
  },
  {
    emoji: '🎯',
    title: 'K21Academy (GoogleAI SME)',
    desc: 'Approached directly by Atul Kumar (CEO) regarding technical alignment for Google AI curriculum paths.',
  },
  {
    emoji: '⚡',
    title: 'NxtWave Disruptive Tech',
    desc: 'Shortlisted & personally invited for high-impact technical instructor tracks (GenAI and MERN).',
  },
  {
    emoji: '☁️',
    title: 'Google Cloud Tech Series',
    desc: 'Personally invited to Cloud Tech Series (AI in Action & OnBoard Edition).',
  },
];

const certs = [
  'Google Cloud Innovator | Legacy Community Badge',
  'Women Techmakers Program | Accepted Member',
  'Cybrary Professional Development | Security & Infrastructure',
  'Qualcomm Academy Certified | Professional Technical Modules',
];

const Achievements = () => {
  return (
    <section id="achievements" className="relative py-32 px-6 md:px-24 bg-[#0d0d0d] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#6366f1] opacity-5 blur-[120px] pointer-events-none" />

      <motion.div
        className="flex items-center gap-4 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#a855f7] text-sm tracking-[0.3em] uppercase font-light">04 / Industry Validation</span>
        <div className="flex-1 h-px bg-white/10" />
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white mb-16 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        In the{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#ec4899]">Spotlight</span>
      </motion.h2>

      {/* Spotlight cards — match reference: emoji-based, gradient hover, no mouse tracking */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {spotlights.map((item, index) => (
          <motion.div
            key={index}
            className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm text-center overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            {/* Gradient hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative z-10">
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <div>
        <p className="text-white/40 text-sm tracking-widest uppercase mb-6">Badges &amp; Certifications</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.03] transition-all duration-300 hover:border-white/15"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shrink-0" />
              <span className="text-white/60 text-sm">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
