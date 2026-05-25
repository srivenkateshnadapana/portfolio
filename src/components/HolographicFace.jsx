import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HolographicFace = ({ scrollYProgress }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let renderer;
    let scene;
    let camera;
    let pointsMesh;
    let geometry;

    const img = new Image();
    img.src = '/profile.png';

    img.onload = () => {
      // 1. Define portrait dimensions for the canvas scan
      const width = 120;
      const height = 160;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Draw profile image onto temp canvas to scan its pixels
      tempCtx.drawImage(img, 0, 0, width, height);
      const imgData = tempCtx.getImageData(0, 0, width, height);
      const pixels = imgData.data;

      // 2. Scan valid pixels and extract 3D point cloud properties
      const positionsArray = [];
      const initialPositionsArray = [];
      const colorsArray = [];

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const a = pixels[index + 3];

          // Filter out the black background and transparent pixels
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          if (a > 50 && luminance > 25) {
            // Map 2D pixel coordinates (x, y) to centered 3D coordinates (X, Y)
            const posX = ((x / width) - 0.5) * 6.5;
            const posY = -(((y / height) - 0.5) * 8.5); // flip Y axis

            // Calculate Z-depth relative to brightness (brighter = closer to viewer)
            const posZ = (luminance / 255.0) * 1.5;

            positionsArray.push(posX, posY, posZ);
            initialPositionsArray.push(posX, posY, posZ);
            colorsArray.push(r / 255.0, g / 255.0, b / 255.0);
          }
        }
      }

      const numPoints = positionsArray.length / 3;
      if (numPoints === 0) return;

      // 3. Set up Three.js Scene, Camera, and WebGL Renderer
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
      renderer.setSize(containerWidth, containerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 4. Create standard BufferGeometry and dynamic attributes
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionsArray), 3));
      geometry.setAttribute('initialPosition', new THREE.BufferAttribute(new Float32Array(initialPositionsArray), 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorsArray), 3));

      // 5. Generate programmatically a soft round circular particle texture
      const createCircleTexture = () => {
        const c = document.createElement('canvas');
        c.width = 32;
        c.height = 32;
        const ctx = c.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.3, 'rgba(200, 220, 255, 0.8)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
        return new THREE.CanvasTexture(c);
      };

      const pointsMaterial = new THREE.PointsMaterial({
        size: 0.065,
        map: createCircleTexture(),
        transparent: true,
        opacity: 0.9,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      pointsMesh = new THREE.Points(geometry, pointsMaterial);
      scene.add(pointsMesh);

      // 6. Set up Mouse Interactions
      const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const clientX = e.clientX - rect.left;
        const clientY = e.clientY - rect.top;
        // Normalize mouse to [-0.5, 0.5] range
        mouse.targetX = (clientX / rect.width) - 0.5;
        mouse.targetY = (clientY / rect.height) - 0.5;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // 7. Core Render Loop
      let time = 0;

      const render = () => {
        time += 0.01;

        // Smoothly interpolate mouse coordinates (damping ease-out)
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;

        // Read scroll progress (from 0.0 to 1.0)
        const scrollVal = scrollYProgress ? scrollYProgress.get() : 0;

        // Drive mesh rotations using a combination of mouse hover, scroll, and autowave
        const targetRotY = (scrollVal * Math.PI * 1.5) + (mouse.x * Math.PI * 0.3) + Math.sin(time * 0.2) * 0.05;
        const targetRotX = (mouse.y * Math.PI * 0.2) + Math.cos(time * 0.2) * 0.05;

        pointsMesh.rotation.y = targetRotY;
        pointsMesh.rotation.x = targetRotX;

        // Dynamic morphing: Scatter particles outward as scroll progress increases
        const positions = geometry.attributes.position.array;
        const initialPos = geometry.attributes.initialPosition.array;

        // Determine dynamic scale (shrinks slightly as it dissolves away)
        const currentScale = 1 - (scrollVal * 0.25);
        pointsMesh.scale.setScalar(currentScale);

        // Apply point-by-point scatter calculations
        for (let i = 0; i < positions.length; i += 3) {
          const idx = i;
          // Apply progressive scattering (quadratic curve for faster explosion at the end)
          const scatterIntensity = scrollVal * scrollVal * 3.5;
          const individualSeed = idx * 17.58;

          positions[idx] = initialPos[idx] + Math.sin(individualSeed + time * 0.4) * scatterIntensity * 0.3;
          positions[idx + 1] = initialPos[idx + 1] + Math.cos(individualSeed + time * 0.4) * scatterIntensity * 0.3;
          // Heavily explode along the depth (Z) axis for holographic dissolve depth
          positions[idx + 2] = initialPos[idx + 2] + Math.sin(individualSeed * 0.5 + time * 0.4) * scatterIntensity * 1.8;
        }
        geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(render);
      };

      render();

      // 8. Handle dynamic viewport resizing
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;

        camera.aspect = w / h;
        camera.updateProjectionMatrix();

        renderer.setSize(w, h);
      };

      window.addEventListener('resize', handleResize);

      // Cleanups when unmounting
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        // Deallocate GPU assets to prevent memory leaks
        if (geometry) geometry.dispose();
        if (pointsMaterial) pointsMaterial.dispose();
        if (renderer) renderer.dispose();
      };
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default HolographicFace;
