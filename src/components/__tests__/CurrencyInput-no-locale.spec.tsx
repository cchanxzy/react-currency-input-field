import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CurrencyInput from '../CurrencyInput';
import { getLocaleConfig } from '../utils';

jest.mock('../utils/getLocaleConfig', () => ({
  getLocaleConfig: jest.fn().mockReturnValue({ groupSeparator: ',', decimalSeparator: '.' }),
}));

describe('<CurrencyInput/> no locale', () => {
  it('should have empty string for groupSeparator and decimalSeparator if not passed in and cannot find default locale', () => {
    (getLocaleConfig as jest.Mock).mockReturnValue({ groupSeparator: '', decimalSeparator: '' });
    render(<CurrencyInput value="123456789" />);
    expect(screen.getByRole('textbox')).toHaveValue('123456789');
  });
});
