import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') && id.includes('react-dom')) return 'vendor-react';
          if (id.includes('node_modules/framer-motion')) return 'vendor-framer';
          if (id.includes('node_modules/gsap') || id.includes('@gsap/react')) return 'vendor-gsap';
          if (id.includes('node_modules/react-icons') || id.includes('lucide-react')) return 'vendor-icons';
        },
      },
    },
  },
});
