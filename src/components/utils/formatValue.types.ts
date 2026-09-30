import type { IntlConfig } from '../CurrencyInputProps';

export type FormatValueOptions = {
  /**
   * Value to format
   */
  value: string | undefined;

  /**
   * Decimal separator
   *
   * Default: the locale's decimal separator
   */
  decimalSeparator?: string;

  /**
   * Group separator
   *
   * Default: the locale's group separator
   */
  groupSeparator?: string;

  /**
   * Turn off separators
   *
   * This will override Group separators
   *
   * Default = false
   */
  disableGroupSeparators?: boolean;

  /**
   * Intl locale currency config
   */
  intlConfig?: IntlConfig;

  /**
   * Specify decimal scale for padding/trimming
   *
   * Eg. 1.5 -> 1.50 or 1.234 -> 1.23
   */
  decimalScale?: number;

  /**
   * Prefix
   */
  prefix?: string;

  /**
   * Suffix
   */
  suffix?: string;
};
