import { parseAbbrValue } from './parseAbbrValue';
import { removeSeparators } from './removeSeparators';
import { removeInvalidChars } from './removeInvalidChars';
import { escapeRegExp } from './escapeRegExp';

type Props = {
  value: string;
  decimalSeparator?: string;
  groupSeparator?: string;
  allowDecimals?: boolean;
  decimalsLimit?: number;
  allowNegativeValue?: boolean;
  prefix?: string;
};

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
  prefix = '',
}: Props): string => {
  const isNegative = value.includes('-');

  const [prefixWithValue, preValue] = RegExp(`(\\d+)-?${escapeRegExp(prefix)}`).exec(value) || [];
  const withoutPrefix = prefix ? value.replace(prefixWithValue, '').concat(preValue) : value;
  const withoutSeparators = removeSeparators(withoutPrefix, groupSeparator);
  const withoutInvalidChars = removeInvalidChars(withoutSeparators, [
    groupSeparator,
    decimalSeparator,
    'k',
    'm',
    'b',
  ]);

  const parsed = parseAbbrValue(withoutInvalidChars, decimalSeparator) || withoutInvalidChars;
  const includeNegative = isNegative && allowNegativeValue ? '-' : '';

  if (String(parsed).includes(decimalSeparator)) {
    const [int, decimals] = withoutInvalidChars.split(decimalSeparator);
    const trimmedDecimals = decimalsLimit ? decimals.slice(0, decimalsLimit) : decimals;
    const includeDecimals = allowDecimals ? `${decimalSeparator}${trimmedDecimals}` : '';

    return `${includeNegative}${int}${includeDecimals}`;
  }

  return `${includeNegative}${parsed}`;
};
