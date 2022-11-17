module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard',
  overrides: [
  ],
  plugins: [
    'import',
    'n',
    'promise'
  ],
  globals: {
    document: 'readonly',
    navigator: 'readonly',
    window: 'readonly'
  },
  rules: {
    'no-var': 'warn',

    'import/order': 'error',
    'import/first': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
    semi: ['error', 'always'],
    curly: ['error', 'all'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    camelcase: 'off'
  }
};
