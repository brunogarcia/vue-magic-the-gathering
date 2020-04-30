module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:jsdoc/recommended',
    'plugin:testing-library/recommended',
    'plugin:jest/recommended',
    '@vue/airbnb',
  ],
  plugins: [
    'jsdoc',
    'jest',
    'testing-library',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
