import { IntlConfig } from '../CurrencyInputProps';

type LocaleConfig = {
  currencySymbol: string;
  groupSeparator: string;
  decimalSeparator: string;
};

const defaultConfig: LocaleConfig = {
  currencySymbol: '',
  groupSeparator: '',
  decimalSeparator: '',
};

/**
 * Get locale config from input or default
 */
export const getLocaleConfig = (intlConfig?: IntlConfig): LocaleConfig => {
  const { locale, currency } = intlConfig || {};
  const numberFormatter =
    locale && currency
      ? new Intl.NumberFormat(locale, { currency, style: 'currency' })
      : new Intl.NumberFormat();

  return numberFormatter.formatToParts(1000.1).reduce((prev, curr): LocaleConfig => {
    if (curr.type === 'currency') {
      return { ...prev, currencySymbol: curr.value };
    }
    if (curr.type === 'group') {
      return { ...prev, groupSeparator: curr.value };
    }
    if (curr.type === 'decimal') {
      return { ...prev, decimalSeparator: curr.value };
    }

    return prev;
  }, defaultConfig);
};
