/**
 * Add group separator to value eg. 1000 > 1,000
 */
export const addSeparators = ({
  value,
  separator = ',',
  isIndianNumberSystem = false,
}: {
  value: string;
  separator?: string;
  isIndianNumberSystem?: boolean;
}): string => {
  const hundredthSplitter = value.length - 3 > 0 ? value.length - 3 : 0;
  const fromHundredth = value.slice(hundredthSplitter, value.length);
  const tillHundredth = value.slice(0, hundredthSplitter);
  const regexSeparator = isIndianNumberSystem ? /\B(?=(\d{2})+(?!\d))/g : /\B(?=(\d{3})+(?!\d))/g;
  const separatedTillHundredth = tillHundredth.replace(regexSeparator, separator);
  return tillHundredth
    ? `${separatedTillHundredth}${separator}${fromHundredth}`
    : `${fromHundredth}`;
};
