import { cleanValue } from '../cleanValue';

describe('cleanValue', () => {
  it('should remove group separator in string', () => {
    const value = cleanValue({
      value: '1,000,000',
    });
    expect(value).toEqual('1000000');
  });

  it('should handle period decimal separator in string', () => {
    const value = cleanValue({
      value: '1.000.000,12',
      decimalSeparator: ',',
      groupSeparator: '.',
    });
    expect(value).toEqual('1000000,12');
  });

  it('should remove prefix', () => {
    const value = cleanValue({
      value: '£1000000',
      prefix: '£',
    });
    expect(value).toEqual('1000000');
  });

  it('should remove suffix', () => {
    const value = cleanValue({
      value: '1000000€',
      suffix: '€',
    });
    expect(value).toEqual('1000000');
  });

  it('should remove prefix and suffix', () => {
    const value = cleanValue({
      value: '+1000000€',
      suffix: '€',
      prefix: '+'
    });
    expect(value).toEqual('1000000');
  });

  it('should remove extra decimals', () => {
    const value = cleanValue({
      value: '100.0000',
    });
    expect(value).toEqual('100.00');
  });

  it('should remove decimals if not allowed', () => {
    const value = cleanValue({
      value: '100.0000',
      allowDecimals: false,
      decimalsLimit: 0,
    });
    expect(value).toEqual('100');
  });

  it('should include decimals if allowed', () => {
    const value = cleanValue({
      value: '100.123',
      allowDecimals: true,
      decimalsLimit: 0,
    });
    expect(value).toEqual('100.123');
  });

  it('should format value', () => {
    const value = cleanValue({
      value: '£1,234,567.89',
      prefix: '£',
    });
    expect(value).toEqual('1234567.89');
  });

  describe('negative values', () => {
    it('should handle negative value', () => {
      const value = cleanValue({
        value: '-£1,000',
        decimalSeparator: '.',
        groupSeparator: ',',
        allowDecimals: true,
        decimalsLimit: 2,
        prefix: '£',
      });
      expect(value).toEqual('-1000');
    });

    it('should handle negative value with decimal', () => {
      const value = cleanValue({
        value: '-£99,999.99',
        decimalSeparator: '.',
        groupSeparator: ',',
        allowDecimals: true,
        decimalsLimit: 2,
        prefix: '£',
      });
      expect(value).toEqual('-99999.99');
    });

    it('should handle not allow negative value if allowNegativeValue is false', () => {
      const value = cleanValue({
        value: '-£1,000',
        decimalSeparator: '.',
        groupSeparator: ',',
        allowDecimals: true,
        decimalsLimit: 2,
        allowNegativeValue: false,
        prefix: '£',
      });
      expect(value).toEqual('1000');
    });
  });
});
