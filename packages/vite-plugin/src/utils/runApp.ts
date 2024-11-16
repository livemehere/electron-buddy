import spawn from 'cross-spawn';

export async function runApp() {
  return spawn('electron', ['.'], { stdio: 'inherit' });
}
