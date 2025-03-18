import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/portable-prodapp/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});