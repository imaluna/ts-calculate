import type { LoanOption } from './types';
/**
 * @function payment per period
 */
export declare function pmtInloan(opt: LoanOption): number;
/**
 * @function principal per period
 */
export declare function principalInLoan(opt: LoanOption): number;
/**
 * @function interest per period
 */
export declare function interestInLoan(opt: LoanOption): number;
/**
 * @function get total interest
 * @reutrn {number}
 */
export declare function totalInterestInLoan(opt: LoanOption): number;
export declare function pmtListInLoan(opt: LoanOption): Array<Record<string, number>>;
/**
 * @function banker's rounding
 * (1）被修约的数字小于5时，该数字舍去；
•（2）被修约的数字大于5时，则进位；
•（3）被修约的数字等于5时，要看5前面的数字，若是奇数则进位，若是偶数则将5舍掉，即修约后末尾数字都成为偶数；若5的后面还有不为“0”的任何数，则此时无论5的前面是奇数还是偶数，均应进位。
 */
