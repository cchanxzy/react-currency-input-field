# Currency behavior

How the input should handle currencies across locales. Each rule links to the standard it comes from. When a rule and the code disagree, the rule wins and the code is a bug.

[CLDR](https://cldr.unicode.org/) (the Unicode Common Locale Data Repository) is the locale data that browsers and Node use for `Intl`. This doc was checked against CLDR 48 (Node 24, ICU 78.3) and the ISO 4217 list published 2026-09-17.

## Scope

This is a currency input, not a general number input. It supports:

- **Currency formatting** as `Intl.NumberFormat` produces it with `style: 'currency'`.
- **Prop overrides:** `prefix`, `suffix`, `groupSeparator` and `decimalSeparator` as literal overrides.
- **Latin digits** (0–9).
- **One locale per mounted input.** To switch locale, remount it with `key={locale}`.

Out of scope:

- percent, unit and compact styles
- native-digit display
- pasting a value formatted for a different locale
- accepting both `.` and `,` as the decimal separator

Support is best effort. The aim is to handle every shape in [Currency shapes](#currency-shapes), which covers the currencies most people use. It doesn't cover every edge case Intl or CLDR can produce. When a case isn't covered here, keep the simpler behavior rather than adding special handling.

## Rules

| Rule                                                                                                                                                                                                                                                                                                                                   | Source                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Formatting comes from `Intl.NumberFormat`,** which uses CLDR data for symbols, separators, patterns and grouping.                                                                                                                                                                                                                    | [ECMA-402 NumberFormat](https://tc39.es/ecma402/#numberformat-objects), [UTS #35 Numbers](https://www.unicode.org/reports/tr35/tr35-78/tr35-numbers.html)                                                                                                                                                                                                                                                                         |
| **Decimal places default to the currency's CLDR `digits`:** 0 for JPY and KRW, 2 for USD, 3 for KWD. This is what browsers use. For 16 currencies it differs from ISO 4217, which CLDR allows for customary practice: for example HUF and IDR (ISO 2, CLDR 0) and IQD (ISO 3, CLDR 0). `decimalsLimit` and `decimalScale` override it. | [CLDR currency data](https://github.com/unicode-org/cldr/blob/release-48-2/common/supplemental/supplementalData.xml) ([semantics](https://www.unicode.org/reports/tr35/tr35-78/tr35-numbers.html#Supplemental_Currency_Data)), [ECMA-402 CurrencyDigits](https://tc39.es/ecma402/#sec-currencydigits), [ISO 4217 list](https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml) |
| **Some locales don't group 4-digit numbers.** es-ES shows `1234 €` but `12.345 €` (the space before `€` is U+00A0).                                                                                                                                                                                                                    | [UTS #35 minimumGroupingDigits](https://www.unicode.org/reports/tr35/tr35-78/tr35-numbers.html#Examples_of_minimumGroupingDigits)                                                                                                                                                                                                                                                                                                 |
| **Any minus character in CLDR's lenient set reads as a minus sign,** including `−` (U+2212), which fi-FI, sv-SE and others use.                                                                                                                                                                                                        | [CLDR `parseLenients`](https://github.com/unicode-org/cldr/blob/release-48-2/common/main/root.xml#L76-L80)                                                                                                                                                                                                                                                                                                                        |
| **The currency symbol is text.** It's matched and removed before parsing, never read as a digit, separator or abbreviation, so `kr` is not `k`.                                                                                                                                                                                        | [UTS #35 Parsing Numbers](https://www.unicode.org/reports/tr35/tr35-78/tr35-numbers.html#Parsing_Numbers)                                                                                                                                                                                                                                                                                                                         |
| **The input uses Latin digits,** by formatting with numbering system `latn`.                                                                                                                                                                                                                                                           | [UTS #35 `nu`](https://www.unicode.org/reports/tr35/tr35-78/tr35.html#UnicodeNumberSystemIdentifier)                                                                                                                                                                                                                                                                                                                              |
| **Bidi marks** (LRM, RLM, ALM) in right-to-left formats are ignored when reading input.                                                                                                                                                                                                                                                | [UAX #9](https://www.unicode.org/reports/tr9/tr9-51.html#Implicit_Directional_Marks)                                                                                                                                                                                                                                                                                                                                              |
| **Long values stay exact:** values are passed to Intl as decimal strings, not Numbers.                                                                                                                                                                                                                                                 | [ECMA-402 ToIntlMathematicalValue](https://tc39.es/ecma402/#sec-tointlmathematicalvalue)                                                                                                                                                                                                                                                                                                                                          |
| **The element is `type="text"` with `inputmode="decimal"`.** Mobile keyboards don't guarantee a minus key.                                                                                                                                                                                                                             | [HTML `inputmode`](https://html.spec.whatwg.org/multipage/interaction.html#attr-inputmode), [GOV.UK text input](https://design-system.service.gov.uk/components/text-input/#asking-for-decimal-numbers)                                                                                                                                                                                                                           |

## Implementation notes

The facts code needs, so it doesn't depend on following the links above:

- **Decimal places:** read them from Intl at runtime with `new Intl.NumberFormat(locale, { style: 'currency', currency }).resolvedOptions().maximumFractionDigits`. Don't hardcode a list: CLDR updates change it (PKR goes from 0 to 2 in CLDR 49, currently in beta).
- **Detecting separators:** use `formatToParts` on a number with at least 8 integer digits and a forced fraction digit (for example `10000000.1` with `minimumFractionDigits: 1, maximumFractionDigits: 1`). Fewer digits miss the group separator where grouping starts at 5 digits (es-ES), and Indian grouping needs at least 6 to show its second group (`1,00,00,000`). Without the forced digit, zero-decimal currencies have no decimal separator.
- **Currency symbols:** get the symbol from `formatToParts` (the `currency` part), never by regex on the formatted string. Symbols can contain:

  - dots: `kr.`, `ج.م.`
  - spaces: `F CFA`
  - the letters k, m and b: `kr`, `Kč`, `KES`

  Strip the symbol by exact match before reading anything else.

- **Minus signs to accept:**

  - U+002D `-` and U+2212 `−`
  - U+2010, U+2011, U+2012, U+2013
  - U+FE63, U+FF0D, U+207B, U+208B, U+2796

  The minus can come before the symbol (`-$1`), between the symbol and the number (`€ -1`, `CHF-1`), or after bidi marks.

- **Characters to ignore when reading input:** the bidi marks U+200E, U+200F and U+061C.
- **Decimal separators Intl uses:** U+002C `,` and U+002E `.` only, once the numbering system is `latn`.
- **Group separators Intl uses:**

  - U+002C `,` and U+002E `.`
  - U+00A0 (no-break space) and U+202F (narrow no-break space)
  - U+0027 `'`

  Intl never outputs a plain space (U+0020), but users type one.

- **Test expectations depend on CLDR:** expected strings change between Node, ICU and browser versions. Compute expectations with `Intl.NumberFormat` where you can, and record the version when you can't.

## Not covered by standards

These are conventions, and the choices are this library's own:

- **Formatting while typing, caret position and paste.** No standard defines them. GOV.UK advises accepting any unambiguous format and ignoring stray characters ([validation pattern](https://design-system.service.gov.uk/patterns/validation/)).
- **Extra decimals** are cut off at the limit, not rounded.
- **Cash rounding** (for example CHF to 0.05) isn't applied. `Intl.NumberFormat` has no cash option, and we don't emulate one with `roundingIncrement`.

## Currency shapes

For an input field, locale × currency pairs fall into these shapes (from a sweep of 23,652 pairs on Node 24). Tests should cover each shape with at least one locale.

| Shape                                                   | Examples                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| Symbol before, `.` decimal, `,` group                   | en-US/USD, en-GB/GBP                                         |
| Symbol before, `,` decimal, `.` group                   | de-AT/EUR, pt-BR/BRL, nl-NL/EUR (minus after the symbol)     |
| Symbol after, `,` decimal, `.` group                    | de-DE/EUR, hr-HR/EUR (U+2212 minus)                          |
| Symbol after, `,` decimal, space group (NBSP or U+202F) | ru-RU/RUB, fr-FR/EUR, fi-FI/EUR and sv-SE/SEK (U+2212 minus) |
| Grouping only from 5 digits                             | es-ES/EUR, pl-PL/PLN, pt-PT/EUR, hu-HU/HUF                   |
| Apostrophe group                                        | de-CH/CHF, fr-CH/CHF                                         |
| Indian grouping (`12,34,567`)                           | en-IN/INR, hi-IN/INR                                         |
| Right-to-left, with bidi marks                          | he-IL/ILS, ar-AE/AED                                         |
| Native digits by default                                | ar-EG/EGP, fa-IR/IRR, bn-BD/BDT, mr-IN/INR                   |
| Zero-decimal currency (in any locale)                   | ja-JP/JPY, ko-KR/KRW, fr-FR/XOF                              |
| Three-decimal currency (in any locale)                  | en-US/KWD, en-GB/BHD                                         |
