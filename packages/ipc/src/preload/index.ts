import { contextBridge, ipcRenderer } from 'electron';
import { IpcBridgeHandler } from '../index';

type TIpcOnListener = (...args: any) => void;
const listenerMap = new Map<string, Set<TIpcOnListener>>();

const ipcObject: IpcBridgeHandler<ElectronBuddyInvokeMap, ElectronBuddyMessageMap>   = {
  invoke: (channel, payload) => ipcRenderer.invoke(channel as string, payload),
  on: (channel, listener) => {
    const l = (e: any, response: any) => listener(response);
    ipcRenderer.on(channel as string, l);
    if (!listenerMap.has(channel as string)) {
      listenerMap.set(channel as string, new Set());
    }
    listenerMap.get(channel as string)?.add(l);
    return () => {
      ipcRenderer.off(channel as string, l);
      listenerMap.get(channel as string)?.delete(l);
    };
  }
};

export function registerIpc() {
  contextBridge.exposeInMainWorld('app', ipcObject);
}
