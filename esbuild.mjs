import * as esbuild from 'esbuild';

// Exports ESM
esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/esm/index.js',
  bundle: true,
  sourcemap: true,
  platform: 'neutral',
  format: 'esm',
  target: ['esnext'],
  minify: true,
  external: ['react'],
});

esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/cjs/index.js',
  bundle: true,
  sourcemap: true,
  platform: 'neutral',
  format: 'cjs',
  target: ['esnext'],
  minify: true,
  external: ['react'],
});