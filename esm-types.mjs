// Copies the type declarations tsc emits into dist/ to dist/esm/, for `import`.
//
// dist/esm/package.json ("type": "module", written by esbuild.mjs) makes
// TypeScript read the copies as ESM declarations. ESM needs a file extension on
// every relative import, and tsc writes them without one (`./components/utils`),
// so each relative import gets `.js`, or `/index.js` when it points at a folder.
// An import that matches neither fails the build.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const dist = 'dist';
const esm = join(dist, 'esm');

const declarations = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      return path === esm || path === join(dist, 'cjs') ? [] : declarations(path);
    }
    return path.endsWith('.d.ts') ? [path] : [];
  });

const withExtension = (file, specifier) => {
  const target = resolve(dirname(file), specifier);
  if (existsSync(`${target}.d.ts`)) {
    return `${specifier}.js`;
  }
  if (existsSync(join(target, 'index.d.ts'))) {
    return `${specifier}/index.js`;
  }
  throw new Error(`${file}: can't resolve the import "${specifier}"`);
};

for (const file of declarations(dist)) {
  const source = readFileSync(file, 'utf8').replace(
    /(\bfrom\s*|\bimport\(\s*)(['"])(\.{1,2}\/[^'"]+)\2/g,
    (_match, prefix, quote, specifier) =>
      `${prefix}${quote}${withExtension(file, specifier)}${quote}`
  );
  const target = join(esm, relative(dist, file));
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, source);
}
