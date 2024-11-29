import { ipcMain } from 'electron';
import type { Ipc } from '../index';

export const mainIpc: Ipc.TIpcHandler = {
  handle: (channel, listener) =>
    ipcMain.handle(channel, (e, body) => {
      return listener(body);
    }),
  send: (webContent, channel, response) => webContent.send(channel, response)
};
