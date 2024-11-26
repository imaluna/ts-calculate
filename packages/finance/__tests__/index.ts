// import { repaymentScheduleInLoan } from '../index';
import { fvInDfc, pvInDfc, pmtInDfc, npv, irr } from '../index';

describe('repaymentScheduleInLoan', () => {
	it('The finance utils', () => {
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
		const _irr = irr({
			initCf: -5000,
			cfList: [1000, 3000, 1500]
		});
		expect(_irr).toContain(4.6873);
	});
});
