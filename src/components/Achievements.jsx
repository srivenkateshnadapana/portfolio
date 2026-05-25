import { motion } from 'framer-motion';

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: '🎯', title: 'K21Academy (GoogleAI SME)', desc: 'Approached directly by Atul Kumar (CEO) regarding technical alignment for Google AI curriculum paths.' },
          { icon: '🚀', title: 'NxtWave Disruptive Tech', desc: 'Shortlisted & personally invited for high-impact technical instructor tracks (GenAI and MERN).' },
          { icon: '🌐', title: 'Google Cloud Tech Series', desc: 'Personally invited to Cloud Tech Series (AI in Action & OnBoard Edition).' }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: index * 0.1 }}
            className="group relative p-8 rounded-3xl border border-white/10 bg-white/3 backdrop-blur-sm text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 to-[#6366f1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
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
              className="flex items-center gap-3 p-4 rounded-xl border border-white/8 bg-white/3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#a855f7] shrink-0"></div>
              <span className="text-white/60 text-sm">{cert}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
