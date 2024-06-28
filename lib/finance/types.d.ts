export interface DfcOption {
    pv?: number;
    fv?: number;
    pmt?: number;
    n?: number;
    rate?: number;
    isEnd?: boolean;
    decimal?: number;
}
export interface PerpetuityOption {
    pmt: number;
    rate: number;
    decimal?: number;
}
export interface LoanOption {
    principal: number;
    rate: number;
    years: number;
    period: number;
    isEualPayment?: boolean;
}
