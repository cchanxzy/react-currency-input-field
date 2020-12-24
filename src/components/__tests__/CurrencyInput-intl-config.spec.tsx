import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput/> intlConfig', () => {
  it('should use intl config settings (en-US, USD)', () => {
    render(
      <CurrencyInput id={id} intlConfig={{ locale: 'en-US', currency: 'USD' }} value="123456789" />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$123,456,789');
  });

  it('should use intl config settings (en-IN, INR)', () => {
    render(
      <CurrencyInput id={id} intlConfig={{ locale: 'en-IN', currency: 'INR' }} value="500000" />
    );

    expect(screen.getByRole('textbox')).toHaveValue('₹5,00,000');
  });

  it('should use intl config settings (ja-JP, JPY)', () => {
    render(
      <CurrencyInput id={id} intlConfig={{ locale: 'ja-JP', currency: 'JPY' }} value="123.456" />
    );

    expect(screen.getByRole('textbox')).toHaveValue('￥123');
  });

  it('should override locale currency symbol if prefix passed in', () => {
    render(
      <CurrencyInput
        id={id}
        intlConfig={{ locale: 'en-US', currency: 'USD' }}
        value="100"
        prefix="£"
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£100');
  });

  it('should override locale group separator if groupSeparator passed in', () => {
    render(
      <CurrencyInput
        id={id}
        intlConfig={{ locale: 'en-US', currency: 'USD' }}
        value="123456789.99"
        groupSeparator="/"
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$123/456/789.99');
  });

  it('should override locale decimal separator if decimalSeparator passed in', () => {
    render(
      <CurrencyInput
        id={id}
        intlConfig={{ locale: 'en-US', currency: 'USD' }}
        value="123456.789"
        decimalSeparator="-"
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$123,456-789');
  });

  describe('onValueChange', () => {
    const onValueChangeSpy = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should handle onValueChange with intl config settings (en-IN, INR)', () => {
      render(
        <CurrencyInput
          id={id}
          intlConfig={{ locale: 'en-IN', currency: 'INR' }}
          onValueChange={onValueChangeSpy}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('');

      userEvent.type(screen.getByRole('textbox'), '₹12,34,567');

      expect(onValueChangeSpy).toBeCalledWith('1234567', undefined);

      expect(screen.getByRole('textbox')).toHaveValue('₹12,34,567');
    });
  });
});
