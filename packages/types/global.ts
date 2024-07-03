// common params
export type Params = Record<string, any>;

// Data type enumeration
export const enum DataTypeEnum {
	NUMBER = 'number',
	STRING = 'string',
	BOOLEAN = 'boolean',
	OBJECT = 'object',
	UNDEFINED = 'undefined',
	NULL = 'null',
	SYMBOL = 'symbol',
	ARRAY = 'array',
	DATE = 'date',
	FUNCTION = 'function'
}
// 'number' | 'string' | ....
export type DataType = `${DataTypeEnum}`;
export type CheckTypeRecord = Record<string, DataType>;
