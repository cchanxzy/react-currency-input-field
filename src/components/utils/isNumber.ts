export const isNumber = (input: string): boolean => RegExp(/^\p{N}+$/u).test(input);
