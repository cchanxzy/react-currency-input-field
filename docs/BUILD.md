# Build

How `pnpm build` turns `src/` into the published package, and why the output is laid out the way it is. Most of the layout exists so that every kind of project can load the package: bundlers, Node's own ESM and CommonJS loaders, and TypeScript under each `moduleResolution`. Read this before changing `esbuild.mjs`, `esm-types.mjs`, `tsconfig.build.json` or the `exports` field in `package.json`.

## What `pnpm build` does

1. Deletes `dist/`.
2. **`esbuild.mjs`** bundles `src/index.ts` twice, with `react` left external:

   - `dist/esm/index.js`: ESM, for `import`
   - `dist/cjs/index.js`: CommonJS, for `require`

   It also writes `dist/esm/package.json`, containing `{"type":"module"}`.

3. **`tsc --project tsconfig.build.json`** writes the type declarations to `dist/` (`dist/index.d.ts` and `dist/components/**`).
4. **`esm-types.mjs`** copies those declarations into `dist/esm/` and adds `.js` (or `/index.js` for a folder) to every relative import in the copies.

The result:

```text
dist/
  index.d.ts, components/**/*.d.ts      types for require (read as CommonJS)
  cjs/index.js                          code for require
  esm/
    package.json                        {"type":"module"}
    index.js                            code for import
    index.d.ts, components/**/*.d.ts    types for import (read as ESM)
```

`package.json` points at it through `exports`, with a `types` entry for each condition:

```json
"exports": {
  ".": {
    "import": { "types": "./dist/esm/index.d.ts", "default": "./dist/esm/index.js" },
    "require": { "types": "./dist/index.d.ts", "default": "./dist/cjs/index.js" }
  }
}
```

`main`, `module` and `types` stay for tools that don't read `exports`.

## Why it's built this way

### Bundled, one file per format

Node's ESM loader doesn't add file extensions to relative imports. An unbundled ESM build with imports like `./components/CurrencyInput` can't be loaded by Node at all. That's what happened in 4.0.0–4.0.2, and it broke server rendering in Vite-based frameworks (#389). Bundling each format into one file leaves only `react` to resolve.

### `dist/esm/package.json`

The root `package.json` has no `"type"` field, so Node treats every `.js` file in the package as CommonJS. That's right for `dist/cjs/`, but not for `dist/esm/index.js`, which uses `import` and `export`. Without the nested `package.json`:

- **Node 20.19+, 22.12+ and later** notice the ESM syntax and load the file as ESM anyway (module syntax detection).
- **Node versions without module syntax detection** (18, and 20.18 and 22.6 and earlier) load it as CommonJS and fail with `Named export 'formatValue' not found` or `Cannot use import statement outside a module`.

That failure isn't limited to people who `import` the package in plain Node. Vite SSR, React Router and Astro leave dependencies out of their server builds, so their production servers load the package with Node's own loader, and they fail on those Node versions. `{"type":"module"}` in `dist/esm/` makes every Node version load the file as ESM, without relying on detection.

Don't add `"type"` to the root `package.json`. That would make `dist/cjs/index.js` and the CommonJS declarations read as ESM.

### Separate declarations for `import` and `require`

TypeScript decides whether a `.d.ts` file describes an ESM or a CommonJS module the same way Node does: from the nearest `package.json`. With only `dist/index.d.ts`, TypeScript treats the declarations as CommonJS for both conditions. A project using `module`/`moduleResolution` `node16` or `nodenext` with `"type": "module"` then sees the default import as the whole module namespace, and `<CurrencyInput />` fails with TS2604/TS2786.

The copies in `dist/esm/` sit under `{"type":"module"}`, so TypeScript reads them as ESM. But ESM declarations, like ESM code, need a file extension on every relative import, and `tsc` writes them as they are in the source, without one. `esm-types.mjs` adds the extensions. It fails the build if an import doesn't resolve to a declaration file or a folder with an `index.d.ts`.

The script is a few lines instead of a declaration bundler (such as `rollup-plugin-dts`) on purpose, to avoid a large build dependency for one step.

## Checking a build

```sh
pnpm build
pnpm verify-package   # publint, then arethetypeswrong with no ignored rules
```

`arethetypeswrong` should report no problems, with every resolution green, including `node16 (from ESM)`, which must resolve to ESM. A change to anything above should also be tried in a real project of each kind it affects (a bundler, a Node server, and a TypeScript project with `nodenext`), because the checks above only look at the package's shape.

## Known limitations

- **`target: esnext`:** the output uses syntax such as `?.` and `??`, which webpack 4 can't parse.
- **No `'use client'` directive:** in the Next.js App Router, render `CurrencyInput` from a client component. A server component can still import `formatValue`.
