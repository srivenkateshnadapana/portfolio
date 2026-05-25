import { useEffect, useRef } from 'react';
import TagCloud from 'TagCloud';

const SkillSphere = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const texts = [
      'ROS', 'PLC', 'AWS', 'GCP',
      'Python', 'SQL', 'MERN Stack',
      'ESP32', 'IoT', 'GenAI',
      'Linux', 'MongoDB', 'React',
      'Node.js', 'Express', 'C'
    ];

    const options = {
      radius: 140,
      maxSpeed: 'fast',
      initSpeed: 'normal',
      direction: 135,
      keep: true,
    };

    // Initialize TagCloud
    const tagCloud = TagCloud(containerRef.current, texts, options);

    // Styling logic applied dynamically by TagCloud, 
    // we use CSS module or inline styling for colors.
    const interval = setInterval(() => {
        const items = containerRef.current?.querySelectorAll('.tagcloud--item');
        if (items) {
            items.forEach(item => {
                // Randomize colors slightly between our core theme colors
                item.style.color = Math.random() > 0.5 ? '#10b981' : (Math.random() > 0.5 ? '#6366f1' : '#a855f7');
                item.style.fontFamily = 'sans-serif';
                item.style.fontWeight = '500';
            });
        }
    }, 1000);

    return () => {
      clearInterval(interval);
      tagCloud.destroy();
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-[320px] overflow-hidden text-sm">
      <div ref={containerRef} className="tagcloud-container"></div>
      <style>{`
        .tagcloud-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .tagcloud--item {
          cursor: pointer;
          transition: color 0.3s;
        }
        .tagcloud--item:hover {
          color: #fff !important;
          font-weight: 700 !important;
        }
      `}</style>
    </div>
  );
};

export default SkillSphere;
