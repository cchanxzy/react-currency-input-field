export const fixedDecimalValue = (
  value: string,
  decimalSeparator: string,
  fixedDecimalLength?: number
): string => {
  if (fixedDecimalLength !== undefined && value.length > 1) {
    const negative = value.startsWith('-');
    const unsignedValue = negative ? value.slice(1) : value;
    const sign = negative ? '-' : '';

    if (fixedDecimalLength === 0) {
      return `${sign}${unsignedValue.replace(decimalSeparator, '')}`;
    }

    if (unsignedValue.includes(decimalSeparator)) {
      const [int, decimals] = unsignedValue.split(decimalSeparator);

      if (decimals.length === fixedDecimalLength) {
        return `${sign}${unsignedValue}`;
      }

      if (decimals.length > fixedDecimalLength) {
        return `${sign}${int}${decimalSeparator}${decimals.slice(0, fixedDecimalLength)}`;
      }
    }

    const reg =
      unsignedValue.length > fixedDecimalLength
        ? new RegExp(`(\\d+)(\\d{${fixedDecimalLength}})`)
        : new RegExp(`(\\d)(\\d+)`);

    const match = unsignedValue.match(reg);
    if (match) {
      const [, int, decimals] = match;
      return `${sign}${int}${decimalSeparator}${decimals}`;
    }
  }

  return value;
};
