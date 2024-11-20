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
export function mean(data: number[], decimal: number = DECIMAL): number {
	const sum = data.reduce((prev, curr) => prev + +curr, 0);
	return toFixed(sum / data.length, decimal);
}

function _getSquareTotal(data: number[], target?: number): number {
	target = target === undefined ? mean(data) : target;
	const sum = data.reduce((prev, curr) => prev + Math.pow(+curr - Number(target), 2), 0);
	return sum;
}
/**
 * @function get variance of population
 * @param {number[]} data
 * @returns {number} variance
 */
export function variance(data: number[], decimal: number = DECIMAL): number {
	const sum = _getSquareTotal(data);
	return toFixed(sum / data.length, decimal);
}

/**
 * @function get standard deviation of population
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export function stdDeviation(data: number[], decimal: number = DECIMAL): number {
	const sum = _getSquareTotal(data);
	return toFixed(Math.sqrt(sum / data.length), decimal);
}
/**
 * @function get variance of sample
 * @param {number[]} data
 * @returns {number} variance
 */
export function varianceOfSample(data: number[], decimal: number = DECIMAL): number {
	const sum = _getSquareTotal(data);
	return toFixed(sum / (data.length - 1), decimal);
}
/**
 * @function get standard deviation of sample
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export function stdDeviationOfSample(data: number[], decimal: number = DECIMAL): number {
	const sum = _getSquareTotal(data);
	return toFixed(Math.sqrt(sum / (data.length - 1)), decimal);
}
/**
 * @function get target/down deviation/ semideviation
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export function semiDeviation(data: number[], target: number, decimal: number = DECIMAL): number {
	const sum = _getSquareTotal(data, target);
	return toFixed(Math.sqrt(sum / (data.length - 1)), decimal);
}

/**
 * @function get the standard normal distribution value by z-score
 * @param {number | string} z: z-score or standard score
 * @return {number|undefined}
 */
export function stdNormalDistributionValue(z: number | string): number {
	if (!isNumber(z)) return NaN;
	const table = standardNormalDistributionTable;
	const maxZ = Object.keys(table).sort((a, b) => +b - +a)[0];
	const maxValue = +table[maxZ]['0.09'] + 0.00001;
	if (+z > +maxZ || +z < -maxZ) return toFixed(maxValue, 5);
	z = Number(z).toFixed(2);
	const arr = z.match(/([+|-]?\d+\.\d)(\d)/);
	if (arr) {
		const column = arr[1];
		const _column = Math.abs(+column);
		const row = `0.0${arr[2]}`;
		const res = table[_column]?.[row];

		return Number(column) >= 0 ? res : toFixed(1 - res, 5);
	}
	return NaN;
}
