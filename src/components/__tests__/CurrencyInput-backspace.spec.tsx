import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> backspace', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle backspace with suffix', () => {
    render(
      <CurrencyInput
        onValueChange={onValueChangeSpy}
        intlConfig={{ locale: 'de-DE', currency: 'EUR' }}
        decimalsLimit={5}
        defaultValue="12,34"
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('12,34\xa0€');

    userEvent.type(screen.getByRole('textbox'), '56');

    expect(screen.getByRole('textbox')).toHaveValue('12,3456\xa0€');

    userEvent.type(screen.getByRole('textbox'), '{backspace}{backspace}{backspace}');

    expect(screen.getByRole('textbox')).toHaveValue('12,3\xa0€');
  });

  it('should handle backspace with default value and decimal scale', () => {
    render(
      <CurrencyInput
        defaultValue="1"
        onValueChange={onValueChangeSpy}
        decimalScale={2}
        prefix="£"
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£1.00');

    userEvent.type(screen.getByRole('textbox'), '{backspace}');
    expect(screen.getByRole('textbox')).toHaveValue('£1.0');

    userEvent.type(screen.getByRole('textbox'), '{backspace}');
    expect(screen.getByRole('textbox')).toHaveValue('£1.');

    userEvent.type(screen.getByRole('textbox'), '{backspace}');
    expect(screen.getByRole('textbox')).toHaveValue('£1');

    userEvent.type(screen.getByRole('textbox'), '{backspace}');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
