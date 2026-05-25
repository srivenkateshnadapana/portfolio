import { motion } from 'framer-motion';
import { Terminal, Cpu, LineChart, PieChart, ShieldCheck, Leaf } from 'lucide-react';
import GlowCard from './GlowCard';


const Projects = () => {
  const projects = [
    {
      id: "01",
      tag: "Healthcare Tech & NFC",
      title: "Hridhaya",
      desc: "A digital healthcare solution leveraging NFC-based technology to improve healthcare accessibility and patient data management.",
      bullet: "Secured INR 30,000 funding from the Swarnandhra RDC Cell.",
      icon: ShieldCheck,
      color: "#6366f1",
      tech: ["React", "Figma", "NFC Technology", "Systems Architecture"]
    },
    {
      id: "02",
      tag: "Sustainable AgTech",
      title: "Aeroponic Farm Platform",
      desc: "Developed official platforms for aeroponic farming, showcasing industrial automation and sustainable agricultural practices.",
      bullet: "Tallest aeroponic tower recorded in India Book of Records.",
      icon: Leaf,
      color: "#10b981",
      tech: ["React.js", "Industrial Automation", "Team Project"]
    },
    {
      id: "03",
      tag: "Full Stack & EdTech",
      title: "Next-Gen IT LMS Portal",
      desc: "Designed and built a scalable LMS platform using a microservices approach to deliver curriculum, track progress, and verify certificates.",
      bullet: "Seamlessly supports high concurrency during live sessions.",
      icon: Terminal,
      color: "#a855f7",
      tech: ["MERN Stack", "Supabase", "Vercel", "Web3 Concepts"]
    },
    {
      id: "04",
      tag: "IoT & Cloud Architecture",
      title: "Cloud Smart Home Automation",
      desc: "Developed a fully integrated IoT solution using ESP32 microcontrollers and the Blynk platform, featuring hazard alerts and MQTT.",
      bullet: "Built custom mobile interfaces with automated water management.",
      icon: Cpu,
      color: "#3b82f6",
      tech: ["ESP32", "Blynk", "MQTT", "AWS/GCP IoT Core"]
    },
    {
      id: "05",
      tag: "Machine Learning & Analytics",
      title: "Customer Churn Prediction Engine",
      desc: "Developed a predictive analytics pipeline to identify high-risk customer drop-offs through rigorous EDA and classification modeling.",
      bullet: "Optimized precision and recall scores for business insights.",
      icon: LineChart,
      color: "#f59e0b",
      tech: ["Python", "Pandas", "Scikit-Learn", "Jupyter"]
    },
    {
      id: "06",
      tag: "FinTech / AI",
      title: "Financial Analytics Framework",
      desc: "An agile, AI-driven financial analytics module utilizing low-code ML wrappers to build forecasting models directly on cloud spreadsheets.",
      bullet: "Rapid turnaround data tracking for fast-paced environments.",
      icon: PieChart,
      color: "#ec4899",
      tech: ["SimpleML", "Quadratic AI", "Google Sheets"]
    }
  ];

  return (
    <section id="projects" className="relative py-32 px-6 md:px-24 bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[#f59e0b] text-sm tracking-[0.3em] uppercase font-light">
          03 / Projects
        </span>
        <div className="flex-1 h-px bg-white/10"></div>
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 leading-tight"
      >
        Things I've <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ef4444]">built</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: index * 0.1 }}
            className="h-full flex flex-col"
          >
            <GlowCard
              glowColor={project.color}
              className="p-8 rounded-3xl border border-white/10 cursor-pointer h-full"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl z-20"
                style={{ background: `linear-gradient(to right, ${project.color}, ${project.color}60)` }}
              ></div>
              <span
                className="text-6xl font-bold opacity-10 absolute top-4 right-6 select-none z-0"
                style={{ color: project.color }}
              >
                {project.id}
              </span>
              
              <div className="relative z-10">
                <p className="text-xs tracking-widest uppercase mb-2" style={{ color: project.color }}>
                  {project.tag}
                </p>
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-6"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                  }}
                >
                  <project.icon size={13} className="shrink-0" />
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
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
