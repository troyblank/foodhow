import globals from 'globals'

module.exports = {
    env: {
      jest: true,
    },
    extends: [
        "@troyblank/eslint-config-troyblank/configs/es6.js",
        "@troyblank/eslint-config-troyblank/configs/react.js"
    ],
    languageOptions: {
        globas: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
        }
    }
};
