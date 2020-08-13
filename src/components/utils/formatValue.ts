import { addCommas } from './addCommas';

/**
 * Format value with commas and prefix
 */
export const formatValue = (value: string, turnOffSeparators: boolean, prefix?: string): string => {
  const [int, decimals] = value.split('.');
  const includePrefix = prefix ? prefix : '';
  const includeDecimals = value.includes('.') ? `.${decimals}` : '';
  const formattedInt = turnOffSeparators ? int : addCommas(int);
  return `${includePrefix}${formattedInt}${includeDecimals}`;
};
