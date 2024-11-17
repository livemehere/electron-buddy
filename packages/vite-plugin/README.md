<p align="center">
  <img width="600" src="https://github.com/livemehere/electron-buddy/blob/master/docs/img/electron-buddy-vite-plugin.jpg?raw=true">
</p>
<div align="center">
  <h1>@electron-buddy/vite-plugin</h1>
</div>

This plugin simplifies the process of building an Electron application by focusing on the renderer while also seamlessly managing the builds for the main and preload processes. It allows for an easy setup and coordinated build process, making it more convenient to work with all parts of an Electron app in a unified workflow.

<p align="center">
  <a href="https://www.npmjs.com/package/@electron-buddy/vite-plugin">
    <img src="https://img.shields.io/npm/v/@electron-buddy/vite-plugin.svg">
  </a>
  <a href="https://npmjs.com/package/@electron-buddy/vite-plugin">
    <img src="https://img.shields.io/npm/dm/@electron-buddy/vite-plugin.svg">
  </a>
</p>

[Full-example](https://github.com/livemehere/electron-buddy/tree/master/packages/playground)

# Installation

```bash
npm i -D @electron-buddy/vite-plugin electron
yarn add -D @electron-buddy/vite-plugin electron
pnpm add -D @electron-buddy/vite-plugin electron
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

const win = new BrowserWindow({
  width:1280,
  height:720,
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

# CLI

```bash
    Usage: electron-buddy [options]
    
    Options:
        --help      Show help message
        --preview   Run electron app with 'main' entry file (same as 'electron .')
```
