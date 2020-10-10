import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > precision', () => {
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pad to precision of 5 on blur', () => {
    const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} precision={5} />);
    view.find(`#${id}`).simulate('blur', { target: { value: '£1.5' } });
    expect(onChangeSpy).toBeCalledWith('1.50000', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1.50000');
  });

  it('should pad to precision of 2 on blur', () => {
    const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} precision={2} />);
    view.find(`#${id}`).simulate('blur', { target: { value: '£1' } });
    expect(onChangeSpy).toBeCalledWith('1.00', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1.00');
  });
});
