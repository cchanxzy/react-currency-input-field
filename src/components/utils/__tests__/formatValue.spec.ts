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

  it('should include "."', () => {
    expect(
      formatValue({
        value: '1234567.',
        groupSeparator: ',',
        decimalSeparator: '.',
      })
    ).toEqual('1,234,567.');
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

  it('should handle 0 value', () => {
    expect(
      formatValue({
        value: '0',
        prefix: '£',
      })
    ).toEqual('£0');
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
