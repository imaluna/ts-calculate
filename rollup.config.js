const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const plugins = [
	resolve(),
	commonjs(),
	typescript({
		tsconfig: './tsconfig.json',
		compilerOptions: { incremental: false }
	})
];
const entry = './packages/index.ts';
module.exports = [
	{
		input: entry,
		output: [
			{
				dir: 'lib',
				format: 'cjs',
				entryFileNames: 'calculate-tool.cjs.js',
				sourcemap: false
			},
			// Keep the bundle as an ES module file
			{
				dir: 'lib',
				format: 'esm',
				entryFileNames: 'calculate-tool.esm.js',
				sourcemap: false
			},
			// Universal Module Definition, works as amd, cjs and iife all in one
			{
				dir: 'lib',
				format: 'umd',
				entryFileNames: 'calculate-tool.js',
				name: 'calculateTool',
				sourcemap: false
			}
		],
		plugins
	},
	{
		input: entry,
		output: [
			{
				dir: 'lib',
				format: 'umd',
				entryFileNames: 'calculate-tool.min.js',
				name: 'calculateTool',
				sourcemap: false
			}
		],
		plugins: [
			...plugins,
			terser({
				compress: {
					pure_getters: true,
					unsafe: true,
					unsafe_comps: true,
					drop_console: true,
					drop_debugger: true
				}
			})
		]
	}
];
