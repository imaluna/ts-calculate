import {
	stdNormalDistributionValue,
	mean,
	stdDeviation,
	stdDeviationOfSample,
	semiDeviation
} from '../index';

describe('The statistic methods', () => {
	it('The statistic methods', () => {
		const _mean = mean([10, 9, 8, 7, 6, 20]);
		expect(_mean).toBe(10);

		const _stdDeviation = stdDeviation([10, 9, 8, 7, 6, 20]);
		expect(_stdDeviation).toBeCloseTo(4.6547);
		const _stdDeviationOfSample = stdDeviationOfSample([10, 9, 8, 7, 6, 20]);
		expect(_stdDeviationOfSample).toBeCloseTo(5.099);
		const _semiDeviation = semiDeviation([10, 9, 8, 7, 6, 20], 3);
		expect(_semiDeviation).toBeCloseTo(9.2087);

		const normalValue = stdNormalDistributionValue(1.23);
		expect(normalValue).toBeCloseTo(0.89065);
	});
});
