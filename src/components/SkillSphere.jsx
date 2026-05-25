import React, { useEffect, useRef } from 'react';
import TagCloud from 'TagCloud';

const SkillSphere = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const myTags = [
      'React.js', 'Node.js', 'MongoDB', 'Express.js',
      'Python', 'C++', 'Java', 'SQL',
      'ROS', 'PLC Automation', 'ESP32 / IoT', 'Arduino',
      'AWS Cloud', 'GCP DevOps', 'Docker', 'Git / GitHub',
      'GenAI APIs', 'Prompt Engineering', 'Kubernetes', 'Linux Systems'
    ];

    const options = {
      radius: 160,
      maxSpeed: 'fast',
      initSpeed: 'normal',
      direction: 135,
      keep: true
    };

    const tc = TagCloud(containerRef.current, myTags, options);

    // Style the tags inside the canvas container to be stardust fine
    const tagElements = containerRef.current.querySelectorAll('.tagcloud--item');
    tagElements.forEach(el => {
      el.style.color = '#8b5cf6';
      el.style.fontSize = '12px';
      el.style.fontWeight = '500';
      el.style.cursor = 'pointer';
      el.addEventListener('mouseover', () => {
        el.style.color = '#10b981';
      });
      el.addEventListener('mouseout', () => {
        el.style.color = '#8b5cf6';
      });
    });

    return () => {
      // Cleanup TagCloud
      tc.destroy();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-[320px] overflow-hidden">
      <div ref={containerRef} className="text-[#8b5cf6] font-semibold text-xs tracking-wider"></div>
    </div>
  );
};

export default SkillSphere;
