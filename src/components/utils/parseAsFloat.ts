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

  /**
   * Remove group separator eg:
   * Value = 5-033-121,5899
   * Return = 5033121,5899
   */
  const groupValueRegex = new RegExp(`[${groupSeparator}]`, 'g');
  const strippedGroupValue = value.replace(groupValueRegex, '');

  /**
   * Value = 5-033-121,5899
   * Return = 5033121
   */
  const stripDecimalPlacesRegex = new RegExp(`\.[^${decimalSeparator}]*$`, 'g');
  const groupValue = strippedGroupValue.replace(stripDecimalPlacesRegex, '');

  const decimalValue = value.split(decimalSeparator)[1];

  return parseFloat([groupValue, decimalValue].join('.'));
};
