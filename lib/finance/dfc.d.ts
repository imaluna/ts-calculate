import type { DfcOption, NpvOption } from './types';
/**
 * Discounted cash flow model: Get the future value of annuity
 * @param {DfcOption} opt
 * @param {number} opt.n Number of periods
 * @param {number} opt.pv The present value
 * @param {number} opt.pmt Payment per period
 * @param {number} opt.rate The interest rate per period
 * @param {number} opt.decimal not required
 * @param {boolean} opt.isEnd not required
 * @returns {number}
 */
export declare function fvInDfc(opt: DfcOption): number;
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
export declare function pmtInDfc(opt: DfcOption): number;
/**
 * @function Discounted cash flow model: Get the present value of annuity
 * @param {DfcOption} opt
 * @param {number} opt.n Number of periods
 * @param {number} opt.fv The future value
 * @param {number} opt.pmt The payment per period
 * @param {number} opt.rate The interest rate per period
 * @param {number} opt.decimal not required
 * @param {boolean} opt.isEnd default: true,
 * @returns {number}
 */
export declare function pvInDfc(opt: DfcOption): number;
/**
 * @function Discounted cash flow model: Get the interest rate per period
 * @param {DfcOption} opt
 * @param {number} opt.n Number of periods
 * @param {number} opt.fv The future value
 * @param {number} opt.pv The present value
 * @param {number} opt.pmt The payment per period
 * @param {number} opt.decimal not required
 * @param {boolean} opt.isEnd default: true,
 * @returns {number}
 */
export declare function rateInDfc(opt: DfcOption): number;
/**
 * @function Discounted cash flow model: Get the Net Present Value
 * @param {NpvOption} opt
 * @param {number} opt.initCf The initial cash flow
 * @param {number[]} opt.cfList Cash flow list
 * @param {number} opt.rate The interest rate per period
 * @param {number} opt.decimal not required
 * @returns {number}
 */
export declare function npv(opt: NpvOption): number;
/**
 * @function Discounted cash flow model: Get the Interest Rate of Return，there may be multiple return values
 * @param {NpvOption} opt
 * @param {number} opt.initCf The initial cash flow
 * @param {number[]} opt.cfListv Cash flow list
 * @param {number} opt.decimal not required
 * @returns {number[]}
 */
export declare function irr(opt: NpvOption): number[];
