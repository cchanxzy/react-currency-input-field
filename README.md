# React Currency Input Field Component

[![npm](https://img.shields.io/npm/v/react-currency-input-field)](https://www.npmjs.com/package/react-currency-input-field) [![NPM](https://img.shields.io/npm/l/react-currency-input-field)](https://www.npmjs.com/package/react-currency-input-field) [![Codecov Coverage](https://img.shields.io/codecov/c/github/cchanxzy/react-currency-input-field)](https://codecov.io/gh/cchanxzy/react-currency-input-field/) [![Release build](https://github.com/cchanxzy/react-currency-input-field/workflows/Release/badge.svg)](https://github.com/cchanxzy/react-currency-input-field/actions?query=workflow%3ARelease)

## V3 Pre-release

There will be a couple of breaking changes in v3.0.0, so I recommend taking a look at the [v3.0.0 beta](https://www.npmjs.com/package/react-currency-input-field/v/3.0.0-beta.7) which is available now for testing.

Any early feedback will be very much welcomed.

## Features

- Allows abbreviations eg. 1k = 1,000 2.5m = 2,500,000
- Prefix option eg. £ or \$
- Can allow/disallow decimals
- Automatically inserts comma separator
- Only allows valid numbers
- Lightweight and simple

## Examples

[Play with demo](https://cchanxzy.github.io/react-currency-input-field) or view [examples code](https://github.com/cchanxzy/react-currency-input-field/blob/master/src/examples)

[![React Currency Input Demo](demo/demo.gif)](https://cchanxzy.github.io/react-currency-input-field)

## Install

`npm install react-currency-input-field`

or

`yarn add react-currency-input-field`

## Usage

```js
import CurrencyInput from 'react-currency-input-field';

<CurrencyInput
  id="input-example"
  name="input-name"
  placeholder="£1,000"
  defaultValue={1000}
  allowDecimals={true}
  decimalsLimit={2}
  onChange={(value, name) => console.log(value, name)}
/>;
```

Have a look in [`src/examples`](https://github.com/cchanxzy/react-currency-input-field/tree/master/src/examples) for more examples on implementing and validation.

## Abbreviations

It can parse values with abbreviations `k`, `m` and `b`

Examples:

- 1k = 1,000
- 2.5m = 2,500,000
- 3.456B = 3,456,000,000

## Separators

You can change the decimal and group separators by passing in `decimalSeparator` and `groupSeparator`.

Example:

```js
import CurrencyInput from 'react-currency-input-field';

<CurrencyInput
  id="input-example"
  defaultValue="123.456,89"
  decimalSeparator=","
  groupSeparator="."
/>;
```

Note: the separators cannot be a number, and `decimalSeparator` must be different to `groupSeparator`.

To turn off auto adding the group separator, add `turnOffSeparators={true}`.

## Fixed Decimal Length

Use `fixedDecimalLength` so that the value will always have the specified length of decimals. This formatting happens onBlur.

Example if `fixedDecimalLength` was 2:

```md
- 1 -> 1.00
- 123 -> 1.23
- 12.3 -> 12.30
- 12.34 -> 12.34
```

## Props

| Name                 | Type       | Default | Description                                                              |
| -------------------- | ---------- | ------- | ------------------------------------------------------------------------ |
| allowDecimals        | `boolean`  | `true`  | Allow decimals                                                           |
| allowNegativeValue   | `boolean`  | `true`  | Allow user to enter negative value                                       |
| className            | `string`   |         | Class names                                                              |
| decimalsLimit        | `number`   | `2`     | Limit length of decimals allowed                                         |
| defaultValue         | `number`   |         | Default value                                                            |
| value                | `number`   |         | Programmatically set the value                                           |
| disabled             | `boolean`  | `false` | Disabled                                                                 |
| fixedDecimalLength   | `number`   |         | Value will always have the specified length of decimals                  |
| id                   | `string`   |         | Component id                                                             |
| maxLength            | `number`   |         | Maximum characters the user can enter                                    |
| onChange             | `function` |         | Handle change in value                                                   |
| onBlurValue          | `function` |         | Handle value onBlur                                                      |
| placeholder          | `string`   |         | Placeholder if no value                                                  |
| precision            | `number`   |         | Specify decimal precision for padding/trimming                           |
| prefix               | `string`   |         | Include a prefix eg. £ or \$                                             |
| step                 | `number`   |         | Incremental value change on arrow down and arrow up key press            |
| decimalSeparator     | `string`   | `.`     | Separator between integer part and fractional part of value              |
| groupSeparator       | `string`   | `,`     | Separator between thousand, million and billion                          |
| turnOffAbbreviations | `boolean`  | `false` | Disable abbreviations eg. 1k > 1,000, 2m > 2,000,000                     |
| turnOffSeparators    | `boolean`  | `false` | Disable auto adding the group separator between values, eg. 1000 > 1,000 |

## Format values for display

Use the `formatValue` function to format the values to a more user friendly string. This is useful if you are displaying the value somewhere else ie. the total of multiple inputs.

```javascript
import { formatValue } from 'react-currency-input-field';

const formattedValue = formatValue({
  value = 123456,
  groupSeparator = ',',
  decimalSeparator = '.',
  turnOffSeparators = false,
  prefix = '$',
});
```

## Issues

Feel free to raise an issue on Github if you find a bug or have a feature request
