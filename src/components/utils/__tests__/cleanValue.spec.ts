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
});
