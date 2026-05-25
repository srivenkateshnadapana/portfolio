import { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled ? 'rgba(0,0,0,0.5)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        opacity: 1,
        transform: 'translateY(0px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-white font-bold text-lg tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">SVN</span>
          <span className="text-white/40 text-sm ml-1 font-light">/ portfolio</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-white/50 hover:text-white text-sm transition-colors duration-200 tracking-wide">About</a>
          <a href="#experience" className="text-white/50 hover:text-white text-sm transition-colors duration-200 tracking-wide">Experience</a>
          <a href="#projects" className="text-white/50 hover:text-white text-sm transition-colors duration-200 tracking-wide">Projects</a>
          <a href="#achievements" className="text-white/50 hover:text-white text-sm transition-colors duration-200 tracking-wide">Achievements</a>
          <a href="#leadership" className="text-white/50 hover:text-white text-sm transition-colors duration-200 tracking-wide">Leadership</a>
          <a href="#contact" className="text-white/50 hover:text-white text-sm transition-colors duration-200 tracking-wide">Contact</a>
        </div>
        <a
          href="mailto:nadapanasrivenkatesh1@gmail.com"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white"
          tabIndex="0"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
          }}
        >
          Hire Me
        </a>
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="flex flex-col gap-1.5">
            <span className="block w-6 h-0.5 bg-current transition-all"></span>
            <span className="block w-4 h-0.5 bg-current transition-all"></span>
            <span className="block w-6 h-0.5 bg-current transition-all"></span>
          </div>
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/10 absolute top-full left-0 w-full">
          <div className="flex flex-col items-center py-6 gap-4">
            {['About', 'Experience', 'Projects', 'Achievements', 'Leadership', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white text-lg transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
