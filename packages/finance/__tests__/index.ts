import {
	fvInDfc,
	pvInDfc,
	pmtInDfc,
	npv,
	pmtInloan,
	principalInLoan,
	interestInLoan
} from '../index';

describe('The finance methods', () => {
	it('The finance methods', () => {
		const fv = fvInDfc({
			n: 20,
			pv: 0,
			pmt: 1000,
			rate: 8
		});
		expect(fv).toBe(-45761.9643);
		const pv = pvInDfc({
			n: 10,
			fv: 300000,
			pmt: 2000,
			rate: 8
		});
		expect(pv).toBe(-152378.2092);
		const pv2 = pvInDfc({
			n: 10,
			fv: 300000,
			pmt: 2000,
			rate: 8,
			isEnd: false
		});
		expect(pv2).toBeCloseTo(-153451.8222);
		/* const rate = rateInDfc({
			n: 20,
			pv: 0,
			pmt: 1000,
			fv: -30000
		});
		expect(rate).toBeCloseTo(4.07151); */
		const pmt = pmtInDfc({
			n: 5,
			pv: 10000,
			fv: -30000,
			rate: 4
		});
		expect(pmt).toBeCloseTo(3292.54);
		const _npv = npv({
			initCf: -5000,
			cfList: [1000, 3000, 1500],
			rate: 2
		});
		expect(_npv).toBeCloseTo(277.38);
		// const _irr = irr({
		// 	initCf: -5000,
		// 	cfList: [1000, 3000, 1500]
		// });
		// expect(_irr).toBeCloseTo(4.6873);

		const _pmtInLoan = pmtInloan({
			principal: 3000000,
			rate: 4.5 / 12,
			periods: 240,
			isEqualPayment: true
		});
		expect(_pmtInLoan).toBeCloseTo(18979.48);
		const _pmtInLoan2 = pmtInloan({
			principal: 3000000,
			rate: 4.5 / 12,
			periods: 240,
			currentPeriod: 2,
			isEqualPayment: false
		});
		expect(_pmtInLoan2).toBeCloseTo(23703.125);
		const _principalInLoan = principalInLoan({
			principal: 3000000,
			rate: 4.5 / 12,
			periods: 240,
			currentPeriod: 3,
			isEqualPayment: true
		});
		expect(_principalInLoan).toBeCloseTo(7787.56);
		const _principalInLoan2 = principalInLoan({
			principal: 3000000,
			rate: 4.5 / 12,
			periods: 240,
			currentPeriod: 3,
			isEqualPayment: false
		});
		expect(_principalInLoan2).toBeCloseTo(12500);
		const _interestInLoan = interestInLoan({
			principal: 3000000,
			rate: 4.5 / 12,
			periods: 240,
			currentPeriod: 3,
			isEqualPayment: true
		});
		expect(_interestInLoan).toBeCloseTo(11191.92);
		const _interestInLoan2 = interestInLoan({
			principal: 3000000,
			rate: 4.5 / 12,
			periods: 240,
			currentPeriod: 3,
			isEqualPayment: false
		});
		expect(_interestInLoan2).toBeCloseTo(11156.25);
	});
});
