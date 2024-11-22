/**
 *  Calculations about loan, including  calculation mortgage or loan use equal payment,
 *  calculation mortgage or loan use equal principal, prepayment, etc.
 * */
import { checkObject, validateParams } from '../utils';
import { pmtInDfc } from './dfc';
import type { CheckTypeRecord } from '../types/global';
import { DataTypeEnum } from '../types/global';
import type { LoanOption } from './types';
import { toFixed, POW, ABS } from '../utils/index';
import { DECIMAL } from '../config';

const defaultOtp = { isEqualPayment: true, periodPerYear: 1, decimal: DECIMAL };
const defaultCheckRecord: CheckTypeRecord = {
	decimal: DataTypeEnum.NUMBER
};
/**
 * @function payment per period
 */
export function pmtInloan(opt: LoanOption): number {
	checkObject(opt);
	opt = { ...defaultOtp, ...opt };
	const checkMap: CheckTypeRecord = {
		principal: DataTypeEnum.NUMBER,
		rate: DataTypeEnum.NUMBER,
		periods: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { periods, rate, decimal } = opt as Required<LoanOption>;
	if (opt.isEqualPayment) {
		const pmt = pmtInDfc({
			n: periods,
			fv: 0,
			pv: opt.principal,
			rate,
			decimal
		});
		return ABS(pmt);
	} else {
		return toFixed(interestInLoan(opt) + principalInLoan(opt), decimal);
	}
}
/**
 * @function principal per period
 */
export function principalInLoan(opt: LoanOption): number {
	checkObject(opt);
	opt = { ...defaultOtp, ...opt };
	const checkMap: CheckTypeRecord = {
		principal: DataTypeEnum.NUMBER,
		rate: DataTypeEnum.NUMBER,
		periods: DataTypeEnum.NUMBER,
		currentPeriod: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { periods, decimal, isEqualPayment } = opt as Required<LoanOption>;
	if (isEqualPayment) {
		return toFixed(pmtInloan(opt) - interestInLoan(opt), decimal);
	} else {
		return toFixed(opt.principal / periods, decimal);
	}
}
/**
 * @function interest per period
 */
export function interestInLoan(opt: LoanOption): number {
	checkObject(opt);
	opt = { ...defaultOtp, ...opt };
	const checkMap: CheckTypeRecord = {
		principal: DataTypeEnum.NUMBER,
		rate: DataTypeEnum.NUMBER,
		periods: DataTypeEnum.NUMBER,
		currentPeriod: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { periods, rate, decimal, currentPeriod, isEqualPayment } = opt as Required<LoanOption>;

	const _rate = rate / 100;
	if (isEqualPayment) {
		const temp = POW(1 + _rate, periods);
		return toFixed(
			(opt.principal * _rate * (temp - POW(1 + _rate, currentPeriod - 1))) / (temp - 1),
			decimal
		);
	} else {
		return toFixed((opt.principal - (currentPeriod - 1) * principalInLoan(opt)) * _rate, decimal);
	}
}
/**
 * @function get total interest
 * @reutrn {number}
 */
export function totalInterestInLoan(opt: LoanOption): number {
	opt = { ...defaultOtp, ...opt };
	const checkMap: CheckTypeRecord = {
		principal: DataTypeEnum.NUMBER,
		rate: DataTypeEnum.NUMBER,
		periods: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { periods, rate, decimal, isEqualPayment, principal } = opt as Required<LoanOption>;
	const _rate = rate / 100;

	if (isEqualPayment) {
		return toFixed(periods * pmtInloan(opt) - principal, decimal);
	} else {
		return toFixed(((periods + 1) * principal * _rate) / 2, decimal);
	}
}

export function repaymentScheduleInLoan(opt: LoanOption): Array<Record<string, number>> {
	opt = { ...defaultOtp, ...opt };
	const checkMap: CheckTypeRecord = {
		principal: DataTypeEnum.NUMBER,
		rate: DataTypeEnum.NUMBER,
		periods: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return [];
	}
	const { periods, decimal } = opt as Required<LoanOption>;
	const list: Array<Record<string, number>> = [];
	for (let i = 1; i <= periods; i++) {
		const _opt = { ...opt, currentPeriod: i };
		const principal = principalInLoan(_opt);
		const interest = interestInLoan(_opt);
		const pmt = toFixed(principal + interest, decimal);
		const item: Record<string, number> = {
			currentPeriod: i,
			principal,
			interest: interest,
			repayment: pmt
		};

		list.push(item);
	}
	return list;
}

/**
 * @function banker's rounding
 * @doc https://docs.alipayplus.com/alipayplus/alipayplus/reconcile_mpp/bank_rounding?role=MPP&product=Payment1&version=1.5.5
 * */

export function bankersRounding(number: number, decimal: number = 2): number {
	const m = Math.pow(10, decimal);
	const n: number = decimal ? +number * m : number;
	const i = Math.floor(n);
	const f = n - i;
	const e = Number.EPSILON;
	const r = f > 0.5 - e && f < 0.5 + e ? (i % 2 === 0 ? i : i + 1) : Math.round(n);
	return decimal ? r / m : r;
}
