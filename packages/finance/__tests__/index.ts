import { repaymentScheduleInLoan } from '../index';

describe('repaymentScheduleInLoan', () => {
	it('the value is ', () => {
		const result = repaymentScheduleInLoan({
			periods: 360,
			principal: 3000000,
			rate: 5 / 12
		});
		console.log(result, '---result---');
		expect(result.length).toBe(360);
	});
});
