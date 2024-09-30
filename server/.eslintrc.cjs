module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb', // or any other config you want to extend
    'airbnb-typescript/base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
    // project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['**/*.js', '**/*.cjs', '**/*.mjs'],
  rules: {
    // we can override some problematic import rules here
    // that can cause issues when using import aliases.
    'import/extensions': 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    'no-underscore-dangle': 'warn',
    '@typescript-eslint/no-useless-constructor': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@server/**',
            group: 'internal',
          },
          {
            pattern: '@tests/**',
            group: 'internal',
          },
        ],
      },
    ],

    // functions are always hoisted, so we can use them before they are defined
    // which in various cases improves readability
    'no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

    'import/prefer-default-export': 'off',
  },
}
