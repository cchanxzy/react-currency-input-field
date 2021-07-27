export const parseAsFloat = (value: string, groupSeparator: string): number => {
  const DOT = '.';
  const COMMA = ',';

  const replaceWithDot = (val: string) => {
    if (val.includes(COMMA)) {
      return val.replace(COMMA, DOT);
    }
    return val;
  };

  const decimalSeparator = groupSeparator === DOT ? COMMA : DOT;

  const split = value.split(decimalSeparator);

  if (split.length === 1) {
    return parseFloat(replaceWithDot(value));
  }

  const re = new RegExp(`[${groupSeparator}]`, 'g');
  const group = split[0].replace(re, '');
  const decimal = split[1];

  return parseFloat(`${group}.${decimal}`);
};
