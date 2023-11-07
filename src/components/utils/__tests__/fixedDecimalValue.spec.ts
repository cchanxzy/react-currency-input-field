import { fixedDecimalValue } from '../fixedDecimalValue';

describe('fixedDecimalValue', () => {
  it('should return original value if no match', () => {
    expect(fixedDecimalValue('abc', '.', 2)).toEqual('abc');
  });

  it('should work with 0 fixed decimal length', () => {
    expect(fixedDecimalValue('123', '.', 0)).toEqual('123');
    expect(fixedDecimalValue('1.23', '.', 0)).toEqual('123');
    expect(fixedDecimalValue('123,45', ',', 0)).toEqual('12345');
  });

  it('should work with 2 fixed decimal length', () => {
    expect(fixedDecimalValue('1', '.', 2)).toEqual('1');
    expect(fixedDecimalValue('12', '.', 2)).toEqual('1.2');
    expect(fixedDecimalValue('123', '.', 2)).toEqual('1.23');
    expect(fixedDecimalValue('12345', '.', 2)).toEqual('123.45');
    expect(fixedDecimalValue('123.4567', '.', 2)).toEqual('123.45');

    expect(fixedDecimalValue('1111.11', '.', 2)).toEqual('1111.11');
    expect(fixedDecimalValue('1111.111', '.', 2)).toEqual('1111.11');
    expect(fixedDecimalValue('2222.33 ', '.', 2)).toEqual('2222.33');
  });

  it('should work with 4 fixed decimal length', () => {
    expect(fixedDecimalValue('12', ',', 4)).toEqual('1,2');
    expect(fixedDecimalValue('123', ',', 4)).toEqual('1,23');
    expect(fixedDecimalValue('1234', ',', 4)).toEqual('1,234');
    expect(fixedDecimalValue('12345', ',', 4)).toEqual('1,2345');
  });

  it('should trim decimals if too long', () => {
    expect(fixedDecimalValue('1.23', '.', 2)).toEqual('1.23');
    expect(fixedDecimalValue('1.2345', '.', 2)).toEqual('1.23');
    expect(fixedDecimalValue('1,2345678', ',', 3)).toEqual('1,234');
    expect(fixedDecimalValue('123,45678', ',', 3)).toEqual('123,456');
  });
});
