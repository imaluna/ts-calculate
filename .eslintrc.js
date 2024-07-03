module.exports = {
	root: true,
	env: {
		node: true,
		browser: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module'
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended'
	],
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				semi: true,
				tabWidth: 2,
				useTabs: true,
				singleQuote: true,
				printWidth: 100,
				trailingComma: 'none',
				htmlWhitespaceSensitivity: 'ignore'
			}
		],
		'no-console': 'off',
		'no-debugger': 'warn',
		'@typescript-eslint/no-explicit-any': 'off'
	}
};
