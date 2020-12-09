import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > decimalScale', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pad to decimalScale of 5 on blur', () => {
    const view = shallow(
      <CurrencyInput id={id} prefix="£" onValueChange={onValueChangeSpy} decimalScale={5} />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: '£1.5' } });
    expect(onValueChangeSpy).toBeCalledWith('1.50000', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1.50000');
  });

  it('should pad to decimalScale of 2 on blur', () => {
    const onBlurSpy = jest.fn();
    const view = shallow(
      <CurrencyInput
        id={id}
        prefix="£"
        onValueChange={onValueChangeSpy}
        onBlur={onBlurSpy}
        decimalScale={2}
      />
    );
    const event = { target: { value: '£1' } };

    view.find(`#${id}`).simulate('blur', event);
    expect(onBlurSpy).toBeCalledWith(event);
    expect(onValueChangeSpy).toBeCalledWith('1.00', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1.00');
  });
});
