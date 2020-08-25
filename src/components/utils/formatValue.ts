import { addSeparators } from './addSeparators';

type Props = {
  value: string;
  decimalSeparator: string;
  groupSeparator: string;
  turnOffSeparators?: boolean;
  prefix?: string;
};

/**
 * Format value with commas and prefix
 */
export const formatValue = ({
  value,
  decimalSeparator,
  groupSeparator,
  turnOffSeparators = false,
  prefix,
}: Props): string => {
  if (value === '' || value === undefined) {
    return '';
  }

  if (value === '-') {
    return '-';
  }

  const isNegative = value.includes('-');
  const [int, decimals] = value.split(decimalSeparator);
  const valueOnlyInt = isNegative ? int.replace('-', '') : int;

  const formattedInt = turnOffSeparators
    ? valueOnlyInt
    : addSeparators(valueOnlyInt, groupSeparator);

  const includePrefix = prefix ? prefix : '';
  const includeNegative = isNegative ? '-' : '';
  const includeDecimals = value.includes(decimalSeparator) ? `${decimalSeparator}${decimals}` : '';

  return `${includeNegative}${includePrefix}${formattedInt}${includeDecimals}`;
};
