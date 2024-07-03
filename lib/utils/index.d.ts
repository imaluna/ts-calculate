import type { CheckTypeRecord, Params } from '../types/global';
export declare function isEmpty(val: any): boolean;
/**
 * @function check if the key value in the object is not empty
 * @param {Object} params The object being inspected
 * @param {Array<String>} checkList Array of key names to be detected
 * @returns {Boolean}
 */
export declare function isParamsNotEmpty(params: Params, checkList: string[]): boolean;
/**
 * @function get the type of data
 * @param {any} data
 * @returns {String}
 */
export declare function getDataType(data: any): string;
/**
 * @function Check if the data is an array
 * @param {any} data
 * @returns {Boolean}
 */
export declare function isArray(data: any): boolean;
/**
 * @function Check if the data is a object
 * @param {any} data
 * @returns {Boolean}
 */
export declare function isObject(data: any): boolean;
export declare function checkObject(params: any): void;
export declare function validateParams(params: Params, checkTypeRecord: CheckTypeRecord): boolean | void;
export declare function throwError(text: string): void;
export declare const POW: (x: number, y: number) => number;
export declare const ABS: (x: number) => number;
export declare const toFixed: (num: number, decimal: number) => number;
export declare function isNegative(num: number): boolean;
export declare function getSymbol(num: number): string;
