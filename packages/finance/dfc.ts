/**
 *  Calculations about annunity, including discounted cash flow models (DFC) and perpetuities
 */
import { POW, ABS, toFixed, getSymbol } from '../utils';
// import { validateParams, checkObject, POW, ABS } from '../utils';
// import type { CheckTypeRecord } from '../types/global';
import type { DfcOption, NpvOption } from './types';
// import { DataTypeEnum } from '../types/global';
const DECIMAL = 4;
const defaultOpt: DfcOption = {
	isEnd: true,
	decimal: DECIMAL
};
// const defaultCheckRecord: CheckTypeRecord = {
// 	isEnd: DataTypeEnum.BOOLEAN,
// 	decimal: DataTypeEnum.NUMBER
// };
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
export function getFVInDFC(opt: DfcOption): number {
	// checkObject(opt);
	opt = { ...defaultOpt, ...opt };
	// const checkMap: CheckTypeRecord = {
	// 	n: DataTypeEnum.NUMBER,
	// 	pv: DataTypeEnum.NUMBER,
	// 	pmt: DataTypeEnum.NUMBER,
	// 	rate: DataTypeEnum.NUMBER,
	// 	...defaultCheckRecord
	// };
	// const isValid = validateParams(opt, checkMap);
	// if (!isValid) {
	// 	return NaN;
	// }
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
export function getPMTInDFC(opt: DfcOption): number {
	// checkObject(opt);
	opt = { ...defaultOpt, ...opt };
	// const checkMap: CheckTypeRecord = {
	// 	n: DataTypeEnum.NUMBER,
	// 	pv: DataTypeEnum.NUMBER,
	// 	fv: DataTypeEnum.NUMBER,
	// 	rate: DataTypeEnum.NUMBER,
	// 	...defaultCheckRecord
	// };
	// const isValid = validateParams(opt, checkMap);
	// if (!isValid) {
	// 	return NaN;
	// }
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

export function getPVInDFC(opt: DfcOption): number {
	// checkObject(opt);
	opt = { ...defaultOpt, ...opt };
	// const checkMap: CheckTypeRecord = {
	// 	n: DataTypeEnum.NUMBER,
	// 	pmt: DataTypeEnum.NUMBER,
	// 	fv: DataTypeEnum.NUMBER,
	// 	rate: DataTypeEnum.NUMBER,
	// 	...defaultCheckRecord
	// };
	// const isValid = validateParams(opt, checkMap);
	// if (!isValid) {
	// 	return NaN;
	// }
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

export function getRateInDFC(opt: DfcOption): number {
	// checkObject(opt);
	opt = { ...defaultOpt, ...opt };
	// const checkMap: CheckTypeRecord = {
	// 	n: DataTypeEnum.NUMBER,
	// 	pmt: DataTypeEnum.NUMBER,
	// 	fv: DataTypeEnum.NUMBER,
	// 	pv: DataTypeEnum.NUMBER,
	// 	...defaultCheckRecord
	// };
	// const isValid = validateParams(opt, checkMap);
	// if (!isValid) {
	// 	return NaN;
	// }
	const { n, pmt, fv, pv, isEnd, decimal } = opt as Required<DfcOption>;
	let min = 0;
	let max = 100;
	const err = POW(10, 1 - decimal);
	let rate = +((min + max) / 2).toFixed(decimal);
	while (rate <= max && rate >= min) {
		const _fv = getFVInDFC({ n, pv, rate, pmt, isEnd, decimal });
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
	return rate;
}

export function getNPV(opt: NpvOption): number {
	opt = { decimal: DECIMAL, ...opt };
	const { initCf, cfList, rate, decimal } = opt as Required<NpvOption>;
	let sum = initCf;
	cfList.forEach((cf, index) => {
		sum += cf * POW(1 + rate / 100, -(index + 1));
	});
	return toFixed(sum, decimal);
}

export function getIRR(opt: NpvOption): number[] {
	opt = { decimal: DECIMAL, ...opt };
	const { initCf, cfList, decimal } = opt as Required<NpvOption>;
	const initSymbol = getSymbol(initCf);
	const notValid = cfList.every((cf) => getSymbol(cf) === initSymbol);
	if (notValid) return [];
	const min = 0;
	const precision = toFixed(POW(10, -decimal), decimal);
	let rate = min;
	const list: number[] = [];
	while (rate <= 100) {
		const _npv = getNPV({ ...opt, rate });
		if (ABS(_npv) <= precision) {
			console.log({ _npv });
			list.push(rate);
		}
		rate = toFixed(rate + precision, decimal);
	}
	return list;
}
