/**
 * @function get mean
 * @param {number[]} data
 * @returns {number} mean
 */
export declare function mean(data: number[], decimal?: number): number;
/**
 * @function get variance of population
 * @param {number[]} data
 * @returns {number} variance
 */
export declare function variance(data: number[], decimal?: number): number;
/**
 * @function get standard deviation of population
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export declare function stdDeviation(data: number[], decimal?: number): number;
/**
 * @function get variance of sample
 * @param {number[]} data
 * @returns {number} variance
 */
export declare function varianceOfSample(data: number[], decimal?: number): number;
/**
 * @function get standard deviation of sample
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export declare function stdDeviationOfSample(data: number[], decimal?: number): number;
/**
 * @function get target/down deviation/ semideviation
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export declare function semiDeviation(data: number[], target: number, decimal?: number): number;
/**
 * @function get the standard normal distribution value by z-score
 * @param {number | string} z: z-score or standard score
 * @return {number|undefined}
 */
export declare function stdNormalDistributionValue(z: number | string): number;
