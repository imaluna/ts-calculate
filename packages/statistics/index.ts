/**
 * @desc statistics
 */
import { DECIMAL } from '../config';
import { toFixed, isNumber } from '../utils';
import { standardNormalDistributionTable } from './config';
/**
 * @function get mean
 * @param {number[]} data
 * @returns {number} mean
 */
export function getMean(data: number[], decimal: number = DECIMAL): number {
	const sum = data.reduce((prev, curr) => prev + +curr, 0);
	return toFixed(sum / data.length, decimal);
}

function _getSquareTotal(data: number[], target?: number): number {
	target = target === undefined ? getMean(data) : target;
	const sum = data.reduce((prev, curr) => prev + Math.pow(+curr - Number(target), 2), 0);
	return sum;
}
/**
 * @function get variance of population
 * @param {number[]} data
 * @returns {number} variance
 */
export function getVariance(data: number[], decimal: number = DECIMAL): number {
	const sum = _getSquareTotal(data);
	return toFixed(sum / data.length, decimal);
}

/**
 * @function get standard deviation of population
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export function getStd(data: number[], decimal: number = DECIMAL): number {
	const sum = _getSquareTotal(data);
	return toFixed(Math.sqrt(sum / data.length), decimal);
}
/**
 * @function get variance of sample
 * @param {number[]} data
 * @returns {number} variance
 */
export function getVarianceOfSample(data: number[], decimal: number = DECIMAL): number {
	const sum = _getSquareTotal(data);
	return toFixed(sum / (data.length - 1), decimal);
}
/**
 * @function get standard deviation of sample
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export function getStdOfSample(data: number[], decimal: number = DECIMAL): number {
	const sum = _getSquareTotal(data);
	return toFixed(Math.sqrt(sum / (data.length - 1)), decimal);
}
/**
 * @function get target/down deviation/ semideviation
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export function getSemiDeviation(
	data: number[],
	target: number,
	decimal: number = DECIMAL
): number {
	const sum = _getSquareTotal(data, target);
	return toFixed(Math.sqrt(sum / (data.length - 1)), decimal);
}

/**
 * @function get the standard normal distribution value by z-score
 * @param {number | string} z: z-score or standard score
 * @return {number|undefined}
 */
export function getStdNormalDistributionValue(z: number | string): number {
	if (!isNumber(z)) return NaN;
	const table = standardNormalDistributionTable;
	const maxZ = Object.keys(table).sort((a, b) => +b - +a)[0];
	const maxValue = +table[maxZ]['0.09'] + 0.00001;
	if (+z > +maxZ || +z < -maxZ) return toFixed(maxValue, 5);
	z = Number(z).toFixed(2);
	const arr = z.match(/(\d+\.\d)(\d)/);
	if (arr) {
		const column = arr[1];
		const row = `0.0${arr[2]}`;
		return table[column]?.[row] ?? NaN;
	}
	return NaN;
}
