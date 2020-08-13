import { addCommas } from '../addCommas';

describe('addCommas', () => {
  it('should remove commas in string', () => {
    const value = addCommas('1000000');
    expect(value).toEqual('1,000,000');
  });
});
