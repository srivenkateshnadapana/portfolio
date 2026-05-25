# Implementation Plan: Interactive 3D Cybernetic Neural Network Grid (Option B)

We will replace the 3D face mesh in your portfolio with a **Full-Screen Interactive 3D Cybernetic Neural Network Grid** (Option B). This design presents a network of floating, glowing nodes connected by dynamic vector lines in a dark WebGL space. It will act as a premium, non-intrusive full-screen background behind your text, communicating AI, robotics, and hardware systems connectivity.

---

## Proposed Changes

### 🎨 1. Full-Screen Sticky Canvas Setup ([Hero.jsx](file:///c:/Users/bndev/Documents/portfolio/src/components/Hero.jsx))
* **Modify Container**: We will change the canvas container from its current boxed layout (`max-w-[900px] h-[85vh] bottom-0`) to a **full-screen background layer** inside the Hero sticky container:
  ```html
  <div className="absolute inset-0 z-10 w-full h-full pointer-events-none select-none">
    <HolographicFace scrollYProgress={scrollYProgress} />
  </div>
  ```
* **Why**: This expands the WebGL field to cover the entire viewport behind your titles, preventing any boxed boundaries.

### 🧠 2. 3D Neural Network Grid ([HolographicFace.jsx](file:///c:/Users/bndev/Documents/portfolio/src/components/HolographicFace.jsx))
We will completely rewrite `HolographicFace.jsx` to render the interactive grid:
* **Interactive 3D Nodes**: Render a system of 80–100 glowing nodes (spheres or high-end point sprites) floating in a 3D volume.
* **Dynamic Connection Lines**: On every frame, calculate the distance between all nodes. Draw fine, glowing, semi-transparent cyan/violet connection lines between nodes that drift close to each other.
* **Studio Grids & Lighting**: 
  * Left directional light (neon violet) and right directional light (cyan) cast reflections off the nodes.
  * The interactive cursor pointlight (emerald green) sweeps across the nodes on mouse hover, illuminating the network locally.
* **Damped Mouse Parallax**: Mouse movements tilt and rotate the entire grid in 3D parallax to follow your cursor, creating immersive depth.
* **Scroll-Driven Dispersion (Scroll = 0 to 1)**:
  * **At Scroll = 0**: The network is tightly knit, glowing, and perfectly centered behind the title.
  * **As You Scroll**: The nodes smoothly disperse (fly apart in 3D space) and fade to transparent, dissolving gracefully before the next section slides up.
* **Memory Management**: Complete deallocation of all line segments, node geometries, materials, and WebGL contexts during unmount to prevent leaks.

### 🧼 3. Clean Up Face Assets & Git Repository
We will completely purge the face-related files and assets from the local workspace and stage them for remote repository removal:
* **[DELETE]** `public/face_only.png` (face crop)
* **[DELETE]** `public/noir_head.png` (clay face crop)
* **[DELETE]** `public/noir_contemplation.png` (clay full preview)
* **[DELETE]** `public/models/` folder (unused GLB models directory)
* **Git Actions**: Run `git rm` on these assets to cleanly untrack and delete them so they are completely removed from the remote repository upon your next git push.

---

## Verification Plan

### Automated & Manual Verification
1. Verify the project builds cleanly using `cmd.exe /c npm run build`.
2. Verify git status has untracked/deleted all face assets.
3. Test locally to ensure:
   * The neural grid fills the entire screen behind the header.
   * Floating text lines (`Sri Venkatesh Nadapana`) remain fully highlightable and clickable (`pointer-events-none` active on the canvas).
   * Hovering the mouse tilts the network and sweeps the green pointlight across the nodes.
   * Scrolling down disperses the network lines and fades the grid out.
