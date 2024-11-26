/**
 *  Calculations about annuity, including discounted cash flow models (DFC) and perpetuities
 */
import { POW, ABS, toFixed, getSymbol, validateParams, checkObject } from '../utils';
import type { CheckTypeRecord } from '../types/global';
import type { DfcOption, NpvOption } from './types';
import { DataTypeEnum } from '../types/global';
import { DECIMAL } from '../config';

const defaultOpt: DfcOption = {
	isEnd: true,
	decimal: DECIMAL
};
const defaultCheckRecord: CheckTypeRecord = {
	isEnd: DataTypeEnum.BOOLEAN,
	decimal: DataTypeEnum.NUMBER
};
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
export function fvInDfc(opt: DfcOption): number {
	checkObject(opt);
	opt = { ...defaultOpt, ...opt };
	const checkMap: CheckTypeRecord = {
		n: DataTypeEnum.NUMBER,
		pv: DataTypeEnum.NUMBER,
		pmt: DataTypeEnum.NUMBER,
		rate: DataTypeEnum.NUMBER,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { n, pv, pmt, rate, isEnd, decimal } = opt as Required<DfcOption>;
	const curRate = 1 + rate / 100;
	let sum = -pv * POW(curRate, n);
	let i = 1;
	while (i <= n) {
		sum -= pmt * POW(curRate, isEnd ? n - i : n - i + 1);
		i++;
	}
	return +sum.toFixed(decimal);
}
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
export function pmtInDfc(opt: DfcOption): number {
	checkObject(opt);
	opt = { ...defaultOpt, ...opt };
	const checkMap: CheckTypeRecord = {
		n: DataTypeEnum.NUMBER,
		pv: DataTypeEnum.NUMBER,
		fv: DataTypeEnum.NUMBER,
		rate: DataTypeEnum.NUMBER,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { n, pv, fv, rate, isEnd, decimal } = opt as Required<DfcOption>;
	const curRate = 1 + rate / 100;
	let sum = 0;
	let i = 1;
	while (i <= n) {
		sum += POW(curRate, isEnd ? n - i : n - i + 1);
		i++;
	}
	return -((pv * POW(curRate, n) + fv) / sum).toFixed(decimal);
}

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
export function pvInDfc(opt: DfcOption): number {
	checkObject(opt);
	opt = { ...defaultOpt, ...opt };
	const checkMap: CheckTypeRecord = {
		n: DataTypeEnum.NUMBER,
		pmt: DataTypeEnum.NUMBER,
		fv: DataTypeEnum.NUMBER,
		rate: DataTypeEnum.NUMBER,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { n, pmt, fv, rate, isEnd, decimal } = opt as Required<DfcOption>;
	const curRate = 1 + rate / 100;
	let sum = -fv * POW(curRate, -n);
	let i = 1;
	while (i <= n) {
		sum -= pmt * POW(curRate, isEnd ? -i : 1 - i);
		i++;
	}
	return +sum.toFixed(decimal);
}

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
export function rateInDfc(opt: DfcOption): number {
	checkObject(opt);
	opt = { ...defaultOpt, ...opt };
	const checkMap: CheckTypeRecord = {
		n: DataTypeEnum.NUMBER,
		pmt: DataTypeEnum.NUMBER,
		fv: DataTypeEnum.NUMBER,
		pv: DataTypeEnum.NUMBER,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { n, pmt, fv, pv, isEnd, decimal } = opt as Required<DfcOption>;
	let min = 0;
	let max = 100;
	const err = POW(10, 1 - decimal);
	let rate = +((min + max) / 2).toFixed(decimal);
	while (max > min) {
		const _fv = fvInDfc({ n, pv, rate, pmt, isEnd, decimal });
		if (ABS(_fv - fv) <= err) {
			break;
		}
		if (ABS(_fv) > ABS(fv)) {
			max = rate;
		} else {
			min = rate;
		}
		rate = +((min + max) / 2).toFixed(decimal);
	}
	if (rate <= max && rate >= min) return rate;
	return NaN;
}

/**
 * @function Discounted cash flow model: Get the Net Present Value
 * @param {NpvOption} opt
 * @param {number} opt.initCf The initial cash flow
 * @param {number[]} opt.cfList Cash flow list
 * @param {number} opt.rate The interest rate per period
 * @param {number} opt.decimal not required
 * @returns {number}
 */
export function npv(opt: NpvOption): number {
	opt = { decimal: DECIMAL, ...opt };
	const { initCf, cfList, rate, decimal } = opt as Required<NpvOption>;
	let sum = initCf;
	cfList.forEach((cf, index) => {
		sum += cf * POW(1 + rate / 100, -(index + 1));
	});
	return toFixed(sum, decimal);
}
/**
 * @function Discounted cash flow model: Get the Interest Rate of Return，there may be multiple return values
 * @param {NpvOption} opt
 * @param {number} opt.initCf The initial cash flow
 * @param {number[]} opt.cfListv Cash flow list
 * @param {number} opt.decimal not required
 * @returns {number[]}
 */
export function irr(opt: NpvOption): number[] {
	opt = { decimal: DECIMAL, ...opt };
	const { initCf, cfList, decimal } = opt as Required<NpvOption>;
	const initSymbol = getSymbol(initCf);
	const notValid = cfList.every((cf) => getSymbol(cf) === initSymbol);
	if (notValid) return [];
	const min = 0;
	let rate = min;
	const list: number[] = [];

	while (rate <= 100) {
		const _npv = npv({ ...opt, rate });
		if (ABS(_npv) <= 1) {
			list.push(rate);
		}
		rate = toFixed(rate + 0.001, decimal);
	}
	return list;
}
