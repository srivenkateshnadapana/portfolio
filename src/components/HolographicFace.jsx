import React, { useEffect, useRef, useCallback } from 'react';

const HolographicFace = ({ scrollYProgress }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const activeFrame = useRef(0);
  const animationRef = useRef(null);

  // High-performance canvas drawer with responsive 'background-size: cover' aspect ratio fitting
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width: canvasWidth, height: canvasHeight } = canvas;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    // Aspect ratio fitting logic matching background-size: cover
    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // 1. Viewport fitting and canvas resize handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(activeFrame.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // 2. Preload all 63 transparent sequence frames into memory
  useEffect(() => {
    const images = [];
    let loadedCount = 0;

    for (let i = 0; i < 63; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(2, '0');
      img.src = `/sequence/frame_${paddedIndex}_delay-0.058s.png`;
      
      img.onload = () => {
        loadedCount++;
        // Draw the frame immediately if it matches the current frame
        if (i === activeFrame.current) {
          drawFrame(activeFrame.current);
        }
        // Draw the first frame when all assets are loaded
        if (loadedCount === 63) {
          drawFrame(activeFrame.current);
        }
      };
      
      images.push(img);
    }
    
    imagesRef.current = images;
  }, [drawFrame]);

  // 3. Throttle scroll listener utilizing requestAnimationFrame for a buttery 60fps render cycle
  useEffect(() => {
    if (!scrollYProgress) return;

    const unsubscribe = scrollYProgress.on('change', (latestProgress) => {
      // Map scroll progress [0, 1] to frame index [0, 62]
      const frameIndex = Math.round(62 * Math.max(0, Math.min(1, latestProgress)));
      activeFrame.current = frameIndex;

      // Cancel any pending animations to prevent frame skipping or overlap
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      // Schedule canvas draw throttled to the monitor's active refresh rate
      animationRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
      });
    });

    return () => {
      unsubscribe();
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollYProgress, drawFrame]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    </div>
  );
};

export default HolographicFace;
