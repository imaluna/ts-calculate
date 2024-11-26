import { stdNormalDistributionValue } from '../index';

describe('stdNormalDistributionValue', () => {
	it('z-score:1.23, the value is 0.89065 ', () => {
		const result = stdNormalDistributionValue(1.23);
		expect(result).toEqual(0.89065);
	});
});
