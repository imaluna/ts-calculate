export function isEmpty(val: any): boolean {
	return val === '' || val === null || val === undefined;
}

export function sleep(time: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}

export async function request(): Promise<void> {
	await sleep(4000);
	console.log('done');
}
