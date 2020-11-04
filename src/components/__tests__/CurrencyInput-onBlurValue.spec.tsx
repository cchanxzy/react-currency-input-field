import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';
const name = 'inputName';

describe('<CurrencyInput /> component > onBlurValue', () => {
  const onBlurValueSpy = jest.fn();
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onBlurValue and onChange', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        name={name}
        prefix="$"
        onBlurValue={onBlurValueSpy}
        onChange={onChangeSpy}
        precision={2}
      />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: '123' } });
    expect(onBlurValueSpy).toBeCalledWith('123.00', name);
    expect(onChangeSpy).toBeCalledWith('123.00', name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('$123.00');
  });

  it('should call onBlurValue for 0', () => {
    const view = shallow(
      <CurrencyInput id={id} name={name} prefix="$" onBlurValue={onBlurValueSpy} />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: '0' } });
    expect(onBlurValueSpy).toBeCalledWith('0', name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('$0');
  });

  it('should call onBlurValue for empty value', () => {
    const view = shallow(
      <CurrencyInput id={id} name={name} prefix="$" onBlurValue={onBlurValueSpy} />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: '' } });
    expect(onBlurValueSpy).toBeCalledWith(undefined, name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should call onBlurValue for "-" char', () => {
    const view = shallow(
      <CurrencyInput id={id} name={name} prefix="$" onBlurValue={onBlurValueSpy} />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: '-' } });
    expect(onBlurValueSpy).toBeCalledWith(undefined, name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should callback name as second parameter if name prop provided', () => {
    const view = shallow(
      <CurrencyInput id={id} name={name} prefix="$" onBlurValue={onBlurValueSpy} />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: '$123' } });
    expect(onBlurValueSpy).toBeCalledWith('123', name);
  });

  it('should not allow invalid characters', () => {
    const view = shallow(
      <CurrencyInput id={id} name={name} prefix="$" onBlurValue={onBlurValueSpy} />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: 'hello' } });
    expect(onBlurValueSpy).toBeCalledWith(undefined, name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should ignore invalid characters', () => {
    const view = shallow(
      <CurrencyInput id={id} name={name} prefix="$" onBlurValue={onBlurValueSpy} />
    );
    view.find(`#${id}`).simulate('blur', { target: { value: '$123hello' } });
    expect(onBlurValueSpy).toBeCalledWith('123', name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('$123');
  });
});
