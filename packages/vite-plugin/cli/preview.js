const { spawn } = require('child_process');

const preview = () => {
  spawn('electron', ['.'], { stdio: 'inherit', shell: true });
};

module.exports = {
  preview
};
