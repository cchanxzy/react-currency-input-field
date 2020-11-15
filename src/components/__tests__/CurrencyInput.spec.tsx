import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';
const className = 'form-control';
const placeholder = '£1,000';
const name = 'inputName';

describe('<CurrencyInput /> component', () => {
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renders without error', () => {
    const view = shallow(
      <CurrencyInput id={id} name={name} placeholder={placeholder} className={className} />
    );
    const input = view.find(`#${id}`);

    expect(input).toMatchSnapshot();
    expect(input.prop('id')).toBe(id);
    expect(input.prop('name')).toBe(name);
    expect(input.prop('placeholder')).toBe(placeholder);
    expect(input.prop('className')).toBe(className);
  });

  it('Renders with default value', () => {
    const view = shallow(
      <CurrencyInput id={id} defaultValue={1234.56} className={className} prefix="£" />
    );
    const input = view.find(`#${id}`);

    expect(view.html()).toMatchSnapshot();
    expect(input.prop('id')).toBe(id);
    expect(input.prop('value')).toBe('£1,234.56');
    expect(input.prop('className')).toBe(className);
  });

  it('Renders with default value 0', () => {
    const view = shallow(
      <CurrencyInput id={id} defaultValue={0} className={className} prefix="£" />
    );
    const input = view.find(`#${id}`);
    expect(input.prop('value')).toBe('£0');
  });

  it('Renders with value prop', () => {
    const view = shallow(<CurrencyInput id={id} value={49.99} className={className} prefix="£" />);
    const input = view.find(`#${id}`);

    expect(input.prop('value')).toBe('£49.99');
  });

  it('Renders with value 0', () => {
    const view = shallow(<CurrencyInput id={id} value={0} className={className} prefix="£" />);
    const input = view.find(`#${id}`);

    expect(input.prop('value')).toBe('£0');
  });

  it('should go to end of string on focus', () => {
    const view = shallow(<CurrencyInput id={id} defaultValue={123} />);
    view.find(`#${id}`).simulate('focus');

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('123');
  });

  it('should go to beginning on focus if no value', () => {
    const view = shallow(<CurrencyInput id={id} />);
    view.find(`#${id}`).simulate('focus');

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should allow value change with number', () => {
    const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '100' } });

    expect(onChangeSpy).toBeCalledWith('100', undefined);
  });

  it('should prefix 0 value', () => {
    const view = shallow(
      <CurrencyInput id={id} name={name} prefix="£" value={0} onChange={onChangeSpy} />
    );
    expect(view.find(`#${id}`).prop('value')).toBe('£0');
  });

  it('should allow 0 value on change', () => {
    const view = shallow(<CurrencyInput id={id} name={name} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '0' } });
    expect(onChangeSpy).toBeCalledWith('0', name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£0');
  });

  it('should allow empty value', () => {
    const view = shallow(<CurrencyInput id={id} name={name} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '' } });
    expect(onChangeSpy).toBeCalledWith(undefined, name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should callback name as second parameter if name prop provided', () => {
    const view = shallow(<CurrencyInput id={id} name={name} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '£123' } });
    expect(onChangeSpy).toBeCalledWith('123', name);
  });

  it('should not allow invalid characters', () => {
    const view = shallow(<CurrencyInput id={id} name={name} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: 'hello' } });
    expect(onChangeSpy).toBeCalledWith(undefined, name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('');
  });

  it('should ignore invalid characters', () => {
    const view = shallow(<CurrencyInput id={id} name={name} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '£123hello' } });
    expect(onChangeSpy).toBeCalledWith('123', name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£123');
  });
});
