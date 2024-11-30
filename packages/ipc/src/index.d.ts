import { WebContents } from 'electron';

export interface TIpcInvoke {
  [channel: string]: {
    body?: unknown;
    response?: unknown;
  };
}

export interface TIpcOn {
  [channel: string]: {
    response: unknown;
  };
}

export interface InvokeMap extends TIpcInvoke {}
export interface OnMap extends TIpcOn {}

export type IpcMainHandler<InvokeMap extends TIpcInvoke, OnMap extends TIpcOn> = {
  handle: <C extends keyof InvokeMap>(
    channel: C,
    listener: (body: InvokeMap[C]['body']) => Promise<InvokeMap[C]['response']>
  ) => void;
  send: <C extends keyof OnMap>(webContent: WebContents, channel: C, response: OnMap[C]['response']) => void;
};

export type IpcBridgeHandler<InvokeMap extends TIpcInvoke, OnMap extends TIpcOn> = {
  invoke: <C extends keyof InvokeMap>(channel: C, body: InvokeMap[C]['body']) => Promise<InvokeMap[C]['response']>;
  on: <C extends keyof OnMap>(channel: C, listener: (response: OnMap[C]['response']) => void) => () => void;
};

declare global {
  interface Window {
    app: IpcBridgeHandler<InvokeMap, OnMap>;
  }
}
