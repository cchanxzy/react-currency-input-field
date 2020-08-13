import { checkIsValidNumber } from '../checkIsValidNumber';

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
