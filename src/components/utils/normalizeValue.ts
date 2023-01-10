import { removeSeparators } from './removeSeparators';

export type NormalizeValueOptions = {
  value: string;
  groupSeparator: string;
  prefix?: string;
};

/**
 * Remove group separator and prefix for compare process
 */
export const normalizeValue = ({
  value,
  groupSeparator = ',',
  prefix,
}: NormalizeValueOptions): number => {
  return parseFloat(removeSeparators(value.replace(prefix || '', ''), groupSeparator));
};
