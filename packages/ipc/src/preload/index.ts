import { contextBridge, ipcRenderer } from 'electron';
import { InvokeMap, IpcBridgeHandler, OnMap } from '../index';

type TIpcOnListener = (...args: any) => void;
const listenerMap = new Map<string, Set<TIpcOnListener>>();

const ipcObject: IpcBridgeHandler<InvokeMap, OnMap> = {
  invoke: (channel, body) => ipcRenderer.invoke(channel as string, body),
  on: (channel, listener) => {
    const l = (e: any, response: any) => listener(response);
    ipcRenderer.on(channel as string, l);
    if (!listenerMap.has(channel as string)) {
      listenerMap.set(channel as string, new Set());
    }
    listenerMap.get(channel as string)?.add(l);
    console.log(listenerMap);
    return () => {
      ipcRenderer.off(channel as string, l);
      listenerMap.get(channel as string)?.delete(l);
      console.log(listenerMap);
    };
  }
};

export function registerIpc() {
  contextBridge.exposeInMainWorld('app', ipcObject);
}
