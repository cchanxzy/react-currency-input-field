export const addCommas = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeCommas = (value: string): string => value.replace(/,/g, '');

export const checkIsValidNumber = (input: number) => {
  if (input < 0 || isNaN(input)) {
    return false;
  }

  return true;
};
