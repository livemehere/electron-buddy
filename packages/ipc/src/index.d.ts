import type { WebContents } from 'electron';

type TIpcInvoke = {
  [channel: string]: {
    body?: unknown;
    response?: unknown;
  };
};

type TIpcOn = {
  [channel: string]: {
    response: unknown;
  };
};

export type GenerateIpcInvokeMap<T extends TIpcInvoke> = T;
export type GenerateIpcOnMap<T extends TIpcOn> = T;

export namespace Ipc {
  /* Must be declared */
  export type InvokeMap = GenerateIpcInvokeMap<{
    _: {
      response: undefined;
      body: undefined;
    };
  }>;
  export type OnMap = GenerateIpcOnMap<{
    _: {
      response: undefined;
    };
  }>;

  export type TIpcInvokeChannel = keyof InvokeMap;
  export type TIpcInvokeBody<TChannel extends TIpcInvokeChannel> = InvokeMap[TChannel]['body'];
  export type TIpcInvokeResponse<TChannel extends TIpcInvokeChannel> = InvokeMap[TChannel]['response'];

  export type TIpcOnChannel = keyof OnMap;
  export type TIpcOnResponse<TChannel extends TIpcOnChannel> = OnMap[TChannel]['response'];

  export type TIpcObject = {
    invoke: <C extends TIpcInvokeChannel>(channel: C, body: TIpcInvokeBody<C>) => Promise<TIpcInvokeResponse<C>>;
    on: <C extends TIpcOnChannel>(channel: C, listener: (response: TIpcOnResponse<C>) => void) => () => void;
  };

  export type TIpcHandler = {
    handle: <C extends TIpcInvokeChannel>(
      channel: C,
      listener: (body: TIpcInvokeBody<C>) => Promise<TIpcInvokeResponse<C>>
    ) => void;
    send: <C extends TIpcOnChannel>(webContent: WebContents, channel: C, response: TIpcOnResponse<C>) => void;
  };
}

declare global {
  interface Window {
    app: Ipc.TIpcObject;
  }
}
