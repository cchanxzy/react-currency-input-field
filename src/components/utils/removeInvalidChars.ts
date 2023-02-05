import { escapeRegExp } from './escapeRegExp';
import {countryCodesWithAbbreviationsChars} from './countryCodesWithAbbreviationsRegExp'

/**
 * Remove invalid characters
 */
export const removeInvalidChars = (value: string, validChars: ReadonlyArray<string>): string => {
  const chars = escapeRegExp(validChars.join(''));

  const reg = new RegExp(`[^\\d${chars}]`, 'gi');

  let clearValue = value;

  countryCodesWithAbbreviationsChars.forEach((regExp) => {
    clearValue = clearValue.replace(regExp, '');
  });

  return clearValue.replace(reg, '');
};
