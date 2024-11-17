import { Configuration } from 'electron-builder';

const options: Configuration = {
  appId: 'com.electron-buddy.playground',
  productName: 'Electron-Buddy-Playground',
  artifactName: '${productName}-${version}-${os}.${ext}',
  directories: {
    output: 'release/${version}'
  },
  files: ['dist'],
  nsis: {
    deleteAppDataOnUninstall: true
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      }
    ]
  },
  mac: {
    target: [
      {
        target: 'dmg',
        arch: ['universal']
      }
    ]
  }
};

export default options;
