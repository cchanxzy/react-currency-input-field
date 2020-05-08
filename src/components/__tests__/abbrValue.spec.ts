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
});

describe('parseAbbrValue', () => {
  it('should return undefined if cannot parse', () => {
    expect(parseAbbrValue('1km')).toEqual(undefined);
    expect(parseAbbrValue('2mb')).toEqual(undefined);
  });

  it('should parse k', () => {
    expect(parseAbbrValue('1k')).toEqual(1000);
    expect(parseAbbrValue('1.1239999k')).toEqual(1123.9999);
    expect(parseAbbrValue('1.5k')).toEqual(1500);
    expect(parseAbbrValue('50.12K')).toEqual(50120);
    expect(parseAbbrValue('100K')).toEqual(100000);
  });

  it('should parse m', () => {
    expect(parseAbbrValue('1m')).toEqual(1000000);
    expect(parseAbbrValue('1.5m')).toEqual(1500000);
    expect(parseAbbrValue('45.123456m')).toEqual(45123456);
    expect(parseAbbrValue('83.5m')).toEqual(83500000);
    expect(parseAbbrValue('100M')).toEqual(100000000);
  });

  it('should parse b', () => {
    expect(parseAbbrValue('1b')).toEqual(1000000000);
    expect(parseAbbrValue('1.5b')).toEqual(1500000000);
    expect(parseAbbrValue('65.5513b')).toEqual(65551300000);
    expect(parseAbbrValue('100B')).toEqual(100000000000);
  });
});
