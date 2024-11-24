const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const unpkg = process.argv.includes('--unpkg');
const output = [];
const plugins = [
	resolve(),
	commonjs(),
	typescript({
		tsconfig: './tsconfig.json',
		compilerOptions: { incremental: false }
	})
];
if (!unpkg) {
	output.push(
		{
			dir: 'lib',
			format: 'cjs',
			entryFileNames: 'calculate.cjs.js',
			sourcemap: false
		},
		// Keep the bundle as an ES module file
		{
			dir: 'lib',
			format: 'esm',
			entryFileNames: 'calculate.esm.js',
			sourcemap: false
		},
		// Universal Module Definition, works as amd, cjs and iife all in one
		{
			dir: 'lib',
			format: 'umd',
			entryFileNames: 'calculate.min.js',
			name: 'calculate',
			sourcemap: false
		}
	);
	plugins.push(
		terser({
			compress: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				drop_console: true,
				drop_debugger: true
			}
		})
	);
} else {
	output.push({
		dir: 'lib',
		format: 'umd',
		entryFileNames: 'calculate.js',
		name: 'calculatejs',
		sourcemap: false
	});
}

module.exports = {
	input: './packages/index.ts',
	output,
	plugins
};
