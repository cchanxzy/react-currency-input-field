import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > decimals', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should allow value with decimals if allowDecimals is true', () => {
    const view = shallow(
      <CurrencyInput allowDecimals={true} id={id} prefix="£" onValueChange={onValueChangeSpy} />
    );
    view.find(`#${id}`).simulate('change', { target: { value: '£1,234.56' } });
    expect(onValueChangeSpy).toBeCalledWith('1234.56', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,234.56');
  });

  it('should disallow value with decimals if allowDecimals is false', () => {
    const view = shallow(
      <CurrencyInput allowDecimals={false} id={id} prefix="£" onValueChange={onValueChangeSpy} />
    );
    view.find(`#${id}`).simulate('change', { target: { value: '£1,234.56' } });
    expect(onValueChangeSpy).toBeCalledWith('1234', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,234');
  });

  it('should limit decimals to decimalsLimit length', () => {
    const view = shallow(
      <CurrencyInput id={id} decimalsLimit={3} prefix="£" onValueChange={onValueChangeSpy} />
    );
    view.find(`#${id}`).simulate('change', { target: { value: '£1,234.56789' } });
    expect(onValueChangeSpy).toBeCalledWith('1234.567', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,234.567');
  });

  it('should be disabled if disabled prop is true', () => {
    const view = shallow(
      <CurrencyInput id={id} decimalsLimit={3} disabled={true} onValueChange={onValueChangeSpy} />
    );
    expect(view.find(`#${id}`).prop('disabled')).toBe(true);
  });
});
