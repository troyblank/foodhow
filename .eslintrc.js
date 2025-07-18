const globals = require('globals');

module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: [
    '@troyblank/eslint-config-troyblank/configs/es6.js',
    '@troyblank/eslint-config-troyblank/configs/react.js',
  ],
  globals: {
    ...globals.browser,
    ...globals.node,
    ...globals.jest,
  },
};
