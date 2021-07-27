import { parseAsFloat } from '../parseAsFloat';

describe(`parseAsFloat`, () => {
  it.each([
    ['13.950,38', '.', 13950.38],
    ['13,950.38', ',', 13950.38],
    ['12.50', '.', 12.5],
    ['1.50', '.', 1.5],
    ['12,50', ',', 12.5],
    ['1,50', ',', 1.5],
    ['0,305', ',', 0.305],
    ['00.334', '.', 0.334],
    ['493.3391.332,995941', '.', 4933391332.995941],
    ['493,3391,332.995941', ',', 4933391332.995941],
  ])(
    'should parse any string with any locale as a float',
    (value: string, groupSeparator: string, expected: number) => {
      expect(parseAsFloat(value, groupSeparator)).toEqual(expected);
    }
  );
});
