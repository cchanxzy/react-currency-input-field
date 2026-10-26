import { cleanValue } from '../cleanValue';

describe('cleanValue', () => {
  it('should remove group separator in string', () => {
    expect(
      cleanValue({
        value: '1,000,000',
      })
    ).toEqual('1000000');
  });

  it('should handle period decimal separator in string', () => {
    expect(
      cleanValue({
        value: '1.000.000,12',
        decimalSeparator: ',',
        groupSeparator: '.',
      })
    ).toEqual('1000000,12');
  });

  it('should remove prefix', () => {
    expect(
      cleanValue({
        value: '£1000000',
        prefix: '£',
      })
    ).toEqual('1000000');

    expect(
      cleanValue({
        value: '$5.5',
        prefix: '$',
      })
    ).toEqual('5.5');

    expect(
      cleanValue({
        value: '$ 1.5',
        prefix: '$ ',
      })
    ).toEqual('1.5');

    expect(
      cleanValue({
        value: 'JMD5.5',
        prefix: 'JMD',
      })
    ).toEqual('5.5');

    expect(
      cleanValue({
        value: 'Value: 1.5',
        prefix: 'Value: ',
      })
    ).toEqual('1.5');
  });

  it('should remove suffix', () => {
    expect(
      cleanValue({
        value: '123 €',
      })
    ).toEqual('123');

    expect(
      cleanValue({
        groupSeparator: '.',
        decimalSeparator: ',',
        value: '123.456,99 €',
      })
    ).toEqual('123456,99');
  });

  it('should remove extra decimals', () => {
    expect(
      cleanValue({
        value: '100.0000',
      })
    ).toEqual('100.00');
  });

  it('should remove decimals if not allowed', () => {
    expect(
      cleanValue({
        value: '100.0000',
        allowDecimals: false,
        decimalsLimit: 0,
      })
    ).toEqual('100');
  });

  it('should include decimals if allowed', () => {
    expect(
      cleanValue({
        value: '100.123',
        allowDecimals: true,
        decimalsLimit: 0,
      })
    ).toEqual('100.123');
  });

  it('should format value', () => {
    expect(
      cleanValue({
        value: '£1,234,567.89',
        prefix: '£',
      })
    ).toEqual('1234567.89');
  });

  describe('negative values', () => {
    it('should handle negative value', () => {
      expect(
        cleanValue({
          value: '-£1,000',
          decimalSeparator: '.',
          groupSeparator: ',',
          allowDecimals: true,
          decimalsLimit: 2,
          prefix: '£',
        })
      ).toEqual('-1000');
    });

    it('should handle negative value with intl with prefix', () => {
      expect(
        cleanValue({
          value: '€\xa0-123',
          prefix: '€',
        })
      ).toEqual('-123');
    });

    it('should handle negative value with decimal', () => {
      expect(
        cleanValue({
          value: '-£99,999.99',
          decimalSeparator: '.',
          groupSeparator: ',',
          allowDecimals: true,
          decimalsLimit: 2,
          prefix: '£',
        })
      ).toEqual('-99999.99');
    });

    it('should handle negative value with group separator', () => {
      expect(
        cleanValue({
          value: '-£99-999.99',
          decimalSeparator: '.',
          groupSeparator: '-',
          allowDecimals: true,
          decimalsLimit: 2,
          prefix: '£',
        })
      ).toEqual('-99999.99');
    });

    it('should handle not allow negative value if allowNegativeValue is false', () => {
      expect(
        cleanValue({
          value: '-£1,000',
          decimalSeparator: '.',
          groupSeparator: ',',
          allowDecimals: true,
          decimalsLimit: 2,
          allowNegativeValue: false,
          prefix: '£',
        })
      ).toEqual('1000');
    });

    it('should return an empty string for a lone minus sign if allowNegativeValue is false', () => {
      expect(cleanValue({ value: '-', allowNegativeValue: false })).toEqual('');
    });

    it('should keep the minus sign before a leading decimal separator with a prefix', () => {
      expect(cleanValue({ value: '-.', prefix: '$' })).toEqual('-.');
      expect(cleanValue({ value: '-.5', prefix: '$' })).toEqual('-.5');
      expect(
        cleanValue({ value: '-,5', prefix: 'R$', decimalSeparator: ',', groupSeparator: '.' })
      ).toEqual('-,5');
    });
  });

  it('should handle values placed before prefix', () => {
    expect(
      cleanValue({
        value: '2£1',
        prefix: '£',
      })
    ).toEqual('12');

    expect(
      cleanValue({
        value: '-2£1',
        prefix: '£',
      })
    ).toEqual('-12');

    expect(
      cleanValue({
        value: '2-£1',
        prefix: '£',
      })
    ).toEqual('-12');

    expect(
      cleanValue({
        value: '2-£1.99',
        prefix: '£',
        decimalsLimit: 5,
      })
    ).toEqual('-1.992');
  });

  describe('abbreviations', () => {
    it('should return empty string if abbreviation only', () => {
      expect(
        cleanValue({
          value: 'k',
          disableAbbreviations: false,
        })
      ).toEqual('');

      expect(
        cleanValue({
          value: 'm',
          disableAbbreviations: false,
        })
      ).toEqual('');

      expect(
        cleanValue({
          value: 'b',
          disableAbbreviations: false,
        })
      ).toEqual('');
    });

    it('should return empty string if prefix and abbreviation only', () => {
      expect(
        cleanValue({
          value: '$k',
          prefix: '$',
          disableAbbreviations: false,
        })
      ).toEqual('');

      expect(
        cleanValue({
          value: '£m',
          prefix: '£',
          disableAbbreviations: false,
        })
      ).toEqual('');
    });

    it('should return empty string if decimal separator and abbreviation only', () => {
      expect(
        cleanValue({
          value: '.k',
        })
      ).toEqual('');

      expect(
        cleanValue({
          value: '.m',
        })
      ).toEqual('');

      expect(
        cleanValue({
          value: '£.m',
          prefix: '£',
        })
      ).toEqual('');
    });

    it('should handle floating-point precision issues in abbreviations', () => {
      expect(
        cleanValue({
          value: '4.1m',
        })
      ).toEqual('4100000');

      expect(
        cleanValue({
          value: '-4.11B',
        })
      ).toEqual('-4110000000');

      expect(
        cleanValue({
          value: '1.025m',
        })
      ).toEqual('1025000');

      expect(
        cleanValue({
          value: '2.1k',
        })
      ).toEqual('2100');

      expect(
        cleanValue({
          value: '3.1m',
        })
      ).toEqual('3100000');
    });

    it('should apply decimalsLimit to an expanded abbreviation', () => {
      expect(cleanValue({ value: '1.2345678k', decimalsLimit: 2 })).toEqual('1234.56');
    });

    it('should drop the decimals of an expanded abbreviation if decimals are not allowed', () => {
      expect(cleanValue({ value: '1.2345k', allowDecimals: false })).toEqual('1234');
    });

    it('should report a "." decimal in an expanded abbreviation with a comma decimal separator', () => {
      expect(cleanValue({ value: '1,2345k', decimalSeparator: ',', groupSeparator: '.' })).toEqual(
        '1234.5'
      );
      expect(
        cleanValue({ value: '1,2345678k', decimalSeparator: ',', groupSeparator: '.' })
      ).toEqual('1234.56');
      expect(cleanValue({ value: '4,1m', decimalSeparator: ',', groupSeparator: '.' })).toEqual(
        '4100000'
      );
    });

    it('should expand abbreviations of values below one', () => {
      expect(cleanValue({ value: '0.5k' })).toEqual('500');
    });

    it('should expand an abbreviation of zero to 0', () => {
      expect(cleanValue({ value: '0k' })).toEqual('0');
      expect(cleanValue({ value: '0.0k' })).toEqual('0');
      expect(cleanValue({ value: '00m' })).toEqual('0');
    });

    it('should drop trailing zeros from the decimals of an expanded abbreviation', () => {
      expect(cleanValue({ value: '1.50000k' })).toEqual('1500');
      expect(cleanValue({ value: '1.23450k', decimalsLimit: 3 })).toEqual('1234.5');
    });

    it('should keep large expanded abbreviations exact', () => {
      expect(cleanValue({ value: '123456789.123b' })).toEqual('123456789123000000');
    });

    it('should ignore abbreviations if disableAbbreviations is true', () => {
      expect(
        cleanValue({
          value: '1k',
          disableAbbreviations: true,
        })
      ).toEqual('1');

      expect(
        cleanValue({
          value: '-2k',
          disableAbbreviations: true,
        })
      ).toEqual('-2');

      expect(
        cleanValue({
          value: '25.6m',
          disableAbbreviations: true,
        })
      ).toEqual('25.6');

      expect(
        cleanValue({
          value: '9b',
          disableAbbreviations: true,
        })
      ).toEqual('9');
    });
  });

  it('should look for a digit before the prefix in the transformed value', () => {
    const movePrefixToFront = (rawValue: string) =>
      rawValue.endsWith('$') ? `$${rawValue.slice(0, -1)}` : rawValue;

    expect(cleanValue({ value: '12$', prefix: '$', transformRawValue: movePrefixToFront })).toEqual(
      '12'
    );
  });

  it('should keep a U+2212 minus sign as a negative sign', () => {
    expect(cleanValue({ value: '\u22125,00 €', decimalSeparator: ',', groupSeparator: '.' })).toBe(
      '-5,00'
    );
  });

  describe('suffix', () => {
    const nbsp = ' ';

    it('should remove a currency suffix whose space is also the group separator', () => {
      const svSE = { groupSeparator: nbsp, decimalSeparator: ',', suffix: 'kr' };

      expect(cleanValue({ value: `1${nbsp}000${nbsp}kr`, ...svSE })).toEqual('1000');
      expect(cleanValue({ value: `1${nbsp}234${nbsp}567,5${nbsp}kr`, ...svSE })).toEqual(
        '1234567,5'
      );
    });

    it('should remove a suffix that contains the group separator', () => {
      expect(
        cleanValue({
          value: `12,5${nbsp}kr.`,
          groupSeparator: '.',
          decimalSeparator: ',',
          suffix: 'kr.',
        })
      ).toEqual('12,5');
    });

    it('should remove a custom suffix with letters that are abbreviations', () => {
      expect(cleanValue({ value: '12 kg', suffix: ' kg' })).toEqual('12');
      expect(cleanValue({ value: '10 MB', suffix: ' MB' })).toEqual('10');
      expect(cleanValue({ value: '1,234 kg', suffix: ' kg' })).toEqual('1234');
    });

    it('should not read a hyphen in the suffix as a minus sign', () => {
      expect(cleanValue({ value: '5 -EUR', suffix: ' -EUR' })).toEqual('5');
      expect(cleanValue({ value: '-5 -EUR', suffix: ' -EUR' })).toEqual('-5');
    });

    it('should remove a suffix that contains the decimal separator', () => {
      expect(cleanValue({ value: '12.5 kr.', suffix: ' kr.' })).toEqual('12.5');
      expect(cleanValue({ value: '12 kr.', suffix: ' kr.' })).toEqual('12');
    });

    it('should remove the suffix without its surrounding whitespace', () => {
      expect(cleanValue({ value: '12kg', suffix: ' kg' })).toEqual('12');
    });

    it('should remove a suffix after a prefix', () => {
      expect(cleanValue({ value: '$1,000 kg', prefix: '$', suffix: ' kg' })).toEqual('1000');
      expect(cleanValue({ value: '-$1,000 kg', prefix: '$', suffix: ' kg' })).toEqual('-1000');
    });

    it('should remove a suffix with a plural currency name', () => {
      expect(cleanValue({ value: '5 British pounds', suffix: 'British pounds' })).toEqual('5');
      expect(cleanValue({ value: '1 British pound', suffix: 'British pounds' })).toEqual('1');
    });

    it('should read an abbreviation before a suffix', () => {
      expect(cleanValue({ value: '2k kg', suffix: ' kg' })).toEqual('2000');
    });
  });

  describe('abbreviation position', () => {
    it('should read an abbreviation separated from the digit by whitespace', () => {
      expect(cleanValue({ value: '1 k' })).toEqual('1000');
      expect(cleanValue({ value: '2.5 m' })).toEqual('2500000');
    });

    it('should ignore letters that are not an abbreviation at the end', () => {
      expect(cleanValue({ value: 'Balance: 100' })).toEqual('100');
      expect(cleanValue({ value: 'kb5' })).toEqual('5');
      expect(cleanValue({ value: '1k2' })).toEqual('12');
      expect(cleanValue({ value: '5 mb' })).toEqual('5');
    });

    it('should read an abbreviation followed by text, such as a currency name', () => {
      expect(cleanValue({ value: '1k US dollar' })).toEqual('1000');
      expect(cleanValue({ value: '1.00k US dollars' })).toEqual('1000');
      expect(cleanValue({ value: '2k kg' })).toEqual('2000');
      expect(
        cleanValue({ value: '1,5k Kč', decimalSeparator: ',', groupSeparator: '\u00a0' })
      ).toEqual('1500');
      expect(
        cleanValue({
          value: '2,5m\u00a0российских рублей',
          decimalSeparator: ',',
          groupSeparator: '\u00a0',
        })
      ).toEqual('2500000');
    });

    it('should read an abbreviation followed by punctuation or a symbol', () => {
      expect(cleanValue({ value: '5k,' })).toEqual('5000');
      expect(cleanValue({ value: '(5k)' })).toEqual('5000');
      expect(cleanValue({ value: '5k€' })).toEqual('5000');
      expect(cleanValue({ value: '5m%' })).toEqual('5000000');
      expect(cleanValue({ value: '5k.', decimalSeparator: ',', groupSeparator: '.' })).toEqual(
        '5000'
      );
      expect(cleanValue({ value: '5k-' })).toEqual('-5000');
    });

    it('should not read a letter followed by more digits as an abbreviation', () => {
      expect(cleanValue({ value: '1k 234' })).toEqual('1234');
      expect(
        cleanValue({ value: '2k 234,50 kr', decimalSeparator: ',', groupSeparator: ' ' })
      ).toEqual('2234,50');
    });

    it('should not read a letter that starts a word as an abbreviation', () => {
      expect(cleanValue({ value: '1 kr' })).toEqual('1');
      expect(cleanValue({ value: '12 kg' })).toEqual('12');
      expect(cleanValue({ value: '10 MB' })).toEqual('10');
      expect(cleanValue({ value: '1 British pound' })).toEqual('1');
      expect(cleanValue({ value: '5 Kč' })).toEqual('5');
    });

    it('should read an abbreviation that starts with the decimal separator', () => {
      expect(cleanValue({ value: '.5k' })).toEqual('500');
      expect(cleanValue({ value: '-.5k' })).toEqual('-500');
      expect(cleanValue({ value: ',5k', decimalSeparator: ',', groupSeparator: '.' })).toEqual(
        '500'
      );
    });
  });

  describe('minus sign position', () => {
    it('should read a hyphen anywhere in the number as a minus sign', () => {
      expect(cleanValue({ value: '123-' })).toEqual('-123');
      expect(cleanValue({ value: '12-3' })).toEqual('-123');
      expect(cleanValue({ value: '1,234-' })).toEqual('-1234');
      expect(cleanValue({ value: '1-2' })).toEqual('-12');
      expect(cleanValue({ value: '123\u2212' })).toEqual('-123');
    });

    it('should not read a hyphen after the digits as a minus sign when there is a prefix', () => {
      expect(cleanValue({ value: '5-', prefix: '$' })).toEqual('5');
      expect(cleanValue({ value: '1-2', prefix: '$' })).toEqual('12');
      expect(cleanValue({ value: '555-1234', prefix: '$' })).toEqual('5551234');
    });

    it('should keep a minus sign when there are no digits', () => {
      expect(cleanValue({ value: '-x' })).toEqual('-');
      expect(cleanValue({ value: '-,' })).toEqual('-');
      expect(cleanValue({ value: '-..' })).toEqual('-.');
      expect(cleanValue({ value: '-.a' })).toEqual('-.');
    });

    it('should keep a minus sign before the digits, around a prefix', () => {
      expect(cleanValue({ value: '-$5', prefix: '$' })).toEqual('-5');
      expect(cleanValue({ value: '$-5', prefix: '$' })).toEqual('-5');
      expect(cleanValue({ value: '€ -5', prefix: '€' })).toEqual('-5');
    });

    describe.each([
      ['U+2010 hyphen', '‐'],
      ['U+2011 non-breaking hyphen', '‑'],
      ['U+2012 figure dash', '‒'],
      ['U+2013 en dash', '–'],
      ['U+FE63 small hyphen-minus', '﹣'],
      ['U+FF0D fullwidth hyphen-minus', '－'],
      ['U+207B superscript minus', '⁻'],
      ['U+208B subscript minus', '₋'],
      ['U+2796 heavy minus sign', '➖'],
    ])('%s', (_name, char) => {
      it('should read the character before the digits as a minus sign', () => {
        expect(cleanValue({ value: `${char}5` })).toEqual('-5');
        expect(cleanValue({ value: `${char}1,234.5` })).toEqual('-1234.5');
        expect(cleanValue({ value: `$${char}5`, prefix: '$' })).toEqual('-5');
      });

      it('should not read the character between digits as a minus sign', () => {
        expect(cleanValue({ value: `1${char}2` })).toEqual('12');
      });

      it('should return a minus sign when alone, like a hyphen', () => {
        expect(cleanValue({ value: char })).toEqual('-');
        expect(cleanValue({ value: char, allowNegativeValue: false })).toEqual('');
      });

      it('should keep the minus sign when there are no digits, like a hyphen', () => {
        expect(cleanValue({ value: `${char}.` })).toEqual('-.');
        expect(cleanValue({ value: `${char}x` })).toEqual('-');
        expect(cleanValue({ value: `${char}.`, allowNegativeValue: false })).toEqual('.');
      });

      it('should not return a negative value if allowNegativeValue is false', () => {
        expect(cleanValue({ value: `${char}5`, allowNegativeValue: false })).toEqual('5');
      });
    });

    it('should keep a prefix or suffix that contains a minus character', () => {
      expect(cleanValue({ value: '5–EUR', suffix: '–EUR' })).toEqual('5');
      expect(cleanValue({ value: '–EUR5', prefix: '–EUR' })).toEqual('5');
    });
  });
});
