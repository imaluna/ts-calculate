// Discounted cash flow model option
export interface DfcOption {
  pv?: number;
  fv?: number;
  pmt?: number;
  n?: number;
  rate?: number;
  isEnd?: boolean;
  decimal?: number;
}
// Perpetuity Annuity option
export interface PerpetuityOption {
  pmt: number;
  rate: number;
  decimal?: number;
}

// loan option
export interface LoanOption {
  principal: number;
  rate: number;
  years: number;
  period: number;
  isEualPayment?: boolean;
}
