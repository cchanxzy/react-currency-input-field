import { Separator } from '../CurrencyInputProps';
import { escapeRegExp } from './escapeRegExp';

/**
 * Remove group separator from value eg. 1,000 > 1000
 */
export const removeSeparators = (value: string, separator: Separator = ','): string => {
  const reg = new RegExp(escapeRegExp(separator), 'g');
  return value.replace(reg, '');
};
