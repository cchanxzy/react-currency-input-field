import { mkdirSync, writeFileSync } from 'node:fs';
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

// Mark dist/esm as ESM, so every Node version loads index.js as a module.
// Without it, Node reads the .js file as CommonJS, and only versions with
// module syntax detection (20.19+, 22.12+) recover from that.
mkdirSync('dist/esm', { recursive: true });
writeFileSync('dist/esm/package.json', `${JSON.stringify({ type: 'module' })}\n`);
