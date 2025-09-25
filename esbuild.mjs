import * as esbuild from 'esbuild';
import { glob } from 'glob';

const files = glob.sync('src/**/*.{ts,tsx}', {
  ignore: ['src/examples/**', 'src/**/__tests__/**', 'src/**/*.spec.{ts,tsx}'],
});

// Exports ESM
esbuild.build({
  entryPoints: files,
  outdir: 'dist/esm',
  bundle: false,
  sourcemap: true,
  splitting: true,
  platform: 'neutral',
  format: 'esm',
  target: ['esnext'],
  minify: true,
});

// Exports CJS
esbuild.build({
  entryPoints: files,
  outdir: 'dist/cjs',
  bundle: false,
  sourcemap: true,
  platform: 'neutral',
  format: 'cjs',
  target: ['esnext'],
  minify: true,
});
