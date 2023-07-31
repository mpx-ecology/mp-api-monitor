module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  globals: {
    wx: 'readonly',
    my: 'readonly',
    Component: 'readonly',
    Page: 'readonly',
    App: 'readonly',
    getCurrentPages: 'readonly'
  },
  rules: {
    'no-cond-assign': 0,
    camelcase: 0,
    '@typescript-eslint/no-explicit-any': 0
  },
  env: {
    'node': true
  }
}
