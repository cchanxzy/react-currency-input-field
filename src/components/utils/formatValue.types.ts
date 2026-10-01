import type { IntlConfig } from '../CurrencyInputProps';

export type FormatValueOptions = {
  /**
   * Value to format
   */
  value: string | undefined;

  /**
   * Decimal separator
   *
   * Default: the decimal separator of `intlConfig.locale`, or of the runtime's
   * locale if there's no `intlConfig`. Without it, `value` must use `.` as its
   * decimal separator.
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
