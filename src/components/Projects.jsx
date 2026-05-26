import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, BookOpen, Cpu, LineChart, PieChart, GitBranch, Database } from 'lucide-react';

const projects = [
  {
    id: '01',
    tag: 'Full Stack & EdTech',
    title: 'Next-Gen IT LMS Portal',
    desc: 'Designed and built a scalable LMS platform to deliver advanced technical curriculum, track user progress, and manage live-learning metrics.',
    bullet: 'Blockchain-based Certification verification for tamper-proof credentials.',
    icon: BookOpen,
    color: '#a855f7',
    tech: ['MERN Stack', 'Supabase', 'Vercel', 'Git'],
  },
  {
    id: '02',
    tag: 'IoT & Embedded Systems',
    title: 'Cloud Smart Home Automation',
    desc: 'Built an end-to-end smart automation framework capable of remote environmental monitoring, lighting, and appliance control.',
    bullet: 'Engineered secure, low-latency telemetry with end-to-end cloud security protocols.',
    icon: Cpu,
    color: '#3b82f6',
    tech: ['IoT Microcontrollers', 'AWS/GCP IoT Core', 'Real-Time Telemetry'],
  },
  {
    id: '03',
    tag: 'Machine Learning & Analytics',
    title: 'Customer Churn Prediction Engine',
    desc: 'Developed a predictive analytics machine learning pipeline to identify high-risk customer drop-offs based on historical behavioral datasets.',
    bullet: 'Fine-tuned algorithms to optimize precision and recall scores for actionable insights.',
    icon: LineChart,
    color: '#f59e0b',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn'],
  },
  {
    id: '04',
    tag: 'DevOps & Cloud Infrastructure',
    title: 'CI/CD Cloud Pipelines',
    desc: 'Designed and demonstrated production-ready Continuous Integration / Continuous Deployment (CI/CD) pipelines for technical hackathons and demonstrations.',
    bullet: 'Deployed frontend and backend updates seamlessly to Vercel and cloud instances.',
    icon: GitBranch,
    color: '#06b6d4',
    tech: ['Git', 'GitHub', 'Vercel', 'Ubuntu/Parrot OS'],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-24 bg-[#0a0a0a]">

      <motion.div
        className="flex items-center gap-4 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#f59e0b] text-sm tracking-[0.3em] uppercase font-light">03 / Projects</span>
        <div className="flex-1 h-px bg-white/10" />
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white mb-16 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Things I've{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ef4444]">built</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="group relative p-8 rounded-3xl border border-white/10 overflow-hidden cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
          >
            {/* Inset glow on hover — exact reference site technique */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
              style={{
                boxShadow: `inset 0 0 60px ${project.color}20`,
                border: `1px solid ${project.color}40`,
              }}
            />

            {/* Top accent stripe */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: `linear-gradient(to right, ${project.color}, ${project.color}60)` }}
            />

            {/* Faded project number watermark */}
            <span
              className="text-6xl font-bold opacity-10 absolute top-4 right-6 select-none"
              style={{ color: project.color }}
            >
              {project.id}
            </span>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2 mr-12">
                <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: project.color }}>
                  {project.tag}
                </p>
                {project.icon && (
                  <span style={{ color: project.color }} className="opacity-80">
                    <project.icon size={16} strokeWidth={1.5} />
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">{project.desc}</p>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-6"
                style={{
                  background: `${project.color}15`,
                  border: `1px solid ${project.color}30`,
                  color: project.color,
                }}
              >
                <span>✦</span>
                <span>{project.bullet}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/40">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default Projects;
