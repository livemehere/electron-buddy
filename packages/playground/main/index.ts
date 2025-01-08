import { BrowserWindow, app } from 'electron';
import { createWindow } from './createWindow';
import log from 'electron-log/main';
import { autoUpdater } from 'electron-updater';
import { mainIpc } from '@electron-buddy/ipc/main';

let mainWin: BrowserWindow;
async function main() {
  log.initialize();

  await app.whenReady();
  mainWin = await createWindow({ width: 1280, height: 720, path: '/' });
  log.info('Run App');

  await autoUpdate();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWin = await createWindow({ width: 1280, height: 720, path: '/' });
    }
  });

  mainIpc.handle('ping', async () => {
    return 'pong';
  });


}
main().catch(console.error);

app.on('window-all-closed', () => {
  app.quit();
});

async function autoUpdate() {
  autoUpdater.logger = log;
  await autoUpdater.checkForUpdates();
  // NOTICE TO Renderer or Notification to user to restart app when download finished.
  // If download finished, autoUpdater will emit 'update-downloaded' event. or
  // you can call autoUpdater.quitAndInstall() to restart app immediately.
}
