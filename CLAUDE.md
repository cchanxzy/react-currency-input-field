# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Currency Input Field — a zero-dependency React `<input>` component for formatting currency and number values. Supports abbreviations (k/m/b), prefix/suffix, group/decimal separators, Intl locale config, and arrow key stepping. Published as both ESM and CJS via esbuild.

## Commands

- **Install:** `pnpm install`
- **Build:** `pnpm build` (cleans dist, bundles ESM+CJS via esbuild, emits types via tsc)
- **Test (unit):** `pnpm test` (Jest with jsdom, runs with `LANG=en_GB`)
- **Run single test:** `LANG=en_GB npx jest --testPathPattern="<pattern>"` (e.g. `"CurrencyInput-decimals"`)
- **Typecheck:** `pnpm typecheck` (runs tsc against both `tsconfig.json` and `tsconfig.test.json`)
- **Lint:** `pnpm lint` (ESLint with zero warnings allowed)
- **E2E tests:** `pnpm exec playwright test` (Playwright, requires dev server on localhost:1234 via `pnpm start`)
- **Dev server:** `pnpm start` (Parcel, serves `src/examples/index.html` on port 1234)

## Architecture

The library exports a single default component (`CurrencyInput`) plus named exports `formatValue` and `cleanValue`.

### Source Layout (`src/`)

- **`components/CurrencyInput.tsx`** — Main component. Handles onChange/onBlur/onKeyDown, manages cursor positioning, and delegates formatting to utilities.
- **`components/CurrencyInputProps.ts`** — Props type definitions (`CurrencyInputProps`, `IntlConfig`, `CurrencyInputOnChangeValues`).
- **`components/utils/`** — Pure formatting/parsing functions:
  - `formatValue` — Formats a raw string value with separators, prefix/suffix, or Intl config (also exported publicly).
  - `cleanValue` — Strips formatting to extract the raw numeric string (also exported publicly).
  - `getLocaleConfig` — Derives prefix, suffix, group separator, and decimal separator from `Intl.NumberFormat`.
  - `parseAbbrValue` — Expands abbreviations (k/m/b) to full numbers.
  - `addSeparators` / `removeSeparators` — Insert/strip group separators.
  - `padTrimValue` — Handles `decimalScale` padding/trimming on blur.
  - `fixedDecimalValue` — Enforces `fixedDecimalLength`.
  - `repositionCursor` — Calculates correct cursor position after formatting changes.
- **`index.ts`** — Public entry point; re-exports component, types, `formatValue`, and `cleanValue`.

### Test Layout

- **Unit tests:** Co-located at `src/components/__tests__/` (component tests) and `src/components/utils/__tests__/` (utility tests). Jest + React Testing Library.
- **E2E tests:** `tests/general.spec.ts` — Playwright tests against the example app.

### Build

esbuild produces dual ESM (`dist/esm/`) and CJS (`dist/cjs/`) bundles. TypeScript compiler emits only declaration files to `dist/`. React is externalized.

## Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (enforced by commitlint + husky).
- Tests must pass with `LANG=en_GB` to ensure consistent locale behavior.
- Package manager is pnpm.
