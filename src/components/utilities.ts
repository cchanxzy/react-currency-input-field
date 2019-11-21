export const addCommas = (value: string) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeCommas = (value: string): string => value.replace(/,/g, '');

export const checkIsValidNumber = (input: string) => {
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
) => {
  const withoutPrefix = prefix ? value.replace(prefix, '') : value;
  const withoutCommas = removeCommas(withoutPrefix);

  if (withoutCommas.includes('.')) {
    const [int, decimals] = withoutCommas.split('.');
    const includeDecimals = allowDecimals
      ? `.${decimalsLimit ? decimals.slice(0, decimalsLimit) : decimals}`
      : '';

    return `${int}${includeDecimals}`;
  }

  return withoutCommas;
};

/**
 * Format value with commas and prefix
 */
export const formatValue = (value: string, prefix?: string) => {
  const [int, decimals] = value.split('.');
  const includePrefix = prefix ? prefix : '';
  const includeDecimals = value.includes('.') ? `.${decimals}` : '';
  return `${includePrefix}${addCommas(int)}${includeDecimals}`;
};
