declare module '@electron-buddy/ipc' {
  interface InvokeMap {
    ping: {
      response: 'pong';
      body: undefined;
    };
  }
  interface OnMap {
    tick: {
      response: number;
    };
  }
}
