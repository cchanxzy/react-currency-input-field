export const checkIsValidNumber = (input: string): boolean => {
  if (Number(input) < 0 || Number.isNaN(Number(input))) {
    return false;
  }

  return true;
};
