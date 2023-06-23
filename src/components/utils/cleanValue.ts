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
> & { value: string };

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
}: CleanValueOptions): string => {
  const transformedValue = transformRawValue(value);

  if (transformedValue === '-') {
    return transformedValue;
  }

  const abbreviations = disableAbbreviations ? [] : ['k', 'm', 'b'];
  const reg = new RegExp(`((^|\\D)-\\d)|(-${escapeRegExp(prefix)})`);
  const isNegative = reg.test(transformedValue);

  // Is there a digit before the prefix? eg. 1$
  const [prefixWithValue, preValue] = RegExp(`(\\d+)-?${escapeRegExp(prefix)}`).exec(value) || [];
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

  if (!disableAbbreviations) {
    // disallow letter without number
    if (
      abbreviations.some(
        (letter) => letter === withoutInvalidChars.toLowerCase().replace(decimalSeparator, '')
      )
    ) {
      return '';
    }
    const parsed = parseAbbrValue(withoutInvalidChars, decimalSeparator);
    if (parsed) {
      valueOnly = String(parsed);
    }
  }

  const includeNegative = isNegative && allowNegativeValue ? '-' : '';

  if (decimalSeparator && valueOnly.includes(decimalSeparator)) {
    const [int, decimals] = withoutInvalidChars.split(decimalSeparator);
    const trimmedDecimals = decimalsLimit && decimals ? decimals.slice(0, decimalsLimit) : decimals;
    const includeDecimals = allowDecimals ? `${decimalSeparator}${trimmedDecimals}` : '';

    return `${includeNegative}${int}${includeDecimals}`;
  }

  return `${includeNegative}${valueOnly}`;
};
