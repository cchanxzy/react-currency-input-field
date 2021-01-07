import { formatValue } from '../formatValue';

describe('formatValue', () => {
  it('should return empty if blank value', () => {
    expect(
      formatValue({
        value: '',
      })
    ).toEqual('');
  });

  it('should add group separator', () => {
    expect(
      formatValue({
        value: '1234567',
        groupSeparator: '/',
      })
    ).toEqual('1/234/567');
  });

  it('should handle comma separator for decimals', () => {
    expect(
      formatValue({
        value: '1234567,89',
        decimalSeparator: ',',
        groupSeparator: '.',
      })
    ).toEqual('1.234.567,89');
  });

  it('should handle - as separator for decimals', () => {
    expect(
      formatValue({
        value: '1234567-89',
        decimalSeparator: '-',
        groupSeparator: '.',
      })
    ).toEqual('1.234.567-89');
  });

  it('should handle empty decimal separator', () => {
    expect(
      formatValue({
        value: '123456789',
        decimalSeparator: '',
        groupSeparator: '',
      })
    ).toEqual('123456789');
  });

  it('should NOT add separator if "disableGroupSeparators" is true', () => {
    expect(
      formatValue({
        value: '1234567',
        disableGroupSeparators: true,
      })
    ).toEqual('1234567');
  });

  it('should NOT add separator if "disableGroupSeparators" is true even if decimal and group separators specified', () => {
    expect(
      formatValue({
        value: '1234567',
        decimalSeparator: '.',
        groupSeparator: ',',
        disableGroupSeparators: true,
      })
    ).toEqual('1234567');
  });

  it('should add prefix', () => {
    expect(
      formatValue({
        value: '123',
        prefix: '£',
      })
    ).toEqual('£123');
  });

  it('should include decimal separator if last char', () => {
    expect(
      formatValue({
        value: '1234567.',
        groupSeparator: ',',
        decimalSeparator: '.',
      })
    ).toEqual('1,234,567.');

    expect(
      formatValue({
        value: '1234567,',
        groupSeparator: '.',
        decimalSeparator: ',',
      })
    ).toEqual('1.234.567,');
  });

  it('should include decimals', () => {
    expect(
      formatValue({
        value: '1234.567',
        groupSeparator: ',',
        decimalSeparator: '.',
      })
    ).toEqual('1,234.567');
  });

  it('should format value', () => {
    expect(
      formatValue({
        value: '1234567.89',
        groupSeparator: ',',
        decimalSeparator: '.',
        prefix: '£',
      })
    ).toEqual('£1,234,567.89');
  });

  it('should handle decimals 999999', () => {
    expect(
      formatValue({
        value: '1.99999',
        intlConfig: { locale: 'en-GB', currency: 'GBP' },
      })
    ).toEqual('£1.99999');

    expect(
      formatValue({
        value: '1.99999',
      })
    ).toEqual('1.99999');
  });

  it('should handle 0 value', () => {
    expect(
      formatValue({
        value: '0',
        prefix: '£',
      })
    ).toEqual('£0');

    expect(
      formatValue({
        decimalSeparator: '.',
        groupSeparator: ',',
        disableGroupSeparators: false,
        decimalScale: 2,
        prefix: '£',
        value: '0',
      })
    ).toEqual('£0.00');
  });

  describe('negative values', () => {
    it('should handle negative values', () => {
      expect(
        formatValue({
          value: '-1234',
          groupSeparator: ',',
          decimalSeparator: '.',
          prefix: '£',
        })
      ).toEqual('-£1,234');
    });

    it('should return negative sign if only negative sign', () => {
      expect(
        formatValue({
          value: '-',
          prefix: '£',
        })
      ).toEqual('-');
    });
  });

  it('should handle negative value and "-" as groupSeparator', () => {
    expect(
      formatValue({
        value: '-1234',
        groupSeparator: '-',
        prefix: '£',
      })
    ).toEqual('-£1-234');
  });

  it('should handle negative value and "-" as decimalSeparator', () => {
    expect(
      formatValue({
        value: '-12-34',
        decimalSeparator: '-',
        prefix: '£',
      })
    ).toEqual('-£12-34');
  });

  it('should handle negative value and "-" as groupSeparator', () => {
    expect(
      formatValue({
        value: '-123456',
        groupSeparator: '-',
        prefix: '£',
      })
    ).toEqual('-£123-456');
  });

  describe('intlConfig', () => {
    it('should handle intlConfig passed in', () => {
      expect(
        formatValue({
          value: '-500000',
          intlConfig: { locale: 'en-IN', currency: 'INR' },
        })
      ).toEqual('-₹5,00,000');

      expect(
        formatValue({
          value: '123456.79',
          intlConfig: { locale: 'zh-CN', currency: 'CNY' },
        })
      ).toEqual('¥123,456.79');
    });

    it('should handle suffix', () => {
      expect(
        formatValue({
          value: '1',
          decimalSeparator: ',',
          intlConfig: { locale: 'de-DE', currency: 'EUR' },
        })
      ).toEqual(`1\xa0€`);
    });

    it('should handle suffix ending with decimal separator', () => {
      expect(
        formatValue({
          value: '1,',
          decimalSeparator: ',',
          intlConfig: { locale: 'de-DE', currency: 'EUR' },
        })
      ).toEqual(`1,\xa0€`);
    });

    it('should handle suffix ending with decimal separator and decimals', () => {
      expect(
        formatValue({
          value: '123,00',
          decimalSeparator: ',',
          intlConfig: { locale: 'de-DE', currency: 'EUR' },
        })
      ).toEqual(`123,00\xa0€`);

      expect(
        formatValue({
          value: '123,98',
          decimalSeparator: ',',
          intlConfig: { locale: 'de-DE', currency: 'EUR' },
        })
      ).toEqual(`123,98\xa0€`);
    });

    it('should override locale if prefix passed in', () => {
      expect(
        formatValue({
          value: '345',
          intlConfig: { locale: 'en-US', currency: 'USD' },
          prefix: '₹',
        })
      ).toEqual('₹345');
    });

    it('should override locale if groupSeparator passed in', () => {
      expect(
        formatValue({
          value: '-123456',
          intlConfig: { locale: 'en-IN', currency: 'INR' },
          groupSeparator: '-',
        })
      ).toEqual('-₹1-23-456');
    });

    it('should override locale if decimalSeparator passed in', () => {
      expect(
        formatValue({
          value: '654321-00',
          intlConfig: { locale: 'zh-CN', currency: 'CNY' },
          decimalSeparator: '-',
        })
      ).toEqual('¥654,321-00');
    });

    it('should override locale if disableGroupSeparators passed in', () => {
      expect(
        formatValue({
          value: '987654321',
          intlConfig: { locale: 'zh-CN', currency: 'CNY' },
          decimalSeparator: '.',
          groupSeparator: ',',
          disableGroupSeparators: true,
        })
      ).toEqual('¥987654321');
    });
  });
});
