## React Currency Input Field Component

[![npm](https://img.shields.io/npm/v/react-currency-input-field)](https://www.npmjs.com/package/react-currency-input-field) [![NPM](https://img.shields.io/npm/l/react-currency-input-field)](https://www.npmjs.com/package/react-currency-input-field) [![Codecov Coverage](https://img.shields.io/codecov/c/github/cchanxzy/react-currency-input-field)](https://codecov.io/gh/cchanxzy/react-currency-input-field/) [![Release build](https://github.com/cchanxzy/react-currency-input-field/workflows/Release/badge.svg)](https://github.com/cchanxzy/react-currency-input-field/actions?query=workflow%3ARelease)

Features:

- Only allows numbers
- Can handle decimals
- Can add prefix eg. £ or \$
- Automatically inserts commas
- Lightweight and simple
- Works well with Bootstrap styling

[Demo](https://cchanxzy.github.io/react-currency-input-field)

![React Currency Input Demo](demo/demo.gif)

### Install

`npm install react-currency-input-field`

or

`yarn add react-currency-input-field`

### Usage

```
import CurrencyInput from 'react-currency-input-field'

<CurrencyInput
  id="input-example"
  name="input-name"
  placeholder="£1,000"
  defaultValue={1000}
  allowDecimals={true}
  decimalsLimit={2}
  onChange={(value, name) => {process(value, name)}}
/>
```

Have a look in [`src/examples`](https://github.com/cchanxzy/react-currency-input-field/tree/master/src/examples) for more examples on implementing.

### Issues

Feel free to message me if you have any questions
