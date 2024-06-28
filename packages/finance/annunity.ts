/**
 *  Calculations about annunity, including discounted cash flow models (DFC) and perpetuities
 */
import { validateParams, checkObject } from "../utils";
import type { CheckTypeRecord } from "../types/global";
import type { DfcOption, PerpetuityOption } from "./types";
import { DataTypeEnum } from "../types/global";
const DECIMAL = 4;
const defaultOpt: DfcOption = {
  isEnd: true,
  decimal: DECIMAL,
};
const defaultCheckRecord: CheckTypeRecord = {
  isEnd: DataTypeEnum.BOOLEAN,
  decimal: DataTypeEnum.NUMBER,
};
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
  checkObject(opt);
  opt = { ...defaultOpt, ...opt };
  const checkMap: CheckTypeRecord = {
    n: DataTypeEnum.NUMBER,
    pv: DataTypeEnum.NUMBER,
    pmt: DataTypeEnum.NUMBER,
    rate: DataTypeEnum.NUMBER,
    ...defaultCheckRecord,
  };
  const isValid = validateParams(opt, checkMap);
  if (!isValid) {
    return NaN;
  }
  const { n, pv, pmt, rate, isEnd, decimal } = opt as Required<DfcOption>;
  let sum = pv * Math.pow(1 + rate / 100, isEnd ? n - 1 : n);
  let i = 1;
  while (i <= n) {
    sum += pmt * Math.pow(1 + rate / 100, isEnd ? i - 1 : i);
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
  checkObject(opt);
  opt = { ...defaultOpt, ...opt };
  const checkMap: CheckTypeRecord = {
    n: DataTypeEnum.NUMBER,
    pv: DataTypeEnum.NUMBER,
    fv: DataTypeEnum.NUMBER,
    rate: DataTypeEnum.NUMBER,
    ...defaultCheckRecord,
  };
  const isValid = validateParams(opt, checkMap);
  if (!isValid) {
    return NaN;
  }
  const { n, pv, fv, rate, isEnd, decimal } = opt as Required<DfcOption>;
  let temp = 0;
  let i = 1;
  while (i <= n) {
    temp += Math.pow(1 + rate / 100, isEnd ? i - 1 : i);
    i++;
  }
  return +(
    (fv - pv * Math.pow(1 + rate / 100, isEnd ? n - 1 : n)) /
    temp
  ).toFixed(decimal);
}

export function getPVInDFC(opt: DfcOption): number {
  checkObject(opt);
  opt = { ...defaultOpt, ...opt };
  const checkMap: CheckTypeRecord = {
    n: DataTypeEnum.NUMBER,
    pmt: DataTypeEnum.NUMBER,
    fv: DataTypeEnum.NUMBER,
    rate: DataTypeEnum.NUMBER,
    ...defaultCheckRecord,
  };
  const isValid = validateParams(opt, checkMap);
  if (!isValid) {
    return NaN;
  }
  const { n, pmt, fv, rate, isEnd, decimal } = opt as Required<DfcOption>;
  let sum = fv;
  let i = n;
  while (i >= 1) {
    sum -= pmt * Math.pow(1 + rate / 100, isEnd ? i - 1 : i);
    i--;
  }
  return +(sum * Math.pow(1 + rate / 100, isEnd ? 1 - n : -n)).toFixed(decimal);
}

export function getRateInDFC(opt: DfcOption): number {
  checkObject(opt);
  opt = { ...defaultOpt, ...opt };
  const checkMap: CheckTypeRecord = {
    n: DataTypeEnum.NUMBER,
    pmt: DataTypeEnum.NUMBER,
    fv: DataTypeEnum.NUMBER,
    pv: DataTypeEnum.NUMBER,
    ...defaultCheckRecord,
  };
  const isValid = validateParams(opt, checkMap);
  if (!isValid) {
    return NaN;
  }
  const { n, pmt, fv, pv, isEnd, decimal } = opt as Required<DfcOption>;
  let max = 1;
  let min = 0;
  const precision = Math.pow(10, -decimal);
  let rate = +((max + min) / 2).toFixed(decimal);
  while (rate <= max && rate >= min) {
    const _fv = getFVInDFC({ n, pv, rate: rate * 100, pmt, isEnd, decimal });
    if (Math.abs(_fv - fv) <= precision) {
      break;
    }
    if (_fv < fv) {
      min = rate;
    } else {
      max = rate;
    }
    rate = +((max + min) / 2).toFixed(decimal);
  }
  return +(rate * 100).toFixed(decimal);
}

export function getPVInPerpetuity(opt: PerpetuityOption): number {
  checkObject(opt);
  opt = { decimal: DECIMAL, ...opt };
  const checkMap: CheckTypeRecord = {
    pmt: DataTypeEnum.NUMBER,
    rate: DataTypeEnum.NUMBER,
    decimal: DataTypeEnum.NUMBER,
  };
  const isValid = validateParams(opt, checkMap);
  if (!isValid) {
    return NaN;
  }
  return +(opt.pmt / opt.rate).toFixed(opt.decimal);
}
