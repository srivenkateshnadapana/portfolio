import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: 'Data Analytics Internship Mentor',
    company: 'Aditya Degree College',
    date: 'Dec 2025 – Mar 2026',
    location: 'India',
    color: '#10b981',
    details: [
      'Conducted specialized hands-on training for B.Sc Computer Science students, focusing on technical upskilling, logic development, and project building.',
    ],
  },
  {
    role: 'Associate Developer',
    company: 'Adhoc Network Tech',
    date: 'Mar 2026 – Present',
    location: 'Vizag, A.P',
    color: '#a855f7',
    details: [
      'Full Stack Developer using the MERN Stack for developing scalable web applications.',
      'Developed and maintained LMS portals, handling both front-end and back-end functionalities.',
      'Contributed to deployment, debugging, and multiple company projects with the core development team.',
    ],
  },
  {
    role: 'Senior Technical Trainer',
    company: 'Adhoc Network Tech',
    date: 'Aug 2025 – Mar 2026',
    location: 'Onsite / Remote & Vizag, A.P',
    color: '#6366f1',
    details: [
      'Leading technical training for MERN stack, DevOps, and AI. Developing comprehensive curricula for long-term and short-term technical internships.',
      'Mentored 200+ students across Aditya Degree Colleges on Full-Stack Development and Data Analytics Using Python (APSCHE & AP Govt initiatives).',
    ],
  },
  {
    role: 'Robotics STEM Trainer & Educator',
    company: 'Robochamps / International School Shaikpet',
    date: 'June 2024 – Feb 2025',
    location: 'Hyderabad',
    color: '#ec4899',
    details: [
      'Conducted weekly hardware and theory sessions for over 100 Cambridge IGCSE and ICSE students in robotics fundamentals.',
      'Mentored student cohorts in designing and programming functional mobile robotics and embedded IoT applications.',
    ],
  },
  {
    role: 'Technical Intern',
    company: 'CodSoft & IES / APSSDC',
    date: 'Aug 2022 – July 2025',
    location: 'Remote',
    color: '#f59e0b',
    details: [
      'Selected for the CodSoft Internship Program (July Batches B37 & B39).',
      'Completed International Internship on Emerging Technologies collaborating with IES & APSSDC.',
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="relative py-32 px-6 md:px-24 bg-[#0d0d0d]">

      <motion.div
        className="flex items-center gap-4 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#10b981] text-sm tracking-[0.3em] uppercase font-light">02 / Experience</span>
        <div className="flex-1 h-px bg-white/10" />
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white mb-16 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Where I've{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#6366f1]">worked</span>
      </motion.h2>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#6366f1] via-[#10b981] to-transparent" />

        <div className="flex flex-col gap-16 pl-8 md:pl-24">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              {/* Timeline dot */}
              <div
                className="absolute -left-8 md:-left-24 top-1 w-4 h-4 rounded-full border-2 border-[#0d0d0d] shadow-lg"
                style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}80` }}
              />

              {/* Card — exact reference site style: plain hover, no mouse-tracking glow */}
              <div className="group p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-sm">

                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="mt-1 p-2 rounded-lg bg-white/5 border border-white/10 shrink-0"
                      style={{ color: exp.color }}
                    >
                      <Briefcase size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="font-semibold mt-1" style={{ color: exp.color }}>{exp.company}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white/50 text-sm">{exp.date}</p>
                    <p className="text-white/30 text-xs mt-1">{exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-3 pl-11">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                      <span className="mt-1.5 shrink-0 text-xs" style={{ color: exp.color }}>▸</span>
                      <span>{detail}</span>
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
