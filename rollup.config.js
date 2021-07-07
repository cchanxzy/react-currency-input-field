import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const globals = {
  react: 'React',
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      sourcemap: true,
      exports: 'named',
      name: 'ReactCurrencyInputField',
      globals,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: Object.keys(globals),
  plugins: [nodeResolve(), commonjs(), typescript()],
};
