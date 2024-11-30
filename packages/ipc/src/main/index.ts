import { ipcMain } from 'electron';
import { InvokeMap, IpcMainHandler, OnMap } from '../index';

export const mainIpc: IpcMainHandler<InvokeMap, OnMap> = {
  handle: (channel, listener) =>
    ipcMain.handle(channel as string, (e, body) => {
      return listener(body);
    }),
  send: (webContent, channel, response) => webContent.send(channel as string, response)
};
