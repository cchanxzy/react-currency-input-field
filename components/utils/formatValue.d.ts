declare type Props = {
    value: number | string | undefined;
    decimalSeparator?: string;
    groupSeparator?: string;
    turnOffSeparators?: boolean;
    prefix?: string;
};
/**
 * Format value with commas and prefix
 */
export declare const formatValue: ({ value: _value, decimalSeparator, groupSeparator, turnOffSeparators, prefix, }: Props) => string;
export {};
