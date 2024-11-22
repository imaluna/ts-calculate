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
export declare function repaymentScheduleInLoan(opt: LoanOption): Array<Record<string, number>>;
/**
 * @function banker's rounding
 * @doc https://docs.alipayplus.com/alipayplus/alipayplus/reconcile_mpp/bank_rounding?role=MPP&product=Payment1&version=1.5.5
 * */
export declare function bankersRounding(number: number, decimal?: number): number;
