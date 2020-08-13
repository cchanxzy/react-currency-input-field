import { cleanValue } from '../cleanValue';

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
