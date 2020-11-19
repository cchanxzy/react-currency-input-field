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

    expect(view.update().find(`#${id}`).prop('value')).toBe('£1,500');
  });

  it('should allow abbreviated values with m', () => {
    const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '£2.123M' } });
    expect(onChangeSpy).toBeCalledWith('2123000', undefined);

    expect(view.update().find(`#${id}`).prop('value')).toBe('£2,123,000');
  });

  it('should allow abbreviated values with b', () => {
    const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '£1.599B' } });
    expect(onChangeSpy).toBeCalledWith('1599000000', undefined);

    expect(view.update().find(`#${id}`).prop('value')).toBe('£1,599,000,000');
  });

  it('should not abbreviate any other letters', () => {
    const view = shallow(<CurrencyInput id={id} prefix="£" onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: '£1.5e' } });
    expect(onChangeSpy).toBeCalledWith('1.5', undefined);

    expect(view.update().find(`#${id}`).prop('value')).toBe('£1.5');
  });

  it('should not allow abbreviation without number', () => {
    const view = shallow(<CurrencyInput id={id} onChange={onChangeSpy} />);
    view.find(`#${id}`).simulate('change', { target: { value: 'k' } });
    expect(onChangeSpy).toBeCalledWith(undefined, undefined);
    expect(view.update().find(`#${id}`).prop('value')).toBe('');

    view.find(`#${id}`).simulate('change', { target: { value: 'M' } });
    expect(onChangeSpy).toBeCalledWith(undefined, undefined);
    expect(view.update().find(`#${id}`).prop('value')).toBe('');
  });

  describe('turnOffAbbreviations', () => {
    it('should not allow abbreviations if turnOffAbbreviations is true', () => {
      const view = shallow(<CurrencyInput id={id} onChange={onChangeSpy} turnOffAbbreviations />);
      view.find(`#${id}`).simulate('change', { target: { value: '1k' } });
      expect(view.update().find(`#${id}`).prop('value')).toBe('1');

      view.find(`#${id}`).simulate('change', { target: { value: '23m' } });
      expect(onChangeSpy).toBeCalledWith('23', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('23');

      view.find(`#${id}`).simulate('change', { target: { value: '55b' } });
      expect(onChangeSpy).toBeCalledWith('55', undefined);
      expect(view.update().find(`#${id}`).prop('value')).toBe('55');
    });
  });
});
