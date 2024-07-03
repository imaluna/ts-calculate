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

// loan option
export interface LoanOption {
	principal: number;
	rate: number;
	years: number;
	period: number;
	periodPerYear?: number;
	current?: number;
	isEqualPayment?: boolean;
}

export interface NpvOption {
	initCf: number;
	cfList: number[];
	rate?: number;
	decimal?: number;
}
