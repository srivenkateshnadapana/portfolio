import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-24 bg-[#0d0d0d] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#6366f1] opacity-10 blur-[100px] pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-16"
      >
        <span className="text-[#ec4899] text-sm tracking-[0.3em] uppercase font-light">
          06 / Contact
        </span>
        <div className="flex-1 h-px bg-white/10"></div>
      </motion.div>

      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#6366f1]">great</span> together.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.1 }}
          className="text-white/50 text-lg mb-12 leading-relaxed"
        >
          Whether it's a startup idea, a creative project, or just a conversation — I'm open to connecting.
        </motion.p>
        
        <motion.a
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true, delay: 0.2 }}
          href="mailto:nadapanasrivenkatesh1@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg mb-16 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)'
          }}
        >
          <span>✉</span> nadapanasrivenkatesh1@gmail.com
        </motion.a>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.3 }}
          className="flex justify-center gap-6 flex-wrap"
        >
          <a
            href="https://linkedin.com/in/nadapanasrivenkatesh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/15 text-sm font-medium transition-all duration-300 hover:border-white/30"
            style={{ color: '#3b82f6' }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/nadapanasrivenkatesh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/15 text-sm font-medium transition-all duration-300 hover:border-white/30"
            style={{ color: '#a5b4fc' }}
          >
            GitHub
          </a>
          <a
            href="https://wa.me/918977885516"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-white/15 text-sm font-medium transition-all duration-300 hover:border-white/30"
            style={{ color: '#34d399' }}
          >
            WhatsApp
          </a>
        </motion.div>
      </div>

      <div className="mt-24 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/20 text-sm">
          © 2026 Sri Venkatesh Nadapana.
        </p>
        <p className="text-white/20 text-sm">
          Crafted with care in Vizag, India 🇮🇳
        </p>
      </div>
    </section>
  );
};

export default Contact;
