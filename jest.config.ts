import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic'
            }
          }
        }
      }
    ]
  },
  roots: ['packages/'],
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['packages/**/**/src/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  verbose: true,
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};

export default config;
