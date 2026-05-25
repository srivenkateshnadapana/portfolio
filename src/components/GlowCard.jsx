import React, { useRef } from 'react';

const GlowCard = ({ 
  children, 
  className = '', 
  glowColor = '#6366f1', 
  size = '350px',
  onClick,
  style = {}
}) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        ...style,
        position: 'relative',
      }}
    >
      {/* Background Spotlight Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(${size} circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor}15, transparent 80%)`,
        }}
      />

      {/* Border Spotlight Glow (Magnetic Border Highlight) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-[inherit]"
        style={{
          border: '1px solid transparent',
          background: `radial-gradient(${size} circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor}40, transparent 80%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
        }}
      />

      {children}
    </div>
  );
};

export default GlowCard;
