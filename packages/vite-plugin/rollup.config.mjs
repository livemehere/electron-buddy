import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

const genOption = (typeOnly) => {
  /** @type {import('rollup').RollupOptions} */
  const options = {
    input: 'src/index.ts',
    output: {
      file: typeOnly ? 'dist/index.d.ts' : 'dist/index.js',
      format: 'cjs'
    },
    plugins: [{ ...(typeOnly ? dts() : typescript()) }]
  };
  return options;
};

export default [genOption(false), genOption(true)];
