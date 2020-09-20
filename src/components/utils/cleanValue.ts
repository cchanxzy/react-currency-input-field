import { parseAbbrValue } from './parseAbbrValue';
import { removeSeparators } from './removeSeparators';

type Props = {
  value: string;
  decimalSeparator: string;
  groupSeparator: string;
  allowDecimals: boolean;
  decimalsLimit: number;
  allowNegativeValue?: boolean;
  prefix?: string;
};

/**
 * Remove prefix, separators and extra decimals from value
 */
export const cleanValue = ({
  value,
  decimalSeparator,
  groupSeparator,
  allowDecimals,
  decimalsLimit,
  allowNegativeValue = true,
  prefix,
}: Props): string => {
  const isNegative = value.includes('-');
  const withoutNegative = isNegative ? value.replace('-', '') : value;
  const withoutPrefix = prefix ? withoutNegative.replace(prefix, '') : withoutNegative;
  const withoutSeparators = removeSeparators(withoutPrefix, groupSeparator);

  const parsed = parseAbbrValue(withoutSeparators, decimalSeparator) || withoutSeparators;
  const includeNegative = isNegative && allowNegativeValue ? '-' : '';

  if (String(parsed).includes(decimalSeparator)) {
    const [int, decimals] = withoutSeparators.split(decimalSeparator);
    const trimmedDecimals = decimalsLimit ? decimals.slice(0, decimalsLimit) : decimals;
    const includeDecimals = allowDecimals ? `${decimalSeparator}${trimmedDecimals}` : '';

    return `${includeNegative}${int}${includeDecimals}`;
  }

  return `${includeNegative}${parsed}`;
};
