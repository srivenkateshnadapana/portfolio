import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      id: "01",
      tag: "Robotics & Automation",
      title: "Warehouse Rover",
      desc: "An autonomous warehouse navigation rover built using ROS and LiDAR. Includes obstacle avoidance and dynamic path planning.",
      bullet: "✦ Achieved 95% navigation accuracy in dynamic environments.",
      color: "#6366f1",
      tech: ["C++", "ROS", "Python", "Raspberry Pi"]
    },
    {
      id: "02",
      tag: "Cloud Infrastructure",
      title: "AutoDeploy Nexus",
      desc: "A scalable CI/CD pipeline infrastructure deploying containerized applications across multi-cloud environments.",
      bullet: "✦ Reduced deployment times by 40% across 5 projects.",
      color: "#10b981",
      tech: ["Docker", "Kubernetes", "AWS", "Jenkins"]
    },
    {
      id: "03",
      tag: "Educational Tool",
      title: "VirtuLab Environment",
      desc: "A simulated virtual laboratory for robotics students to test physics and kinematics algorithms before hardware deployment.",
      bullet: "✦ Used by 200+ students for practical learning.",
      color: "#f59e0b",
      tech: ["Python", "PyBullet", "React", "Node.js"]
    },
    {
      id: "04",
      tag: "AI Integration at Ford",
      title: "Ford Web Studio AI",
      desc: "Integrated AI components and ADK agents into Ford's internal development platforms, enhancing automation efficiency.",
      bullet: "✦ 30% increase in development efficiency.",
      color: "#3b82f6",
      tech: ["Python", "Java", "ADK Agents", "React"]
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
            className="group relative p-8 rounded-3xl border border-white/10 overflow-hidden cursor-pointer"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
              style={{
                boxShadow: `inset 0 0 60px ${project.color}20`,
                border: `1px solid ${project.color}40`,
              }}
            ></div>
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: `linear-gradient(to right, ${project.color}, ${project.color}60)` }}
            ></div>
            <span
              className="text-6xl font-bold opacity-10 absolute top-4 right-6 select-none"
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
                {project.bullet}
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
