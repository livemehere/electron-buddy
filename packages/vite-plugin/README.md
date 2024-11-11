# @electron-buddy/vite-plugin

> 🚨 WIP project, so there no custom options available yet. Please must check folder structure.

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
  "scripts" : {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "start": "preview"
  }
}
```

## vite.config.ts

> Recommended to set `root` (renderer directory) as directory not a root of the project.

```js   
import {defineConfig} from "vite";
import {electron} from "@electron-buddy/vite-plugin";

export default defineConfig({
    root:'./renderer', // index.html directory
    plugins:[
        electron()
    ],
})
```

## main entry file (`main/index.ts`)

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

## Default Folder Structure

If you setup config as above, then you must follow this folder structure.

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

> ❗️Don't forget to update `package.json` main field when you change the output directory. `./out/main.js`

```ts
export default defineConfig({
    root:'./renderer',
    plugins:[
        electron({
            outDir:'./out', // custom output directory
            preload:{
                entry:'./preload2/index.ts' // custom entry
            },
            main:{
                entry:'./main2/index.ts' // custom entry
            }
        })
    ],
})
```
