import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { copyEmailAndToast } from '../utils/toast';

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-24 bg-[#0d0d0d] overflow-hidden reveal">
      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#6366f1] opacity-10 blur-[100px] pointer-events-none" />

      <motion.div
        className="flex items-center gap-4 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[#ec4899] text-sm tracking-[0.3em] uppercase font-light">06 / Contact</span>
        <div className="flex-1 h-px bg-white/10" />
      </motion.div>

      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Let's build something{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ec4899] to-[#6366f1]">great</span>{' '}
          together.
        </motion.h2>

        <motion.p
          className="text-white/50 text-lg mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Whether it's a startup idea, a creative project, or just a conversation — I'm open to connecting.
        </motion.p>

        <motion.a
          href="mailto:nadapanasrivenkatesh1@gmail.com"
          onClick={(e) => copyEmailAndToast(e)}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg mb-16 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            boxShadow: '0 0 40px rgba(99,102,241,0.4)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span>✉</span>
          <span>nadapanasrivenkatesh1@gmail.com</span>
        </motion.a>

        <motion.div
          className="flex justify-center gap-6 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="https://www.linkedin.com/in/sri-venkatesh-nadapana-592471280/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm font-medium transition-all duration-300 hover:border-white/30"
            style={{ color: '#3b82f6' }}
          >
            <FaLinkedin size={18} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/srivenkateshnadapana"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm font-medium transition-all duration-300 hover:border-white/30"
            style={{ color: '#a5b4fc' }}
          >
            <FaGithub size={18} />
            <span>GitHub</span>
          </a>
          <a
            href="https://wa.me/917013153753"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm font-medium transition-all duration-300 hover:border-white/30"
            style={{ color: '#34d399' }}
          >
            <FaWhatsapp size={18} />
            <span>WhatsApp</span>
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/20 text-sm">
          © 2026 Sri Venkatesh Nadapana. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Contact;
