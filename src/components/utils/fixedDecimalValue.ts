export const fixedDecimalValue = (
  value: string,
  decimalSeparator: string,
  fixedDecimalLength?: number
): string => {
  // Keep the sign in one place so a later branch cannot drop it.
  if (value.startsWith('-')) {
    return `-${fixedDecimalValue(value.slice(1), decimalSeparator, fixedDecimalLength)}`;
  }

  if (fixedDecimalLength !== undefined && value.length > 1) {
    if (fixedDecimalLength === 0) {
      return value.replace(decimalSeparator, '');
    }

    if (value.includes(decimalSeparator)) {
      const [int, decimals] = value.split(decimalSeparator);

      // A short decimal is padded later. Only a longer one is cut here.
      if (decimals.length > fixedDecimalLength) {
        return `${int}${decimalSeparator}${decimals.slice(0, fixedDecimalLength)}`;
      }

      return value;
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
