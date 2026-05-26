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
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom'],
          // Animation library
          'vendor-framer': ['framer-motion'],
          'vendor-gsap': ['gsap', '@gsap/react'],
          // Icon library
          'vendor-icons': ['react-icons', 'lucide-react'],
        },
      },
    },
  },
});
