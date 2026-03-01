const { defineConfig } = require("eslint/config");
const js = require("@eslint/js");
const globals = require("globals");
const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const importPlugin = require("eslint-plugin-import");
const reactPlugin = require("eslint-plugin-react");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const jsonPlugin = require("eslint-plugin-json");
const testingLibraryPlugin = require("eslint-plugin-testing-library");

// Import and flatten shared configs (es6 + react + typescript) in this project
const es6 = require("@troyblank/eslint-config-troyblank/configs/es6.js");
const react = require("@troyblank/eslint-config-troyblank/configs/react.js");
const typescript = require("@troyblank/eslint-config-troyblank/configs/typescript.js");
const shared = {
	rules: { ...es6.rules, ...react.rules, ...typescript.rules },
	settings: { ...es6.settings, ...react.settings, ...typescript.settings },
	parserOptions: { ...es6.parserOptions },
};

module.exports = defineConfig([
	js.configs.recommended,
	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.typescript,
	reactPlugin.configs.flat.recommended,
	reactHooksPlugin.configs.flat.recommended,
	jsxA11yPlugin.flatConfigs.recommended,
	{
		files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.json"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: shared.parserOptions.ecmaVersion || 2019,
				sourceType: shared.parserOptions.sourceType || "module",
				ecmaFeatures: { jsx: true },
				project: ["./tsconfig.json"],
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
		},
		plugins: {
			"@typescript-eslint": typescriptEslint,
			json: jsonPlugin,
			"testing-library": testingLibraryPlugin,
		},
		rules: {
			...shared.rules,
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"import/extensions": "off",
			"import/no-extraneous-dependencies": [
				"error",
				{
					devDependencies: [
						"**/*.test.ts",
						"**/*.test.tsx",
						"**/testing/**",
					],
				},
			],
			"import/prefer-default-export": "off",
			indent: ["error", "tab"],
			"no-tabs": "off",
			"react/jsx-indent": ["error", "tab"],
			"react/jsx-indent-props": ["error", "tab"],
			"react/require-default-props": "off",
			"react/display-name": "off",
			"react/jsx-filename-extension": "off",
		},
		settings: {
			...shared.settings,
			"import/resolver": {
				node: {
					extensions: [".js", ".jsx", ".ts", ".tsx"],
				},
			},
			react: {
				version: "19.0",
			},
		},
	},
]);
