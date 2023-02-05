/**
 * Country code with abbreviations chars regexp
 *
 * See: https://github.com/cchanxzy/react-currency-input-field/issues/279
 */
export const countryCodesWithAbbreviationsChars = [
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
