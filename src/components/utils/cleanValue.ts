import type { CurrencyInputProps } from '../CurrencyInputProps';
import { expandAbbrValue } from './parseAbbrValue';
import { removeSeparators } from './removeSeparators';
import { removeInvalidChars } from './removeInvalidChars';
import { escapeRegExp } from './escapeRegExp';

export type CleanValueOptions = Pick<
  CurrencyInputProps,
  | 'decimalSeparator'
  | 'groupSeparator'
  | 'allowDecimals'
  | 'decimalsLimit'
  | 'allowNegativeValue'
  | 'disableAbbreviations'
  | 'prefix'
  | 'transformRawValue'
> & { value: string };

/**
 * Remove prefix, separators and extra decimals from value
 */
export const cleanValue = ({
  value: rawInput,
  groupSeparator = ',',
  decimalSeparator = '.',
  allowDecimals = true,
  decimalsLimit = 2,
  allowNegativeValue = true,
  disableAbbreviations = false,
  prefix = '',
  transformRawValue = (rawValue) => rawValue,
}: CleanValueOptions): string => {
  // Intl uses U+2212 for the minus sign in some locales
  const value = rawInput.replace(/\u2212/g, '-');
  const transformedValue = transformRawValue(value);

  if (transformedValue === '-') {
    return allowNegativeValue ? transformedValue : '';
  }

  const abbreviations = disableAbbreviations ? [] : ['k', 'm', 'b'];
  // A minus sign followed by the decimal separator, eg. -.5, is also negative
  const negativeDecimal = decimalSeparator ? `|(^-${escapeRegExp(decimalSeparator)})` : '';
  const reg = new RegExp(`((^|\\D)-\\d)|(-${escapeRegExp(prefix)})${negativeDecimal}`);
  const isNegative = reg.test(transformedValue);

  // Is there a digit before the prefix? eg. 1$
  const [prefixWithValue, preValue] =
    RegExp(`(\\d+)-?${escapeRegExp(prefix)}`).exec(transformedValue) || [];
  const withoutPrefix = prefix
    ? prefixWithValue
      ? transformedValue.replace(prefixWithValue, '').concat(preValue)
      : transformedValue.replace(prefix, '')
    : transformedValue;
  const withoutSeparators = removeSeparators(withoutPrefix, groupSeparator);
  const withoutInvalidChars = removeInvalidChars(withoutSeparators, [
    groupSeparator,
    decimalSeparator,
    ...abbreviations,
  ]);

  let valueOnly = withoutInvalidChars;
  let isAbbreviation = false;

  if (!disableAbbreviations) {
    // disallow letter without number
    if (
      abbreviations.some(
        (letter) => letter === withoutInvalidChars.toLowerCase().replace(decimalSeparator, '')
      )
    ) {
      return '';
    }
    const parsed = expandAbbrValue(withoutInvalidChars, decimalSeparator);
    if (parsed !== undefined) {
      valueOnly = parsed;
      isAbbreviation = true;
    }
  }

  const includeNegative = isNegative && allowNegativeValue ? '-' : '';

  if (decimalSeparator && valueOnly.includes(decimalSeparator)) {
    const [int, decimals] = valueOnly.split(decimalSeparator);
    const trimmedDecimals = decimalsLimit && decimals ? decimals.slice(0, decimalsLimit) : decimals;
    // An expanded abbreviation reports its decimals with ".", as it always has, eg. 1,5k is 1500
    // and 1,2345k is 1234.5 with a "," decimal separator
    const outputSeparator = isAbbreviation ? '.' : decimalSeparator;
    const includeDecimals = allowDecimals ? `${outputSeparator}${trimmedDecimals}` : '';

    return `${includeNegative}${int}${includeDecimals}`;
  }

  return `${includeNegative}${valueOnly}`;
};
