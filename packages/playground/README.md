# @electron-buddy-playground

This is a playground for using `@electron-buddy` package and other core packages.

## Core Dependencies

```bash
pnpm add -D typescript vite electron electron-builder @electron-buddy/vite-plugin
```

## Core Scripts

```json
...
  "main": "dist/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "electron-buddy --preview",
    "build:win-unpacked": "electron-builder --win --dir",
    "build:mac-unpacked": "electron-builder --mac --dir",
    "build:win": "electron-builder --win",
    "build:mac": "electron-builder --mac"
  }
...
```

## Core configs

### `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import { electron } from '@electron-buddy/vite-plugin';

export default defineConfig({
  root: './renderer',
  plugins: [electron()]
});

```

### `electron-builder.ts`

```ts
import { Configuration } from 'electron-builder';

const options: Configuration = {
  appId: 'com.electron-buddy.playground', // your product id
  productName: 'Electron-Buddy-Playground', // your product name
  artifactName: '${productName}-${version}-${os}.${ext}',
  directories: {
    output: 'release/${version}'
  },
  files: ['dist'],
  nsis: {
    deleteAppDataOnUninstall: true
  },
  win: {
    target: [
      {
        target: 'nsis', // 'nsis' for auto updater
        arch: ['x64']
      }
    ]
  },
  mac: {
    target: [
      {
        target: 'dmg', // 'dmg' for auto updater
        arch: ['universal']
      }
    ]
  }
};

export default options;
```
