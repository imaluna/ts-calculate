import { getStdNormalDistributionValue } from '../index';

describe('getStdNormalDistributionValue', () => {
	it('z-score:1.23, the value is 0.89065 ', () => {
		const result = getStdNormalDistributionValue(1.23);
		expect(result).toEqual(0.89065);
	});
});
