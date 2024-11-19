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
import { DECIMAL } from '@/config';

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
		periodPerYear: DataTypeEnum.NUMBER,
		years: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const periodPerYear = opt.periodPerYear as number;
	const n = opt.years * periodPerYear;
	const rate = opt.rate / periodPerYear;
	if (opt.isEqualPayment) {
		const pmt = pmtInDfc({
			n,
			fv: 0,
			pv: opt.principal,
			rate,
			decimal: opt.decimal
		});
		return ABS(pmt);
	} else {
		return toFixed(interestInLoan(opt) + principalInLoan(opt), opt.decimal as number);
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
		periodPerYear: DataTypeEnum.NUMBER,
		years: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const periodPerYear = opt.periodPerYear as number;
	const n = opt.years * periodPerYear;
	const decimal = opt.decimal as number;
	if (opt.isEqualPayment) {
		return toFixed(pmtInloan(opt) - interestInLoan(opt), decimal);
	} else {
		return toFixed(opt.principal / n, decimal);
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
		periodPerYear: DataTypeEnum.NUMBER,
		years: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { periodPerYear, current, years, rate, decimal } = opt as Required<LoanOption>;
	const _rate = rate / periodPerYear / 100;
	if (opt.isEqualPayment) {
		const temp = POW(1 + _rate, years * periodPerYear);
		return toFixed(
			(opt.principal * _rate * (temp - POW(1 + _rate, current - 1))) / (temp - 1),
			decimal
		);
	} else {
		return toFixed((opt.principal - (current - 1) * principalInLoan(opt)) * _rate, decimal);
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
		periodPerYear: DataTypeEnum.NUMBER,
		years: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return NaN;
	}
	const { principal, rate, periodPerYear, years, decimal } = opt as Required<LoanOption>;
	const n = years * periodPerYear;
	if (opt.isEqualPayment) {
		return toFixed(n * pmtInloan(opt) - principal, decimal);
	} else {
		return toFixed(((n + 1) * principal * (rate / periodPerYear / 100)) / 2, decimal);
	}
}

export function pmtListInLoan(opt: LoanOption): Array<Record<string, number>> {
	opt = { ...defaultOtp, ...opt };
	const checkMap: CheckTypeRecord = {
		principal: DataTypeEnum.NUMBER,
		rate: DataTypeEnum.NUMBER,
		periodPerYear: DataTypeEnum.NUMBER,
		years: DataTypeEnum.NUMBER,
		isEqualPayment: DataTypeEnum.BOOLEAN,
		...defaultCheckRecord
	};
	const isValid = validateParams(opt, checkMap);
	if (!isValid) {
		return [];
	}
	const { periodPerYear, years, decimal } = opt as Required<LoanOption>;
	const n = years * periodPerYear;
	const list: Array<Record<string, number>> = [];
	for (let i = 1; i <= n; i++) {
		const _opt = { ...opt, current: i };
		const principal = principalInLoan(_opt);
		const int = interestInLoan(_opt);
		const pmt = toFixed(principal + int, decimal);
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

/**
 * @function banker's rounding 
 * (1）被修约的数字小于5时，该数字舍去；
•（2）被修约的数字大于5时，则进位；
•（3）被修约的数字等于5时，要看5前面的数字，若是奇数则进位，若是偶数则将5舍掉，即修约后末尾数字都成为偶数；若5的后面还有不为“0”的任何数，则此时无论5的前面是奇数还是偶数，均应进位。
 */

// export function bankRounding(number: string | number, decimal: number = 2): number {
// 	const _number = String(number);

// }
