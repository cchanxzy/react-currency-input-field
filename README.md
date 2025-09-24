# React Currency Input Field Component

[![npm](https://img.shields.io/npm/v/react-currency-input-field)](https://www.npmjs.com/package/react-currency-input-field) [![npm](https://img.shields.io/npm/dm/react-currency-input-field)](https://www.npmjs.com/package/react-currency-input-field)
[![NPM](https://img.shields.io/npm/l/react-currency-input-field)](https://www.npmjs.com/package/react-currency-input-field) [![Codecov Coverage](https://img.shields.io/codecov/c/github/cchanxzy/react-currency-input-field)](https://codecov.io/gh/cchanxzy/react-currency-input-field/) [![Release build](https://github.com/cchanxzy/react-currency-input-field/workflows/Release/badge.svg)](https://github.com/cchanxzy/react-currency-input-field/actions?query=workflow%3ARelease)

- [React Currency Input Field Component](#react-currency-input-field-component)
  - [Features](#features)
  - [Examples](#examples)
  - [Install](#install)
  - [Usage](#usage)
  - [Props](#props)
    - [onValueChange](#onvaluechange)
      - [value](#value)
      - [name](#name)
      - [values](#values)
    - [Abbreviations](#abbreviations)
    - [Prefix and Suffix](#prefix-and-suffix)
    - [Separators](#separators)
    - [Intl Locale Config](#intl-locale-config)
    - [Decimal Scale and Decimals Limit](#decimal-scale-and-decimals-limit)
    - [Fixed Decimal Length](#fixed-decimal-length)
  - [Format values for display](#format-values-for-display)
  - [Issues](#issues)
  - [Contributing](#contributing)
  - [Support this Project](#support-this-project)
  - [v4.0.0 Announcement](#v400-announcement)

## Features

- Supports [abbreviations](#abbreviations) (e.g. `1k` → `1,000`, `2.5m` → `2,500,000`)
- Prefix and suffix support (e.g. `£`, `$`)
- Automatically inserts [group separators](#separators)
- Accepts [Intl locale config](#intl-locale-config)
- Keyboard stepping with `ArrowUp` / `ArrowDown`
- Can allow/disallow decimals
- Written in TypeScript and has type support
- Zero runtime dependencies (ie. does not depend on any third party packages except for development)
- Bundle size [7.6kB (Minified), 3.1kB (Minified + Gzipped)](https://bundlephobia.com/package/react-currency-input-field@4.0.0)

## Examples

[Play with demo](https://cchanxzy.github.io/react-currency-input-field) or view [examples code](https://github.com/cchanxzy/react-currency-input-field/blob/main/src/examples)

[![React Currency Input Demo](demo/demo.gif)](https://cchanxzy.github.io/react-currency-input-field)

## Install

```bash
npm install react-currency-input-field

yarn add react-currency-input-field

pnpm add react-currency-input-field
```

## Usage

```js
import CurrencyInput from 'react-currency-input-field';

<CurrencyInput
  id="input-example"
  name="input-name"
  placeholder="Please enter a number"
  defaultValue={1000}
  decimalsLimit={2}
  onValueChange={(value, name, values) => console.log(value, name, values)}
/>;
```

See [`src/examples`](https://github.com/cchanxzy/react-currency-input-field/tree/main/src/examples) for more patterns covering implementation details and validation helpers.

## Props

| Name                                               | Type                | Default        | Description                                                                                                  |
| -------------------------------------------------- | ------------------- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| allowDecimals                                      | `boolean`           | `true`         | Allow entering decimal values.                                                                               |
| allowNegativeValue                                 | `boolean`           | `true`         | Allow the user to enter negative numbers.                                                                    |
| className                                          | `string`            |                | Additional CSS class names for the rendered input.                                                           |
| customInput                                        | `React.ElementType` | `input`        | Render a custom component instead of the native `input`.                                                     |
| [decimalsLimit](#decimal-scale-and-decimals-limit) | `number`            | `2`            | Maximum number of fractional digits the user can type.                                                       |
| [decimalScale](#decimal-scale-and-decimals-limit)  | `number`            |                | Pads or trims decimals on blur to the specified length.                                                      |
| [decimalSeparator](#separators)                    | `string`            | locale default | Character used to separate the integer and fractional parts. Cannot be numeric or match the group separator. |
| defaultValue                                       | `number \| string`  |                | Initial value when the component is uncontrolled.                                                            |
| value                                              | `number \| string`  |                | Controlled value supplied by the parent component.                                                           |
| disabled                                           | `boolean`           | `false`        | Disable user interaction.                                                                                    |
| disableAbbreviations                               | `boolean`           | `false`        | Disable shorthand parsing (`1k`, `2m`, `3b`, etc.).                                                          |
| [disableGroupSeparators](#separators)              | `boolean`           | `false`        | Prevent automatic insertion of group separators (e.g. keep `1000` instead of `1,000`).                       |
| [fixedDecimalLength](#fixed-decimal-length)        | `number`            |                | Forces the value to always display with the specified number of decimals on blur.                            |
| formatValueOnBlur                                  | `boolean`           | `true`         | When set to `false`, the `onValueChange` will not be called on `blur` events.                                |
| [groupSeparator](#separators)                      | `string`            | locale default | Character used to group thousands. Cannot be numeric.                                                        |
| id                                                 | `string`            |                | Forwarded to the rendered input element.                                                                     |
| [intlConfig](#intl-locale-config)                  | `IntlConfig`        |                | Locale configuration for `Intl.NumberFormat` (locale, currency, style).                                      |
| maxLength                                          | `number`            |                | Maximum number of characters (excluding the negative sign) the user can enter.                               |
| [onValueChange](#onvaluechange)                    | `function`          |                | Handler fired whenever the parsed value changes.                                                             |
| placeholder                                        | `string`            |                | Displayed when there is no value.                                                                            |
| [prefix](#prefix-and-suffix)                       | `string`            |                | String added before the value (e.g. `£`, `$`). Overrides locale-derived prefixes.                            |
| [suffix](#prefix-and-suffix)                       | `string`            |                | String added after the value (e.g. `%`, `€`). Overrides locale-derived suffixes.                             |
| step                                               | `number`            |                | Increment applied when pressing `ArrowUp` / `ArrowDown`.                                                     |
| transformRawValue                                  | `function`          |                | Intercept and adjust the raw input string before parsing. Must return a string.                              |

### onValueChange

Handle changes to the value.

```js
onValueChange = (value, name, values) => void;
```

#### value

`value` will give you the value in a string format, without the prefix/suffix/separators.

Useful for displaying the value, but you can use `values.float` if you need the numerical value for calculations.

Example: `£123,456 -> 123456`

#### name

`name` is the name you have passed to your component

#### values

`values` gives an object with three key values:

- `float`: Value as float or null if empty. Example: "1.99" > 1.99
- `formatted`: Value after applying formatting. Example: "1000000" > "1,000,0000"
- `value`: Non formatted value as string, ie. same as first param.

### Abbreviations

It can parse values with abbreviations `k`, `m` and `b`

Examples:

- 1k = 1,000
- 2.5m = 2,500,000
- 3.456B = 3,456,000,000

This can be turned off by passing in `disableAbbreviations={true}`.

### Prefix and Suffix

You can add a prefix or suffix by passing in `prefix` or `suffix`.

```js
import CurrencyInput from 'react-currency-input-field';

<CurrencyInput prefix="£" value={123} />;
// £123

<CurrencyInput suffix="%" value={456} />;
// 456%
```

Note: Passing in prefix/suffix will override the intl locale config.

### Separators

You can change the decimal and group separators by passing in `decimalSeparator` and `groupSeparator`.

Example:

```js
import CurrencyInput from 'react-currency-input-field';

<CurrencyInput decimalSeparator="," groupSeparator="." />;
```

Note: the separators cannot be a number, and `decimalSeparator` must be different to `groupSeparator`.

To turn off auto adding the group separator, add `disableGroupSeparators={true}`.

### Intl Locale Config

This component can also accept international locale config to format the currency to locale setting.

Examples:

```javascript
import CurrencyInput from 'react-currency-input-field';

// US Dollar
<CurrencyInput intlConfig={{ locale: 'en-US', currency: 'USD' }} />

// British Pound
<CurrencyInput intlConfig={{ locale: 'en-GB', currency: 'GBP' }} />

// Canadian Dollar
<CurrencyInput intlConfig={{ locale: 'en-CA', currency: 'CAD' }} />

// Australian Dollar
<CurrencyInput intlConfig={{ locale: 'en-AU', currency: 'AUD' }} />

// Japanese Yen
<CurrencyInput intlConfig={{ locale: 'ja-JP', currency: 'JPY' }} />

// Chinese Yuan
<CurrencyInput intlConfig={{ locale: 'zh-CN', currency: 'CNY' }} />

// Euro (Germany)
<CurrencyInput intlConfig={{ locale: 'de-DE', currency: 'EUR' }} />

// Euro (France)
<CurrencyInput intlConfig={{ locale: 'fr-FR', currency: 'EUR' }} />

// Indian Rupee
<CurrencyInput intlConfig={{ locale: 'hi-IN', currency: 'INR' }} />

// Brazilian Real
<CurrencyInput intlConfig={{ locale: 'pt-BR', currency: 'BRL' }} />

```

`locale` should be a [BCP 47 language tag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_identification_and_negotiation), such as "en-US" or "en-IN".

`currency` should be a [ISO 4217 currency code](https://en.wikipedia.org/wiki/ISO_4217), such as "USD" for the US dollar, "EUR" for the euro, or "CNY" for the Chinese RMB.

Any prefix, suffix, group separator and decimal separator options passed in will override the default locale settings.

### Decimal Scale and Decimals Limit

`decimalsLimit` and `decimalScale` sound similar but have different usages.

`decimalsLimit` prevents the user from typing more than the limit, and `decimalScale` will format the decimals `onBlur` to the specified length, padding or trimming as necessary.

Example:

```md
If decimalScale is 2

- 1.5 becomes 1.50 (padded)
- 1.234 becomes 1.23 (trimmed)

---

If decimalLimit is 2

- User enters 1.23
- User is then prevented from entering another value
```

### Fixed Decimal Length

Use `fixedDecimalLength` so that the value will always have the specified length of decimals.

This formatting happens onBlur.

Example if `fixedDecimalLength` was 2:

```md
- 1 -> 1.00
- 123 -> 1.23
- 12.3 -> 12.30
- 12.34 -> 12.34
```

## Format values for display

Use the `formatValue` function to format the values to a more user friendly string. This is useful if you are displaying the value somewhere else ie. the total of multiple inputs.

```javascript
import { formatValue } from 'react-currency-input-field';

// Format using prefix, groupSeparator and decimalSeparator
const formattedValue1 = formatValue({
  value: '123456',
  groupSeparator: ',',
  decimalSeparator: '.',
  prefix: '$',
});

console.log(formattedValue1);
// $123,456

// Format using intl locale config
const formattedValue2 = formatValue({
  value: '500000',
  intlConfig: { locale: 'hi-IN', currency: 'INR' },
});

console.log(formattedValue2);
// ₹5,00,000
```

## Issues

Feel free to raise an issue on Github if you find a bug or have a feature request.

## Contributing

If you would like to contribute to this repository, please refer to the [contributing doc](https://github.com/cchanxzy/react-currency-input-field/blob/main/docs/CONTRIBUTING.md).

## Support this Project

If you'd like to support this project, please refer to the [support doc](https://github.com/cchanxzy/react-currency-input-field/blob/main/docs/SUPPORT.md).

## v4.0.0 Announcement

I'm excited to announce the release of **[v4.0.0](https://www.npmjs.com/package/react-currency-input-field/v/4.0.0)**.

This marks the beginning of development for version 4.0.0, and the first improvement is a significant reduction in bundle size, going from ~26KB to [~7.6kB (Minified), 3.1kB (Minified + Gzipped)](https://bundlephobia.com/package/react-currency-input-field@4.0.0)

For more information, please refer to the [announcement post](https://github.com/cchanxzy/react-currency-input-field/blob/main/docs/v4.0.0-alpha-annoucement.md).
