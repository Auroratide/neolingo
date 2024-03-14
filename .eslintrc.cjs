module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:svelte/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	rules: {
		"indent": ["error", "tab"],
		"quotes": ["error", "double"],
		"comma-dangle": ["error", "always-multiline"],
		"semi": ["error", "never"],
		"@typescript-eslint/no-non-null-assertion": "off",
		"svelte/no-at-html-tags": "off",
		"no-console": ["error"],
		"no-undef": ["off"], // false positive with svelte generics; rely on typescript instead
		"svelte/valid-compile": "off", // broken: https://github.com/sveltejs/eslint-plugin-svelte/issues/652
	},
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
		extraFileExtensions: [".svelte"],
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
		},
	],
}
