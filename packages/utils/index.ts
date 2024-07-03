import type { CheckTypeRecord, Params } from '../types/global';
import { DataTypeEnum } from '../types/global';
export function isEmpty(val: any): boolean {
	return val === '' || val === undefined || val === null;
}

/**
 * @function check if the key value in the object is not empty
 * @param {Object} params The object being inspected
 * @param {Array<String>} checkList Array of key names to be detected
 * @returns {Boolean}
 */
export function isParamsNotEmpty(params: Params, checkList: string[]): boolean {
	return checkList.every((key) => {
		return key in params && !isEmpty(params[key]);
	});
}
/**
 * @function get the type of data
 * @param {any} data
 * @returns {String}
 */
export function getDataType(data: any): string {
	return Object.prototype.toString.call(data).slice(8, -1).toLocaleLowerCase();
}

/**
 * @function Check if the data is an array
 * @param {any} data
 * @returns {Boolean}
 */
export function isArray(data: any): boolean {
	return getDataType(data) === DataTypeEnum.ARRAY;
}

/**
 * @function Check if the data is a object
 * @param {any} data
 * @returns {Boolean}
 */
export function isObject(data: any): boolean {
	return getDataType(data) === DataTypeEnum.OBJECT;
}

export function checkObject(params: any) {
	if (!isObject(params)) {
		throwError('params must be object');
	}
}
export function validateParams(params: Params, checkTypeRecord: CheckTypeRecord): boolean | void {
	checkObject(params);
	checkObject(checkTypeRecord);
	return Object.keys(checkTypeRecord).every((key: string) => {
		const type = checkTypeRecord[key];
		const valid = getDataType(params[key]) === type;
		if (!valid) {
			throwError(`${key} must be ${type}`);
		}
		return valid;
	});
}

export function throwError(text: string): void {
	throw Error(text);
}
export const POW = Math.pow;
export const ABS = Math.abs;
export const toFixed = (num: number, decimal: number): number => {
	return +num.toFixed(decimal);
};

export function isNegative(num: number): boolean {
	return num < 0;
}

export function getSymbol(num: number): string {
	return num > 0 ? '+' : num < 0 ? '-' : '';
}
