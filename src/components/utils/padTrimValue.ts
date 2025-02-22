export const padTrimValue = (
  value: string,
  decimalSeparator?: string,
  decimalScale?: number
): string => {
  if (
    decimalScale === undefined ||
    decimalSeparator === '' ||
    decimalSeparator === undefined ||
    value === '' ||
    value === undefined
  ) {
    return value;
  }

  if (!value.match(/\d/g)) {
    return '';
  }

  const [int, decimals] = value.split(decimalSeparator);

  if (decimalScale === 0) {
    return int;
  }

  let newValue = decimals || '';

  if (newValue.length < decimalScale) {
    while (newValue.length < decimalScale) {
      newValue += '0';
    }
  } else {
    newValue = newValue.slice(0, decimalScale);
  }

  return `${int}${decimalSeparator}${newValue}`;
};
