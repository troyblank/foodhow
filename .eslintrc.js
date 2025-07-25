const globals = require('globals');

module.exports = {
    env: {
        browser: true,
        node: true,
        jest: true
    },
    extends: [
        '@troyblank/eslint-config-troyblank/configs/es6.js',
        '@troyblank/eslint-config-troyblank/configs/react.js',
        '@troyblank/eslint-config-troyblank/configs/typescript.js'
    ],
    globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
    },
    rules: {
        'import/extensions': 'off',
        'import/prefer-default-export': 'off'
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    }
};
