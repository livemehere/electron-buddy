import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('app')!);
root.render(<Splash />);

function Splash() {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
