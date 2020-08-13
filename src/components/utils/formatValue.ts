import { Separator } from '../CurrencyInputProps';
import { addSeparators } from './addSeparators';

type Props = {
  value: string;
  decimalSeparator: Separator;
  groupSeparator: Separator;
  turnOffSeparators: boolean;
  prefix?: string;
};

/**
 * Format value with commas and prefix
 */
export const formatValue = ({
  value,
  decimalSeparator,
  groupSeparator,
  turnOffSeparators,
  prefix,
}: Props): string => {
  const [int, decimals] = value.split(decimalSeparator);
  const includePrefix = prefix ? prefix : '';
  const includeDecimals = value.includes(decimalSeparator) ? `${decimalSeparator}${decimals}` : '';
  const formattedInt = turnOffSeparators ? int : addSeparators(int, groupSeparator);
  return `${includePrefix}${formattedInt}${includeDecimals}`;
};
