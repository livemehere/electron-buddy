import { contextBridge, ipcRenderer } from 'electron';
import type { Ipc } from '../index';


type TIpcOnListener = (...args: any) => void;
const listenerMap = new Map<Ipc.TIpcOnChannel, Set<TIpcOnListener>>();

const ipcObject: Ipc.TIpcObject = {
  invoke: <C extends Ipc.TIpcInvokeChannel>(channel: C, body: Ipc.TIpcInvokeBody<C>) =>
    ipcRenderer.invoke(channel as string, body),
  on: <C extends Ipc.TIpcOnChannel>(channel: C, listener: (response: Ipc.TIpcOnResponse<C>) => void) => {
    const l = (e: any, response: any) => listener(response);
    ipcRenderer.on(channel as string, l);
    if (!listenerMap.has(channel)) {
      listenerMap.set(channel, new Set());
    }
    listenerMap.get(channel)?.add(l);
    console.log(listenerMap);
    return () => {
      ipcRenderer.off(channel as string, l);
      listenerMap.get(channel)?.delete(l);
      console.log(listenerMap);
    };
  }
};

export function registerIpc() {
  contextBridge.exposeInMainWorld('app', ipcObject);
}
