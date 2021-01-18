import { padTrimValue } from '../padTrimValue';

describe('padTrimValue', () => {
  it('should return original value if no decimalScale', () => {
    expect(padTrimValue('1000000')).toEqual('1000000');
  });

  it('should return blank value if no value', () => {
    expect(padTrimValue('', '.', 2)).toEqual('');
  });

  it('should return blank value if no only negative', () => {
    expect(padTrimValue('-', '.', 2)).toEqual('');
  });

  it('should pad with 0 if no decimals', () => {
    expect(padTrimValue('99', '.', 3)).toEqual('99.000');
  });

  it('should pad with 0 if decimal length is less than decimalScale', () => {
    expect(padTrimValue('10.5', '.', 5)).toEqual('10.50000');
  });

  it('should trim if decimal length is larger than decimalScale', () => {
    expect(padTrimValue('10.599', '.', 2)).toEqual('10.59');
    expect(padTrimValue('10.599', '.', 0)).toEqual('10');
  });

  it('should trim handle comma as decimal separator', () => {
    expect(padTrimValue('9,9', ',', 3)).toEqual('9,900');
  });
});
