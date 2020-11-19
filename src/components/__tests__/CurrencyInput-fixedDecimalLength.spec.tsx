import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > fixedDecimalLength', () => {
  const onBlurValueSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fixedDecimalLength', () => {
    it('should convert value on blur if fixedDecimalLength specified', () => {
      const view = shallow(
        <CurrencyInput
          id={id}
          prefix="$"
          onBlurValue={onBlurValueSpy}
          fixedDecimalLength={3}
          defaultValue={123}
        />
      );

      const input = view.find(`#${id}`);
      expect(input.prop('value')).toBe('$123');

      view.find(`#${id}`).simulate('blur', { target: { value: '$123' } });
      expect(onBlurValueSpy).toBeCalledWith('1.230', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('$1.230');
    });

    it('should work with precision and decimalSeparator', () => {
      const view = shallow(
        <CurrencyInput
          id={id}
          prefix="$"
          onBlurValue={onBlurValueSpy}
          fixedDecimalLength={3}
          groupSeparator="."
          decimalSeparator=","
          precision={2}
          defaultValue={123}
        />
      );

      const input = view.find(`#${id}`);
      expect(input.prop('value')).toBe('$123');

      view.find(`#${id}`).simulate('blur', { target: { value: '$123' } });
      expect(onBlurValueSpy).toBeCalledWith('1,23', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('$1,23');
    });
  });
});
