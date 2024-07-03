/**
 *  Calculations about loan, including  calculation mortgage or loan use equal payment,
 *  calculation mortgage or loan use equal principal, prepayment, etc.
 * */
// import { checkObject, validateParams } from '../utils';
import { getPMTInDFC } from './dfc';
// import type { CheckTypeRecord } from '../types/global';
// import { DataTypeEnum } from '../types/global';
import type { LoanOption } from './types';
import { toFixed, POW, ABS } from '../utils/index';

const defaultOtp = { isEqualPayment: true, periodPerYear: 1 };
const DEFAULT_DECIMAL = 4;
/**
 * @function payment per period
 */
export function getPaymentPerPeriod(opt: LoanOption): number {
	// checkObject(opt);
	opt = { ...defaultOtp, ...opt };
	// const checkMap: CheckTypeRecord = {
	// 	principal: DataTypeEnum.NUMBER,
	// 	rate: DataTypeEnum.NUMBER,
	// 	periodPerYear: DataTypeEnum.NUMBER,
	// 	years: DataTypeEnum.NUMBER,
	// 	isEqualPayment: DataTypeEnum.BOOLEAN,
	// 	period: DataTypeEnum.BOOLEAN
	// };
	// const isValid = validateParams(opt, checkMap);
	// if (!isValid) {
	// 	return NaN;
	// }
	const periodPerYear = opt.periodPerYear as number;
	const n = opt.years * periodPerYear;
	const rate = opt.rate / periodPerYear;
	if (opt.isEqualPayment) {
		const pmt = getPMTInDFC({
			n,
			fv: 0,
			pv: opt.principal,
			rate
		});
		return ABS(pmt);
	} else {
		console.log(getInterestPerPeriod(opt), '-getInterestPerPeriod-');
		console.log(getPrincipalPerPeriod(opt), '-getPrincipalPerPeriod-');
		return toFixed(getInterestPerPeriod(opt) + getPrincipalPerPeriod(opt), DEFAULT_DECIMAL);
	}
}
export function getPrincipalPerPeriod(opt: LoanOption): number {
	// checkObject(opt);
	opt = { ...defaultOtp, ...opt };
	// const checkMap: CheckTypeRecord = {
	// 	principal: DataTypeEnum.NUMBER,
	// 	rate: DataTypeEnum.NUMBER,
	// 	periodPerYear: DataTypeEnum.NUMBER,
	// 	years: DataTypeEnum.NUMBER,
	// 	isEqualPayment: DataTypeEnum.BOOLEAN,
	// 	period: DataTypeEnum.BOOLEAN
	// };
	// const isValid = validateParams(opt, checkMap);
	// if (!isValid) {
	// 	return NaN;
	// }
	const periodPerYear = opt.periodPerYear as number;
	const n = opt.years * periodPerYear;
	if (opt.isEqualPayment) {
		return toFixed(getPaymentPerPeriod(opt) - getInterestPerPeriod(opt), DEFAULT_DECIMAL);
	} else {
		return toFixed(opt.principal / n, DEFAULT_DECIMAL);
	}
}
export function getInterestPerPeriod(opt: LoanOption): number {
	// checkObject(opt);
	opt = { ...defaultOtp, ...opt };
	// const checkMap: CheckTypeRecord = {
	// 	principal: DataTypeEnum.NUMBER,
	// 	rate: DataTypeEnum.NUMBER,
	// 	periodPerYear: DataTypeEnum.NUMBER,
	// 	years: DataTypeEnum.NUMBER,
	// 	isEqualPayment: DataTypeEnum.BOOLEAN,
	// 	period: DataTypeEnum.BOOLEAN
	// };
	// const isValid = validateParams(opt, checkMap);
	// if (!isValid) {
	// 	return NaN;
	// }
	const { periodPerYear, current, years, rate } = opt as Required<LoanOption>;
	const _rate = rate / periodPerYear / 100;
	if (opt.isEqualPayment) {
		const temp = POW(1 + _rate, years * periodPerYear);
		return toFixed(
			(opt.principal * _rate * (temp - POW(1 + _rate, current - 1))) / (temp - 1),
			DEFAULT_DECIMAL
		);
	} else {
		return toFixed(
			(opt.principal - (current - 1) * getPrincipalPerPeriod(opt)) * _rate,
			DEFAULT_DECIMAL
		);
	}
}

export function totalInterestInLoan(opt: LoanOption): number {
	opt = { ...defaultOtp, ...opt };
	const { principal, rate, periodPerYear, years } = opt as Required<LoanOption>;
	const n = years * periodPerYear;
	if (opt.isEqualPayment) {
		return toFixed(n * getPaymentPerPeriod(opt) - principal, DEFAULT_DECIMAL);
	} else {
		return toFixed(((n + 1) * principal * (rate / periodPerYear / 100)) / 2, DEFAULT_DECIMAL);
	}
}

export function paymentListInLoan(opt: LoanOption): Array<Record<string, number>> {
	opt = { ...defaultOtp, ...opt };
	const { periodPerYear, years } = opt as Required<LoanOption>;
	const n = years * periodPerYear;
	const list: Array<Record<string, number>> = [];
	for (let i = 1; i <= n; i++) {
		const _opt = { ...opt, current: i };
		const principal = getPrincipalPerPeriod(_opt);
		const int = getInterestPerPeriod(_opt);
		const pmt = toFixed(principal + int, DEFAULT_DECIMAL);
		const item: Record<string, number> = {
			current: i,
			principal,
			interest: int,
			payment: pmt
		};

		list.push(item);
	}
	return list;
}
