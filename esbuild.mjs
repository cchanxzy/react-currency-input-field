import * as esbuild from 'esbuild';

const sharedConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'neutral',
  target: ['esnext'],
  jsx: 'automatic',
  sourcemap: true,
  minify: true,
  external: ['react', 'react-dom'],
};

await Promise.all([
  // Exports ESM
  esbuild.build({
    ...sharedConfig,
    format: 'esm',
    outfile: 'dist/esm/index.mjs',
  }),
  // Exports CJS
  esbuild.build({
    ...sharedConfig,
    format: 'cjs',
    outfile: 'dist/cjs/index.cjs',
  }),
]);
