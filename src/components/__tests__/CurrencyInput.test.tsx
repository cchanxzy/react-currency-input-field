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
    const defaultValue = 1234.56;

    const view = shallow(
      <CurrencyInput id={id} defaultValue={defaultValue} className={className} prefix="£" />
    );
    const input = view.find(`#${id}`);

    expect(view.html()).toMatchSnapshot();
    expect(input.prop('id')).toBe(id);
    expect(input.prop('value')).toBe('£1,234.56');
    expect(input.prop('className')).toBe(className);
  });

  it('Renders with value prop', () => {
    const value = 49.99;

    const view = shallow(<CurrencyInput id={id} value={value} className={className} prefix="£" />);
    const input = view.find(`#${id}`);

    expect(input.prop('value')).toBe('£49.99');
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

  describe('decimals', () => {
    it('should allow abbreviated values with k', () => {
      const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
      view.find(`#${id}`).simulate('change', { target: { value: '£1.5k' } });
      expect(onChangeSpy).toBeCalledWith('1500', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,500');
    });

    it('should allow abbreviated values with m', () => {
      const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
      view.find(`#${id}`).simulate('change', { target: { value: '£2.123M' } });
      expect(onChangeSpy).toBeCalledWith('2123000', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£2,123,000');
    });

    it('should allow abbreviated values with b', () => {
      const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
      view.find(`#${id}`).simulate('change', { target: { value: '£1.599B' } });
      expect(onChangeSpy).toBeCalledWith('1599000000', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,599,000,000');
    });

    it('should not allow any other letters', () => {
      const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
      view.find(`#${id}`).simulate('change', { target: { value: '£1.5e' } });
      expect(onChangeSpy).toBeCalledWith('1.5e', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('');
    });
  });

  describe('decimals', () => {
    it('should allow value with decimals if allowDecimals is true', () => {
      const view = shallow(
        <CurrencyInput allowDecimals={true} id={id} prefix="£" onChange={onChangeSpy} />
      );
      view.find(`#${id}`).simulate('change', { target: { value: '£1,234.56' } });
      expect(onChangeSpy).toBeCalledWith('1234.56', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,234.56');
    });

    it('should disallow value with decimals if allowDecimals is false', () => {
      const view = shallow(
        <CurrencyInput allowDecimals={false} id={id} prefix="£" onChange={onChangeSpy} />
      );
      view.find(`#${id}`).simulate('change', { target: { value: '£1,234.56' } });
      expect(onChangeSpy).toBeCalledWith('1234', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,234');
    });

    it('should limit decimals to decimalsLimit length', () => {
      const view = shallow(
        <CurrencyInput id={id} decimalsLimit={3} prefix="£" onChange={onChangeSpy} />
      );
      view.find(`#${id}`).simulate('change', { target: { value: '£1,234.56789' } });
      expect(onChangeSpy).toBeCalledWith('1234.567', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£1,234.567');
    });

    it('should be disabled if disabled prop is true', () => {
      const view = shallow(
        <CurrencyInput id={id} decimalsLimit={3} disabled={true} onChange={onChangeSpy} />
      );
      expect(view.find(`#${id}`).prop('disabled')).toBe(true);
    });
  });

  describe('precision', () => {
    it('should pad to precision', () => {
      const view = shallow(
        <CurrencyInput id={id} prefix="£" onChange={onChangeSpy} precision={5} />
      );
      view.find(`#${id}`).simulate('change', { target: { value: '£1.50' } });
      expect(onChangeSpy).toBeCalledWith('1.50', undefined);

      const updatedView = view.update();
      expect(updatedView.find(`#${id}`).prop('value')).toBe('£1.50');
    });
  });
});
