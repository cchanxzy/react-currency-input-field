import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > negative value', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle negative value input', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        prefix="$"
        onValueChange={onValueChangeSpy}
        decimalScale={2}
        defaultValue={123}
      />
    );

    const input = view.find(`#${id}`);
    expect(input.prop('value')).toBe('$123');

    input.simulate('change', { target: { value: '-$1234' } });
    expect(onValueChangeSpy).toBeCalledWith('-1234', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('-$1,234');
  });

  it('should call onValueChange with undefined and keep "-" sign as state value', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        prefix="$"
        onValueChange={onValueChangeSpy}
        decimalScale={2}
        defaultValue={123}
      />
    );

    const input = view.find(`#${id}`);
    expect(input.prop('value')).toBe('$123');

    input.simulate('change', { target: { value: '-' } });
    expect(onValueChangeSpy).toBeCalledWith(undefined, undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('-');
  });

  it('should not call onBlur if only negative sign and clears value', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        prefix="$"
        onValueChange={onValueChangeSpy}
        decimalScale={2}
        defaultValue={123}
      />
    );

    const input = view.find(`#${id}`);
    expect(input.prop('value')).toBe('$123');

    input.simulate('blur', { target: { value: '-' } });
    expect(onValueChangeSpy).not.toBeCalled();

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should not allow negative value if allowNegativeValue is false', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        prefix="$"
        onValueChange={onValueChangeSpy}
        allowNegativeValue={false}
        defaultValue={123}
      />
    );

    const input = view.find(`#${id}`);
    expect(input.prop('value')).toBe('$123');

    input.simulate('change', { target: { value: '-$1234' } });
    expect(onValueChangeSpy).toBeCalledWith('1234', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('$1,234');
  });
});
