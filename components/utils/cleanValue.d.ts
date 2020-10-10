declare type Props = {
    value: string;
    decimalSeparator?: string;
    groupSeparator?: string;
    allowDecimals?: boolean;
    decimalsLimit?: number;
    allowNegativeValue?: boolean;
    prefix?: string;
};
/**
 * Remove prefix, separators and extra decimals from value
 */
export declare const cleanValue: ({ value, groupSeparator, decimalSeparator, allowDecimals, decimalsLimit, allowNegativeValue, prefix, }: Props) => string;
export {};
