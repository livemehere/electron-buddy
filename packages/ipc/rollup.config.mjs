import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import fs from 'fs';

const build = (entryType) => {
  /** @type {import('rollup').RollupOptions} */
  const options = {
    input: `src/${entryType}/index.ts`,
    output: [
      {
        file: `dist/${entryType}/index.cjs`,
        format: 'cjs',
        inlineDynamicImports: true
      },
      {
        file: `dist/${entryType}/index.mjs`,
        format: 'es',
        inlineDynamicImports: true
      }
    ],
    external: ['electron'],
    plugins: [typescript()]
  };

  return options;
};

const buildDts = (entryType, copyFiles) => {
  /** @type {import('rollup').RollupOptions} */
  const options = {
    input: `src/${entryType}/index.ts`,
    output: {
      file: `dist/${entryType}/index.d.ts`,
      format: 'es'
    },
    plugins: [
      {
        name: 'copy-root-dts',
        writeBundle() {
          if (copyFiles) {
            fs.mkdirSync('dist/utils', { recursive: true });
            fs.copyFileSync('src/utils/index.ts', 'dist/utils/index.ts');
            fs.copyFileSync('src/index.d.ts', 'dist/index.d.ts');
          }
        }
      },
      dts()
    ],
    external: ['electron', '../index']
  };

  return options;
};


export default [
  build('main'),
  build('preload'),
  build('renderer'),
  buildDts('main'),
  buildDts('preload'),
  buildDts('renderer',true)
];
