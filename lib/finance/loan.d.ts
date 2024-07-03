import type { LoanOption } from './types';
/**
 * @function payment per period
 */
export declare function getPaymentPerPeriod(opt: LoanOption): number;
export declare function getPrincipalPerPeriod(opt: LoanOption): number;
export declare function getInterestPerPeriod(opt: LoanOption): number;
export declare function totalInterestInLoan(opt: LoanOption): number;
export declare function paymentListInLoan(opt: LoanOption): Array<Record<string, number>>;
