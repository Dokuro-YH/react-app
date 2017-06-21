module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb',
  plugins: [
    'react',
    'jsx-a11y',
    'import'
  ],
  rules: {
    'react/jsx-filename-extension': [1, {
      'extensions': ['.js', '.jsx']
    }],
    'react/prefer-stateless-function': [0]
  }
};
