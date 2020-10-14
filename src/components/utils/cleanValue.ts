import { parseAbbrValue } from './parseAbbrValue';
import { removeSeparators } from './removeSeparators';
import { removeInvalidChars } from './removeInvalidChars';

type Props = {
  value: string;
  decimalSeparator?: string;
  groupSeparator?: string;
  allowDecimals?: boolean;
  decimalsLimit?: number;
  allowNegativeValue?: boolean;
  prefix?: string;
  suffix?: string;
};

/**
 * Remove prefix, suffix, separators and extra decimals from value
 */
export const cleanValue = ({
  value,
  groupSeparator = ',',
  decimalSeparator = '.',
  allowDecimals = true,
  decimalsLimit = 2,
  allowNegativeValue = true,
  prefix,
  suffix,
}: Props): string => {
  const isNegative = value.includes('-');

  const withoutNegative = isNegative ? value.replace('-', '') : value;
  const withoutPrefix = prefix ? withoutNegative.replace(prefix, '') : withoutNegative;
  const withoutSuffix = suffix ? withoutNegative.replace(suffix, '') : withoutPrefix;
  const withoutSeparators = removeSeparators(withoutSuffix, groupSeparator);
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
