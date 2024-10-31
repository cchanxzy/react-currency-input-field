import { IntlConfig } from '../CurrencyInputProps';

type LocaleConfig = {
  currencySymbol: string;
  groupSeparator: string;
  decimalSeparator: string;
  prefix: string;
  suffix: string;
};

const defaultConfig: LocaleConfig = {
  currencySymbol: '',
  groupSeparator: '',
  decimalSeparator: '',
  prefix: '',
  suffix: '',
};

/**
 * Get locale config from input or default
 */
export const getLocaleConfig = (intlConfig?: IntlConfig): LocaleConfig => {
  const { locale, currency } = intlConfig || {};
  const numberFormatter = locale
    ? new Intl.NumberFormat(locale, currency ? { currency, style: 'currency' } : undefined)
    : new Intl.NumberFormat();

  return numberFormatter.formatToParts(1000.1).reduce((prev, curr, i): LocaleConfig => {
    if (curr.type === 'currency') {
      if (i === 0) {
        return { ...prev, currencySymbol: curr.value, prefix: curr.value };
      } else {
        return { ...prev, currencySymbol: curr.value, suffix: curr.value };
      }
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

export const getDigitValue = (digit: string): number | null => {
  const codePoint = digit.codePointAt(0);
  if (codePoint === undefined) return null;

  // Hate manually defining these digit ranges
  // but this requires no dependencies
  const digitRanges = [
    { start: 0x0030, end: 0x0039 }, // ASCII digits
    { start: 0x0660, end: 0x0669 }, // Arabic-Indic digits
    { start: 0x06f0, end: 0x06f9 }, // Extended Arabic-Indic digits
    { start: 0x07c0, end: 0x07c9 }, // N'Ko digits
    { start: 0x0966, end: 0x096f }, // Devanagari digits
    { start: 0x09e6, end: 0x09ef }, // Bengali digits
    { start: 0x0a66, end: 0x0a6f }, // Gurmukhi digits
    { start: 0x0ae6, end: 0x0aef }, // Gujarati digits
    { start: 0x0b66, end: 0x0b6f }, // Oriya digits
    { start: 0x0be6, end: 0x0bef }, // Tamil digits
    { start: 0x0c66, end: 0x0c6f }, // Telugu digits
    { start: 0x0ce6, end: 0x0cef }, // Kannada digits
    { start: 0x0d66, end: 0x0d6f }, // Malayalam digits
    { start: 0x0de6, end: 0x0def }, // Sinhala Lith digits
    { start: 0x0e50, end: 0x0e59 }, // Thai digits
    { start: 0x0ed0, end: 0x0ed9 }, // Lao digits
    { start: 0x0f20, end: 0x0f29 }, // Tibetan digits
    { start: 0x1040, end: 0x1049 }, // Myanmar digits
    { start: 0x10550, end: 0x10559 }, // Caucasian Albanian digits
    { start: 0x1090, end: 0x1099 }, // Myanmar Shan digits
    { start: 0x11066, end: 0x1106f }, // Brahmi digits
    { start: 0x110f0, end: 0x110f9 }, // Sora Sompeng digits
    { start: 0x11136, end: 0x1113f }, // Chakma digits
    { start: 0x111d0, end: 0x111d9 }, // Sharada digits
    { start: 0x11450, end: 0x11459 }, // Newa digits
    { start: 0x116c0, end: 0x116c9 }, // Takri digits
    { start: 0x11730, end: 0x11739 }, // Ahom digits
    { start: 0x118e0, end: 0x118e9 }, // Warang Citi digits
    { start: 0x11c50, end: 0x11c59 }, // Bhaiksuki digits
    { start: 0x11c50, end: 0x11c59 }, // Marchen digits
    { start: 0x11d50, end: 0x11d59 }, // Masaram Gondi digits
    { start: 0x11da0, end: 0x11da9 }, // Gunjala Gondi digits
    { start: 0x11ee0, end: 0x11ee9 }, // Makasar digits
    { start: 0x11f50, end: 0x11f59 }, // Kawi digits
    { start: 0x16a60, end: 0x16a69 }, // Mro digits
    { start: 0x16b50, end: 0x16b59 }, // Pahawh Hmong digits
    { start: 0x17e0, end: 0x17e9 }, // Khmer digits
    { start: 0x1810, end: 0x1819 }, // Mongolian digits
    { start: 0x1946, end: 0x194f }, // Limbu digits
    { start: 0x19d0, end: 0x19d9 }, // New Tai Lue digits
    { start: 0x1a80, end: 0x1a89 }, // Tai Tham Hora digits
    { start: 0x1a90, end: 0x1a99 }, // Tai Tham Tham digits
    { start: 0x1b50, end: 0x1b59 }, // Balinese digits
    { start: 0x1bb0, end: 0x1bb9 }, // Sundanese digits
    { start: 0x1c40, end: 0x1c49 }, // Lepcha digits
    { start: 0x1c50, end: 0x1c59 }, // Ol Chiki digits
    { start: 0x1e140, end: 0x1e149 }, // Nandinagari digits
    { start: 0x1e2f0, end: 0x1e2f9 }, // Wancho digits
    { start: 0x1e950, end: 0x1e959 }, // Adlam digits
    { start: 0x1fbf0, end: 0x1fbf9 }, // Symbols for Legacy Computing digits
    { start: 0xa4f0, end: 0xa4f9 }, // Lisu digits
    { start: 0xa620, end: 0xa629 }, // Vai digits
    { start: 0xa8d0, end: 0xa8d9 }, // Saurashtra digits
    { start: 0xa900, end: 0xa909 }, // Kayah Li digits
    { start: 0xa9d0, end: 0xa9d9 }, // Javanese digits
    { start: 0xa9f0, end: 0xa9f9 }, // Myanmar Tai Laing digits
    { start: 0xaa50, end: 0xaa59 }, // Cham digits
    { start: 0xabf0, end: 0xabf9 }, // Meetei Mayek digits
    { start: 0xff10, end: 0xff19 }, // Fullwidth digits
  ];

  for (const range of digitRanges) {
    if (codePoint >= range.start && codePoint <= range.end) {
      return codePoint - range.start;
    }
  }

  return null;
};

export const normalizeNumerals = (value: string): string => {
  return value.replace(/\p{N}/gu, (digit) => {
    const digitValue = getDigitValue(digit);
    return digitValue !== null ? digitValue.toString() : digit;
  });
};
