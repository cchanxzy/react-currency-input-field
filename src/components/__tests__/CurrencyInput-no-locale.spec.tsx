import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../CurrencyInput';
import { getLocaleConfig } from '../utils';

jest.mock('../utils/getLocaleConfig', () => ({
  getLocaleConfig: jest.fn().mockReturnValue({ groupSeparator: ',', decimalSeparator: '.' }),
}));

const id = 'validationCustom01';

describe('<CurrencyInput /> component > no locale', () => {
  it('should have empty string for groupSeparator and decimalSeparator if not passed in and cannot find default locale', () => {
    (getLocaleConfig as jest.Mock).mockReturnValue({ groupSeparator: '', decimalSeparator: '' });
    const view = shallow(<CurrencyInput id={id} value="123456789" />);
    expect(view.find(`#${id}`).prop('value')).toBe('123456789');
  });
});
