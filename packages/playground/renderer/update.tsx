import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('app')!);
root.render(<Update />);

function Update() {
  return (
    <div>
      <h1>Downloading...70%</h1>
    </div>
  );
}
