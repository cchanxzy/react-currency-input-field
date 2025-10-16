import CurrencyInput from './components/CurrencyInput';

export type {
  CurrencyInputProps,
  CurrencyInputOnChangeValues,
  IntlConfig,
} from './components/CurrencyInputProps';

export { CurrencyInput } from './components/CurrencyInput';
export { formatValue } from './components/utils/formatValue';
export { cleanValue } from './components/utils/cleanValue';
export { safeMultiply } from './components/utils/safeMultiply';

export default CurrencyInput;
