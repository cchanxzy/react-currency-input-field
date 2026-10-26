import { getIntlSuffix } from '../getIntlSuffix';

const nbsp = ' ';
const rlm = '‏';

const getParts = (
  locale: string,
  value: number,
  options: Intl.NumberFormatOptions = {}
): Intl.NumberFormatPart[] =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
    ...options,
  }).formatToParts(value);

describe('getIntlSuffix', () => {
  it('should return the text after the number', () => {
    expect(getIntlSuffix(getParts('sv-SE', 1234, { style: 'currency', currency: 'SEK' }))).toBe(
      `${nbsp}kr`
    );
    expect(getIntlSuffix(getParts('de-DE', 1234, { style: 'currency', currency: 'EUR' }))).toBe(
      `${nbsp}€`
    );
    expect(getIntlSuffix(getParts('da-DK', 12.5, { style: 'currency', currency: 'DKK' }))).toBe(
      `${nbsp}kr.`
    );
    expect(getIntlSuffix(getParts('cs-CZ', 5, { style: 'currency', currency: 'CZK' }))).toBe(
      `${nbsp}Kč`
    );
  });

  it('should return an empty string if nothing follows the number', () => {
    expect(getIntlSuffix(getParts('en-US', 1234, { style: 'currency', currency: 'USD' }))).toBe('');
    expect(getIntlSuffix(getParts('en-US', 1234.5))).toBe('');
    expect(getIntlSuffix(getParts('en-US', -5, { style: 'currency', currency: 'USD' }))).toBe('');
    expect(getIntlSuffix([])).toBe('');
  });

  it('should include the bidi marks around the symbol', () => {
    const parts = new Intl.NumberFormat('ar-EG-u-nu-latn', {
      style: 'currency',
      currency: 'EGP',
    }).formatToParts(5);

    expect(getIntlSuffix(parts)).toBe(`${nbsp}ج.م.${rlm}`);
  });

  it('should return a symbol that contains the decimal separator', () => {
    expect(getIntlSuffix(getParts('fr-CH', 5, { style: 'currency', currency: 'XCG' }))).toMatch(
      /Cg\.$/
    );
  });

  it('should return the plural form of a currency name', () => {
    const options = { style: 'currency', currency: 'GBP', currencyDisplay: 'name' } as const;

    expect(getIntlSuffix(getParts('en-GB', 1, options))).toBe(' British pound');
    expect(getIntlSuffix(getParts('en-GB', 5, options))).toBe(' British pounds');
  });

  it('should not return the text Intl shows when it cannot format the number', () => {
    expect(getIntlSuffix(getParts('en-US', NaN))).toBe('');
    expect(getIntlSuffix(getParts('sv-SE', NaN, { style: 'currency', currency: 'SEK' }))).toBe(
      `${nbsp}kr`
    );
    expect(getIntlSuffix(getParts('en-US', Infinity))).toBe('');
  });
});
