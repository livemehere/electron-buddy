<p align="center">
  <img width="600" src="https://github.com/livemehere/electron-buddy/blob/master/docs/img/electron-buddy-vite-plugin.jpg?raw=true">
</p>
<div align="center">
  <h1>@electron-buddy/playgroud</h1>
</div>

<p align="center">
    This is a playground for using `@electron-buddy` package and other core packages.
</p>

## Core Dependencies

```bash
pnpm add -D typescript vite electron electron-builder @electron-buddy/vite-plugin
```

## Core Scripts

> ❗️Build each platform separately to prevent any issues. (If you build for Windows on macOS, the NSIS uninstall.exe may fail.)

```json
...
  "main": "dist/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "electron-buddy --preview",
    "unpack:win": "pnpm build && electron-builder --win --dir", // build with excutable program without packaging.
    "unpack:mac": "pnpm build && electron-builder --mac --dir", // build with excutable program without packaging.
    "package:win": "pnpm build && electron-builder --win --publish never", // build with packaging.
    "package:mac": "pnpm build && electron-builder --mac --publish never", // build with packaging.
    "publish:win": "pnpm build && electron-builder --win --publish always", // build with packaging and publish to (github|s3|...).
    "publish:mac": "pnpm build && electron-builder --mac --publish always" // build with packaging and publish to (github|s3|...).
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
    appId: 'com.electron-buddy.playground', // Your app id
    productName: 'Electron-Buddy-Playground', // Your app name
    artifactName: '${productName}-${version}-${os}.${ext}',
    directories: {
        output: 'release/${version}'
    },
    files: ['dist'],
    nsis: {
        deleteAppDataOnUninstall: true
    },
    publish: {
        provider: 'github', // Your publish provider
        owner: 'livemehere', // if github, your name
        repo: 'electron-buddy' // if github, your repo name
    },
    win: {
        target: [
            {
                target: 'nsis',
                arch: ['x64']
            }
        ]
    },
    mac: {
        target: [
            {
                target: 'dmg',
                arch: ['universal']
            }
        ]
    }
};

export default options;

```
