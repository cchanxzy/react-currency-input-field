import React, { ElementType } from 'react';

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

/**
 * Value in different formats provided to `onValueChange`.
 *
 * See {@link https://www.npmjs.com/package/react-currency-input-field#onvaluechange}
 */
export type CurrencyInputOnChangeValues = {
  /**
   * Value as float or null if empty
   *
   * Example:
   *   - "1.99" > 1.99
   *   - "" > null
   */
  float: number | null;

  /**
   * Value after applying formatting
   *
   * Example: "1000000" > "1,000,000"
   */
  formatted: string;

  /**
   * Non formatted value as string (same as first argument in `onValueChange`)
   */
  value: string;
};

export type IntlConfig = {
  locale: string;
} & Intl.NumberFormatOptions;

export type CurrencyInputProps = Overwrite<
  React.ComponentPropsWithRef<'input'>,
  {
    /**
     * Allow decimals to be entered.
     *
     * Default: `true`
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    allowDecimals?: boolean;

    /**
     * Allow user to enter a negative value.
     *
     * Default: `true`
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    allowNegativeValue?: boolean;

    /**
     * Component id
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    id?: string;

    /**
     * Maximum characters the user can enter
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    maxLength?: number;

    /**
     * Class names
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    className?: string;

    /**
     * Render custom component instead of default `<input/>`.
     *
     * Default: `<input/>`
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    customInput?: ElementType;

    /**
     * Limit length of decimals allowed.
     *
     * Prevents typing more than the specified number of decimal places.
     *
     * Default: `2`
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#decimal-scale-and-decimals-limit}
     */
    decimalsLimit?: number;

    /**
     * Specify decimal scale for padding/trimming applied on blur.
     *
     * Example:
     *   - 1.5 -> 1.50
     *   - 1.234 -> 1.23
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#decimal-scale-and-decimals-limit}
     */
    decimalScale?: number;

    /**
     * Default value if not passing in value via props.
     * Accepts a number or a numeric string.
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    defaultValue?: number | string;

    /**
     * Disabled
     *
     * Default: `false`
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    disabled?: boolean;

    /**
     * Value will always have the specified length of decimals
     *
     * Example:
     *   123 -> 1.23
     *
     * Note: This formatting only happens onBlur
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#fixed-decimal-length}
     */
    fixedDecimalLength?: number;

    /**
     * Handle change in value.
     *
     *
     * Called with `(value, name, values)` where:
     * - `value` is the plain string without prefix, suffix or separators (eg. "£123,456" -> "123456").
     * - `name` matches the component `name` prop when provided.
     * - `values` gives an object with three key values:
     *   - `float`: Value as float or null if empty. Example: "1.99" > 1.99
     *   - `formatted`: Value after applying formatting. Example: "1000000" > "1,000,000"
     *   - `value`: Non formatted value as string, i.e. same as first param.
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#onvaluechange}
     */
    onValueChange?: (
      value: string | undefined,
      name?: string | undefined,
      values?: CurrencyInputOnChangeValues
    ) => void;

    /**
     * Placeholder if there is no value
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    placeholder?: string;

    /**
     * Include a prefix eg. `£`
     *
     * Passing a prefix overrides intl locale config defaults.
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#prefix-and-suffix}
     */
    prefix?: string;

    /**
     * Include a suffix eg. `€`
     *
     * Passing a suffix overrides  intl locale config defaults.
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#prefix-and-suffix}
     */
    suffix?: string;

    /**
     * Incremental value change on arrow down and arrow up key press
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    step?: number;

    /**
     * Separator between integer part and fractional part of value.
     *
     * Default: `locale default`
     *
     * This cannot be a number and must differ from the group separator.
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#separators}
     */
    decimalSeparator?: string;

    /**
     * Separator between thousand, million and billion.
     *
     * Default: `locale default`
     *
     * This cannot be a number.
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#separators}
     */
    groupSeparator?: string;

    /**
     * Disable auto adding the group separator between values.
     *
     * Default: `false`
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#separators}
     */
    disableGroupSeparators?: boolean;

    /**
     * Disable abbreviations (m, k, b) so 1k will NOT be formatted to 1,000, 2m will NOT be formatted to 2,000,000 etc...
     *
     * Default: `false`
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#abbreviations}
     */
    disableAbbreviations?: boolean;

    /**
     * International locale config
     *
     * `locale` should be a BCP 47 language tag and `currency` an ISO 4217 code.
     *
     * Any prefix, suffix, groupSeparator or decimalSeparator options passed in
     * will override Intl locale config.
     *
     * Common examples:
     *  - US Dollar: { locale: 'en-US', currency: 'USD' }
     *  - British Pound: { locale: 'en-GB', currency: 'GBP' }
     *  - Canadian Dollar: { locale: 'en-CA', currency: 'CAD' }
     *  - Australian Dollar: { locale: 'en-AU', currency: 'AUD' }
     *  - Japanese Yen: { locale: 'ja-JP', currency: 'JPY' }
     *  - Chinese Yuan: { locale: 'zh-CN', currency: 'CNY' }
     *  - Euro (Germany): { locale: 'de-DE', currency: 'EUR' }
     *  - Euro (France): { locale: 'fr-FR', currency: 'EUR' }
     *  - Indian Rupee: { locale: 'hi-IN', currency: 'INR' }
     *  - Brazilian Real: { locale: 'pt-BR', currency: 'BRL' }
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#intl-locale-config}
     */
    intlConfig?: IntlConfig;

    /**
     * Transform the raw value from the input before parsing.
     *
     * This can be useful for stripping out unwanted characters or formatting the input.
     *
     * Must return the transformed string.
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    transformRawValue?: (rawValue: string) => string;

    /**
     * When set to `false`, the `onValueChange` will not be called on `blur` events.
     *
     * Default: `true`
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    formatValueOnBlur?: boolean;

    /**
     * Current value of the input. This should be a number or a numeric string.
     *
     * If provided, the component is controlled.
     *
     * If omitted, the component is uncontrolled and manages the value in its own state.
     *
     * See {@link https://www.npmjs.com/package/react-currency-input-field#props}
     */
    value?: string | number;
  }
>;
