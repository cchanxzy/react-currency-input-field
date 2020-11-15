import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > maxLength', () => {
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not allow more values than max length', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        name={name}
        prefix="£"
        onChange={onChangeSpy}
        maxLength={3}
        defaultValue={123}
      />
    );

    const input = view.find(`#${id}`);
    expect(input.prop('value')).toBe('£123');

    input.simulate('change', { target: { value: '£1234' } });
    expect(onChangeSpy).not.toBeCalled();

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£123');
  });

  it('should apply max length rule to negative value', () => {
    const view = shallow(
      <CurrencyInput
        id={id}
        name={name}
        prefix="£"
        onChange={onChangeSpy}
        maxLength={3}
        defaultValue={-123}
      />
    );

    const input = view.find(`#${id}`);
    expect(input.prop('value')).toBe('-£123');

    input.simulate('change', { target: { value: '-£1234' } });
    expect(onChangeSpy).not.toBeCalled();
    expect(view.update().find(`#${id}`).prop('value')).toBe('-£123');

    input.simulate('change', { target: { value: '-£125' } });
    expect(onChangeSpy).toHaveBeenCalledWith('-125', '');
    expect(view.update().find(`#${id}`).prop('value')).toBe('-£125');
  });
});
