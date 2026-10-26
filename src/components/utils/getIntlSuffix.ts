// `nan` and `infinity` stand in for the number when Intl can't format it
const numberPartTypes = ['integer', 'group', 'decimal', 'fraction', 'nan', 'infinity'];

/**
 * Get the text Intl shows after the number, eg. a no-break space and "kr" for sv-SE or " British pounds"
 *
 * It is every part after the last part of the number, so it includes the space and any bidi
 * marks around the currency, and the plural form of a currency name
 */
export const getIntlSuffix = (parts: ReadonlyArray<Intl.NumberFormatPart>): string => {
  const lastNumberIndex = parts.reduce(
    (last, { type }, i) => (numberPartTypes.includes(type) ? i : last),
    -1
  );

  return parts
    .slice(lastNumberIndex + 1)
    .map(({ value }) => value)
    .join('');
};
