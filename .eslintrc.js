module.exports = {
	root: true,
	env: {
		node: true,
		browser: true
	},
	extends: [
		'eslint:recommended',
		'standard-with-typescript',
		'plugin:@typescript-eslint/recommended',
		'eslint-config-prettier'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.base.json', './tsconfig.eslint.json', './tsconfig.json'],
		tsconfigRootDir: __dirname
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'prettier/prettier': 'error',
		'no-console': 'off',
		'no-debugger': 'warn',
		'@typescript-eslint/no-explicit-any': 'off'
	}
};
