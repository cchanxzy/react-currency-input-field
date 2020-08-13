import { removeCommas } from '../removeCommas';

describe('removeCommas', () => {
  it('should remove commas in string', () => {
    const value = removeCommas('1,000,000');
    expect(value).toEqual('1000000');
  });
});
