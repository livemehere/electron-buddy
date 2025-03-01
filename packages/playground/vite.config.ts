import { defineConfig } from 'vite';
import { electron } from '@electron-buddy/vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './renderer',
  plugins: [electron({
    main:{
      alias:{
        "@shared": "../shared"
      }
    },
    copyDirs:[
      './assets/icons'
    ]
  }), react()],
  resolve:{
    alias:{
      '@renderer': '../renderer',
      "@shared": "../shared",
    }
  }
});
