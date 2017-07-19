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
    'import/prefer-default-export': [0],
    'react/jsx-filename-extension': [1, {
      'extensions': ['.js', '.jsx']
    }],
    'react/prefer-stateless-function': [0],
    'react/forbid-prop-types': [0]
  }
};
