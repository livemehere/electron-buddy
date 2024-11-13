import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('app', {
  label: 'app'
});
