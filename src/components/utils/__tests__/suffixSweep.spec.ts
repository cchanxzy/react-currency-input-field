import type { IntlConfig } from '../../CurrencyInputProps';
import { cleanValue } from '../cleanValue';
import { formatValue } from '../formatValue';
import { getIntlSuffix } from '../getIntlSuffix';
import { getLocaleConfig } from '../getLocaleConfig';

/** Locales whose number formatting differs from each other. */
const locales = (
  'af am ar ar-EG ar-SA ar-MA ar-IL as az be bg bn bn-IN bs ca cs cy da de de-CH de-AT el en ' +
  'en-AT en-ID en-ZA en-AU es es-US es-BR es-MX es-AR et eu fa fi fil fr fr-CH fr-CA fr-MA ga ' +
  'gl gu he hi hr hu hy id is it it-CH ja ka kk kk-CN km kn ko ky lo lt lv mk ml mn mr ms ms-ID ' +
  'my nb ne nl or pa pa-PK pl ps pt pt-CH pt-PT ro ru ru-UA si sk sl sq sr sv sw ta ta-SG ta-MY ' +
  'te th tk tr uk ur ur-IN uz vi zh zu'
).split(' ');

const currencyDisplays = ['symbol', 'code', 'name'] as const;

/**
 * Locales that do not format with Latin digits by default. The component does not support
 * native digits yet, so only the suffix itself is checked for them.
 */
const nativeDigitLocales = new Set<string>();

type Exclusion = {
  locales: ReadonlyArray<string>;
  currency: string;
  reason: string;
};

/**
 * Currency names left out of the round trip. A plural name that differs from the one the locale
 * config gives, and has digits or the decimal separator in it, can't be told from the number.
 * The suffix check still covers them.
 */
const nameRoundTripExclusions: ReadonlyArray<Exclusion> = [
  {
    locales: ['cs', 'lt', 'sk', 'uk'],
    currency: 'ZWL',
    reason: 'the plural name ends with a year in digits, "(2009)"',
  },
  {
    locales: ['lt', 'ro'],
    currency: 'SLL',
    reason: 'the plural name ends with years in digits, "(1964\u20142022)"',
  },
  {
    locales: ['ga'],
    currency: 'USD',
    reason: 'the plural name ends with "S.A.M.", which contains the decimal separator',
  },
];

const supportedLocales = Intl.DateTimeFormat.supportedLocalesOf(locales);
// Missing from the TypeScript lib this project compiles with
const currencies = (
  Intl as unknown as { supportedValuesOf: (key: 'currency') => string[] }
).supportedValuesOf('currency');

const getNumberingSystem = (locale: string): string =>
  new Intl.NumberFormat(locale).resolvedOptions().numberingSystem;

type Pair = {
  locale: string;
  currency: string;
  currencyDisplay: (typeof currencyDisplays)[number];
  intlConfig: IntlConfig;
};

const pairs: Pair[] = [];

supportedLocales.forEach((locale) => {
  if (getNumberingSystem(locale) !== 'latn') {
    nativeDigitLocales.add(locale);
  }

  currencies.forEach((currency) => {
    currencyDisplays.forEach((currencyDisplay) => {
      const intlConfig: IntlConfig = { locale, currency, currencyDisplay };
      const parts = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        currencyDisplay,
      }).formatToParts(1234.5);

      const currencyIndex = parts.findIndex(({ type }) => type === 'currency');
      const integerIndex = parts.findIndex(({ type }) => type === 'integer');

      if (currencyIndex > integerIndex && integerIndex !== -1) {
        pairs.push({ locale, currency, currencyDisplay, intlConfig });
      }
    });
  });
});

const roundTripPairs = pairs.filter(({ locale, currency, currencyDisplay }) => {
  if (nativeDigitLocales.has(locale)) {
    return false;
  }
  if (
    currencyDisplay === 'name' &&
    nameRoundTripExclusions.some(
      (exclusion) => exclusion.currency === currency && exclusion.locales.includes(locale)
    )
  ) {
    return false;
  }
  return true;
});

/**
 * A plural currency name with a hyphen, eg. "Hong Kong-dalir", that differs from the name the
 * locale config gives. The hyphen reads as a minus sign, as it does anywhere in a number, and the
 * name can't be removed as the suffix. Values with such a name are left out of the round trip.
 */
const hasHyphenatedPluralName = (
  intlConfig: IntlConfig,
  value: string,
  suffix: string
): boolean => {
  const parts = new Intl.NumberFormat(intlConfig.locale, {
    style: 'currency',
    currency: intlConfig.currency,
    currencyDisplay: 'name',
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  }).formatToParts(Number(value));
  const displayedSuffix = getIntlSuffix(parts);

  return displayedSuffix.includes('-') && !displayedSuffix.includes(suffix);
};

const suffixValues = [1, 5, 1.5, 1234.5, 1000000, -5, -1234.5];
const roundTripValues = ['5', '1234.5', '-5', '-1234.5', '1000000'];

describe('currencies shown after the number', () => {
  it('covers many locales and currencies', () => {
    expect(pairs.length).toBeGreaterThan(1000);
    expect(roundTripPairs.length).toBeGreaterThan(1000);
  });

  it.each(currencyDisplays)('reads the displayed suffix for currencyDisplay %s', (display) => {
    const failures: string[] = [];

    pairs
      .filter(({ currencyDisplay }) => currencyDisplay === display)
      .forEach(({ locale, currency, intlConfig }) => {
        const formatter = new Intl.NumberFormat(locale, {
          style: 'currency',
          currency,
          currencyDisplay: display,
        });
        const { suffix: currencyText } = getLocaleConfig(intlConfig);

        suffixValues.forEach((value) => {
          const suffix = getIntlSuffix(formatter.formatToParts(value));
          const formatted = formatter.format(value);

          // The name of a currency can be plural, so it may differ from the one in the config
          const containsCurrency = display === 'name' || suffix.includes(currencyText);

          if (!suffix || !formatted.endsWith(suffix) || !containsCurrency) {
            failures.push(`${locale} ${currency} ${value} ${JSON.stringify(suffix)}`);
          }
        });
      });

    expect(failures).toEqual([]);
  });

  it.each(currencyDisplays)('round trips a value for currencyDisplay %s', (display) => {
    const failures: string[] = [];

    roundTripPairs
      .filter(({ currencyDisplay }) => currencyDisplay === display)
      .forEach(({ locale, currency, intlConfig }) => {
        const { prefix, suffix, groupSeparator, decimalSeparator } = getLocaleConfig(intlConfig);

        // The component throws for these separators
        if (decimalSeparator && decimalSeparator === groupSeparator) {
          return;
        }

        roundTripValues.forEach((value) => {
          // Currencies without decimals have no decimal separator
          if (value.includes('.') && !decimalSeparator) {
            return;
          }

          if (display === 'name' && hasHyphenatedPluralName(intlConfig, value, suffix)) {
            return;
          }

          const formatted = formatValue({
            value,
            intlConfig,
            decimalSeparator,
            groupSeparator,
            prefix,
          });
          const cleaned = cleanValue({
            value: formatted,
            decimalSeparator,
            groupSeparator,
            prefix,
            suffix,
          });

          if (cleaned !== value.replace('.', decimalSeparator)) {
            failures.push(`${locale} ${currency} ${JSON.stringify(formatted)} -> ${cleaned}`);
          }
        });
      });

    expect(failures).toEqual([]);
  });
});
