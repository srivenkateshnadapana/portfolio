import { motion } from 'framer-motion';

const Leadership = () => {
  return (
    <section id="leadership" className="relative py-32 px-6 md:px-24 bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[#34d399] text-sm tracking-[0.3em] uppercase font-light">
          05 / Leadership
        </span>
        <div className="flex-1 h-px bg-white/10"></div>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 leading-tight"
      >
        Community &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-[#3b82f6]">Impact</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            role: 'Organiser & Lead',
            org: 'GDG on Campus, GDSC-ACET',
            date: 'Aug 2023 – July 2025',
            points: [
              'Established and led GDG chapter, building a community of 5,000+ members.',
              'Organized GDG DevFest Chennai, Vizag, and Hyderabad, engaging over 2,500 participants.'
            ]
          },
          {
            role: 'Head & Board Member',
            org: 'Entrepreneurship Development Cell (EDC) & Student Activity Council (SAC)',
            date: '',
            points: []
          },
          {
            role: 'Campus Ambassador',
            org: 'E-Cell, IIT Bombay',
            date: '',
            points: []
          },
          {
            role: 'Speaker',
            org: 'Technology & Startup Events across India',
            date: '',
            points: ['Speaker on innovation and entrepreneurship at numerous events.']
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: index * 0.1 }}
            className="group p-7 rounded-2xl border border-white/8 bg-white/4 hover:bg-white/7 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{item.role}</h3>
                <p className="text-[#34d399] text-sm mt-1 font-medium">{item.org}</p>
              </div>
              {item.date && <span className="text-white/30 text-xs shrink-0 mt-1">{item.date}</span>}
            </div>
            {item.points.length > 0 && (
              <ul className="space-y-2">
                {item.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex gap-3 text-white/50 text-sm leading-relaxed">
                    <span className="text-[#34d399] mt-1.5 text-xs shrink-0">▸</span>
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { num: '5,000+', label: 'GDG Members' },
          { num: '2,500+', label: 'DevFest Participants' },
          { num: '2,000+', label: 'Students Mentored' },
          { num: '5+', label: 'Major Events Organized' }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, delay: 0.2 + (idx * 0.1) }}
            className="text-center p-6 rounded-2xl border border-white/8 bg-white/3"
          >
            <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#34d399] to-[#3b82f6]">
              {stat.num}
            </p>
            <p className="text-white/40 text-sm mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Leadership;
