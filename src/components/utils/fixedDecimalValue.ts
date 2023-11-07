export const fixedDecimalValue = (
  value: string,
  decimalSeparator: string,
  fixedDecimalLength?: number
): string => {
  if (fixedDecimalLength !== undefined && value.length > 1) {
    if (fixedDecimalLength === 0) {
      return value.replace(decimalSeparator, '');
    }

    if (value.includes(decimalSeparator)) {
      const [int, decimals] = value.split(decimalSeparator);

      if (decimals.length === fixedDecimalLength) {
        return value;
      }

      if (decimals.length > fixedDecimalLength) {
        return `${int}${decimalSeparator}${decimals.slice(0, fixedDecimalLength)}`;
      }
    }

    const reg =
      value.length > fixedDecimalLength
        ? new RegExp(`(\\d+)(\\d{${fixedDecimalLength}})`)
        : new RegExp(`(\\d)(\\d+)`);

    const match = value.match(reg);
    if (match) {
      const [, int, decimals] = match;
      return `${int}${decimalSeparator}${decimals}`;
    }
  }

  return value;
};
