import type { CurrencyInputProps } from '../CurrencyInputProps';
import { expandAbbrValue } from './parseAbbrValue';
import { removeSeparators } from './removeSeparators';
import { removeInvalidChars } from './removeInvalidChars';
import { escapeRegExp } from './escapeRegExp';

export type CleanValueOptions = Pick<
  CurrencyInputProps,
  | 'decimalSeparator'
  | 'groupSeparator'
  | 'allowDecimals'
  | 'decimalsLimit'
  | 'allowNegativeValue'
  | 'disableAbbreviations'
  | 'prefix'
  | 'suffix'
  | 'transformRawValue'
> & { value: string };

/**
 * Minus characters, other than the hyphen and U+2212 which is replaced by "-". They only count as
 * a minus sign before the digits: the value isn't rewritten, so a prefix or suffix that contains
 * one still matches
 */
const minusChars = '\\u2010-\\u2013\\uFE63\\uFF0D\\u207B\\u208B\\u2796';
const minusReg = new RegExp(`[${minusChars}]`);
const loneMinusReg = new RegExp(`^[-${minusChars}]$`);

/** Whitespace and bidi marks, which can come between a digit and an abbreviation */
const abbrGap = '[\\s\\u200e\\u200f\\u061c]*';
/** A letter in any script. An abbreviation can't be followed by one, eg. the k of "kr" or "Kč" */
const letterReg = /\p{L}/u;

/**
 * Find a k, m or b that is an abbreviation: on its own right after the number. It follows a digit
 * or the decimal separator (whitespace and bidi marks in between are fine), no letter follows it,
 * and no digit comes after it. So "1k", "1k US dollar", "(5k)" and "5k€" are abbreviations, while
 * the k of "1 kr", "12 kg", "1k 234" or "k5" is text
 */
const findAbbreviation = (value: string, decimalSeparator: string): RegExpExecArray | null => {
  const reg = RegExp(
    `(\\d${
      decimalSeparator ? `|${escapeRegExp(decimalSeparator)}` : ''
    })${abbrGap}([kmb])(?=\\D*$)`,
    'gi'
  );
  let match: RegExpExecArray | null;

  while ((match = reg.exec(value)) !== null) {
    if (!letterReg.test(value.charAt(match.index + match[0].length))) {
      return match;
    }
  }

  return null;
};

/**
 * Remove the last occurrence of the suffix: the exact text, otherwise without its whitespace
 */
const removeSuffix = (value: string, suffix: string): string => {
  const candidate = [suffix, suffix.trim()].find((text) => text && value.includes(text));

  if (!candidate) {
    return value;
  }

  const index = value.lastIndexOf(candidate);
  return value.slice(0, index) + value.slice(index + candidate.length);
};

/**
 * Remove prefix, suffix, separators and extra decimals from value
 */
export const cleanValue = ({
  value: rawInput,
  groupSeparator = ',',
  decimalSeparator = '.',
  allowDecimals = true,
  decimalsLimit = 2,
  allowNegativeValue = true,
  disableAbbreviations = false,
  prefix = '',
  suffix = '',
  transformRawValue = (rawValue) => rawValue,
}: CleanValueOptions): string => {
  // Intl uses U+2212 for the minus sign in some locales
  const value = rawInput.replace(/\u2212/g, '-');
  const transformedValue = transformRawValue(value);

  if (loneMinusReg.test(transformedValue)) {
    return allowNegativeValue ? '-' : '';
  }

  // The suffix is removed first, so a hyphen in it is not read as a minus sign. The prefix stays
  // for the sign check, as a minus sign can come before or after it
  const withoutSuffix = removeSuffix(transformedValue, suffix);

  // A minus sign followed by the decimal separator, eg. -.5, is also negative
  const negativeDecimal = decimalSeparator ? `|(^-${escapeRegExp(decimalSeparator)})` : '';
  const reg = new RegExp(`((^|\\D)-\\d)|(-${escapeRegExp(prefix)})${negativeDecimal}`);

  // Is there a digit before the prefix? eg. 1$
  const [prefixWithValue, preValue] =
    RegExp(`(\\d+)-?${escapeRegExp(prefix)}`).exec(withoutSuffix) || [];
  const withoutAffixes = prefix
    ? prefixWithValue
      ? withoutSuffix.replace(prefixWithValue, '').concat(preValue)
      : withoutSuffix.replace(prefix, '')
    : withoutSuffix;

  // The other minus characters count before the first digit only, so 1\u20132 is 12. Without a
  // digit they count anywhere, like a hyphen, so \u2013. is -.
  const firstDigit = withoutAffixes.search(/\d/);
  const isNegative =
    reg.test(withoutSuffix) ||
    minusReg.test(firstDigit === -1 ? withoutAffixes : withoutAffixes.slice(0, firstDigit));

  // Text after an abbreviation, eg. a currency name in another plural form than the one removed
  // above, is dropped
  const abbrMatch = disableAbbreviations
    ? null
    : findAbbreviation(withoutAffixes, decimalSeparator);
  const numberText = abbrMatch
    ? withoutAffixes.slice(0, abbrMatch.index + abbrMatch[1].length)
    : withoutAffixes;

  const withoutSeparators = removeSeparators(numberText, groupSeparator);
  const withoutInvalidChars = removeInvalidChars(withoutSeparators, [
    groupSeparator,
    decimalSeparator,
  ]);

  let valueOnly = withoutInvalidChars;
  let isAbbreviation = false;

  if (abbrMatch) {
    // disallow letter without number
    if (!/\d/.test(withoutInvalidChars)) {
      return '';
    }
    const parsed = expandAbbrValue(`${withoutInvalidChars}${abbrMatch[2]}`, decimalSeparator);
    if (parsed !== undefined) {
      valueOnly = parsed;
      isAbbreviation = true;
    }
  }

  const includeNegative = isNegative && allowNegativeValue ? '-' : '';

  if (decimalSeparator && valueOnly.includes(decimalSeparator)) {
    const [int, decimals] = valueOnly.split(decimalSeparator);
    const trimmedDecimals = decimalsLimit && decimals ? decimals.slice(0, decimalsLimit) : decimals;
    // An expanded abbreviation reports its decimals with ".", as it always has, eg. 1,5k is 1500
    // and 1,2345k is 1234.5 with a "," decimal separator
    const outputSeparator = isAbbreviation ? '.' : decimalSeparator;
    const includeDecimals = allowDecimals ? `${outputSeparator}${trimmedDecimals}` : '';

    return `${includeNegative}${int}${includeDecimals}`;
  }

  return `${includeNegative}${valueOnly}`;
};
