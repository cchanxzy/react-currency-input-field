import { abbrValue, parseAbbrValue } from '../parseAbbrValue';

describe('abbrValue', () => {
  it('should not convert value under 1000', () => {
    expect(abbrValue(999)).toEqual('999');
  });

  it('should convert thousand to k', () => {
    expect(abbrValue(1000)).toEqual('1k');
    expect(abbrValue(1500)).toEqual('1.5k');
    expect(abbrValue(10000)).toEqual('10k');
  });

  it('should work with comma as decimal separator', () => {
    expect(abbrValue(1500, ',')).toEqual('1,5k');
  });

  it('should work with decimal places option', () => {
    expect(abbrValue(123456, '.')).toEqual('0.123456M');
    expect(abbrValue(123456, '.', 2)).toEqual('0.12M');
  });

  describe('floating-point precision in abbreviation', () => {
    it('should handle values with potential precision issues', () => {
      expect(abbrValue(4100000)).toEqual('4.1M');
      expect(abbrValue(1025000)).toEqual('1.025M');
      expect(abbrValue(3100000)).toEqual('3.1M');
      expect(abbrValue(2100000)).toEqual('2.1M');
    });

    it('should handle k abbreviations', () => {
      expect(abbrValue(1500)).toEqual('1.5k');
      expect(abbrValue(2100)).toEqual('2.1k');
    });
  });
});

describe('parseAbbrValue', () => {
  it('should return undefined if cannot parse', () => {
    expect(parseAbbrValue('1km')).toEqual(undefined);
    expect(parseAbbrValue('2mb')).toEqual(undefined);
    expect(parseAbbrValue('3a')).toEqual(undefined);
  });

  it('should return undefined if no abbreviation', () => {
    expect(parseAbbrValue('1.23')).toEqual(undefined);
    expect(parseAbbrValue('100')).toEqual(undefined);
    expect(parseAbbrValue('20000')).toEqual(undefined);
  });

  it('should return undefined for only letter', () => {
    expect(parseAbbrValue('k')).toBeUndefined();
    expect(parseAbbrValue('m')).toBeUndefined();
    expect(parseAbbrValue('b')).toBeUndefined();
  });

  it('should return 0 for 0', () => {
    expect(parseAbbrValue('0k')).toEqual(0);
    expect(parseAbbrValue('0m')).toEqual(0);
    expect(parseAbbrValue('0b')).toEqual(0);
  });

  it('should parse k', () => {
    expect(parseAbbrValue('1k')).toEqual(1000);
    expect(parseAbbrValue('1.k')).toEqual(1000);
    expect(parseAbbrValue('2K')).toEqual(2000);
    expect(parseAbbrValue('1.1239999k')).toEqual(1123.9999);
    expect(parseAbbrValue('1.5k')).toEqual(1500);
    expect(parseAbbrValue('50.12K')).toEqual(50120);
    expect(parseAbbrValue('100K')).toEqual(100000);
  });

  it('should parse m', () => {
    expect(parseAbbrValue('1m')).toEqual(1000000);
    expect(parseAbbrValue('1.m')).toEqual(1000000);
    expect(parseAbbrValue('1.5m')).toEqual(1500000);
    expect(parseAbbrValue('45.123456m')).toEqual(45123456);
    expect(parseAbbrValue('83.5m')).toEqual(83500000);
    expect(parseAbbrValue('100M')).toEqual(100000000);
  });

  it('should parse b', () => {
    expect(parseAbbrValue('1b')).toEqual(1000000000);
    expect(parseAbbrValue('1.b')).toEqual(1000000000);
    expect(parseAbbrValue('1.5b')).toEqual(1500000000);
    expect(parseAbbrValue('65.5513b')).toEqual(65551300000);
    expect(parseAbbrValue('100B')).toEqual(100000000000);
  });

  it('should work with comma as decimal separator', () => {
    expect(parseAbbrValue('1,2k', ',')).toEqual(1200);
    expect(parseAbbrValue('2,3m', ',')).toEqual(2300000);
  });

  describe('floating-point precision fixes', () => {
    it('should handle 4.1M without precision issues', () => {
      expect(parseAbbrValue('4.1m')).toBe(4100000);
      expect(parseAbbrValue('4.1M')).toBe(4100000);
    });

    it('should handle 1.025M without precision issues', () => {
      expect(parseAbbrValue('1.025m')).toBe(1025000);
    });

    it('should handle 4.111M without precision issues', () => {
      expect(parseAbbrValue('4.111m')).toBe(4111000);
    });

    it('should handle 3.1M without precision issues', () => {
      expect(parseAbbrValue('3.1m')).toBe(3100000);
    });

    it('should handle 2.1M without precision issues', () => {
      expect(parseAbbrValue('2.1m')).toBe(2100000);
    });

    it('should handle problematic decimal values with k', () => {
      expect(parseAbbrValue('1.5k')).toBe(1500);
      expect(parseAbbrValue('2.1k')).toBe(2100);
    });

    it('should handle problematic decimal values with b', () => {
      expect(parseAbbrValue('1.1b')).toBe(1100000000);
      expect(parseAbbrValue('2.5b')).toBe(2500000000);
    });

    it('should handle negative abbreviated values', () => {
      expect(parseAbbrValue('-4.1m')).toBe(-4100000);
      expect(parseAbbrValue('-1.5k')).toBe(-1500);
      expect(parseAbbrValue('-2.5b')).toBe(-2500000000);
    });
  });
});
