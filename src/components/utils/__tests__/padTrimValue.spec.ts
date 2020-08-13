import { padTrimValue } from '../padTrimValue';

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
