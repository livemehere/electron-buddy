<p align="center">
  <img width="600" src="https://github.com/livemehere/electron-buddy/blob/master/docs/img/electron-buddy-vite-plugin.jpg?raw=true">
</p>
<div align="center">
  <h1>@electron-buddy/ipc</h1>
</div>

<p align="center">
    This is type safe IPC helper for Electron apps. 
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@electron-buddy/ipc">
    <img src="https://img.shields.io/npm/v/@electron-buddy/ipc.svg">
  </a>
  <a href="https://npmjs.com/package/@electron-buddy/ipc">
    <img src="https://img.shields.io/npm/dm/@electron-buddy/ipc.svg">
  </a>
</p>

[Full-example](https://github.com/livemehere/electron-buddy/tree/master/packages/playground)

Each environment in Electron, namely main and renderer, operates in completely independent spaces. To enable these environments to share resources, Electron provides IPC (Inter-Process Communication). Additionally, Electron connects these environments through preload scripts.

While you can use ipcRenderer and ipcMain to facilitate this communication, managing types separately is necessary because the codebases for these environments must remain distinct. `@electron-buddy/ipc` was created to solve this problem efficiently.

This library allows you to declare channel, payload, and response globally, enabling seamless type-safe interaction between the main and renderer environments.

> ⚠️ This docs does not cover the basics of IPC in Electron. Please refer to the [Electron documentation](https://www.electronjs.org/docs/api/ipc-main) for more information.

## Installation

```bash
npm i @electron-buddy/ipc
yarn add @electron-buddy/ipc
pnpm add @electron-buddy/ipc
```

## Quick Start

### `electron-buddy.d.ts`

Add the following code to your project's root directory or `typeRoots` in `tsconfig.json`.

```ts
export {};

declare module "@electron-buddy/ipc/main" {
  interface ElectronBuddyInvokeMap extends InvokeMap {}
  interface ElectronBuddyMessageMap extends MessageMap {}
}

declare module "@electron-buddy/ipc/renderer" {
  interface ElectronBuddyInvokeMap extends InvokeMap {}
  interface ElectronBuddyMessageMap extends MessageMap {}
}

/* 
  * Define channel, payload, and response types
  * 
  * channel: string
  * payload: any
  * response: any
  */
type InvokeMap = {
  ping:{
    payload:string,
    response: 'pong',
  }
}

type MessageMap = {
  tick:{
    response:number;
  }
}

```

### `preload/index.ts`

```ts
import { registerIpc } from '@electron-buddy/ipc/preload';

registerIpc();
```

### `main/index.ts`

```ts
import { mainIpc } from '@electron-buddy/ipc/main';

async function main() {
  log.initialize();

  await app.whenReady();

  // ...
  
  mainIpc.handle('ping', async () => { // channel type is 'ping' | ...
    return 'pong'; // response type is 'pong'
  });
  setInterval(() => {
    mainIpc.send(mainWin.webContents, 'tick', 1); // 🟢 channel type is 'tick' | ..., payload type is number
    mainIpc.send(mainWin.webContents, 'tick', '1'); // ❗️ Error: Argument of type 'string' is not assignable to parameter of type 'number'
  }, 1000);
  
}
```

### `renderer/App.tsx`

> Example code using React

```tsx
import { rendererIpc } from '@electron-buddy/ipc/renderer';
import { useEffect } from 'react';

export default function App() {
  
  useEffect(() => {
    const off = rendererIpc.on('tick', (response) => {
      consoel.log(response); // current timestamp number
    });
    return () => {
      off(); // remove event listener
    };
  }, []);
  
  return (
    <div>
      <h1>App</h1>
      <button
        onClick={async () => {
          const r = await rendererIpc.invoke('ping', null); // ❗️payload must be set event if it is null | undefined
          console.log(r); // 'pong'
        }}
      >
        Ping
      </button>
    </div>
  );
}

```

## Actual Working

`mainIpc`, `rendererIpc` is a wrapper of `ipcMain`, `ipcRenderer` respectively. It provides type-safe IPC communication between main and renderer processes.

### `mainIpc.handle`

```ts
mainIpc.handle(channel:string, handler:(payload:Payload) => Promise<any>)

// Is equivalent to 

ipcMain.handle(channel, async (event, payload) => {
  const response = null;
  return response;
});
```

### `mainIpc.send`

```ts
mainIpc.send(webContents:WebContents, channel:string, payload:Payload)

// Is equivalent to

webContents.send(channel, payload);
```

### `rendererIpc.on`

```ts
rendererIpc.on(channel:string, listener:(response:Response) => void)

// Is equivalent to

ipcRenderer.on(channel, (event, response) => {
  listener(response);
});
```

### `rendererIpc.invoke`

```ts
rendererIpc.invoke(channel:string, payload:Payload)

// Is equivalent to

ipcRenderer.invoke(channel, payload);
```
