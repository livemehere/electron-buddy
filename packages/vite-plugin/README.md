# @electron-buddy/vite-plugin

> 🚨 WIP project, so there no custom options available yet. Please must check folder structure.

## Installation

```bash
npm i -D @electron-buddy/vite-plugin
yarn add -D @electron-buddy/vite-plugin
pnpm add -D @electron-buddy/vite-plugin
```

## Usage

### vite.config.ts

```js   
import {defineConfig} from "vite";
import {electron} from "@electron-buddy/vite-plugin";

export default defineConfig({
    plugins:[
        electron()
    ],
})
```

### Folder Structure

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
├── tsconfig.json
```

## Scripts

```json
"scripts" : {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "preview"
},
```

## BrowserWindow URL

```ts
import {BrowserWindow} from "electron";

const {width, height, path} = option;
const win = new BrowserWindow({
    webPreferences:{
        preload: join(__dirname, './preload.js'), // relative path (both)
        sandbox: false,
    }
})

if(process.env.NODE_ENV === 'development' && process.env['RENDERER_URL']){
    await win.loadURL(process.env['RENDERER_URL']) // vite dev server url (dev server)
}else{
    await win.loadFile(join(__dirname, './renderer/index.html')) // relative path (build)
}

```
