import { AbbrMap } from './cleanValue';
import { escapeRegExp } from './escapeRegExp';

/**
 * Abbreviate number eg. 1000 = 1k
 *
 * Source: https://stackoverflow.com/a/9345181
 */
export const abbrValue = (value: number, decimalSeparator = '.', _decimalPlaces = 10): string => {
  if (value > 999) {
    let valueLength = ('' + value).length;
    const p = Math.pow;
    const d = p(10, _decimalPlaces);
    valueLength -= valueLength % 3;

    const abbrValue = Math.round((value * d) / p(10, valueLength)) / d + ' kMGTPE'[valueLength / 3];
    return abbrValue.replace('.', decimalSeparator);
  }

  return String(value);
};

/**
 * Parse a value with abbreviation e.g 1k = 1000
 */
export const parseAbbrValue = (
  value: string,
  abbreviations: AbbrMap,
  decimalSeparator = '.'
): number | undefined => {
  const abbrKeys = Object.keys(abbreviations);
  const reg = new RegExp(`([${abbrKeys.join('')}])`, 'i');
  let abbr = '';
  const digits = value.replace(reg, (_, a) => {
    abbr = a;
    return '';
  });

  if (abbr && digits && !reg.test(digits)) {
    const multiplier = abbreviations[abbr.toLowerCase()];

    return Number(digits.replace(decimalSeparator, '.')) * multiplier;
  }

  return undefined;
};
