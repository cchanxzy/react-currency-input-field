import { addCommas, checkIsValidNumber, removeCommas } from '../utilities';

describe('addCommas', () => {
  it('should remove commas in string', () => {
    const value = addCommas(1000000);
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
    const check = checkIsValidNumber(1);
    expect(check).toBe(true);
  });

  it('should return true if value is 0', () => {
    const check = checkIsValidNumber(0);
    expect(check).toBe(true);
  });

  it('should return false if value less than 0', () => {
    const check = checkIsValidNumber(-1);
    expect(check).toBe(false);
  });

  it('should return false if value is not a number', () => {
    const check = checkIsValidNumber('abc' as any);
    expect(check).toBe(false);
  });
});
