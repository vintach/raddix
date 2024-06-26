module.exports = {
  env: {
    browser: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:react/jsx-runtime'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ['**/*.js'],
  rules: {
    'react/prop-types': 'off',
    curly: [2, 'multi-line'],
    'no-console': 'error',
    'import/no-default-export': ['error'],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-indexed-object-style': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as' }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/no-base-to-string': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-meaningless-void-operator': 'error',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/non-nullable-type-assertion-style': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/require-array-sort-compare': 'error',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/typedef': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-duplicate-imports': 'error',
    '@typescript-eslint/no-extraneous-class': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
    '@typescript-eslint/no-loop-func': 'error',
    '@typescript-eslint/no-loss-of-precision': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-redundant-type-constituents': 'error',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/return-await': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    'no-unused-vars': 'off',
    'no-await-in-loop': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ],
    'no-constructor-return': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: ['class', 'function', 'block-like'],
        next: ['class', 'function', 'block-like']
      },
      {
        blankLine: 'always',
        prev: ['multiline-expression'],
        next: ['*']
      },
      {
        blankLine: 'always',
        prev: ['*'],
        next: ['multiline-expression']
      },
      {
        blankLine: 'always',
        prev: ['import'],
        next: ['class']
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error'
  },
  overrides: [
    /**
     * -----------------------------------------------------
     * STORYBOOK
     * -----------------------------------------------------
     */
    {
      files: ['*.stories.ts', '*.stories.tsx'],
      extends: ['plugin:storybook/recommended'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow'
          }
        ],
        'import/no-default-export': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': 'off'
      }
    },
    /**
     * -----------------------------------------------------
     * EXAMPLES AND SCRIPTS
     * -----------------------------------------------------
     */
    {
      files: [
        './packages/**/**/examples/*.{ts,tsx}',
        './scripts/**/*.{ts,tsx}',
        '*.config.{ts,tsx}'
      ],
      rules: {
        'import/no-default-export': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'no-console': 'off'
      }
    }
  ]
};
