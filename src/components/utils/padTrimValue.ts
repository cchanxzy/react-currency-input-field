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
