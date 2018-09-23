export const addCommas = (value:number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const removeCommas = (value:string) => value.replace(/,/g, '');

export const checkIsValidNumber = (input: number, limit: number) => {
  if (input === 0) {
    return true;
  }

  if (input < 0 || Number.isNaN(input)) {
    return false;
  }

  return (input <= limit);
};
