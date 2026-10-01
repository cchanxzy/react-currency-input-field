import { createRequire } from 'node:module';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig, globalIgnores } from 'eslint/config';
import { importX } from 'eslint-plugin-import-x';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// eslint-plugin-react 7.37's 'detect' calls an API that ESLint 10 removed, so
// read the installed React version directly instead.
const reactVersion = createRequire(import.meta.url)('react/package.json').version;

export default defineConfig(
  globalIgnores(['dist', 'demo', 'coverage', 'playwright-report', 'test-results', '.parcel-cache']),
  js.configs.recommended,
  tseslint.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    settings: {
      react: {
        version: reactVersion,
      },
    },
  },
  {
    files: ['*.{js,mjs,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['commitlint.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  // Rules below encode docs/CODING_STANDARDS.md.
  {
    plugins: { 'import-x': importX },
    rules: {
      'import-x/order': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description', minimumDescriptionLength: 10 },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      // Merge type and value imports from one module into a single statement.
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
        // PascalCase for React components; no SCREAMING_SNAKE_CASE constants.
        {
          selector: ['variable', 'function'],
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        // Props can be renamed to a component: ({ as: Component }). The
        // 'destructured' modifier doesn't match renamed properties.
        {
          selector: 'parameter',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        { selector: 'enumMember', format: ['PascalCase'] },
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        { selector: 'typeLike', format: ['PascalCase'] },
        // Property names often mirror external shapes (Intl options, DOM
        // attributes, locale keys), so they aren't checked.
        { selector: ['property', 'method'], format: null },
      ],
    },
  },
  {
    files: ['**/*.tsx'],
    rules: {
      'react/jsx-handler-names': ['error', { checkLocalVariables: true }],
    },
  },
  {
    files: ['src/components/**/*.{ts,tsx}', 'src/index.ts'],
    ignores: ['**/__tests__/**'],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  },
  {
    // Utilities are pure: they don't reassign or mutate their inputs.
    files: ['src/components/utils/**/*.ts'],
    ignores: ['**/__tests__/**'],
    rules: {
      'no-param-reassign': ['error', { props: true }],
    },
  },
  {
    files: ['**/__tests__/**'],
    rules: {
      // Tests use real implementations; only callback props are mocked.
      'no-restricted-properties': [
        'error',
        {
          object: 'jest',
          property: 'mock',
          message: 'Use real modules; mock callback props with jest.fn() instead.',
        },
        {
          object: 'jest',
          property: 'doMock',
          message: 'Use real modules; mock callback props with jest.fn() instead.',
        },
      ],
      // Callback props get jest.fn() spies, named after the prop (onChangeSpy).
      'react/jsx-handler-names': 'off',
      // Tests pass invalid values on purpose to check runtime behaviour.
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // user-event calls return promises; a missing await lets a test assert
    // before the events have run.
    files: ['src/**/__tests__/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    // Jest only runs *.spec.ts(x) (see jest.config.ts), so flag test code in
    // any other file, which would otherwise be skipped without any error.
    // Shared helpers and fixtures in __tests__ have no test calls, so pass.
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/*.spec.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector:
            'CallExpression[callee.name=/^(describe|it|test)$/], CallExpression[callee.object.name=/^(describe|it|test)$/]',
          message: 'Name test files *.spec.ts or *.spec.tsx so Jest runs them.',
        },
      ],
    },
  },
  prettier
);
