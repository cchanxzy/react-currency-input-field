import {
  addCommas,
  checkIsValidNumber,
  cleanValue,
  formatValue,
  removeCommas,
  padTrimValue,
} from '../utilities';

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
    const check = checkIsValidNumber('abc');
    expect(check).toBe(false);
  });
});

describe('cleanValue', () => {
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

  it('should include decimals if allowed', () => {
    const value = cleanValue('100.123', true, 0);
    expect(value).toEqual('100.123');
  });

  it('should format value', () => {
    const value = cleanValue('£1,234,567.89', true, 2, '£');
    expect(value).toEqual('1234567.89');
  });
});

describe('formatValue', () => {
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

describe('padTrimValue', () => {
  it('should return original value if no precision', () => {
    const value = padTrimValue('1000000');
    expect(value).toEqual('1000000');
  });

  it('should pad with 0 if no decimals', () => {
    const value = padTrimValue('99', 3);
    expect(value).toEqual('99.000');
  });

  it('should pad with 0 if decimal length is less than precision', () => {
    const value = padTrimValue('10.5', 5);
    expect(value).toEqual('10.50000');
  });

  it('should trim if decimal length is larger than precision', () => {
    const value = padTrimValue('10.599', 2);
    expect(value).toEqual('10.59');
  });
});
