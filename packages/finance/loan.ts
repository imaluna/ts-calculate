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
 * (1）被修约的数字小于5时，该数字舍去；
•（2）被修约的数字大于5时，则进位；
•（3）被修约的数字等于5时，要看5前面的数字，若是奇数则进位，若是偶数则将5舍掉，即修约后末尾数字都成为偶数；若5的后面还有不为“0”的任何数，则此时无论5的前面是奇数还是偶数，均应进位。
 */

// export function bankRounding(number: string | number, decimal: number = 2): number {
// 	const _number = String(number);

// }
