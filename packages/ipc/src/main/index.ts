import { ipcMain } from 'electron';
import { IpcMainHandler} from '../index';

export const mainIpc: IpcMainHandler<ElectronBuddyInvokeMap, ElectronBuddyMessageMap> = {
  handle: (channel, listener) =>
    ipcMain.handle(channel as string, (e, payload) => {
      return listener(payload);
    }),
  send: (webContent, channel, response) => webContent.send(channel as string, response)
};
