export {};

declare module "@electron-buddy/ipc/main" {
  interface ElectronBuddyInvokeMap extends InvokeMap {}
  interface ElectronBuddyMessageMap extends MessageMap {}
}

declare module "@electron-buddy/ipc/renderer" {
  interface ElectronBuddyInvokeMap extends InvokeMap {}
  interface ElectronBuddyMessageMap extends MessageMap {}
}

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
