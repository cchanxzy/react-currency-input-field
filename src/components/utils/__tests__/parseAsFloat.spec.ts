import { parseAsFloat } from '../parseAsFloat';

describe(`parseAsFloat`, () => {
  it.each([
    ['13.950,38', '.', ',', 13950.38],
    ['13,950.38', ',', '.', 13950.38],
    ['12.50', '.', undefined, 12.5],
    ['1.50', '.', undefined, 1.5],
    ['12,50', ',', undefined, 12.5],
    ['1,50', ',', undefined, 1.5],
    ['0,305', ',', undefined, 0.305],
    ['00.334', '.', undefined, 0.334],
    ['493.3391.332,995941', '.', ',', 4933391332.995941],
    ['493,3391,332.995941', ',', '.', 4933391332.995941],
    ['3500', ',', undefined, 3500],
    ['5-033-121,5899', '-', ',', 5033121.5899],
    ['3 000 40.34310', ' ', '.', 300040.3431],
    ['100', undefined, undefined, 100],
    ['50-33', '-', undefined, 50.33],
    ['50&33.0303', '&', '.', 5033.0303],
    ['50x33-0303', 'x', '-', 5033.0303],
  ])(
    'should parse any string with any locale as a float',
    (
      value: string,
      groupSeparator: string | undefined,
      decimalSeparator: string | undefined,
      expected: number
    ) => {
      expect(parseAsFloat(value, groupSeparator, decimalSeparator)).toEqual(expected);
    }
  );
});
