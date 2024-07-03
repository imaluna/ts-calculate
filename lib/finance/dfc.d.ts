import type { DfcOption } from './types';
/**
 * Discounted cash flow model: Get the future value of annunity
 * @param {DfcOption} opt
 * @param {number} opt.n Number of periods
 * @param {number} opt.pv The present value
 * @param {number} opt.pmt Payment per period
 * @param {number} opt.rate
 * @param {number} opt.decimal not required
 * @param {boolean} opt.isEnd
 * @returns {number}
 */
export declare function getFVInDFC(opt: DfcOption): number;
/**
 * @function Discounted cash flow model: Get the payment per period
 * @param {DfcOption} opt
 * @param {number} opt.n Number of periods
 * @param {number} opt.pv The present value
 * @param {number} opt.fv The future value
 * @param {number} opt.rate Interest rate per period
 * @param {number} opt.decimal not required
 * @param {boolean} opt.isEnd default: true,
 * @returns {number}
 */
export declare function getPMTInDFC(opt: DfcOption): number;
export declare function getPVInDFC(opt: DfcOption): number;
export declare function getRateInDFC(opt: DfcOption): number;
