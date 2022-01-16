export const fixedDecimalValue = (
  value: string,
  decimalSeparator: string,
  fixedDecimalLength?: number
): string => {
  if (!fixedDecimalLength || value.length <= 1) {
    return value;
  }

  if (value.includes(decimalSeparator)) {
    const [int, decimals] = value.split(decimalSeparator);
    if (decimals.length > fixedDecimalLength) {
      return `${int}${decimalSeparator}${decimals.slice(0, fixedDecimalLength)}`;
    }
    return value;
  }

  const isNumberRegex = new RegExp('^-?[0-9][0-9,.]*$');

  if (!isNumberRegex.test(value)) {
    return value;
  }

  const decimals = Array.from({ length: fixedDecimalLength }, () => `0`).join('');
  return `${value}${decimalSeparator}${decimals}`;
};
