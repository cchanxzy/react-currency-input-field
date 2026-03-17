# Coding Standards

Coding conventions and patterns used in this project, derived from the existing codebase.

## TypeScript

- **Prefer `type` over `interface`** for all type definitions and exports.
- **Use `Pick` to extract subsets** of props for utility function parameters rather than defining standalone types that duplicate fields.
  ```ts
  // cleanValue.ts
  type CleanValueOptions = Pick<CurrencyInputProps, 'decimalsLimit' | 'allowDecimals' | ...>;
  ```
- **Use utility types for composition.** The codebase defines an `Overwrite<T, U>` type to extend `InputHTMLAttributes` while overriding specific props for `CurrencyInputProps`.
- **Strict mode is enabled.** Do not use `@ts-ignore`. Use `as any` sparingly and only in tests where you need to pass invalid values to verify runtime behavior.
- **Use `ReadonlyArray<T>`** for function parameters that should not be mutated.

## React

- **Functional components only** with `forwardRef` when ref access is needed. The main component uses `FC<Props>` with `forwardRef<HTMLInputElement, CurrencyInputProps>`.
- **Event handler naming:** prefix with `handle` — `handleOnChange`, `handleOnBlur`, `handleOnKeyDown`, `handleOnKeyUp`, `handleOnFocus`.
- **Type event parameters explicitly:** `React.ChangeEvent<HTMLInputElement>`, `React.FocusEvent<HTMLInputElement>`, `React.KeyboardEvent<HTMLInputElement>`.
- **Destructure props with inline defaults** in the function signature. Spread remaining HTML attributes onto the rendered element via `...props`.
- **Use `useMemo`** for expensive derived values (e.g., locale config). Use `useRef` for DOM element access and `useImperativeHandle` to expose refs.
- **Type callbacks precisely** using indexed access types: `CurrencyInputProps['onValueChange']`.

## Functions & Utilities

- **Utilities are pure functions** — no side effects, no mutation of inputs.
- **Use options objects** instead of positional parameters when a function takes more than 2-3 related values.
  ```ts
  export const cleanValue = ({ value, groupSeparator, decimalSeparator, ... }: CleanValueOptions): string => { ... };
  ```
- **Provide explicit return types** on exported/public functions.
- **Validate at the boundary.** The component throws on invalid separator configuration at the top level. Utility functions use early returns for edge cases, not try-catch.
- **Constants use camelCase**, not SCREAMING_SNAKE_CASE.

## Naming

| What                  | Convention                   | Example                                        |
| --------------------- | ---------------------------- | ---------------------------------------------- |
| Components & types    | PascalCase                   | `CurrencyInput`, `FormatValueOptions`          |
| Functions & variables | camelCase                    | `cleanValue`, `handleOnBlur`                   |
| Component files       | PascalCase                   | `CurrencyInput.tsx`, `CurrencyInputProps.ts`   |
| Utility files         | camelCase                    | `cleanValue.ts`, `formatValue.ts`              |
| Test files            | Match source + `.spec.ts(x)` | `CurrencyInput.spec.tsx`, `cleanValue.spec.ts` |
| Type-only files       | camelCase + `.types.ts`      | `formatValue.types.ts`                         |

## Exports

- **Default export for the main component**, plus a named export of the same name.
- **Named exports for utilities and types** — aggregated through barrel `index.ts` files.
- The public API (`src/index.ts`) re-exports `CurrencyInput` (default + named), `formatValue`, `cleanValue`, and key types.

## Code Formatting

Enforced via Prettier (`.prettierrc`):

| Setting         | Value   |
| --------------- | ------- |
| `singleQuote`   | `true`  |
| `semi`          | `true`  |
| `trailingComma` | `"es5"` |
| `printWidth`    | `100`   |

## Linting

ESLint extends `eslint:recommended`, `plugin:@typescript-eslint/recommended`, `plugin:react/recommended`, `plugin:react-hooks/recommended`, and `prettier`. The lint command enforces **zero warnings** (`--max-warnings=0`).

## Testing

### Structure

- **Unit tests are colocated** in `__tests__/` directories adjacent to source files.
- **Component tests:** `src/components/__tests__/*.spec.tsx`
- **Utility tests:** `src/components/utils/__tests__/*.spec.ts`
- **E2E tests:** `tests/*.spec.ts` (Playwright)

### Patterns

- Use `describe` blocks matching the component/function name. Nest `describe` blocks to group related scenarios.
  ```ts
  describe('cleanValue', () => {
    describe('negative values', () => {
      it('should handle negative value', () => { ... });
    });
  });
  ```
- **Set up spies at describe scope**, clear in `beforeEach`:
  ```ts
  const onValueChangeSpy = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  ```
- **Use React Testing Library** — query by role (`screen.getByRole('textbox')`), simulate with `userEvent.type()` / `userEvent.clear()`, and `fireEvent` for blur/focus.
- **Snapshots** are used for basic render verification only (e.g., confirming the component renders).
- **No file/module mocks.** Tests use real implementations. Only callback props are mocked with `jest.fn()`.
- **Tests run with `LANG=en_GB`** to ensure consistent locale-dependent behavior.

## Commits

Commits follow [Conventional Commits](https://www.conventionalcommits.org/), enforced by commitlint with `@commitlint/config-conventional`. Husky runs pre-commit hooks.
