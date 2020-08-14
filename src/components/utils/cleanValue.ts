import { parseAbbrValue } from './parseAbbrValue';
import { removeSeparators } from './removeSeparators';

type Props = {
  value: string;
  decimalSeparator: string;
  groupSeparator: string;
  allowDecimals: boolean;
  decimalsLimit: number;
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
  prefix,
}: Props): string => {
  const withoutPrefix = prefix ? value.replace(prefix, '') : value;
  const withoutSeparators = removeSeparators(withoutPrefix, groupSeparator);
  const parsed = parseAbbrValue(withoutSeparators, decimalSeparator) || withoutSeparators;

  if (String(parsed).includes(decimalSeparator)) {
    const [int, decimals] = withoutSeparators.split(decimalSeparator);
    const trimmedDecimals = decimalsLimit ? decimals.slice(0, decimalsLimit) : decimals;
    const includeDecimals = allowDecimals ? `${decimalSeparator}${trimmedDecimals}` : '';

    return `${int}${includeDecimals}`;
  }

  return String(parsed);
};
