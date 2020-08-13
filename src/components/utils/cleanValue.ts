import { parseAbbrValue } from './parseAbbrValue';
import { removeCommas } from './removeCommas';

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
