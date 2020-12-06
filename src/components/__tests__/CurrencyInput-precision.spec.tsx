import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > decimalScale', () => {
  const onBlurValueSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pad to decimalScale of 5 on blur', () => {
    const view = shallow(
      <CurrencyInput id={id} prefix="£" onBlurValue={onBlurValueSpy} decimalScale={5} />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: '£1.5' } });
    expect(onBlurValueSpy).toBeCalledWith('1.50000', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1.50000');
  });

  it('should pad to decimalScale of 2 on blur', () => {
    const view = shallow(
      <CurrencyInput id={id} prefix="£" onBlurValue={onBlurValueSpy} decimalScale={2} />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: '£1' } });
    expect(onBlurValueSpy).toBeCalledWith('1.00', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1.00');
  });
});
