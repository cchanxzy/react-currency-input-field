import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';
const className = 'form-control';
const placeholder = '£1,000';
const name = 'inputName';

describe('<CurrencyInput /> component', () => {
  it('Renders without error', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        name={name}
        placeholder={placeholder}
        className={className}
        onChange={jest.fn()}
      />
    );
    const input = view.find(`#${id}`);

    expect(input).toMatchSnapshot();
    expect(input.prop('id')).toBe(id);
    expect(input.prop('name')).toBe(name);
    expect(input.prop('placeholder')).toBe(placeholder);
    expect(input.prop('className')).toBe(className);
  });

  it('Renders with default value', () => {
    const defaultValue = 1234.56;

    const view = shallow(
      <CurrencyInput
        id={id}
        defaultValue={defaultValue}
        className={className}
        onChange={jest.fn()}
        prefix="£"
      />
    );
    const input = view.find(`#${id}`);

    expect(view.html()).toMatchSnapshot();
    expect(input.prop('id')).toBe(id);
    expect(input.prop('value')).toBe('£1,234.56');
    expect(input.prop('className')).toBe(className);
  });

  it('should go to end of string on focus', () => {
    const view = shallow(<CurrencyInput id={id} defaultValue={123} onChange={jest.fn()} />);
    view.find(`#${id}`).simulate('focus');

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('123');
  });

  it('should go to beginning on focus if no value', () => {
    const view = shallow(<CurrencyInput id={id} onChange={jest.fn()} />);
    view.find(`#${id}`).simulate('focus');

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should allow value change with number', () => {
    const onChangeSpy = jest.fn();
    const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '100' } });

    expect(onChangeSpy).toBeCalledWith(100, undefined);
  });

  it('should not allow string value change', () => {
    const onChangeSpy = jest.fn();
    const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: 'aakoa' } });
    expect(onChangeSpy).toBeCalledWith(NaN, undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should allow empty value', () => {
    const onChangeSpy = jest.fn();
    const view = shallow(<CurrencyInput id={id} name={name} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '' } });
    expect(onChangeSpy).toBeCalledWith(null, name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should callback name as second parameter if name prop provided', () => {
    const onChangeSpy = jest.fn();
    const view = shallow(<CurrencyInput id={id} name={name} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '£123' } });
    expect(onChangeSpy).toBeCalledWith(123, name);
  });

  describe('decimals', () => {
    it('should allow value with decimals if allowDecimals is true', () => {
      const onChangeSpy = jest.fn();
      const view = shallow(
        <CurrencyInput allowDecimals={true} id={id} prefix="£" onChange={onChangeSpy} />
      );
      view.find(`#${id}`).simulate('change', { target: { value: '£1,234.56' } });
      expect(onChangeSpy).toBeCalledWith(1234.56, undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,234.56');
    });

    it('should disallow value with decimals if allowDecimals is false', () => {
      const onChangeSpy = jest.fn();
      const view = shallow(
        <CurrencyInput allowDecimals={false} id={id} prefix="£" onChange={onChangeSpy} />
      );
      view.find(`#${id}`).simulate('change', { target: { value: '£1,234.56' } });
      expect(onChangeSpy).toBeCalledWith(1234, undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,234');
    });

    it('should limit decimals to decimalsLimit length', () => {
      const onChangeSpy = jest.fn();
      const view = shallow(
        <CurrencyInput id={id} decimalsLimit={3} prefix="£" onChange={onChangeSpy} />
      );
      view.find(`#${id}`).simulate('change', { target: { value: '£1,234.56789' } });
      expect(onChangeSpy).toBeCalledWith(1234.567, undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,234.567');
    });
  });
});
