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
          // Three.js is ~600 kB on its own — isolate it completely
          'vendor-three': ['three'],
          // Animation library
          'vendor-framer': ['framer-motion'],
          // Icon library
          'vendor-icons': ['react-icons', 'lucide-react'],
        },
      },
    },
  },
});
