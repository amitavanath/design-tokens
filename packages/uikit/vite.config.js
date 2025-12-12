import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.ts', // Entry point to the library
      formats: ['es'], // Pure ESM package (enables browser support)
    },
  },
  plugins: [dts()], // Generate Typescript Definition Files 
});
