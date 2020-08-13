import { parseAbbrValue } from './parseAbbrValue';

export const addCommas = (value: string): string => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeCommas = (value: string): string => value.replace(/,/g, '');

export const checkIsValidNumber = (input: string): boolean => {
  if (Number(input) < 0 || isNaN(Number(input))) {
    return false;
  }

  return true;
};

/**
 * Remove prefix, commas and extra decimals from value
 */
export const cleanValue = (
  value: string,
  allowDecimals: boolean,
  decimalsLimit: number,
  prefix?: string
): string => {
  const withoutPrefix = prefix ? value.replace(prefix, '') : value;
  const withoutCommas = removeCommas(withoutPrefix);
  const parsed = parseAbbrValue(withoutCommas) || withoutCommas;

  if (String(parsed).includes('.')) {
    const [int, decimals] = withoutCommas.split('.');
    const includeDecimals = allowDecimals
      ? `.${decimalsLimit ? decimals.slice(0, decimalsLimit) : decimals}`
      : '';

    return `${int}${includeDecimals}`;
  }

  return String(parsed);
};

export const padTrimValue = (value: string, precision?: number): string => {
  if (!precision) {
    return value;
  }

  const [int, decimals] = value.split('.');
  let newValue = decimals || '';

  if (newValue.length < precision) {
    while (newValue.length < precision) {
      newValue += '0';
    }
  } else {
    newValue = newValue.slice(0, precision);
  }

  return `${int}.${newValue}`;
};

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
