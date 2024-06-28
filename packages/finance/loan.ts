/**
 *  Calculations about loan, including  calculation mortgage or loan use equal payment,
 *  calculation mortgage or loan use equal principal, prepayment, etc.
 * */
import { checkObject, validateParams } from "../utils";
import { getPMTInDFC } from "./annunity";
import type { CheckTypeRecord } from "../types/global";
import { DataTypeEnum } from "../types/global";
import type { LoanOption } from "./types";
const defaultOtp = { isEualPayment: true };
/**
 * @function payment per period
 */
export function getPmtInLoan(opt: LoanOption): number {
  checkObject(opt);
  opt = { ...defaultOtp, ...opt };
  const checkMap: CheckTypeRecord = {
    principal: DataTypeEnum.NUMBER,
    rate: DataTypeEnum.NUMBER,
    period: DataTypeEnum.NUMBER,
    years: DataTypeEnum.NUMBER,
    isEualPayment: DataTypeEnum.BOOLEAN,
  };
  const isValid = validateParams(opt, checkMap);
  if (!isValid) {
    return NaN;
  }
  const n = opt.years * opt.period;
  if (opt.isEualPayment) {
    const pmt = getPMTInDFC({
      n,
      fv: 0,
      pv: opt.principal,
      rate: opt.rate / opt.period,
    });
    console.log(pmt, "---pmt");
    return pmt;
  } else {
    return 0;
  }
}
