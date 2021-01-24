import { getSuffix } from '../getSuffix';

describe('getSuffix', () => {
  it('should return undefined', () => {
    expect(getSuffix('123', {})).toBe(undefined);
    expect(getSuffix('$1,234', {})).toBe(undefined);
    expect(getSuffix('£4.99', {})).toBe(undefined);
    expect(getSuffix('£1,000.99', {})).toBe(undefined);
  });

  it('should return suffix from string', () => {
    expect(getSuffix('12£', {})).toBe('£');
    expect(getSuffix('12,34\xa0€', {})).toBe('\xa0€');
    expect(getSuffix('99%', {})).toBe('%');
    expect(getSuffix('99percent', {})).toBe('percent');
    expect(getSuffix('1 penguin', {})).toBe(' penguin');
  });

  it('should handle groupSeparator', () => {
    expect(getSuffix('1.23 £', { groupSeparator: '.' })).toBe(' £');
    expect(getSuffix('4,567 %', { groupSeparator: ',' })).toBe(' %');
  });

  it('should handle decimalSeparator', () => {
    expect(getSuffix('1.23 £', { decimalSeparator: '.' })).toBe(' £');
    expect(getSuffix('4,567 %', { decimalSeparator: ',' })).toBe(' %');
  });
});
