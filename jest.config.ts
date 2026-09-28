import type { Config } from 'jest';

const config: Config = {
  roots: ['src'],
  verbose: false,
  collectCoverage: true,
  // Current coverage is 100% across the board; the threshold is set a
  // few points below that so a real regression fails the build without
  // being so tight that routine changes trip it.
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;
