import { useState } from 'react';
import log from 'electron-log/renderer';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>App</h1>
      <p>Count: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
          log.info('count:', count);
        }}
      >
        +
      </button>
    </div>
  );
}
