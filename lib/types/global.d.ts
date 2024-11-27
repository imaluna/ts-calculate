export type Params = Record<string, any>;
export declare const enum DataTypeEnum {
    NUMBER = "number",
    STRING = "string",
    BOOLEAN = "boolean",
    OBJECT = "object",
    UNDEFINED = "undefined",
    NULL = "null",
    SYMBOL = "symbol",
    ARRAY = "array",
    DATE = "date",
    FUNCTION = "function"
}
export type DataType = `${DataTypeEnum}`;
export type CheckTypeRecord = Record<string, DataType>;
