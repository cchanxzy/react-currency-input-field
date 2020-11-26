import { addSeparators } from '../addSeparators';

describe('Separators', () => {
  it('should add separator in string', () => {
    expect(addSeparators({ value: '1000000' })).toEqual('1,000,000');
  });

  it('should use custom separator when provided', () => {
    expect(addSeparators({ value: '1000000', separator: '.' })).toEqual('1.000.000');
  });
  it('should formate properly for indian numbering system', () => {
    expect(addSeparators({ value: '1000000', separator: ',', isIndianNumberSystem: true })).toEqual(
      '10,00,000'
    );
  });
});
