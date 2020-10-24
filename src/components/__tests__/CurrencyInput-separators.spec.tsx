import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';
const name = 'inputName';

describe('<CurrencyInput /> component > separators', () => {
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not include separator if turned off', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        name={name}
        prefix="£"
        turnOffSeparators={true}
        onChange={onChangeSpy}
        defaultValue={10000}
      />
    );

    const input = view.find(`#${id}`);
    expect(input.prop('value')).toBe('£10000');

    input.simulate('change', { target: { value: '£123456' } });
    expect(onChangeSpy).toBeCalledWith('123456', name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£123456');
  });

  it('should handle decimal and group separators passed in', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        name={name}
        prefix="£"
        decimalSeparator=","
        groupSeparator="."
        onChange={onChangeSpy}
      />
    );
    view.find(`#${id}`).simulate('change', { target: { value: '£123.456,33' } });
    expect(onChangeSpy).toBeCalledWith('123456,33', name);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£123.456,33');
  });

  it('should throw error if decimalSeparator and groupSeparator are the same', () => {
    expect(() =>
      shallow(
        <CurrencyInput id={id} name={name} prefix="£" decimalSeparator="," groupSeparator="," />
      )
    ).toThrow('decimalSeparator cannot be the same as groupSeparator');
  });

  it('should throw error if decimalSeparator is a number', () => {
    expect(() =>
      shallow(
        <CurrencyInput id={id} name={name} prefix="£" decimalSeparator={'1'} groupSeparator="," />
      )
    ).toThrow('decimalSeparator cannot be a number');
  });

  it('should throw error if groupSeparator is a number', () => {
    expect(() =>
      shallow(
        <CurrencyInput
          id={id}
          name={name}
          prefix="£"
          decimalSeparator="."
          groupSeparator={'2'}
          onChange={onChangeSpy}
          defaultValue={10000}
        />
      )
    ).toThrow('groupSeparator cannot be a number');
  });
});
