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

  const [int] = value.split(decimalSeparator);

  if (decimalScale === 0) {
    return int;
  }

  const numberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimalScale,
    maximumFractionDigits: decimalScale,
  });

  const stringValueWithoutSeparator = value.replace(decimalSeparator, '.');

  return numberFormatter.format(parseFloat(stringValueWithoutSeparator));
};
