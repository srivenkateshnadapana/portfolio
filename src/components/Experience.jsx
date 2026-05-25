import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      role: 'Associate Developer',
      company: 'Adhoc Network Tech.',
      date: 'Dec 2025 – May 2026',
      location: 'Vizag, A.P',
      color: '#6366f1',
      details: [
        'Full Stack Developer using the MERN Stack for developing scalable web applications.',
        'Developed and maintained LMS portals, handling both front-end and back-end functionalities.',
        'Contributed to deployment, debugging, and multiple company projects with the core development team.'
      ]
    },
    {
      role: 'Software Engineer Intern',
      company: 'Ford Global Technology & Business Center',
      date: 'Jun 2025 – July 2025 (55 days)',
      location: 'Chennai, TN',
      color: '#3b82f6',
      details: [
        'Collaborated with LL4 leaders to design and integrate ADK agents and AI components into Ford Web Studio and Star Tool.',
        'Developed AI-powered features using Python and Java with prompt engineering, achieving a 30% increase in efficiency.',
        'Contributed to front-end development using React, JavaScript, AngularJS, HTML, and CSS in Star Tool.'
      ]
    },
    {
      role: 'Front-End Developer Intern',
      company: 'Hydro Tribe Private Limited',
      date: 'May 2024 – July 2024',
      location: 'Kakinada, AP',
      color: '#10b981',
      details: [
        'Designed and developed the company\'s official website using React.js, improving UI performance by 25%.',
        'Simulated and visualised sustainable aeroponic farming solutions, supporting product innovation.'
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-32 px-6 md:px-24 bg-[#0d0d0d]">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[#10b981] text-sm tracking-[0.3em] uppercase font-light">
          02 / Experience
        </span>
        <div className="flex-1 h-px bg-white/10"></div>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 leading-tight"
      >
        Where I've <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6366f1]">worked</span>
      </motion.h2>

      <div className="relative">
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#6366f1] via-[#10b981] to-transparent"></div>
        <div className="flex flex-col gap-16 pl-8 md:pl-24">
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className="absolute -left-8 md:-left-24 top-1 w-4 h-4 rounded-full border-2 border-[#0d0d0d] shadow-lg"
                style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}80` }}
              ></div>
              <div className="group p-6 md:p-8 rounded-2xl border border-white/8 bg-white/4 hover:bg-white/8 transition-all duration-300 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="font-semibold mt-1" style={{ color: exp.color }}>{exp.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white/50 text-sm">{exp.date}</p>
                    <p className="text-white/30 text-xs mt-1">{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                      <span style={{ color: exp.color }} className="mt-1.5 shrink-0 text-xs">▸</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Experience;
