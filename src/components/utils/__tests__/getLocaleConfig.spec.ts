import { getLocaleConfig } from '../getLocaleConfig';

describe('getLocaleConfig', () => {
  it('should return locale config even if no intlConfig', () => {
    expect(getLocaleConfig()).toStrictEqual({
      currencySymbol: '',
      decimalSeparator: '.',
      groupSeparator: ',',
      prefix: '',
      suffix: '',
    });
  });

  it('should return locale config from intlConfig', () => {
    expect(getLocaleConfig({ locale: 'ja-JP', currency: 'JPY' })).toStrictEqual({
      currencySymbol: '￥',
      decimalSeparator: '',
      groupSeparator: ',',
      prefix: '￥',
      suffix: '',
    });
  });

  it('should return locale config from intlConfig even without currency', () => {
    expect(getLocaleConfig({ locale: 'fr-FR' })).toStrictEqual({
      currencySymbol: '',
      decimalSeparator: ',',
      groupSeparator: ' ',
      prefix: '',
      suffix: '',
    });
  });
});
