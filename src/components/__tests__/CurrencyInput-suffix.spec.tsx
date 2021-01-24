import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> suffix', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle custom suffix', () => {
    render(<CurrencyInput onValueChange={onValueChangeSpy} suffix=" €" defaultValue="1234" />);

    expect(screen.getByRole('textbox')).toHaveValue('1,234 €');

    userEvent.type(screen.getByRole('textbox'), '56');

    expect(screen.getByRole('textbox')).toHaveValue('123,456 €');

    userEvent.type(screen.getByRole('textbox'), '{backspace}{backspace}{backspace}');

    expect(screen.getByRole('textbox')).toHaveValue('123 €');
  });

  it('should handle custom prefix and suffix', () => {
    render(
      <CurrencyInput onValueChange={onValueChangeSpy} prefix="$" suffix=" %" defaultValue="1234" />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$1,234 %');

    userEvent.type(screen.getByRole('textbox'), '56');

    expect(screen.getByRole('textbox')).toHaveValue('$123,456 %');

    userEvent.type(screen.getByRole('textbox'), '{backspace}{backspace}');

    expect(screen.getByRole('textbox')).toHaveValue('$1,234 %');

    userEvent.type(screen.getByRole('textbox'), '.9');

    expect(screen.getByRole('textbox')).toHaveValue('$1,234.9 %');
  });
});
