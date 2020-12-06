import { IntlConfig } from '../CurrencyInputProps';
import { escapeRegExp } from './escapeRegExp';

type FormatValueOptions = {
  /**
   * Value to format
   */
  value: number | string | undefined;

  /**
   * Decimal separator
   *
   * Default = '.'
   */
  decimalSeparator?: string;

  /**
   * Group separator
   *
   * Default = ','
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
   * Prefix
   */
  prefix?: string;
};

/**
 * Format value with decimal separator, group separator and prefix
 */
export const formatValue = (options: FormatValueOptions): string => {
  const { value: _value, decimalSeparator, intlConfig, prefix = '' } = options;

  if (_value === '' || _value === undefined) {
    return '';
  }

  if (_value === '-') {
    return '-';
  }

  const isNegative = new RegExp(`^\\d?-${prefix ? `${escapeRegExp(prefix)}?` : ''}\\d`).test(
    String(_value)
  );
  const value =
    decimalSeparator !== '.'
      ? replaceDecimalSeparator(String(_value), decimalSeparator, isNegative)
      : String(_value);

  const numberFormatter = intlConfig
    ? new Intl.NumberFormat(intlConfig.locale, {
        style: 'currency',
        currency: intlConfig.currency,
        minimumFractionDigits: 0,
      })
    : new Intl.NumberFormat();

  const parts = numberFormatter.formatToParts(Number(value));

  let formatted = replaceParts(parts, options);

  // Without intl config, number formatter won't include currency symbol ie. prefix
  if (!intlConfig) {
    formatted = isNegative ? formatted.replace(/^-/g, `-${prefix}`) : `${prefix}${formatted}`;
  }

  // Include decimal separator if user input ends with decimal separator
  const includeDecimalSeparator = value.slice(-1) === decimalSeparator ? decimalSeparator : '';

  const [, decimals] = value.match(RegExp('\\d+\\.(\\d+)')) || [];

  // Keep original decimal padding
  if (decimals && decimalSeparator) {
    if (formatted.includes(decimalSeparator)) {
      formatted = formatted.replace(
        RegExp(`(\\d+)(${escapeRegExp(decimalSeparator)})(\\d+)`, 'g'),
        `$1$2${decimals}`
      );
    } else {
      formatted = `${formatted}${decimalSeparator}${decimals}`;
    }
  }

  return [formatted, includeDecimalSeparator].join('');
};

/**
 * Before converting to Number, decimal separator has to be .
 */
const replaceDecimalSeparator = (
  value: string,
  decimalSeparator: FormatValueOptions['decimalSeparator'],
  isNegative: boolean
): string => {
  let newValue = value;
  if (decimalSeparator && decimalSeparator !== '.') {
    newValue = newValue.replace(RegExp(escapeRegExp(decimalSeparator), 'g'), '.');
    if (isNegative && decimalSeparator === '-') {
      newValue = `-${newValue.slice(1)}`;
    }
  }
  return newValue;
};

const replaceParts = (
  parts: Intl.NumberFormatPart[],
  {
    prefix,
    groupSeparator,
    decimalSeparator,
    disableGroupSeparators = false,
  }: Pick<
    FormatValueOptions,
    'prefix' | 'groupSeparator' | 'decimalSeparator' | 'disableGroupSeparators'
  >
): string => {
  return parts
    .reduce(
      (prev, { type, value }) => {
        if (type === 'currency' && prefix) {
          return [...prev, prefix];
        }

        if (type === 'group') {
          return !disableGroupSeparators
            ? [...prev, groupSeparator !== undefined ? groupSeparator : value]
            : prev;
        }

        if (type === 'decimal') {
          return !disableGroupSeparators
            ? [...prev, decimalSeparator !== undefined ? decimalSeparator : value]
            : prev;
        }

        return [...prev, value];
      },
      ['']
    )
    .join('');
};
