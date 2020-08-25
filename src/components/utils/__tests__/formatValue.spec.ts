import { formatValue } from '../formatValue';

describe('formatValue', () => {
  it('should return empty if blank value', () => {
    const value = formatValue({
      value: '',
      decimalSeparator: '.',
      groupSeparator: ',',
    });
    expect(value).toEqual('');
  });

  it('should add separator', () => {
    const value = formatValue({
      value: '1234567',
      decimalSeparator: '.',
      groupSeparator: ',',
    });
    expect(value).toEqual('1,234,567');
  });

  it('should handle period separator', () => {
    const value = formatValue({
      value: '1234567',
      decimalSeparator: '.',
      groupSeparator: '.',
    });
    expect(value).toEqual('1.234.567');
  });

  it('should handle comma separator for decimals', () => {
    const value = formatValue({
      value: '1234567,89',
      decimalSeparator: '.',
      groupSeparator: '.',
    });
    expect(value).toEqual('1.234.567,89');
  });

  it('should NOT add separator if "turnOffSeparators" is true', () => {
    const value = formatValue({
      value: '1234567',
      decimalSeparator: '.',
      groupSeparator: ',',
      turnOffSeparators: true,
    });
    expect(value).toEqual('1234567');
  });

  it('should add prefix', () => {
    const value = formatValue({
      value: '123',
      decimalSeparator: '.',
      groupSeparator: ',',
      prefix: '£',
    });
    expect(value).toEqual('£123');
  });

  it('should include "."', () => {
    const value = formatValue({
      value: '1234567.',
      decimalSeparator: '.',
      groupSeparator: ',',
    });
    expect(value).toEqual('1,234,567.');
  });

  it('should include decimals', () => {
    const value = formatValue({
      value: '1234.567',
      decimalSeparator: '.',
      groupSeparator: ',',
    });
    expect(value).toEqual('1,234.567');
  });

  it('should format value', () => {
    const value = formatValue({
      value: '1234567.89',
      decimalSeparator: '.',
      groupSeparator: ',',
      prefix: '£',
    });
    expect(value).toEqual('£1,234,567.89');
  });

  it('should handle negative values', () => {
    const value = formatValue({
      value: '-1234',
      decimalSeparator: '.',
      groupSeparator: ',',
      prefix: '£',
    });
    expect(value).toEqual('-£1,234');
  });

  it('should return negative sign if only negative sign', () => {
    const value = formatValue({
      value: '-',
      decimalSeparator: '.',
      groupSeparator: ',',
      prefix: '£',
    });
    expect(value).toEqual('-');
  });
});
