/**
 * Abbreviate number eg. 1000 = 1k
 *
 * Source: https://stackoverflow.com/a/9345181
 */
export declare const abbrValue: (value: number, decimalSeparator?: string, _decimalPlaces?: number) => string;
/**
 * Parse a value with abbreviation e.g 1k = 1000
 */
export declare const parseAbbrValue: (value: string, decimalSeparator?: string) => number | undefined;
