import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';
const name = 'inputName';

describe('<CurrencyInput /> component > onBlur', () => {
  const onBlurSpy = jest.fn();
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onBlur and onValueChange', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        name={name}
        prefix="$"
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpy}
        decimalScale={2}
      />
    );
    const event = { target: { value: '123' } };
    view.find(`#${id}`).simulate('blur', event);
    expect(onBlurSpy).toBeCalledWith(event);
    expect(onValueChangeSpy).toBeCalledWith('123.00', name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('$123.00');
  });

  it('should call onBlur for 0', () => {
    const view = shallow(<CurrencyInput id={id} name={name} prefix="$" onBlur={onBlurSpy} />);
    const event = { target: { value: '0' } };
    view.find(`#${id}`).simulate('blur', event);
    expect(onBlurSpy).toBeCalledWith(event);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('$0');
  });

  it('should call onBlur for empty value', () => {
    const view = shallow(<CurrencyInput id={id} name={name} prefix="$" onBlur={onBlurSpy} />);
    const event = { target: { value: '' } };
    view.find(`#${id}`).simulate('blur', event);
    expect(onBlurSpy).toBeCalledWith(event);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should call onBlur for "-" char', () => {
    const view = shallow(<CurrencyInput id={id} name={name} prefix="$" onBlur={onBlurSpy} />);
    const event = { target: { value: '-' } };
    view.find(`#${id}`).simulate('blur', event);
    expect(onBlurSpy).toBeCalledWith(event);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });
});
