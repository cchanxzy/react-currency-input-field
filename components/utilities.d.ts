export declare const addCommas: (value: string) => string;
export declare const removeCommas: (value: string) => string;
export declare const checkIsValidNumber: (input: string) => boolean;
/**
 * Remove prefix, commas and extra decimals from value
 */
export declare const cleanValue: (value: string, allowDecimals: boolean, decimalsLimit: number, prefix?: string | undefined) => string;
/**
 * Format value with commas and prefix
 */
export declare const formatValue: (value: string, prefix?: string | undefined) => string;
