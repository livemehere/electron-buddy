import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const genOption = (typeOnly) => {
  /** @type {import('rollup').RollupOptions} */
  const options = {
    input: 'src/index.ts',
    output: {
      file: typeOnly ? 'dist/index.d.ts' : 'dist/index.js',
      format: 'cjs',
      inlineDynamicImports: true
    },
    external: ['vite'],
    plugins: [{ ...(typeOnly ? dts() : typescript()) }, nodeResolve(), commonjs()]
  };

  return options;
};

export default [genOption(false)];
