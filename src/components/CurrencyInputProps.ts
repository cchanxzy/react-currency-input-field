import { Ref } from 'react';

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type IntlConfig = {
  locale: string;
  currency: string;
};

export type CurrencyInputProps = Overwrite<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    /**
     * Allow decimals
     *
     * Default = true
     */
    allowDecimals?: boolean;

    /**
     * Allow user to enter negative value
     *
     * Default = true
     */
    allowNegativeValue?: boolean;

    /**
     * Component id
     */
    id?: string;

    /**
     *  Maximum characters the user can enter
     */
    maxLength?: number;

    /**
     * Class names
     */
    className?: string;

    /**
     * Limit length of decimals allowed
     *
     * Default = 2
     */
    decimalsLimit?: number;

    /**
     * Specify decimal scale for padding/trimming
     *
     * Eg. 1 -> 1.99 or 1.234 -> 1.23
     */
    decimalScale?: number;

    /**
     * Default value if not passing in value via props
     */
    defaultValue?: number | string;

    /**
     * Disabled
     *
     * Default = false
     */
    disabled?: boolean;

    /**
     * Value will always have the specified length of decimals
     *
     * This formatting happens onBlur
     */
    fixedDecimalLength?: number;

    /**
     * Handle change in value
     */
    onChange?: (value: string | undefined, name?: string) => void;

    /**
     * Handle value onBlur
     *
     */
    onBlurValue?: (value: string | undefined, name?: string) => void;

    /**
     * Placeholder if there is no value
     */
    placeholder?: string;

    /**
     * Include a prefix eg. £
     */
    prefix?: string;

    /**
     * Incremental value change on arrow down and arrow up key press
     */
    step?: number;

    /**
     * Separator between integer part and fractional part of value.
     *
     * This cannot be a number
     */
    decimalSeparator?: string;

    /**
     * Separator between thousand, million and billion
     *
     * This cannot be a number
     */
    groupSeparator?: string;

    /**
     * Disable auto adding separator between values eg. 1000 > 1,000
     *
     * Default = false
     */
    disableGroupSeparators?: boolean;

    /**
     * Disable abbreviations eg. 1k > 1,000, 2m > 2,000,000
     *
     * Default = false
     */
    turnOffAbbreviations?: boolean;

    /**
     * International locale config, examples:
     *   { locale: 'ja-JP', currency: 'JPY' }
     *   { locale: 'en-IN', currency: 'INR' }
     *
     * Any prefix, groupSeparator or decimalSeparator options passed in
     * will override Intl Locale config
     */
    intlConfig?: IntlConfig;

    /**
     * Ref property
     */
    ref?: Ref<HTMLInputElement>;
  }
>;
