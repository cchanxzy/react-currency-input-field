/**
 * Abbreviate number eg. 1000 = 1k
 *
 * Source: https://stackoverflow.com/a/9345181
 */
export const abbrValue = (value: number, _decimalPlaces = 10): string => {
  if (value > 999) {
    let valueLength = ('' + value).length;
    const p = Math.pow;
    const d = p(10, _decimalPlaces);
    valueLength -= valueLength % 3;

    return Math.round((value * d) / p(10, valueLength)) / d + ' kMGTPE'[valueLength / 3];
  }

  return String(value);
};

type AbbrMap = { [key: string]: number };

const abbrMap: AbbrMap = { k: 1000, m: 1000000, b: 1000000000 };

/**
 * Parse a value with abbreviation e.g 1k = 1000
 */
export const parseAbbrValue = (value: string): undefined | number => {
  const match = value.match(/(\d+(.\d+)?)([kmb])$/i);

  if (match) {
    const [, digits, , abbr] = match;
    const multiplier = abbr ? abbrMap[abbr.toLowerCase()] : null;
    if (digits && multiplier) {
      return Number(digits) * multiplier;
    }
  }

  return undefined;
};
