import { escapeRegExp } from './escapeRegExp';
import { getIntlSuffix } from './getIntlSuffix';
import type { FormatValueOptions, FormattedValue } from './formatValue.types';

/**
 * Format value with decimal separator, group separator and prefix
 */
export const formatValue = (options: FormatValueOptions): string =>
  formatValueWithSuffix(options).formatted;

/**
 * Format the value, and also return the suffix shown after the number: the custom suffix, or
 * what Intl puts after the number, eg. " kr" for sv-SE or " US dollars". The formatted value
 * always ends with it. It is what has to be removed before the value is read again
 */
export const formatValueWithSuffix = (options: FormatValueOptions): FormattedValue => {
  const { value: _value, decimalSeparator, decimalScale, prefix = '', suffix = '' } = options;

  if (_value === '' || _value === undefined) {
    return { formatted: '', suffix: '' };
  }

  if (_value === '-') {
    return { formatted: '-', suffix: '' };
  }

  const { value, parts } = getValueParts({ ...options, value: _value });

  let formatted = replaceParts(parts, options);

  // Does intl formatting add a suffix?
  const intlSuffix = getPartsSuffix(parts, options);

  // Include decimal separator if user input ends with decimal separator
  const includeDecimalSeparator = _value.slice(-1) === decimalSeparator ? decimalSeparator : '';

  const [, decimals] = value.match(RegExp('\\d+\\.(\\d+)')) || [];

  // Keep original decimal padding if no decimalScale
  if (decimalScale === undefined && decimals && decimalSeparator) {
    // The prefix itself may contain the decimal separator (e.g. 'kr.' or 'د.إ'),
    // so only check the formatted value excluding the prefix. Only the first
    // occurrence is removed: it is always the prefix, as at most a minus sign
    // can precede it, and later occurrences may belong to the number itself
    const formattedWithoutPrefix = prefix ? formatted.replace(prefix, '') : formatted;
    if (formattedWithoutPrefix.includes(decimalSeparator)) {
      formatted = formatted.replace(
        RegExp(`(\\d+)(${escapeRegExp(decimalSeparator)})(\\d+)`, 'g'),
        `$1$2${decimals}`
      );
    } else {
      // The decimals go before the suffix of the locale; a custom suffix replaces it below
      if (intlSuffix) {
        formatted = replaceTrailing(
          formatted,
          intlSuffix,
          `${decimalSeparator}${decimals}${intlSuffix}`
        );
      } else {
        formatted = `${formatted}${decimalSeparator}${decimals}`;
      }
    }
  }

  const shownSuffix = suffix || intlSuffix;

  // A custom suffix replaces the suffix of the locale, also after a trailing decimal separator
  if (intlSuffix && suffix) {
    return {
      formatted: replaceTrailing(formatted, intlSuffix, `${includeDecimalSeparator}${suffix}`),
      suffix: shownSuffix,
    };
  }

  if (intlSuffix && includeDecimalSeparator) {
    return {
      formatted: replaceTrailing(formatted, intlSuffix, `${includeDecimalSeparator}${intlSuffix}`),
      suffix: shownSuffix,
    };
  }

  return { formatted: [formatted, includeDecimalSeparator, suffix].join(''), suffix: shownSuffix };
};

/**
 * Get the suffix Intl shows after the number. The currency is dropped from the parts if the
 * prefix replaces it, as it isn't in the formatted value. What is left is not a suffix if it is
 * only the group separator, eg. the no-break space after the number in sv-SE
 */
const getPartsSuffix = (
  parts: ReadonlyArray<Intl.NumberFormatPart>,
  { prefix, groupSeparator }: Pick<FormatValueOptions, 'prefix' | 'groupSeparator'>
): string => {
  const suffix = getIntlSuffix(prefix ? parts.filter(({ type }) => type !== 'currency') : parts);
  const group = groupSeparator ?? parts.find(({ type }) => type === 'group')?.value ?? '';

  return group && suffix.split(group).join('') === '' ? '' : suffix;
};

/**
 * Format the value with Intl, as parts
 *
 * Also returns the value with "." as the decimal separator, as it was passed to Intl
 */
const getValueParts = ({
  value: _value,
  decimalSeparator,
  intlConfig,
  decimalScale,
  prefix = '',
}: FormatValueOptions & { value: string }): { value: string; parts: Intl.NumberFormatPart[] } => {
  const isNegative = new RegExp(`^\\d?-${prefix ? `${escapeRegExp(prefix)}?` : ''}\\d`).test(
    _value
  );

  let value =
    decimalSeparator !== '.'
      ? replaceDecimalSeparator(_value, decimalSeparator, isNegative)
      : _value;

  if (decimalSeparator && decimalSeparator !== '-' && value.startsWith(decimalSeparator)) {
    value = '0' + value;
  }

  const { locale, currency, ...formatOptions } = intlConfig || {};

  const defaultNumberFormatOptions = {
    ...formatOptions,
    // Intl allows at most 20 fraction digits, and throws if minimum is more than maximum
    minimumFractionDigits: Math.min(Math.max(decimalScale || 0, 0), 20),
    maximumFractionDigits: 20,
  };

  const numberFormatter = intlConfig
    ? new Intl.NumberFormat(locale, {
        ...defaultNumberFormatOptions,
        ...(currency && { style: 'currency', currency }),
      })
    : new Intl.NumberFormat(undefined, defaultNumberFormatOptions);

  // Intl.NumberFormat formats decimal strings exactly (Chrome 106, Firefox 116, Safari 15.4);
  // older engines convert the string to a number as before
  const parts = numberFormatter.formatToParts(value as unknown as number);

  return { value, parts };
};

/**
 * Replace the suffix at the end of the value, not an earlier match such as a group separator
 */
const replaceTrailing = (value: string, suffix: string, replacement: string): string => {
  const index = value.lastIndexOf(suffix);
  return index === -1
    ? value
    : value.slice(0, index) + replacement + value.slice(index + suffix.length);
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
    decimalScale,
    disableGroupSeparators = false,
  }: Pick<
    FormatValueOptions,
    'prefix' | 'groupSeparator' | 'decimalSeparator' | 'decimalScale' | 'disableGroupSeparators'
  >
): string => {
  return parts
    .reduce(
      (prev, { type, value }, i) => {
        if (i === 0 && prefix) {
          if (type === 'minusSign') {
            return [value, prefix];
          }

          if (type === 'currency') {
            return [...prev, prefix];
          }

          return [prefix, value];
        }

        if (type === 'currency') {
          return prefix ? prev : [...prev, value];
        }

        if (type === 'group') {
          return !disableGroupSeparators
            ? [...prev, groupSeparator !== undefined ? groupSeparator : value]
            : prev;
        }

        if (type === 'decimal') {
          if (decimalScale !== undefined && decimalScale === 0) {
            return prev;
          }

          return [...prev, decimalSeparator !== undefined ? decimalSeparator : value];
        }

        if (type === 'fraction') {
          return [...prev, decimalScale !== undefined ? value.slice(0, decimalScale) : value];
        }

        return [...prev, value];
      },
      ['']
    )
    .join('');
};
