export const parseAsFloat = (
  value: string,
  groupSeparator: string | undefined,
  decimalSeparator: string | undefined
): number => {
  if (!groupSeparator) {
    return parseInt(value, 10);
  }

  if (!decimalSeparator) {
    const re = new RegExp(`[${groupSeparator}]`, 'g');
    const val = value.replace(re, '.');
    return parseFloat(val);
  }

  const decimalValue = value.split(decimalSeparator)[1];

  if (!Boolean(decimalValue)) {
    return parseInt(value, 10);
  }

  /**
   * Remove group separator eg:
   * Value = 5-033-121,5899
   * Return = 5033121,5899
   */
  const groupValueRegex = new RegExp(`[${groupSeparator}]`, 'g');
  const strippedGroupValue = value.replace(groupValueRegex, '');

  /**
   * Replace decimal place with a '.':
   * Value = 5033121,5899
   * Return = 5033121.5899
   */
  const decimalReplacerRegex = new RegExp(`[${decimalSeparator}]`, 'g');
  const val = strippedGroupValue.replace(decimalReplacerRegex, '.');

  return parseFloat(val);
};
