import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import environment from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    react(),
    environment(['VITE_API_URL', 'VITE_STRIPE_PUBLIC_KEY'])
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});