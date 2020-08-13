import { formatValue } from '../formatValue';

describe('formatValue', () => {
  it('should add commas', () => {
    const value = formatValue('1234567', false);
    expect(value).toEqual('1,234,567');
  });

  it('should NOT add commas if "turnOffSeparators" is true', () => {
    const value = formatValue('1234567', true);
    expect(value).toEqual('1234567');
  });

  it('should add prefix', () => {
    const value = formatValue('123', false, '£');
    expect(value).toEqual('£123');
  });

  it('should include "."', () => {
    const value = formatValue('1234567.', false);
    expect(value).toEqual('1,234,567.');
  });

  it('should include decimals', () => {
    const value = formatValue('1234.567', false);
    expect(value).toEqual('1,234.567');
  });

  it('should format value', () => {
    const value = formatValue('1234567.89', false, '£');
    expect(value).toEqual('£1,234,567.89');
  });
});
