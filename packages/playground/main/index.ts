import { BrowserWindow, app } from 'electron';
import { createWindow } from './createWindow';
import log from 'electron-log/main';

log.initialize();

let mainWin: BrowserWindow;
async function main() {
  await app.whenReady();
  mainWin = await createWindow({ width: 1280, height: 720, path: '/' });
  log.info('Run App');
  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWin = await createWindow({ width: 1280, height: 720, path: '/' });
    }
  });
}
main().catch(console.error);

app.on('window-all-closed', () => {
  app.quit();
});
