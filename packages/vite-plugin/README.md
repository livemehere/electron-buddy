# @electron-buddy/vite-plugin

> 🚨 WIP project: no custom options are available yet. Please ensure the folder structure is followed as shown below.

This plugin simplifies the process of building an Electron application by focusing on the renderer while also seamlessly managing the builds for the main and preload processes. It allows for an easy setup and coordinated build process, making it more convenient to work with all parts of an Electron app in a unified workflow.

# Installation

```bash
npm i -D @electron-buddy/vite-plugin
yarn add -D @electron-buddy/vite-plugin
pnpm add -D @electron-buddy/vite-plugin
```

# Getting Started

## package.json

```json
{
  "main": "dist/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "preview"
  }
}
```

## vite.config.ts

> It’s recommended to set root to the renderer directory, not the root of the project.

```js
import { defineConfig } from 'vite';
import { electron } from '@electron-buddy/vite-plugin';

export default defineConfig({
  root: './renderer', // index.html directory
  plugins: [electron()]
});
```

## main entry file (`main/index.ts`)

```ts
import { BrowserWindow } from 'electron';

const { width, height, path } = option;
const win = new BrowserWindow({
  webPreferences: {
    preload: join(__dirname, './preload.js'), // relative path (both)
    sandbox: false
  }
});

if (process.env.NODE_ENV === 'development' && process.env['RENDERER_URL']) {
  await win.loadURL(process.env['RENDERER_URL']); // vite dev server url (dev server)
} else {
  await win.loadFile(join(__dirname, './renderer/index.html')); // relative path (build)
}
```

## Default Folder Structure

If you configure as above, ensure that you follow this folder structure.

```bash

src
├── main
│   ├── index.ts
├── renderer
│   ├── index.html
├── preload
│   ├── index.ts
├── vite.config.ts
├── dist
    ├── main.js
    ├── preload.js
    ├── renderer
        ├── index.html
        ├── ...
├── tsconfig.json
```

---

# Customize

## Custom OutDir & Entries

> ❗️Remember to update the main field in package.json if you change the output directory (e.g., to ./out/main.js).

```ts
export default defineConfig({
    root: './renderer',
    plugins: [
        electron({
            outDir: './out', // custom output directory
            preload: {
                entry: './preload2/index.ts' // custom preload entry
            },
            main: {
                entry: './main2/index.ts' // custom main entry
            }
        })
    ]
});

```
