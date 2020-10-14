import { addSeparators } from './addSeparators';

type Props = {
  value: number | string | undefined;
  decimalSeparator?: string;
  groupSeparator?: string;
  turnOffSeparators?: boolean;
  prefix?: string;
  suffix?: string;
};

/**
 * Format value with commas, prefix and suffix
 */
export const formatValue = ({
  value: _value,
  decimalSeparator = '.',
  groupSeparator = ',',
  turnOffSeparators = false,
  prefix,
  suffix,
}: Props): string => {
  if (_value === '' || _value === undefined) {
    return '';
  }

  const value = String(_value);

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
  const includeSuffix = suffix ? suffix : '';
  const includeNegative = isNegative ? '-' : '';
  const includeDecimals = value.includes(decimalSeparator) ? `${decimalSeparator}${decimals}` : '';

  return `${includeNegative}${includePrefix}${formattedInt}${includeDecimals}${includeSuffix}`;
};
