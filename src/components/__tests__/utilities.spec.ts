import { addCommas, checkIsValidNumber, cleanValue, formatValue, removeCommas } from '../utilities';

describe('addCommas', () => {
  it('should remove commas in string', () => {
    const value = addCommas('1000000');
    expect(value).toEqual('1,000,000');
  });
});

describe('removeCommas', () => {
  it('should remove commas in string', () => {
    const value = removeCommas('1,000,000');
    expect(value).toEqual('1000000');
  });
});

describe('checkIsValidNumber', () => {
  it('should return true if value is  number', () => {
    const check = checkIsValidNumber('1');
    expect(check).toBe(true);
  });

  it('should return true if value is 0', () => {
    const check = checkIsValidNumber('0');
    expect(check).toBe(true);
  });

  it('should return false if value less than 0', () => {
    const check = checkIsValidNumber('-1');
    expect(check).toBe(false);
  });

  it('should return false if value is not a number', () => {
    const check = checkIsValidNumber('abc' as any);
    expect(check).toBe(false);
  });
});

describe('formatValue', () => {
  it('should remove commas in string', () => {
    const value = cleanValue('1,000,000', true, 2);
    expect(value).toEqual('1000000');
  });

  it('should remove prefix', () => {
    const value = cleanValue('£1000000', true, 2, '£');
    expect(value).toEqual('1000000');
  });

  it('should remove extra decimals', () => {
    const value = cleanValue('100.0000', true, 2);
    expect(value).toEqual('100.00');
  });

  it('should remove decimals if not allowed', () => {
    const value = cleanValue('100.0000', false, 0);
    expect(value).toEqual('100');
  });

  it('should format value', () => {
    const value = cleanValue('£1,234,567.89', true, 2, '£');
    expect(value).toEqual('1234567.89');
  });
});

describe('postFormat', () => {
  it('should add commas', () => {
    const value = formatValue('1234567');
    expect(value).toEqual('1,234,567');
  });

  it('should add prefix', () => {
    const value = formatValue('123', '£');
    expect(value).toEqual('£123');
  });

  it('should include "."', () => {
    const value = formatValue('1234567.');
    expect(value).toEqual('1,234,567.');
  });

  it('should include decimals', () => {
    const value = formatValue('1234.567');
    expect(value).toEqual('1,234.567');
  });

  it('should format value', () => {
    const value = formatValue('1234567.89', '£');
    expect(value).toEqual('£1,234,567.89');
  });
});
