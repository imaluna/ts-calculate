export interface DfcOption {
    pv?: number;
    fv?: number;
    pmt?: number;
    n?: number;
    rate?: number;
    isEnd?: boolean;
    decimal?: number;
}
export interface LoanOption {
    principal: number;
    periods: number;
    rate: number;
    currentPeriod?: number;
    isEqualPayment?: boolean;
    decimal?: number;
}
export interface NpvOption {
    initCf: number;
    cfList: number[];
    rate?: number;
    decimal?: number;
}
