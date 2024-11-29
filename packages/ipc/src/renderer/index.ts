import type { Ipc } from '../index';


export const rendererIpc: Ipc.TIpcObject = {
  invoke: (...args) => window.app.invoke(...args),
  on: (...args) => window.app.on(...args)
};
