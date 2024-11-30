import { IpcBridgeHandler } from '../index';

export const rendererIpc:IpcBridgeHandler<ElectronBuddyInvokeMap, ElectronBuddyMessageMap>  = {
  invoke: (...args) => window.app.invoke(...args),
  on: (...args) => window.app.on(...args)
};


