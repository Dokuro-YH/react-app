module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    jest: true
  },
  extends: 'airbnb',
  plugins: [
    'react',
    'jsx-a11y',
    'import'
  ],
  rules: {
    'no-bitwise': [0],
    'no-mixed-operators': [0],
    'import/prefer-default-export': [0],
    'react/jsx-filename-extension': [1, {
      'extensions': ['.js', '.jsx']
    }],
    'react/prefer-stateless-function': [0],
    'react/forbid-prop-types': [0],
    'react/require-default-props': [0],
  }
};
