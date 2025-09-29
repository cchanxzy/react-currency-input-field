## [4.0.3](https://github.com/cchanxzy/react-currency-input-field/compare/v4.0.2...v4.0.3) (2025-09-29)


### Bug Fixes

* **esm:** bundle ESM/CJS builds to avoid Node ESM resolution issues in SSR ([81d6b94](https://github.com/cchanxzy/react-currency-input-field/commit/81d6b943c90166ead82217db61bc66ce75844317))

## [4.0.2](https://github.com/cchanxzy/react-currency-input-field/compare/v4.0.1...v4.0.2) (2025-09-24)

## [4.0.1](https://github.com/cchanxzy/react-currency-input-field/compare/v4.0.0...v4.0.1) (2025-09-17)

# [4.0.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.10.0...v4.0.0) (2025-09-17)


* build!: switch from rollup to esbuild to build ([75ef80c](https://github.com/cchanxzy/react-currency-input-field/commit/75ef80ce48787bd1ea139820421e59cb35a69247))


### Bug Fixes

* correct entry for cjs and esm ([cc48412](https://github.com/cchanxzy/react-currency-input-field/commit/cc48412adaf7468cf8864826f93931ba0f07e689))


### Features

* merge changes in main into alpha branch ([6985156](https://github.com/cchanxzy/react-currency-input-field/commit/6985156a88577e8a891cdcd7bb9b8e4270d448b5))


### BREAKING CHANGES

* UMD is no longer exported.

In order to reduce complexity and simplify the build process,
we have switched from rollup to esbuild and only export CJS and ESM versions.

This means that the UMD build is no longer exported.

# [4.0.0-alpha.3](https://github.com/cchanxzy/react-currency-input-field/compare/v4.0.0-alpha.2...v4.0.0-alpha.3) (2025-02-22)


### Bug Fixes

* add react 19 as peer dependency ([396d57b](https://github.com/cchanxzy/react-currency-input-field/commit/396d57b638c6419c4997e267f176a7d0b5c6bd92)), closes [#380](https://github.com/cchanxzy/react-currency-input-field/issues/380)
* handle cases where decimalSeparator is empty ([#385](https://github.com/cchanxzy/react-currency-input-field/issues/385)) ([656e5c2](https://github.com/cchanxzy/react-currency-input-field/commit/656e5c2e1407a36ecf26d5fc3c7e8f0037436ef6))


### Features

* intlConfig support all NumberFormatOptions ([#386](https://github.com/cchanxzy/react-currency-input-field/issues/386)) ([0b84349](https://github.com/cchanxzy/react-currency-input-field/commit/0b8434938769109a9073eec840d08a48e03e000c))
* merge changes in main into alpha branch ([6985156](https://github.com/cchanxzy/react-currency-input-field/commit/6985156a88577e8a891cdcd7bb9b8e4270d448b5))

# [3.10.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.9.2...v3.10.0) (2025-02-22)


### Features

* intlConfig support all NumberFormatOptions ([#386](https://github.com/cchanxzy/react-currency-input-field/issues/386)) ([0b84349](https://github.com/cchanxzy/react-currency-input-field/commit/0b8434938769109a9073eec840d08a48e03e000c))

## [3.9.2](https://github.com/cchanxzy/react-currency-input-field/compare/v3.9.1...v3.9.2) (2025-02-22)


### Bug Fixes

* handle cases where decimalSeparator is empty ([#385](https://github.com/cchanxzy/react-currency-input-field/issues/385)) ([656e5c2](https://github.com/cchanxzy/react-currency-input-field/commit/656e5c2e1407a36ecf26d5fc3c7e8f0037436ef6))

## [3.9.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.9.0...v3.9.1) (2025-02-22)


### Bug Fixes

* add react 19 as peer dependency ([396d57b](https://github.com/cchanxzy/react-currency-input-field/commit/396d57b638c6419c4997e267f176a7d0b5c6bd92)), closes [#380](https://github.com/cchanxzy/react-currency-input-field/issues/380)


# [4.0.0-alpha.2](https://github.com/cchanxzy/react-currency-input-field/compare/v4.0.0-alpha.1...v4.0.0-alpha.2) (2024-11-12)


### Bug Fixes

* correct entry for cjs and esm ([cc48412](https://github.com/cchanxzy/react-currency-input-field/commit/cc48412adaf7468cf8864826f93931ba0f07e689))


### Features

* export `IntlConfig` props ([#374](https://github.com/cchanxzy/react-currency-input-field/issues/374)) ([308d961](https://github.com/cchanxzy/react-currency-input-field/commit/308d96118db667a5cd4d9a312bccf9061a49063c))

# [4.0.0-alpha.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.8.0...v4.0.0-alpha.1) (2024-11-09)


* build!: switch from rollup to esbuild to build ([75ef80c](https://github.com/cchanxzy/react-currency-input-field/commit/75ef80ce48787bd1ea139820421e59cb35a69247))


### BREAKING CHANGES

* UMD is no longer exported.

In order to reduce complexity and simplify the build process,
we have switched from rollup to esbuild and only export CJS and ESM versions.

This means that the UMD build is no longer exported.

# [3.9.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.8.1...v3.9.0) (2024-11-12)


### Features

* export `IntlConfig` props ([#374](https://github.com/cchanxzy/react-currency-input-field/issues/374)) ([308d961](https://github.com/cchanxzy/react-currency-input-field/commit/308d96118db667a5cd4d9a312bccf9061a49063c))

## [3.8.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.8.0...v3.8.1) (2024-11-10)

# [3.8.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.7.1...v3.8.0) (2024-02-22)


### Features

* introduce formatValueOnBlur flag ([#339](https://github.com/cchanxzy/react-currency-input-field/issues/339)) ([5e30154](https://github.com/cchanxzy/react-currency-input-field/commit/5e301544ac9a171bc65f09537f82a313ece0e77c))

## [3.7.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.7.0...v3.7.1) (2024-02-19)


### Bug Fixes

* update doc to trigger release ([4672670](https://github.com/cchanxzy/react-currency-input-field/commit/46726709d410f9c1bcb4e64fdb997a13ba52e122))

# [3.7.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.14...v3.7.0) (2024-02-11)


### Features

* export utility function 'cleanValue' ([#334](https://github.com/cchanxzy/react-currency-input-field/issues/334)) ([026329f](https://github.com/cchanxzy/react-currency-input-field/commit/026329f30aa23cebbb90ddeadce62be94324567c))

## [3.6.14](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.13...v3.6.14) (2023-12-29)


### Bug Fixes

* export type CurrencyInputOnChangeValues and update examples ([#331](https://github.com/cchanxzy/react-currency-input-field/issues/331)) ([8ea2c47](https://github.com/cchanxzy/react-currency-input-field/commit/8ea2c47a786390e64cc2fa4253710be568721431))

## [3.6.13](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.12...v3.6.13) (2023-12-28)


### Bug Fixes

* Update input to empty string when `userValue` is `undefined` ([#323](https://github.com/cchanxzy/react-currency-input-field/issues/323)) ([30c5fcc](https://github.com/cchanxzy/react-currency-input-field/commit/30c5fccb18e9d341f08e3bb1c05b7e1f808e229a))

## [3.6.12](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.11...v3.6.12) (2023-11-07)


### Bug Fixes

* fixedDecimalValue issue [#292](https://github.com/cchanxzy/react-currency-input-field/issues/292) and handle fixedDecimalValue 0 ([#313](https://github.com/cchanxzy/react-currency-input-field/issues/313)) ([5be14cb](https://github.com/cchanxzy/react-currency-input-field/commit/5be14cb54128ebe314271001832d5756d3a60d60))

## [3.6.11](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.10...v3.6.11) (2023-06-23)


### Bug Fixes

* decimal separator issues ([#294](https://github.com/cchanxzy/react-currency-input-field/issues/294)) ([95d9e0a](https://github.com/cchanxzy/react-currency-input-field/commit/95d9e0a3a43309b38107c3a590d6dcaed3eb3d97))

## [3.6.10](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.9...v3.6.10) (2023-02-03)


### Bug Fixes

* closes Cursor jumping issue if the ref passed isn't a ref object [#247](https://github.com/cchanxzy/react-currency-input-field/issues/247) ([#276](https://github.com/cchanxzy/react-currency-input-field/issues/276)) ([ef4e9e4](https://github.com/cchanxzy/react-currency-input-field/commit/ef4e9e442ba6dd693163fe978308e2c4d65c2731))

## [3.6.9](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.8...v3.6.9) (2022-10-25)

## [3.6.8](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.7...v3.6.8) (2022-10-20)


### Bug Fixes

* parse float for currencies w/o decimal sep ([#259](https://github.com/cchanxzy/react-currency-input-field/issues/259)) ([a75d8cc](https://github.com/cchanxzy/react-currency-input-field/commit/a75d8cc84779696855889ba524be542a93a2c212))

## [3.6.7](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.6...v3.6.7) (2022-10-18)


### Bug Fixes

* safari cursor stuck if onBlur & decimalScale set ([#261](https://github.com/cchanxzy/react-currency-input-field/issues/261)) ([d724157](https://github.com/cchanxzy/react-currency-input-field/commit/d7241578b882736e9d22de9dd79dfc653e2f1023))

## [3.6.6](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.5...v3.6.6) (2022-10-18)


### Bug Fixes

* no decimals if defined decimalScale, input value as  X.00 and intlConfig, but without no currency ([#262](https://github.com/cchanxzy/react-currency-input-field/issues/262)) ([36ad0ed](https://github.com/cchanxzy/react-currency-input-field/commit/36ad0edea389d88fe11146e00fdfd999e4c0b19c))

## [3.6.5](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.4...v3.6.5) (2022-09-20)


### Bug Fixes

* Allow React 18 as peer dependency ([#241](https://github.com/cchanxzy/react-currency-input-field/issues/241)) ([fd5d2bf](https://github.com/cchanxzy/react-currency-input-field/commit/fd5d2bf4f77da68574859b151135adfdacfcb3a9)), closes [#230](https://github.com/cchanxzy/react-currency-input-field/issues/230)

## [3.6.4](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.3...v3.6.4) (2022-01-14)


### Bug Fixes

* include ref in component props ([#219](https://github.com/cchanxzy/react-currency-input-field/issues/219)) ([525ea32](https://github.com/cchanxzy/react-currency-input-field/commit/525ea32d9a6b62bc9391ad9fde9c1930e28ad498))

## [3.6.3](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.2...v3.6.3) (2022-01-09)


### Bug Fixes

* inconsistent cursor behaviour ([#212](https://github.com/cchanxzy/react-currency-input-field/issues/212)) ([7b740ca](https://github.com/cchanxzy/react-currency-input-field/commit/7b740ca908c444437a6ba6e9d291f446a44a29ab))

## [3.6.2](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.1...v3.6.2) (2022-01-09)


### Bug Fixes

* dont block controlled prop if decimal separator not present ([#215](https://github.com/cchanxzy/react-currency-input-field/issues/215)) ([02b875c](https://github.com/cchanxzy/react-currency-input-field/commit/02b875cfe5c6a08d6db74ea3e3508d7d3bd33d40))

## [3.6.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.6.0...v3.6.1) (2022-01-09)


### Bug Fixes

* invalid source maps ([#216](https://github.com/cchanxzy/react-currency-input-field/issues/216)) ([17f1398](https://github.com/cchanxzy/react-currency-input-field/commit/17f13984caeeac758f798595da0f959aa815e111))

# [3.6.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.5.1...v3.6.0) (2021-10-27)


### Features

* add transformRawValue option to transform the value before parsing ([#208](https://github.com/cchanxzy/react-currency-input-field/issues/208)) ([36950cc](https://github.com/cchanxzy/react-currency-input-field/commit/36950cc2d5f2dfc4088a3822be3a78ea9910e725))

## [3.5.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.5.0...v3.5.1) (2021-09-01)

# [3.5.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.4.3...v3.5.0) (2021-08-30)


### Features

* onValueChange calls Values object as third param ([#199](https://github.com/cchanxzy/react-currency-input-field/issues/199)) ([f2f6f2b](https://github.com/cchanxzy/react-currency-input-field/commit/f2f6f2bb8666ca373e85e4ff0f840e6a5f88edc7))

## [3.4.3](https://github.com/cchanxzy/react-currency-input-field/compare/v3.4.2...v3.4.3) (2021-08-22)


### Bug Fixes

* artificial change to trigger version update ([1dfc138](https://github.com/cchanxzy/react-currency-input-field/commit/1dfc138db8f9a6a04936ba2d27baa8f0536c46de))

## [3.4.2](https://github.com/cchanxzy/react-currency-input-field/compare/v3.4.1...v3.4.2) (2021-07-08)


### Performance Improvements

* add tree shaking support ([#182](https://github.com/cchanxzy/react-currency-input-field/issues/182)) ([af1c9c4](https://github.com/cchanxzy/react-currency-input-field/commit/af1c9c4918ff3f9912ef99dbdaf5432ea5db6035))

## [3.4.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.4.0...v3.4.1) (2021-05-22)


### Bug Fixes

* abbreviation char after period ([#168](https://github.com/cchanxzy/react-currency-input-field/issues/168)) ([58612ba](https://github.com/cchanxzy/react-currency-input-field/commit/58612ba3a50540307b53c9be57d0559373cdf807))

# [3.4.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.3.2...v3.4.0) (2021-05-22)


### Features

* export CurrencyInputProps ([#166](https://github.com/cchanxzy/react-currency-input-field/issues/166)) ([977b8cc](https://github.com/cchanxzy/react-currency-input-field/commit/977b8cc6575f1dfa414b5971685375240b0cea1e))

## [3.3.2](https://github.com/cchanxzy/react-currency-input-field/compare/v3.3.1...v3.3.2) (2021-04-13)


### Bug Fixes

* prevent cursor jumping when press delete key ([#155](https://github.com/cchanxzy/react-currency-input-field/issues/155)) ([242ec90](https://github.com/cchanxzy/react-currency-input-field/commit/242ec908d6eb34b1767b21b21515d5ea25e3c80e))

## [3.3.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.3.0...v3.3.1) (2021-03-21)


### Bug Fixes

* handle intl config with prefix and negative ([#148](https://github.com/cchanxzy/react-currency-input-field/issues/148)) ([0c9e6ec](https://github.com/cchanxzy/react-currency-input-field/commit/0c9e6ec46d6fba0fa6320b49fcfffbb983fd76f7))

# [3.3.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.2.5...v3.3.0) (2021-02-18)


### Features

* update dependencies to react 17 ([#141](https://github.com/cchanxzy/react-currency-input-field/issues/141)) ([33c60e2](https://github.com/cchanxzy/react-currency-input-field/commit/33c60e2d214c9c5ab8286238ec93e20b9071277e))

## [3.2.5](https://github.com/cchanxzy/react-currency-input-field/compare/v3.2.4...v3.2.5) (2021-02-15)

## [3.2.4](https://github.com/cchanxzy/react-currency-input-field/compare/v3.2.3...v3.2.4) (2021-02-03)


### Bug Fixes

* remove prefix if letters ([7958f29](https://github.com/cchanxzy/react-currency-input-field/commit/7958f29fae00e931bf2940ea1f3d7509e5fbcdc0))

## [3.2.3](https://github.com/cchanxzy/react-currency-input-field/compare/v3.2.2...v3.2.3) (2021-01-31)


### Bug Fixes

* prevent cursor moving if only negative value at start ([aadec9d](https://github.com/cchanxzy/react-currency-input-field/commit/aadec9d71e7928a9e2c8b1c8d3a663350fb1a473))

## [3.2.2](https://github.com/cchanxzy/react-currency-input-field/compare/v3.2.1...v3.2.2) (2021-01-25)


### Bug Fixes

* intl config currency is optional ([a52a9d6](https://github.com/cchanxzy/react-currency-input-field/commit/a52a9d61604f73be9fe0cbf6383e0065758c2c64))

## [3.2.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.2.0...v3.2.1) (2021-01-24)

# [3.2.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.1.0...v3.2.0) (2021-01-24)


### Features

* stepping does not go beyond min max values ([0cc5d57](https://github.com/cchanxzy/react-currency-input-field/commit/0cc5d5716e43d84297467916cc803e27d9910062))

# [3.1.0](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.4...v3.1.0) (2021-01-24)


### Features

* allow custom suffix prop ([9b57ec6](https://github.com/cchanxzy/react-currency-input-field/commit/9b57ec604c2acbd826149b6a93c9f231f2416dc2))

## [3.0.4](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.3...v3.0.4) (2021-01-24)


### Bug Fixes

* prevent autofocusing on load ([da10c81](https://github.com/cchanxzy/react-currency-input-field/commit/da10c81044052a8d75d5189f13a2b27f18fc464f))

## [3.0.3](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.2...v3.0.3) (2021-01-18)


### Bug Fixes

* formatValue trim decimalScale ([012d4c2](https://github.com/cchanxzy/react-currency-input-field/commit/012d4c27b4d0e7a7be9635cbf787f22875674933))

## [3.0.2](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.1...v3.0.2) (2021-01-08)


### Bug Fixes

* default value with decimal scale renders correctly part 2 ([4b7f5db](https://github.com/cchanxzy/react-currency-input-field/commit/4b7f5dbdfd21c928e38aa90ca9274f579b903299))

## [3.0.1](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0...v3.0.1) (2021-01-07)


### Bug Fixes

* default value with decimal scale renders correctly ([c225306](https://github.com/cchanxzy/react-currency-input-field/commit/c2253069afcf2019db9b245bfd92b598ecc39cef))

# [3.0.0](https://github.com/cchanxzy/react-currency-input-field/compare/v2.7.1...v3.0.0) (2021-01-05)


### Bug Fixes

* fixed a few inconsistencies and added intl config to examples ([796e623](https://github.com/cchanxzy/react-currency-input-field/commit/796e623ef679ca047140d6ee421961877bdaa181))


### Features

* add intl locale config option ([e119352](https://github.com/cchanxzy/react-currency-input-field/commit/e119352212b1aaa8bafdb02dfd312de7a7302cfc))
* allow customInput prop ([f372201](https://github.com/cchanxzy/react-currency-input-field/commit/f3722015650c24efd522f93dfb8a482bc4ba87a4))
* depreciate onBlurValue prop ([8651e76](https://github.com/cchanxzy/react-currency-input-field/commit/8651e76c201b029787490efcf37d307a1b5d8d97))
* handle backspace with suffix ([fc84301](https://github.com/cchanxzy/react-currency-input-field/commit/fc8430162d2c51cc374b0b7f4ed221a1329972b5))
* renamed onChange prop to onValueChange ([83d3806](https://github.com/cchanxzy/react-currency-input-field/commit/83d380660597797bfc38e609599c103f8176fd28))
* renamed precision to decimalScale ([c545b78](https://github.com/cchanxzy/react-currency-input-field/commit/c545b780815bff7c98c66e527f3f3f4a1cc8ee67))
* renamed turnOffAbbreviations to disableAbbreviations ([7751a43](https://github.com/cchanxzy/react-currency-input-field/commit/7751a4386baee5554aa030839d1cdc0f3750f360))
* renamed turnOffSeparators to disableGroupSeparators ([b16f577](https://github.com/cchanxzy/react-currency-input-field/commit/b16f577e29646e2fba9db370fb4eda2c73ae632e))
* wrap component in forwardRef ([3a1f5bc](https://github.com/cchanxzy/react-currency-input-field/commit/3a1f5bcd6422c49ea85ad9980109cd183ceec2f1))


### BREAKING CHANGES

* "onBlurValue" no longer supported
* Renamed "onChange" to "onValueChange"
* Renamed "turnOffAbbreviations" to "disableAbbreviations"
* Renamed "turnOffSeparators" to "disableGroupSeparators"
* renamed precision to decimalScale
* Using Intl.NumberFormat to format value
* can pass in component ref

# [3.0.0-beta.11](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.10...v3.0.0-beta.11) (2021-01-04)

# [3.0.0-beta.10](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.9...v3.0.0-beta.10) (2021-01-02)


### Features

* allow customInput prop ([f372201](https://github.com/cchanxzy/react-currency-input-field/commit/f3722015650c24efd522f93dfb8a482bc4ba87a4))

# [3.0.0-beta.9](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.8...v3.0.0-beta.9) (2021-01-02)


### Bug Fixes

* fixed a few inconsistencies and added intl config to examples ([796e623](https://github.com/cchanxzy/react-currency-input-field/commit/796e623ef679ca047140d6ee421961877bdaa181))

# [3.0.0-beta.8](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.7...v3.0.0-beta.8) (2021-01-02)


### Features

* handle backspace with suffix ([fc84301](https://github.com/cchanxzy/react-currency-input-field/commit/fc8430162d2c51cc374b0b7f4ed221a1329972b5))

# [3.0.0-beta.7](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.6...v3.0.0-beta.7) (2020-12-10)

# [3.0.0-beta.6](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.5...v3.0.0-beta.6) (2020-12-10)

# [3.0.0-beta.5](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2020-12-09)


### Features

* depreciate onBlurValue prop ([8651e76](https://github.com/cchanxzy/react-currency-input-field/commit/8651e76c201b029787490efcf37d307a1b5d8d97))


### BREAKING CHANGES

* "onBlurValue" no longer supported

# [3.0.0-beta.4](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2020-12-09)


### Features

* renamed onChange prop to onValueChange ([83d3806](https://github.com/cchanxzy/react-currency-input-field/commit/83d380660597797bfc38e609599c103f8176fd28))


### BREAKING CHANGES

* Renamed "onChange" to "onValueChange"

# [3.0.0-beta.3](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2020-12-06)


### Features

* renamed precision to decimalScale ([c545b78](https://github.com/cchanxzy/react-currency-input-field/commit/c545b780815bff7c98c66e527f3f3f4a1cc8ee67))
* renamed turnOffAbbreviations to disableAbbreviations ([7751a43](https://github.com/cchanxzy/react-currency-input-field/commit/7751a4386baee5554aa030839d1cdc0f3750f360))
* renamed turnOffSeparators to disableGroupSeparators ([b16f577](https://github.com/cchanxzy/react-currency-input-field/commit/b16f577e29646e2fba9db370fb4eda2c73ae632e))


### BREAKING CHANGES

* Renamed "turnOffAbbreviations" to "disableAbbreviations"
* Renamed "turnOffSeparators" to "disableGroupSeparators"
* renamed precision to decimalScale

# [3.0.0-beta.2](https://github.com/cchanxzy/react-currency-input-field/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2020-12-03)


### Features

* add intl locale config option ([e119352](https://github.com/cchanxzy/react-currency-input-field/commit/e119352212b1aaa8bafdb02dfd312de7a7302cfc))


### BREAKING CHANGES

* Using Intl.NumberFormat to format value

# [3.0.0-beta.1](https://github.com/cchanxzy/react-currency-input-field/compare/v2.7.0...v3.0.0-beta.1) (2020-11-19)


### Features

* wrap component in forwardRef ([3a1f5bc](https://github.com/cchanxzy/react-currency-input-field/commit/3a1f5bcd6422c49ea85ad9980109cd183ceec2f1))


### BREAKING CHANGES

* can pass in component ref
## [2.7.1](https://github.com/cchanxzy/react-currency-input-field/compare/v2.7.0...v2.7.1) (2020-12-10)

# [2.7.0](https://github.com/cchanxzy/react-currency-input-field/compare/v2.6.0...v2.7.0) (2020-11-18)


### Features

* can turn off abbreviations ([67a54c1](https://github.com/cchanxzy/react-currency-input-field/commit/67a54c1288d0fded0fed1f4ef751073eb44a73cb))

# [2.6.0](https://github.com/cchanxzy/react-currency-input-field/compare/v2.5.0...v2.6.0) (2020-11-15)


### Features

* handle arrow down and arrow up step changes ([31e6156](https://github.com/cchanxzy/react-currency-input-field/commit/31e61561087bd95bdfb4763d3caa7b91df28ae23))

# [2.5.0](https://github.com/cchanxzy/react-currency-input-field/compare/v2.4.1...v2.5.0) (2020-11-11)


### Features

* export format value function and add to readme ([cad0b95](https://github.com/cchanxzy/react-currency-input-field/commit/cad0b958e5494160d0a65f065516496a72a9e8ad))

## [2.4.1](https://github.com/cchanxzy/react-currency-input-field/compare/v2.4.0...v2.4.1) (2020-11-04)


### Bug Fixes

* add onChange to onBlur test ([4195ef6](https://github.com/cchanxzy/react-currency-input-field/commit/4195ef68c5e2eeaedd573813b252dacf4b8b2e92))

# [2.4.0](https://github.com/cchanxzy/react-currency-input-field/compare/v2.3.6...v2.4.0) (2020-11-03)


### Features

* add prop onBlurValue ([7ea46af](https://github.com/cchanxzy/react-currency-input-field/commit/7ea46af02310e45d0df9ee2b4810958f22c30f98))

## [2.3.6](https://github.com/cchanxzy/react-currency-input-field/compare/v2.3.5...v2.3.6) (2020-11-03)


### Bug Fixes

* escape prefix regex ([8e0dff5](https://github.com/cchanxzy/react-currency-input-field/commit/8e0dff5cf7314099c5bb15e0ac63c5e6c4da106b))

## [2.3.5](https://github.com/cchanxzy/react-currency-input-field/compare/v2.3.4...v2.3.5) (2020-10-28)


### Bug Fixes

* handle values before prefix ([942a613](https://github.com/cchanxzy/react-currency-input-field/commit/942a613a3b98890cbef9ed62eb7df2f1c62c91e9))

## [2.3.4](https://github.com/cchanxzy/react-currency-input-field/compare/v2.3.3...v2.3.4) (2020-10-24)


### Bug Fixes

* refactored isNumber function ([68640ff](https://github.com/cchanxzy/react-currency-input-field/commit/68640fffa8ef0b36c3f3a9d2bb93d6abfa4814f1))

## [2.3.3](https://github.com/cchanxzy/react-currency-input-field/compare/v2.3.2...v2.3.3) (2020-10-10)


### Bug Fixes

* allows default 0 value ([4189b80](https://github.com/cchanxzy/react-currency-input-field/commit/4189b80b5949dfe662add54e8953301e1b7c9912))
* disallow invalid chars and updated examples ([134d36a](https://github.com/cchanxzy/react-currency-input-field/commit/134d36a098a4f3fcb87429ee55c32543cabfcc46))
* don't call onChange with only - ([ef4101b](https://github.com/cchanxzy/react-currency-input-field/commit/ef4101bca97b629f6e412b728456642fa0ebf231))

## [2.3.2](https://github.com/cchanxzy/react-currency-input-field/compare/v2.3.1...v2.3.2) (2020-09-27)


### Bug Fixes

* prefix 0 value ([d7fa074](https://github.com/cchanxzy/react-currency-input-field/commit/d7fa0747f09da9a33bb46146172563277a1b5fc3))

## [2.3.1](https://github.com/cchanxzy/react-currency-input-field/compare/v2.3.0...v2.3.1) (2020-09-25)


### Bug Fixes

* can clear field programmatically ([2598c16](https://github.com/cchanxzy/react-currency-input-field/commit/2598c16dc1ea499110740c6b63deb48d40c597e6))

# [2.3.0](https://github.com/cchanxzy/react-currency-input-field/compare/v2.2.0...v2.3.0) (2020-09-20)


### Features

* add prop to disallow negative value ([b9ef02c](https://github.com/cchanxzy/react-currency-input-field/commit/b9ef02ca489833fcc95a25148cee1e7b7ade132d))

# [2.2.0](https://github.com/cchanxzy/react-currency-input-field/compare/v2.1.0...v2.2.0) (2020-08-25)


### Features

* add props decimalSeparator and groupSeparator ([bb4459b](https://github.com/cchanxzy/react-currency-input-field/commit/bb4459b87835aa91ca834a4bc566608232d3c545))
* can use any string as a separator ([c84b1cd](https://github.com/cchanxzy/react-currency-input-field/commit/c84b1cd5fbcfd3cd5f13afddee8ed8de95b4d2db))
* fixed decimal length prop ([f3f50a1](https://github.com/cchanxzy/react-currency-input-field/commit/f3f50a171a8083cf2daa41bc1f544293abd3436b))
* handle negative values ([b505e4c](https://github.com/cchanxzy/react-currency-input-field/commit/b505e4c606a215866fa4449f1973add03c8469e7))

# [2.2.0-beta.3](https://github.com/cchanxzy/react-currency-input-field/compare/v2.2.0-beta.2...v2.2.0-beta.3) (2020-08-25)


### Features

* handle negative values ([b581e17](https://github.com/cchanxzy/react-currency-input-field/commit/b581e177510e2016051a4b611f86cea9ad7e34c9))

# [2.2.0-beta.2](https://github.com/cchanxzy/react-currency-input-field/compare/v2.2.0-beta.1...v2.2.0-beta.2) (2020-08-20)


### Features

* fixed decimal length prop ([7089248](https://github.com/cchanxzy/react-currency-input-field/commit/70892489f5f62a914e5b26e2cb461e25076a1441))

# [2.2.0-beta.1](https://github.com/cchanxzy/react-currency-input-field/compare/v2.1.0...v2.2.0-beta.1) (2020-08-14)


### Features

* add props decimalSeparator and groupSeparator ([344e3b0](https://github.com/cchanxzy/react-currency-input-field/commit/344e3b03e0f3386fc0b9d713f174dcb16dea05ae))
* can use any string as a separator ([ae5755a](https://github.com/cchanxzy/react-currency-input-field/commit/ae5755a639909fe297e6da47f13568748f705a1e))

# [2.1.0](https://github.com/cchanxzy/react-currency-input-field/compare/v2.0.0...v2.1.0) (2020-08-13)


### Features

* add prop to turn off separators ([#54](https://github.com/cchanxzy/react-currency-input-field/issues/54)) ([396f567](https://github.com/cchanxzy/react-currency-input-field/commit/396f56719e92353b1e45d419a32fd7c0a916cd7a))

# [2.0.0](https://github.com/cchanxzy/react-currency-input-field/compare/v1.0.1...v2.0.0) (2020-07-02)


### Features

* allow value and precision props ([#46](https://github.com/cchanxzy/react-currency-input-field/issues/46)) ([912d6d9](https://github.com/cchanxzy/react-currency-input-field/commit/912d6d9422c38ba7039bba9572e9786f27f2ce4a))


### BREAKING CHANGES

* onChange will return string or undefined rather than number or null

## [1.0.1](https://github.com/cchanxzy/react-currency-input-field/compare/v1.0.0...v1.0.1) (2020-05-08)


### Bug Fixes

* artificial change to trigger version update ([ae56e99](https://github.com/cchanxzy/react-currency-input-field/commit/ae56e9996e5c45c5c4142354c57021a076eef546))

# [1.0.0](https://github.com/cchanxzy/react-currency-input-field/compare/v0.10.1...v1.0.0) (2020-05-08)


### Bug Fixes

* update demo gif ([9477d1b](https://github.com/cchanxzy/react-currency-input-field/commit/9477d1baac30e59dac6cf6e16a1a5c47f623c6d6))


### BREAKING CHANGES

* trigger package update manually

## [0.10.1](https://github.com/cchanxzy/react-currency-input-field/compare/v0.10.0...v0.10.1) (2020-05-08)


### Bug Fixes

* correct package version and update demo ([20112fc](https://github.com/cchanxzy/react-currency-input-field/commit/20112fcd92c1ac52384ae84dbabe11d6e5549265))

# [0.10.0](https://github.com/cchanxzy/react-currency-input-field/compare/v0.9.0...v0.10.0) (2020-05-08)


### Features

* can parse abbreviated values k, m, b ([f588dcf](https://github.com/cchanxzy/react-currency-input-field/commit/f588dcfdb09e15eb4cf08bd8b777e162f65010f7))
* updated examples ([6a2db92](https://github.com/cchanxzy/react-currency-input-field/commit/6a2db9215098ec4a6a3fc8207998576d46e915ce))

# [0.9.0](https://github.com/cchanxzy/react-currency-input-field/compare/v0.8.4...v0.9.0) (2020-05-08)


### Features

* allow props for input to be passed ([998c3ae](https://github.com/cchanxzy/react-currency-input-field/commit/998c3ae6a0379290d80846f89236d566cd4a9757))

## [0.8.4](https://github.com/cchanxzy/react-currency-input-field/compare/v0.8.3...v0.8.4) (2020-05-06)


### Bug Fixes

* onChange prop is optional ([#38](https://github.com/cchanxzy/react-currency-input-field/issues/38)) ([09986d5](https://github.com/cchanxzy/react-currency-input-field/commit/09986d53380a8ac6a45b26ae9497acbc4d64232c))

## [0.8.3](https://github.com/cchanxzy/react-currency-input-field/compare/v0.8.2...v0.8.3) (2020-05-06)


### Bug Fixes

* improve props table in readme ([#37](https://github.com/cchanxzy/react-currency-input-field/issues/37)) ([737f8fd](https://github.com/cchanxzy/react-currency-input-field/commit/737f8fd49cab74ff6ef0062f3d48e199ddf1e019))

## [0.8.2](https://github.com/cchanxzy/react-currency-input-field/compare/v0.8.1...v0.8.2) (2020-04-23)


### Bug Fixes

* add inputmode and remove pattern ([de16a2e](https://github.com/cchanxzy/react-currency-input-field/commit/de16a2ec5911729d4e8fbbdb4089c43993738956))
* upgrade dependencies ([d258747](https://github.com/cchanxzy/react-currency-input-field/commit/d2587470033eca45ee3793809b4d7e2d800d3149))

## [0.8.1](https://github.com/cchanxzy/react-currency-input-field/compare/v0.8.0...v0.8.1) (2020-04-18)


### Bug Fixes

* update dependencies ([99c1abe](https://github.com/cchanxzy/react-currency-input-field/commit/99c1abe38e9ec93b1d254f814c1b744173bf9f33))

# [0.8.0](https://github.com/cchanxzy/react-currency-input-field/compare/v0.7.0...v0.8.0) (2020-04-13)


### Features

* adding maxLength prop ([#32](https://github.com/cchanxzy/react-currency-input-field/issues/32)) ([3b1ec54](https://github.com/cchanxzy/react-currency-input-field/commit/3b1ec54d98a278b0a854518ba4d3f3baf66bcbdf))

# [0.7.0](https://github.com/cchanxzy/react-currency-input-field/compare/v0.6.0...v0.7.0) (2020-04-10)


### Features

* allow input to be disabled ([c6881c2](https://github.com/cchanxzy/react-currency-input-field/commit/c6881c2a81541c10f48f0a1115d9cc22862c29cb))

# [0.6.0](https://github.com/cchanxzy/react-currency-input-field/compare/v0.5.3...v0.6.0) (2020-03-08)


### Features

* update dependencies ([476ab92](https://github.com/cchanxzy/react-currency-input-field/commit/476ab92d9625cf93160d7e3060ceb81fa74053c1))

## [0.5.3](https://github.com/cchanxzy/react-currency-input-field/compare/v0.5.2...v0.5.3) (2019-12-08)


### Bug Fixes

* update dependencies ([#22](https://github.com/cchanxzy/react-currency-input-field/issues/22)) ([80e6688](https://github.com/cchanxzy/react-currency-input-field/commit/80e6688d59b1c783db402d0bdc8294080ed4ba43))

## [0.5.2](https://github.com/cchanxzy/react-currency-input-field/compare/v0.5.1...v0.5.2) (2019-12-01)


### Bug Fixes

* cursor jumping when modifying value ([db449d6](https://github.com/cchanxzy/react-currency-input-field/commit/db449d64dcaf1ba46c40d9cae7607bc229319d21))
* react is specified as external, and pattern allows float on mobile ([c011361](https://github.com/cchanxzy/react-currency-input-field/commit/c0113616adf83eb4d6edf3b3e9a2250a3ad37fc1))

## [0.5.1](https://github.com/cchanxzy/react-currency-input-field/compare/v0.5.0...v0.5.1) (2019-11-30)


### Bug Fixes

* modify typescript config to correctly output types ([#19](https://github.com/cchanxzy/react-currency-input-field/issues/19)) ([392082e](https://github.com/cchanxzy/react-currency-input-field/commit/392082e7f59e202c97345d7e8d2a552adebced16))

# [0.5.0](https://github.com/cchanxzy/react-currency-input-field/compare/v0.4.1...v0.5.0) (2019-11-30)


### Features

* allow name to be added to prop and onChange callback ([#17](https://github.com/cchanxzy/react-currency-input-field/issues/17)) ([25ae63c](https://github.com/cchanxzy/react-currency-input-field/commit/25ae63c21ec50d89ece9f9f2318584e2aa5cde70))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.1](https://github.com/cchanxzy/react-currency-input-field/compare/v0.3.0...v0.3.1) (2019-11-21)

## [0.3.0](https://github.com/cchanxzy/react-currency-input-field/compare/v0.2.0...v0.3.0) (2019-11-21)

### Features

- can set default value and decimals ([#8](https://github.com/cchanxzy/react-currency-input-field/issues/8)) ([54b2d4b](https://github.com/cchanxzy/react-currency-input-field/commit/54b2d4b))

### [0.2.1](https://github.com/cchanxzy/react-currency-input-field/compare/v0.2.0...v0.2.1) (2019-11-21)

### Features

- can set default value and decimals ([#8](https://github.com/cchanxzy/react-currency-input-field/issues/8)) ([54b2d4b](https://github.com/cchanxzy/react-currency-input-field/commit/54b2d4b))

## 0.2.0 (2019-09-08)

### ⚠ BREAKING CHANGES

- removed limit prop

- chore: updated workflow

- Feat/remove limit update with hooks (#5) ([a3463bd](https://github.com/cchanxzy/react-currency-input-field/commit/a3463bd)), closes [#5](https://github.com/cchanxzy/react-currency-input-field/issues/5)

### Bug Fixes

- updated packages ([42db1d8](https://github.com/cchanxzy/react-currency-input-field/commit/42db1d8))

## 0.1.0 (2019-09-08)

### ⚠ BREAKING CHANGES

- removed limit prop

- chore: updated workflow

- Feat/remove limit update with hooks (#5) ([a3463bd](https://github.com/cchanxzy/react-currency-input-field/commit/a3463bd)), closes [#5](https://github.com/cchanxzy/react-currency-input-field/issues/5)

### Bug Fixes

- updated packages ([42db1d8](https://github.com/cchanxzy/react-currency-input-field/commit/42db1d8))

### [0.0.47](https://github.com/cchanxzy/react-currency-input-field/compare/v0.10.0...v0.0.47) (2019-09-08)

## 0.10.0 (2019-09-08)

### ⚠ BREAKING CHANGES

- removed limit prop

- removed limit prop, updated tests and examples ([ed24b8e](https://github.com/cchanxzy/react-currency-input-field/commit/ed24b8e))

### Bug Fixes

- updated packages ([7e80871](https://github.com/cchanxzy/react-currency-input-field/commit/7e80871))

## 0.1.0 (2019-09-08)

### ⚠ BREAKING CHANGES

- removed limit prop

- removed limit prop, updated tests and examples ([ed24b8e](https://github.com/cchanxzy/react-currency-input-field/commit/ed24b8e))

### Bug Fixes

- updated packages ([7e80871](https://github.com/cchanxzy/react-currency-input-field/commit/7e80871))

### 0.0.47 (2019-09-08)

### Bug Fixes

- updated packages ([7e80871](https://github.com/cchanxzy/react-currency-input-field/commit/7e80871))

### Features

- upating tests and examples ([e18c23a](https://github.com/cchanxzy/react-currency-input-field/commit/e18c23a))

### 0.0.46 (2019-08-29)

### Bug Fixes

- updated packages ([7e80871](https://github.com/cchanxzy/react-currency-input-field/commit/7e80871))
