import fc from 'fast-check';

import type { IntlConfig } from '../../CurrencyInputProps';
import { cleanValue } from '../cleanValue';
import { formatValue } from '../formatValue';
import { getLocaleConfig } from '../getLocaleConfig';

type Shape = {
  name: string;
  intlConfig?: IntlConfig;
  prefix?: string;
  decimalSeparator?: string;
  groupSeparator?: string;
};

const shapes: ReadonlyArray<Shape> = [
  { name: 'en-US / USD', intlConfig: { locale: 'en-US', currency: 'USD' } },
  { name: 'en-GB / GBP', intlConfig: { locale: 'en-GB', currency: 'GBP' } },
  { name: 'de-DE / EUR', intlConfig: { locale: 'de-DE', currency: 'EUR' } },
  { name: 'en-IN / INR', intlConfig: { locale: 'en-IN', currency: 'INR' } },
  { name: 'fi-FI / EUR', intlConfig: { locale: 'fi-FI', currency: 'EUR' } },
  { name: 'he-IL / ILS', intlConfig: { locale: 'he-IL', currency: 'ILS' } },
  { name: 'custom prefix', prefix: '£', decimalSeparator: '.', groupSeparator: ',' },
];

const resolveSeparators = ({ intlConfig, prefix, decimalSeparator, groupSeparator }: Shape) => {
  if (intlConfig) {
    const config = getLocaleConfig(intlConfig);
    return {
      intlConfig,
      prefix: config.prefix,
      decimalSeparator: config.decimalSeparator,
      groupSeparator: config.groupSeparator,
    };
  }
  return { intlConfig, prefix, decimalSeparator, groupSeparator };
};

/** Optional "-", 1 to 15 integer digits without leading zeros, optional 1 or 2 decimals. */
const valueArbitrary = (decimalSeparator: string) =>
  fc
    .tuple(
      fc.boolean(),
      fc.oneof(
        fc.constant('0'),
        fc
          .tuple(
            fc.integer({ min: 1, max: 9 }),
            fc.array(fc.integer({ min: 0, max: 9 }), { minLength: 0, maxLength: 14 })
          )
          .map(([first, rest]) => `${first}${rest.join('')}`)
      ),
      fc.option(
        fc
          .array(fc.integer({ min: 0, max: 9 }), { minLength: 1, maxLength: 2 })
          .map((digits) => digits.join('')),
        { nil: undefined }
      )
    )
    .map(
      ([negative, integer, fraction]) =>
        `${negative ? '-' : ''}${integer}${
          fraction === undefined ? '' : decimalSeparator + fraction
        }`
    );

describe('formatValue and cleanValue round trip', () => {
  describe.each(shapes)('$name', (shape) => {
    const { intlConfig, prefix, decimalSeparator, groupSeparator } = resolveSeparators(shape);

    const format = (value: string) =>
      formatValue({ value, intlConfig, decimalSeparator, groupSeparator, prefix });

    const clean = (value: string) =>
      cleanValue({
        value,
        decimalSeparator,
        groupSeparator,
        prefix,
        disableAbbreviations: true,
      });

    it('cleans a formatted value back to the original value', () => {
      fc.assert(
        fc.property(valueArbitrary(decimalSeparator ?? '.'), (value) => {
          expect(clean(format(value))).toBe(value);
        })
      );
    });

    it('never produces NaN when formatting', () => {
      fc.assert(
        fc.property(valueArbitrary(decimalSeparator ?? '.'), (value) => {
          expect(format(value)).not.toContain('NaN');
        })
      );
    });

    it('formats a cleaned value to the same string again', () => {
      fc.assert(
        fc.property(valueArbitrary(decimalSeparator ?? '.'), (value) => {
          const formatted = format(value);

          expect(format(clean(formatted))).toBe(formatted);
        })
      );
    });
  });
});

describe('formatValue and cleanValue round trip for long integers', () => {
  const longShapes: ReadonlyArray<Shape> = [
    { name: 'en-US / USD', intlConfig: { locale: 'en-US', currency: 'USD' } },
    { name: 'de-DE / EUR', intlConfig: { locale: 'de-DE', currency: 'EUR' } },
  ];

  /** 16 to 30 integer digits without leading zeros. */
  const longIntegerArbitrary = fc
    .tuple(
      fc.integer({ min: 1, max: 9 }),
      fc.array(fc.integer({ min: 0, max: 9 }), { minLength: 15, maxLength: 29 })
    )
    .map(([first, rest]) => `${first}${rest.join('')}`);

  describe.each(longShapes)('$name', (shape) => {
    const { intlConfig, prefix, decimalSeparator, groupSeparator } = resolveSeparators(shape);

    it('cleans a formatted long integer back to the original digits', () => {
      fc.assert(
        fc.property(longIntegerArbitrary, (value) => {
          const formatted = formatValue({
            value,
            intlConfig,
            decimalSeparator,
            groupSeparator,
            prefix,
          });

          expect(
            cleanValue({
              value: formatted,
              decimalSeparator,
              groupSeparator,
              prefix,
              disableAbbreviations: true,
            })
          ).toBe(value);
        })
      );
    });
  });
});
