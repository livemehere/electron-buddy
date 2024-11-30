import log from 'electron-log/renderer';

export default function App() {
  return (
    <div>
      <h1>App</h1>
      <button
        onClick={async () => {
          const r = await window.app.invoke('ping', undefined);
          log.info(r);
        }}
      >
        Ping
      </button>
    </div>
  );
}
