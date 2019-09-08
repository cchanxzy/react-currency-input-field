import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput /> component', () => {
  it('Renders without error', () => {
    const id = 'validationCustom01';
    const placeholder = '£1,000';
    const className = 'form-control';

    const view = shallow(
      <CurrencyInput id={id} placeholder={placeholder} className={className} onChange={jest.fn()} />
    );
    const input = view.find('#validationCustom01');
    expect(input).toMatchSnapshot();

    expect(input.prop('id')).toBe(id);
    expect(input.prop('placeholder')).toBe(placeholder);
    expect(input.prop('className')).toBe(className);
  });

  it('should allow input change value', () => {
    const onChange = jest.fn();
    const view = shallow(
      <CurrencyInput
        id="validationCustom01"
        placeholder="£1,000"
        className="form-control"
        prefix="£"
        onChange={onChange}
      />
    );
    const input = view.find('#validationCustom01');
    input.simulate('change', { target: { value: '100' } });

    expect(onChange).toBeCalledWith(100);
  });

  it('should allow empty value change', () => {
    const onChange = jest.fn();
    const view = shallow(
      <CurrencyInput
        id="validationCustom01"
        placeholder="£1,000"
        className="form-control"
        prefix="£"
        onChange={onChange}
      />
    );
    const input = view.find('#validationCustom01');
    input.simulate('change', { target: { value: '' } });

    expect(onChange).toBeCalledWith(null);
  });

  it('should not allow string value change', () => {
    const onChange = jest.fn();
    const view = shallow(
      <CurrencyInput
        id="validationCustom01"
        placeholder="£1,000"
        className="form-control"
        prefix="£"
        onChange={onChange}
      />
    );
    const input = view.find('#validationCustom01');
    input.simulate('change', { target: { value: 'aakoa' } });

    expect(onChange).toBeCalledWith(NaN);
  });
});
