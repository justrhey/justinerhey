import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  plugins: [react(), wasm()],
  base: process.env.BASE_URL || '/',
  assetsInclude: ['**/*.glb'],
  optimizeDeps: {
    exclude: ['@react-three/rapier', '@dimforge/rapier3d-compat'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext',
  },
  worker: {
    format: 'es',
  },
});
