/**
 * @function get mean
 * @param {number[]} data
 * @returns {number} mean
 */
export declare function getMean(data: number[], decimal?: number): number;
/**
 * @function get variance of population
 * @param {number[]} data
 * @returns {number} variance
 */
export declare function getVariance(data: number[], decimal?: number): number;
/**
 * @function get standard deviation of population
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export declare function getStd(data: number[], decimal?: number): number;
/**
 * @function get variance of sample
 * @param {number[]} data
 * @returns {number} variance
 */
export declare function getVarianceOfSample(data: number[], decimal?: number): number;
/**
 * @function get standard deviation of sample
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export declare function getStdOfSample(data: number[], decimal?: number): number;
/**
 * @function get target/down deviation/ semideviation
 * @param {number[]} data
 * @returns {number} standard deviation
 */
export declare function getSemiDeviation(data: number[], target: number, decimal?: number): number;
/**
 * @function get the standard normal distribution value by z-score
 * @param {number | string} z: z-score or standard score
 * @return {number|undefined}
 */
export declare function getStdNormalDistributionValue(z: number | string): number;
