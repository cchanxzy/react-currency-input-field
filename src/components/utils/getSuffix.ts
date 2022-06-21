import { escapeRegExp } from './escapeRegExp';
type Options = {
  decimalSeparator?: string;
  groupSeparator?: string;
  literalSeparator?: string;
};

export const getSuffix = (
  value: string,
  { groupSeparator = ',', decimalSeparator = '.', literalSeparator = undefined }: Options
): string | undefined => {
  const suffixReg = new RegExp(
    `\\d(${literalSeparator ? escapeRegExp(literalSeparator) + '?' : ''}[^${escapeRegExp(
      groupSeparator
    )}${escapeRegExp(decimalSeparator)}0-9]+)`
  );
  const suffixMatch = value.match(suffixReg);
  return suffixMatch ? suffixMatch[1] : undefined;
};
