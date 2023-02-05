import { escapeRegExp } from './escapeRegExp';

const countryCodesWithAbbreviationsChars = [
  // with K
  /[A-Z][A-Z]K/,
  /[A-Z]K[A-Z]/,
  /K[A-Z][A-Z]/,
  // with M
  /[A-Z][A-Z]M/,
  /[A-Z]M[A-Z]/,
  /M[A-Z][A-Z]/,
  // with B
  /[A-Z][A-Z]B/,
  /[A-Z]B[A-Z]/,
  /B[A-Z][A-Z]/,
];

/**
 * Remove invalid characters
 */
export const removeInvalidChars = (value: string, validChars: ReadonlyArray<string>): string => {
  const chars = escapeRegExp(validChars.join(''));

  const reg = new RegExp(`[^\\d${chars}]`, 'gi');

  let clearValue = value;

  countryCodesWithAbbreviationsChars.forEach((regExp) => {
    clearValue = clearValue.replace(regExp, '');
  });

  return clearValue.replace(reg, '');
};
