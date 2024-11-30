import { WebContents } from 'electron';

export type TIpcInvoke = {
  [channel: string]:{
    payload?: unknown;
    response?: unknown;
  };
}

export type TIpcOn = {
  [channel: string]: {
    response: unknown;
  }
}

declare global {
    interface ElectronBuddyInvokeMap extends TIpcInvoke {

    }
    interface ElectronBuddyMessageMap extends TIpcOn{

    }

    interface Window {
      app: IpcBridgeHandler<ElectronBuddyInvokeMap, ElectronBuddyMessageMap>;
    }

}

export type IpcMainHandler<InvokeMap extends TIpcInvoke, OnMap extends TIpcOn> = {
  handle: <C extends keyof InvokeMap>(
    channel: C,
    listener: (payload: InvokeMap[C]['payload']) => Promise<InvokeMap[C]['response']>
  ) => void;
  send: <C extends keyof OnMap>(webContent: WebContents, channel: C, response: OnMap[C]['response']) => void;
};

export type IpcBridgeHandler<InvokeMap extends TIpcInvoke, OnMap extends TIpcOn> = {
  invoke: <C extends keyof InvokeMap>(channel: C, payload: InvokeMap[C]['payload']) => Promise<InvokeMap[C]['response']>;
  on: <C extends keyof OnMap>(channel: C, listener: (response: OnMap[C]['response']) => void) => () => void;
};
