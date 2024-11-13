import { BrowserWindow, app } from 'electron';
import { createWindow } from './createWindow';

let mainWin: BrowserWindow;
async function main() {
  await app.whenReady();
  mainWin = await createWindow({ width: 1280, height: 720, path: '/' });
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
