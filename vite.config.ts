import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Fix: Explicitly import 'process' to provide correct Node.js type definitions for process.cwd()
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Ensure process.env.API_KEY is always a string to prevent client-side crashes
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
