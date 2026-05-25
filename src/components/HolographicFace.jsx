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
    let geometry;
    let material;
    let points;
    let clock = new THREE.Clock();

    const w = window.innerWidth;
    const h = window.innerHeight;

    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup (Perspective for rich depth parallax)
    camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer Setup
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Generate 18,000 particles with structured target coordinates (Circuit Board Grid)
    const PARTICLE_COUNT = 18000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const targets = new Float32Array(PARTICLE_COUNT * 3);
    const randoms = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // 4a. Initial Flow Position (Random distribution in a 3D volume)
      positions[i * 3] = (Math.random() - 0.5) * 12.0;     // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8.0;  // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.0;  // Z

      // 4b. Structured Target Coordinates (High-tech circuit pathways or neural grid)
      // We mathematically align them to a grid of lines, circles, and nodes!
      const group = i % 4;
      let tx = 0, ty = 0, tz = 0;

      if (group === 0) {
        // Group 0: Horizontal grid pathways
        const row = Math.floor(i / 100) % 7 - 3; // 7 rows
        tx = (Math.random() - 0.5) * 10.0;
        ty = row * 0.9;
        tz = (Math.random() - 0.5) * 0.8;
      } else if (group === 1) {
        // Group 1: Vertical grid pathways
        const col = Math.floor(i / 100) % 9 - 4; // 9 columns
        tx = col * 1.0;
        ty = (Math.random() - 0.5) * 7.0;
        tz = (Math.random() - 0.5) * 0.8;
      } else if (group === 2) {
        // Group 2: Circular hub rings (nodes)
        const ring = i % 3 + 1; // 3 concentric rings
        const angle = Math.random() * Math.PI * 2.0;
        const radius = ring * 1.1;
        const centerX = (i % 2 === 0) ? -2.2 : 2.2;
        tx = centerX + Math.cos(angle) * radius;
        ty = Math.sin(angle) * radius;
        tz = (Math.random() - 0.5) * 0.4;
      } else {
        // Group 3: Central dense circuit nodes
        tx = (Math.random() - 0.5) * 4.0;
        ty = (Math.random() - 0.5) * 4.0;
        tz = (Math.random() - 0.5) * 1.2;
      }

      targets[i * 3] = tx;
      targets[i * 3 + 1] = ty;
      targets[i * 3 + 2] = tz;

      // 4c. Individual speed and phases
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }

    geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aTarget', new THREE.BufferAttribute(targets, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    // 5. Custom Vertex & Fragment Shaders (GPU Accelerated Perlin Noise, Magnetic Ripple, and Grid Lerp)
    material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uScrollProgress: { value: 0.0 }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uScrollProgress;
        
        attribute vec3 aTarget;
        attribute vec3 aRandom;
        
        varying vec3 vPosition;
        varying float vOpacity;
        
        // Classic 3D Noise by Stefan Gustavson
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - D.yyy;
          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 1.0/7.0;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
        
        void main() {
          vec3 currentPos = position;
          
          // 1. Organic Vector Flow Field (Perlin Noise dynamic currents)
          float noiseX = snoise(vec3(position.x * 0.15, position.y * 0.15 + uTime * 0.08, position.z * 0.15));
          float noiseY = snoise(vec3(position.y * 0.15, position.x * 0.15 + uTime * 0.08, position.z * 0.15));
          
          currentPos.x += noiseX * 0.75;
          currentPos.y += noiseY * 0.75;
          
          // 2. Structured Grid Transition (Smoothly assemble into circuits as you scroll)
          float gridBlend = smoothstep(0.18, 0.46, uScrollProgress);
          currentPos = mix(currentPos, aTarget, gridBlend);
          
          // 3. Deep Space Scatter (Gracefully explode out into Z-axis past 0.78 progress)
          float scatterBlend = smoothstep(0.72, 0.94, uScrollProgress);
          vec3 scatterDirection = vec3(
            cos(aRandom.x * 6.28) * 4.5,
            sin(aRandom.y * 6.28) * 4.5,
            12.0 + aRandom.z * 18.0
          );
          currentPos = mix(currentPos, currentPos + scatterDirection, scatterBlend);
          
          // 4. Mouse Magnetic Repulsion Fluid Ripple (Interactive hover wave)
          float distToMouse = distance(currentPos.xy, uMouse);
          if (distToMouse < 2.2) {
            float rippleForce = smoothstep(2.2, 0.0, distToMouse);
            // Repel particles radially away from the mouse pointer coordinate
            vec2 repelDir = normalize(currentPos.xy - uMouse);
            currentPos.xy += repelDir * rippleForce * 0.58;
          }
          
          vPosition = currentPos;
          
          // 5. Opacity dissolve over scroll timeline
          vOpacity = 1.0 - smoothstep(0.85, 0.96, uScrollProgress);
          
          vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation (particles are extremely fine and elegant, preventing text occlusion)
          gl_PointSize = (1.1 + aRandom.x * 1.4) * (8.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        varying float vOpacity;
        uniform float uTime;
        
        void main() {
          // Render each particle as a soft, beautifully glowing fine neon circle
          float distToCenter = length(gl_PointCoord - vec2(0.5));
          float glowAlpha = smoothstep(0.5, 0.05, distToCenter) * 0.42;
          if (glowAlpha < 0.01) discard;
          
          // Harmonic gradient blend: Neon Indigo/Violet (#8b5cf6) to Vibrant Cyan (#06b6d4)
          vec3 colorIndigo = vec3(0.54, 0.36, 0.96);
          vec3 colorCyan = vec3(0.02, 0.71, 0.83);
          
          // Blending ratio driven by particle space coordinate and organic time phase
          float colorRatio = smoothstep(-5.0, 5.0, vPosition.x + sin(uTime * 0.4) * 2.0);
          vec3 finalColor = mix(colorIndigo, colorCyan, colorRatio);
          
          gl_FragColor = vec4(finalColor, glowAlpha * vOpacity);
        }
      `
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);

    // 6. Interactive Mouse Tracker
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to match Three.js coordinate bounds
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;
      
      // Map normalized coordinates [-0.5, 0.5] to 3D world boundary bounds [~ -6.5, 6.5]
      mouse.targetX = mouseX * 13.0;
      mouse.targetY = -mouseY * 8.5; // Invert Y coordinate
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 7. Core Animation Render Loop
    const render = () => {
      const time = clock.getElapsedTime();
      
      // Smoothly interpolate active mouse coordinate using elastic easing
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Update shader uniform variables on every frame
      material.uniforms.uTime.value = time;
      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      material.uniforms.uScrollProgress.value = scrollYProgress ? scrollYProgress.get() : 0;

      // Parallax rotation of the entire coordinate space
      points.rotation.y = (mouse.x * 0.02) + (time * 0.015);
      points.rotation.x = (mouse.y * 0.02);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 8. Resizing handler
    const handleResize = () => {
      if (!renderer || !camera) return;
      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;

      camera.aspect = wWidth / wHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(wWidth, wHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. Cleanup GPU allocation on unmount (zero memory leaks)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // Deallocate items from GPU
      if (renderer) renderer.dispose();
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, []); // Run exactly once on mount for absolute 60fps locking

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 select-none">
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
    </div>
  );
};

export default HolographicFace;
