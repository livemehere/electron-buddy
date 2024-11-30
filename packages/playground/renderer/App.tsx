import log from 'electron-log/renderer';
import { rendererIpc } from '@electron-buddy/ipc/renderer';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const off = rendererIpc.on('tick', (response) => {
      log.info(response);
    });
    return () => {
      off();
    };
  }, []);
  return (
    <div>
      <h1>App</h1>
      <button
        onClick={async () => {
          const r = await rendererIpc.invoke('ping', null);
          log.info(r);
        }}
      >
        Ping
      </button>
    </div>
  );
}
