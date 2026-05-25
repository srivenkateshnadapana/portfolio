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
    let nodes = [];
    let linesMesh;
    let linesGeometry;
    let linesMaterial;
    let clock = new THREE.Clock();

    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    // 1. Scene Setup
    scene = new THREE.Scene();

    // 2. Camera Setup (Perspective to create rich depth parallax)
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // 3. Renderer Setup with antialiasing and transparency
    renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lights Setup (Drama Cyberpunk Studio Lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Violet directional keylight (left)
    const keyLightLeft = new THREE.DirectionalLight('#8b5cf6', 3.5);
    keyLightLeft.position.set(-6, 5, 4);
    scene.add(keyLightLeft);

    // Cyan directional keylight (right)
    const keyLightRight = new THREE.DirectionalLight('#38bdf8', 3.5);
    keyLightRight.position.set(6, 5, 4);
    scene.add(keyLightRight);

    // Dynamic mouse-tracking emerald pointlight (sweeps locally across nodes)
    const cursorLight = new THREE.PointLight('#10b981', 6.0, 15, 1.2);
    cursorLight.position.set(0, 0, 3);
    scene.add(cursorLight);

    // 5. Neural Network Node Geometry & Material
    // We render each node as a real 3D sphere mesh so it catches directional lights and casts highlights!
    const nodeGeometry = new THREE.SphereGeometry(0.065, 8, 8);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: '#c084fc',      // Sleek matte neon violet/cyan clay
      roughness: 0.28,
      metalness: 0.18,
      transparent: true,
      opacity: 0.85
    });

    const NODE_COUNT = 85;
    const boundaryX = 5.6;
    const boundaryY = 3.6;
    const boundaryZ = 2.8;

    // Initialize nodes with random positions and velocity vectors
    for (let i = 0; i < NODE_COUNT; i++) {
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      mesh.position.set(
        (Math.random() - 0.5) * boundaryX * 1.8,
        (Math.random() - 0.5) * boundaryY * 1.8,
        (Math.random() - 0.5) * boundaryZ * 1.8
      );

      // Track standard physical coordinates separate from scroll displacement
      nodes.push({
        mesh: mesh,
        originalPosition: mesh.position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.010
        )
      });
      scene.add(mesh);
    }

    // 6. Neural Network Connections (Lines Setup)
    // We use a single high-performance LineSegments mesh for connecting vertices
    const maxConnections = NODE_COUNT * 4;
    const linePositions = new Float32Array(maxConnections * 2 * 3); // 2 points per line, 3 coords per point
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    // Dynamic glowing lines material
    linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5 // Note: WebGL linewidth is typically locked to 1.0 in most browsers, but we set for compatibility
    });

    linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // 7. Mouse Tracker Parallax
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((e.clientX - rect.left) / rect.width) - 0.5;
      mouse.targetY = ((e.clientY - rect.top) / rect.height) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 8. Core Animation Loop
    const render = () => {
      const time = clock.getElapsedTime();

      // Smooth mouse parallax easing
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update emerald light coordinates
      cursorLight.position.x = mouse.x * 10;
      cursorLight.position.y = -mouse.y * 10;
      cursorLight.position.z = 2.0;

      // Fetch scroll progress
      const scrollVal = scrollYProgress ? scrollYProgress.get() : 0;

      // Node dispersion and fade coefficients
      const dispersion = 1.0 + (scrollVal * 2.6); // Nodes fly apart outwards on scroll!
      const opacityCoeff = Math.max(0, Math.min(1, 1 - (scrollVal / 0.85)));

      // Update node materials opacity
      nodeMaterial.opacity = 0.85 * opacityCoeff;
      linesMaterial.opacity = 0.38 * opacityCoeff;

      // 8a. Physics & Coordinate Update
      nodes.forEach((node) => {
        // Apply velocity vectors
        node.originalPosition.add(node.velocity);

        // Boundary collision checks (bounce back)
        if (Math.abs(node.originalPosition.x) > boundaryX) node.velocity.x *= -1;
        if (Math.abs(node.originalPosition.y) > boundaryY) node.velocity.y *= -1;
        if (Math.abs(node.originalPosition.z) > boundaryZ) node.velocity.z *= -1;

        // Apply scroll-driven dispersion displacement
        node.mesh.position.copy(node.originalPosition).multiplyScalar(dispersion);

        // Subtle organic breathing float
        node.mesh.position.y += Math.sin(time * 0.5 + node.originalPosition.x) * 0.003;
      });

      // 8b. Recalculate Connection Lines dynamically
      let lineIndex = 0;
      const positionsAttr = linesGeometry.attributes.position;
      const colorsAttr = linesGeometry.attributes.color;

      const connectionThreshold = 1.85 * dispersion; // Threshold scales with dispersion to keep net connected!

      // Violet and Cyan colors for glowing gradients
      const colorLeft = new THREE.Color('#8b5cf6');
      const colorRight = new THREE.Color('#38bdf8');

      for (let i = 0; i < NODE_COUNT; i++) {
        const nodeA = nodes[i].mesh.position;

        for (let j = i + 1; j < NODE_COUNT; j++) {
          const nodeB = nodes[j].mesh.position;
          const dist = nodeA.distanceTo(nodeB);

          // If nodes are close enough, draw a line segment connecting them
          if (dist < connectionThreshold && lineIndex < maxConnections) {
            const index = lineIndex * 2;

            // Coordinates for Point A
            positionsAttr.setXYZ(index, nodeA.x, nodeA.y, nodeA.z);
            // Coordinates for Point B
            positionsAttr.setXYZ(index + 1, nodeB.x, nodeB.y, nodeB.z);

            // Set dynamic colors based on space position (creates stunning neon gradients!)
            const blendRatio = (nodeA.x + boundaryX * dispersion) / (2 * boundaryX * dispersion);
            const lineColor = colorLeft.clone().lerp(colorRight, blendRatio);

            // Fade line color at the connection limits
            const fade = (1.0 - (dist / connectionThreshold));
            const activeColor = lineColor.clone().multiplyScalar(fade);

            colorsAttr.setXYZ(index, activeColor.r, activeColor.g, activeColor.b);
            colorsAttr.setXYZ(index + 1, activeColor.r, activeColor.g, activeColor.b);

            lineIndex++;
          }
        }
      }

      // Flag attributes for WebGL updates
      positionsAttr.needsUpdate = true;
      colorsAttr.needsUpdate = true;
      linesGeometry.setDrawRange(0, lineIndex * 2);

      // 8c. Mouse Parallax rotation of the entire scene
      scene.rotation.y = (mouse.x * Math.PI * 0.25) + (scrollVal * Math.PI * 0.4);
      scene.rotation.x = (mouse.y * Math.PI * 0.18);

      // Render scene
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 9. Handle dynamic resizing
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const wWidth = container.clientWidth;
      const wHeight = container.clientHeight;

      camera.aspect = wWidth / wHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(wWidth, wHeight);
    };
    window.addEventListener('resize', handleResize);

    // 10. Cleanups when unmounting (Zero memory leaks)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      // Purge assets from GPU memory
      if (renderer) renderer.dispose();
      if (nodeGeometry) nodeGeometry.dispose();
      if (nodeMaterial) nodeMaterial.dispose();
      if (linesGeometry) linesGeometry.dispose();
      if (linesMaterial) linesMaterial.dispose();
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="w-full h-full relative flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default HolographicFace;
