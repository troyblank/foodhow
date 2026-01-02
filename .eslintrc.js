const globals = require('globals');

module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
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
		'@typescript-eslint/no-unused-vars': ['error', {
			argsIgnorePattern: '^_',
			varsIgnorePattern: '^_'
		}],
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': ['error', {
			devDependencies: ['**/*.test.ts', '**/*.test.tsx', '**/testing/**']
		}],
		'import/prefer-default-export': 'off',
		indent: ['error', 'tab'],
		'no-tabs': 'off',
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/require-default-props': 'off'
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx']
			}
		}
	}
};
