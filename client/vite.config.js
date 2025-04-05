import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import environment from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    react({
      // Additional React plugin options
      jsxImportSource: '@emotion/react', // If using Emotion
      babel: {
        plugins: ['@emotion/babel-plugin'], // If using Emotion
      },
    }),
    environment(['VITE_API_URL', 'VITE_STRIPE_PUBLIC_KEY'], {
      prefix: 'VITE_', // Optional prefix for env vars
      loadEnvFiles: true, // Load .env files automatically
    }),
  ],
  
  server: {
    port: 3000, // Explicit default port
    strictPort: true, // Don't try other ports if 3000 is busy
    open: true, // Automatically open browser
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,
        configure: (proxy) => {
          // Optional proxy event handlers
          proxy.on('error', (err) => console.error('Proxy error:', err));
        }
      },
      '/products': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // Additional headers if needed
        headers: {
          Connection: 'keep-alive'
        }
      }
    }
  },
  
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCaseOnly', // More strict than camelCase
      generateScopedName: '[name]__[local]___[hash:base64:5]' // Custom class naming
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";` // Global SCSS imports
      }
    }
  },
  
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      // Add more aliases as needed
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // File extensions to resolve
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true, // Generate source maps for production
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create vendor chunks for better caching
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  
  optimizeDeps: {
    include: [
      // List dependencies that need to be pre-bundled
      'react',
      'react-dom',
      '@emotion/react'
    ],
    exclude: [
      // Exclude dependencies that don't need optimization
    ]
  }
});