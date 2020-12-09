import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > intlConfig', () => {
  it('should use intl config settings (en-US, USD)', () => {
    const view = shallow(
      <CurrencyInput id={id} intlConfig={{ locale: 'en-US', currency: 'USD' }} value="123456789" />
    );
    expect(view.find(`#${id}`).prop('value')).toBe('$123,456,789');
  });

  it('should use intl config settings (en-IN, INR)', () => {
    const view = shallow(
      <CurrencyInput id={id} intlConfig={{ locale: 'en-IN', currency: 'INR' }} value="500000" />
    );
    expect(view.find(`#${id}`).prop('value')).toBe('₹5,00,000');
  });

  it('should use intl config settings (ja-JP, JPY)', () => {
    const view = shallow(
      <CurrencyInput id={id} intlConfig={{ locale: 'ja-JP', currency: 'JPY' }} value="123.456" />
    );
    expect(view.find(`#${id}`).prop('value')).toBe('￥123');
  });

  it('should override locale currency symbol if prefix passed in', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        intlConfig={{ locale: 'en-US', currency: 'USD' }}
        value="100"
        prefix="£"
      />
    );
    expect(view.find(`#${id}`).prop('value')).toBe('£100');
  });

  it('should override locale group separator if groupSeparator passed in', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        intlConfig={{ locale: 'en-US', currency: 'USD' }}
        value="123456789.99"
        groupSeparator="/"
      />
    );
    expect(view.find(`#${id}`).prop('value')).toBe('$123/456/789.99');
  });

  it('should override locale decimal separator if decimalSeparator passed in', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        intlConfig={{ locale: 'en-US', currency: 'USD' }}
        value="123456.789"
        decimalSeparator="-"
      />
    );
    expect(view.find(`#${id}`).prop('value')).toBe('$123,456-789');
  });

  describe('onValueChange', () => {
    const onValueChangeSpy = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should handle onValueChange with intl config settings (en-IN, INR)', () => {
      const view = shallow(
        <CurrencyInput
          id={id}
          intlConfig={{ locale: 'en-IN', currency: 'INR' }}
          onValueChange={onValueChangeSpy}
        />
      );
      expect(view.find(`#${id}`).prop('value')).toBe('');

      view.find(`#${id}`).simulate('change', { target: { value: '₹12,34,567' } });
      expect(onValueChangeSpy).toBeCalledWith('1234567', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('₹12,34,567');
    });
  });
});
