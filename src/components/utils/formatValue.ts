import { IntlConfig } from '../CurrencyInputProps';
import { escapeRegExp } from './escapeRegExp';
import { getSuffix } from './getSuffix';

export type FormatValueOptions = {
  /**
   * Value to format
   */
  value: string | undefined;

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
   * Specify decimal scale for padding/trimming
   *
   * Eg. 1.5 -> 1.50 or 1.234 -> 1.23
   */
  decimalScale?: number;

  /**
   * Prefix
   */
  prefix?: string;
};

/**
 * Format value with decimal separator, group separator and prefix
 */
export const formatValue = (options: FormatValueOptions): string => {
  const { value: _value, decimalSeparator, intlConfig, decimalScale = 0, prefix = '' } = options;

  if (_value === '' || _value === undefined) {
    return '';
  }

  if (_value === '-') {
    return '-';
  }

  const isNegative = new RegExp(`^\\d?-${prefix ? `${escapeRegExp(prefix)}?` : ''}\\d`).test(
    _value
  );
  const value =
    decimalSeparator !== '.'
      ? replaceDecimalSeparator(_value, decimalSeparator, isNegative)
      : _value;

  const numberFormatter = intlConfig
    ? new Intl.NumberFormat(intlConfig.locale, {
        style: 'currency',
        currency: intlConfig.currency,
        minimumFractionDigits: decimalScale,
        maximumFractionDigits: 20,
      })
    : new Intl.NumberFormat(undefined, {
        minimumFractionDigits: decimalScale,
        maximumFractionDigits: 20,
      });

  const parts = numberFormatter.formatToParts(Number(value));

  let formatted = replaceParts(parts, options);

  // Without intl config, number formatter won't include currency symbol ie. prefix
  if (!intlConfig) {
    formatted = isNegative ? formatted.replace(/^-/g, `-${prefix}`) : `${prefix}${formatted}`;
  }

  // Does intl formatting add a suffix?
  const suffix = getSuffix(formatted, { ...options });

  // Include decimal separator if user input ends with decimal separator
  const includeDecimalSeparator = _value.slice(-1) === decimalSeparator ? decimalSeparator : '';

  // Keep original decimal padding if no decimalScale
  const [, decimals] = value.match(RegExp('\\d+\\.(\\d+)')) || [];

  if (!decimalScale && decimals && decimalSeparator) {
    if (formatted.includes(decimalSeparator)) {
      formatted = formatted.replace(
        RegExp(`(\\d+)(${escapeRegExp(decimalSeparator)})(\\d+)`, 'g'),
        `$1$2${decimals}`
      );
    } else {
      if (suffix) {
        formatted = formatted.replace(suffix, `${decimalSeparator}${decimals}${suffix}`);
      } else {
        formatted = `${formatted}${decimalSeparator}${decimals}`;
      }
    }
  }

  if (suffix && includeDecimalSeparator) {
    return formatted.replace(suffix, `${includeDecimalSeparator}${suffix}`);
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
          return [...prev, decimalSeparator !== undefined ? decimalSeparator : value];
        }

        return [...prev, value];
      },
      ['']
    )
    .join('');
};
