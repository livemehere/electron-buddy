import { defineConfig } from 'vite';
import { electron } from '@electron-buddy/vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './renderer',
  plugins: [
    electron({
      outDir: './out',
      preload: {
        entry: './preload2/index.ts'
      },
      main: {
        entry: './main2/index.ts'
      }
    }),
    react()
  ]
});
