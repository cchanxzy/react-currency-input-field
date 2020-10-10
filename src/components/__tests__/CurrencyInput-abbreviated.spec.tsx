import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput /> component > abbreviated', () => {
  const onChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

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

  it('should not abbreviate any other letters', () => {
    const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '£1.5e' } });
    expect(onChangeSpy).toBeCalledWith('1.5', undefined);

    const updatedView = view.update();
    expect(updatedView.find(`#${id}`).prop('value')).toBe('£1.5');
  });
});
