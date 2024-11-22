const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');

module.exports = {
	input: './packages/index.ts',
	output: [
		{
			dir: 'lib',
			format: 'cjs',
			entryFileNames: 'calculate.cjs.js',
			sourcemap: false
		},
		{
			dir: 'lib',
			format: 'esm',
			entryFileNames: 'calculate.esm.js',
			sourcemap: false
		},
		{
			dir: 'lib',
			format: 'umd',
			entryFileNames: 'calculate.min.js',
			name: 'calculatejs',
			sourcemap: false
		}
	],
	plugins: [
		resolve(),
		commonjs(),
		typescript({
			tsconfig: './tsconfig.json',
			compilerOptions: { incremental: false }
		}),
		terser({
			compress: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				// drop_console: true,
				drop_debugger: true
			}
		})
	]
};
