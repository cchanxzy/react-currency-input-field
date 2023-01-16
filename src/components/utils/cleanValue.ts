import { parseAbbrValue } from './parseAbbrValue';
import { removeSeparators } from './removeSeparators';
import { removeInvalidChars } from './removeInvalidChars';
import { escapeRegExp } from './escapeRegExp';
import { CurrencyInputProps } from '../CurrencyInputProps';

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
  | 'abbreviations'
> & { value: string };

export type AbbrMap = { [key: string]: number };

export const abbrMap: AbbrMap = { k: 1000, m: 1000000, b: 1000000000 };

/**
 * Remove prefix, separators and extra decimals from value
 */
export const cleanValue = ({
  value,
  groupSeparator = ',',
  decimalSeparator = '.',
  allowDecimals = true,
  decimalsLimit = 2,
  allowNegativeValue = true,
  disableAbbreviations = false,
  prefix = '',
  transformRawValue = (rawValue) => rawValue,
  abbreviations = abbrMap,
}: CleanValueOptions): string => {
  const transformedValue = transformRawValue(value);

  if (transformedValue === '-') {
    return transformedValue;
  }

  const abbrKeys = disableAbbreviations ? [] : Object.keys(abbreviations);
  const reg = new RegExp(`((^|\\D)-\\d)|(-${escapeRegExp(prefix)})`);
  const isNegative = reg.test(transformedValue);

  // Is there a digit before the prefix? eg. 1$
  const [prefixWithValue, preValue] = RegExp(`(-?\\d+)-?${escapeRegExp(prefix)}`).exec(value) || [];
  const withoutPrefix = prefix
    ? prefixWithValue
      ? transformedValue.replace(prefixWithValue, '').concat(preValue)
      : transformedValue.replace(prefix, '')
    : transformedValue;
  const withoutSeparators = removeSeparators(withoutPrefix, groupSeparator);
  const withoutInvalidChars = removeInvalidChars(withoutSeparators, [
    decimalSeparator,
    ...abbrKeys,
  ]);

  let valueOnly = withoutInvalidChars;

  let includeNegative = isNegative && allowNegativeValue ? '-' : '';

  if (!disableAbbreviations) {
    // disallow letter without number
    if (abbrKeys.some((letter) => letter === withoutInvalidChars.toLowerCase())) {
      return '';
    }
    const parsed = parseAbbrValue(
      `${includeNegative}${withoutInvalidChars}`,
      abbreviations,
      decimalSeparator
    );
    if (parsed !== undefined) {
      includeNegative = parsed < 0 ? '-' : '';
      valueOnly = String(includeNegative ? parsed * -1 : parsed);
    }
  }

  if (decimalSeparator && valueOnly.includes(decimalSeparator)) {
    const [int, decimals] = withoutInvalidChars.split(decimalSeparator);
    const trimmedDecimals = decimalsLimit && decimals ? decimals.slice(0, decimalsLimit) : decimals;
    const includeDecimals = allowDecimals ? `${decimalSeparator}${trimmedDecimals}` : '';

    return `${includeNegative}${int}${includeDecimals}`;
  }

  return `${includeNegative}${valueOnly}`;
};
