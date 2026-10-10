# Coding Standards

Coding conventions and patterns used in this project, derived from the existing codebase.

Each rule ends with how it is checked:

- **lint**: ESLint (`eslint.config.mjs`), with the rule name
- **tsc**: the TypeScript compiler (`tsconfig.json`)
- **format**: Prettier
- **jest**: the Jest config
- **review**: not automated; reviewers check it

`pnpm check` runs Prettier, ESLint, the type checks and the unit tests. The pre-commit hook runs ESLint and Prettier on staged files, plus the type checks. CI runs `pnpm check` on every PR.

## TypeScript

- **Prefer `type` over `interface`** for all type definitions and exports. _(lint: `@typescript-eslint/consistent-type-definitions`)_
- **Use `Pick` to extract subsets** of props for utility function parameters rather than defining standalone types that duplicate fields. _(review)_
  ```ts
  // cleanValue.ts
  type CleanValueOptions = Pick<CurrencyInputProps, 'decimalsLimit' | 'allowDecimals' | ...>;
  ```
- **Use utility types for composition.** The codebase defines an `Overwrite<T, U>` type to extend `InputHTMLAttributes` while overriding specific props for `CurrencyInputProps`. _(review)_
- **Strict mode is enabled**, along with `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noImplicitOverride` and `noFallthroughCasesInSwitch`. _(tsc)_
- **Do not use `@ts-ignore`.** If a type error is expected, use `@ts-expect-error` with a description. _(lint: `@typescript-eslint/ban-ts-comment`)_
- **No `any` outside tests.** In tests, `as any` is allowed for passing invalid values to check runtime behavior. _(lint: `@typescript-eslint/no-explicit-any`)_
- **Use `import type`** for imports that are only used as types. _(lint: `@typescript-eslint/consistent-type-imports`)_
- **Use `ReadonlyArray<T>`** for function parameters that should not be mutated. _(review)_

## React

- **Functional components only** with `forwardRef` when ref access is needed. The main component uses `FC<Props>` with `forwardRef<HTMLInputElement, CurrencyInputProps>`. _(review)_
- **Event handler naming:** prefix with `handle` — `handleOnChange`, `handleOnBlur`, `handleOnKeyDown`, `handleOnKeyUp`, `handleOnFocus`. _(lint: `react/jsx-handler-names`, except in tests, which pass `jest.fn()` spies)_
- **Type event parameters explicitly:** `React.ChangeEvent<HTMLInputElement>`, `React.FocusEvent<HTMLInputElement>`, `React.KeyboardEvent<HTMLInputElement>`. _(review)_
- **Destructure props with inline defaults** in the function signature. Spread remaining HTML attributes onto the rendered element via `...props`. _(review)_
- **Use `useMemo`** for expensive derived values (e.g., locale config). Use `useRef` for DOM element access and `useImperativeHandle` to expose refs. _(review; hook correctness is checked by `eslint-plugin-react-hooks`)_
- **Type callbacks precisely** using indexed access types: `CurrencyInputProps['onValueChange']`. _(review)_

## Functions & Utilities

- **Utilities are pure functions** — no side effects, no mutation of inputs. _(lint: `no-param-reassign` in `src/components/utils`; side effects: review)_
- **Use options objects** instead of positional parameters when a function takes more than 2-3 related values. _(review)_
  ```ts
  export const cleanValue = ({ value, groupSeparator, decimalSeparator, ... }: CleanValueOptions): string => { ... };
  ```
- **Provide explicit return types** on exported/public functions. _(lint: `@typescript-eslint/explicit-module-boundary-types`, library code)_
- **Validate at the boundary.** The component throws on invalid separator configuration at the top level. Utility functions use early returns for edge cases, not try-catch. _(review)_
- **Constants use camelCase**, not `SCREAMING_SNAKE_CASE`. PascalCase is reserved for components. _(lint: `@typescript-eslint/naming-convention` rejects `SCREAMING_SNAKE_CASE`; PascalCase constants: review)_

## Naming

| What                  | Convention                   | Example                                        | Checked by                                   |
| --------------------- | ---------------------------- | ---------------------------------------------- | -------------------------------------------- |
| Components & types    | PascalCase                   | `CurrencyInput`, `FormatValueOptions`          | lint: `@typescript-eslint/naming-convention` |
| Functions & variables | camelCase                    | `cleanValue`, `handleOnBlur`                   | lint: `@typescript-eslint/naming-convention` |
| Component files       | PascalCase                   | `CurrencyInput.tsx`, `CurrencyInputProps.ts`   | review                                       |
| Utility files         | camelCase                    | `cleanValue.ts`, `formatValue.ts`              | review                                       |
| Test files            | Match source + `.spec.ts(x)` | `CurrencyInput.spec.tsx`, `cleanValue.spec.ts` | jest `testRegex`, plus lint (see Testing)    |
| Type-only files       | camelCase + `.types.ts`      | `formatValue.types.ts`                         | review                                       |

## Imports

- **Imports are grouped** in this order: Node built-ins, packages, parent directories, the same directory, then `index`. `eslint --fix` (and the pre-commit hook) sorts them. _(lint: `import-x/order`)_

## Exports

- **Default export for the main component**, plus a named export of the same name. _(review)_
- **Named exports for utilities and types** — aggregated through barrel `index.ts` files. _(review)_
- The public API (`src/index.ts`) re-exports `CurrencyInput` (default + named), `formatValue`, `cleanValue`, and key types. _(review)_

## Code Formatting

Enforced via Prettier (`.prettierrc`): _(format)_

| Setting         | Value   |
| --------------- | ------- |
| `singleQuote`   | `true`  |
| `semi`          | `true`  |
| `trailingComma` | `"es5"` |
| `printWidth`    | `100`   |

## Linting

ESLint uses a flat config (`eslint.config.mjs`) built on `@eslint/js` recommended, `typescript-eslint` recommended, `eslint-plugin-react` recommended and `eslint-plugin-react-hooks` recommended, with `eslint-config-prettier` last so formatting is left to Prettier. The project-specific rules listed in this document are added on top. The unit tests (`src/**/__tests__`) are also linted with type information, for `@typescript-eslint/no-floating-promises`. The lint command enforces **zero warnings** (`--max-warnings=0`).

## Testing

### Structure

- **Unit tests are colocated** in `__tests__/` directories adjacent to source files. _(review)_
- **Component tests:** `src/components/__tests__/*.spec.tsx`
- **Utility tests:** `src/components/utils/__tests__/*.spec.ts`
- **E2E tests:** `tests/*.spec.ts` (Playwright)
- **Only `*.spec.ts(x)` files run.** A `describe`/`it`/`test` call in any other file under `src/` (including `*.test.ts(x)` and `*.spec.js(x)`) fails lint, so a misnamed test can't be silently skipped. Shared helpers and fixtures can live in `__tests__/` alongside the specs. _(jest `testRegex`; lint: `no-restricted-syntax`)_

### Patterns

- Use `describe` blocks matching the component/function name. Nest `describe` blocks to group related scenarios. _(review)_
  ```ts
  describe('cleanValue', () => {
    describe('negative values', () => {
      it('should handle negative value', () => { ... });
    });
  });
  ```
- **Set up spies at describe scope**, clear in `beforeEach`: _(review)_
  ```ts
  const onValueChangeSpy = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  ```
- **Use React Testing Library** — query by role (`screen.getByRole('textbox')`). Simulate with user-event: create `const user = userEvent.setup();` at the start of each test that interacts, then `await user.type()` / `await user.clear()` / `await user.paste()`, and leave the field with `await user.tab()`. `user.type()` clicks the input first, which moves the caret to the end, so use `await user.keyboard()` to keep typing where the caret already is. Use `fireEvent` only when a test needs a single isolated event, with a comment saying why. _(review; lint: `@typescript-eslint/no-floating-promises` catches a missing `await`)_
- **Snapshots** are used for basic render verification only (e.g., confirming the component renders). _(review)_
- **No file/module mocks.** Tests use real implementations. Only callback props are mocked with `jest.fn()`. The one exception, `CurrencyInput-no-locale.spec.tsx`, carries an inline disable explaining why. _(lint: `no-restricted-properties` on `jest.mock` and `jest.doMock`)_
- **Tests run with `LANG=en_GB`** to ensure consistent locale-dependent behavior. _(`pnpm test` sets it)_

## Commits

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), using `@commitlint/config-conventional` plus the rules in `commitlint.config.js`.

- **The PR title is the commit that reaches `main`.** PRs are squash-merged with the title as the whole message, and semantic-release reads it. It must be a valid Conventional Commit. _(CI: the `Lint PR title` check)_
- **Scopes are optional**, and must be one of: `component`, `format-value`, `clean-value`, `utils`, `types`, `examples`, `deps`, `deps-dev`, `release`. _(commitlint: `scope-enum`)_
- **No `!` in the title.** For a breaking change, say so in the PR description. The maintainer adds a `BREAKING CHANGE:` footer to the squash commit message when merging, which is what makes semantic-release publish a major version. _(commitlint: `subject-exclamation-mark` rejects `!`; the footer is review)_
- **Commits on a branch aren't checked in CI** and don't reach `main`, but the local commit-msg hook still checks them. _(commit-msg hook)_
- **No attribution lines.** `Co-authored-by:` trailers (in any capitalisation) and "Generated with" lines are rejected. _(commitlint: the inline `no-attribution` rule)_

Husky runs the pre-commit and commit-msg hooks.
