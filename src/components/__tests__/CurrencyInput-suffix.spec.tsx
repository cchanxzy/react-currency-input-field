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

  it('should handle custom suffix', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput onValueChange={onValueChangeSpy} suffix=" €" defaultValue="1234" />);

    expect(screen.getByRole('textbox')).toHaveValue('1,234 €');

    await user.type(screen.getByRole('textbox'), '56');

    expect(screen.getByRole('textbox')).toHaveValue('123,456 €');

    await user.keyboard('{Backspace}{Backspace}{Backspace}');

    expect(screen.getByRole('textbox')).toHaveValue('123 €');
  });

  it('should handle custom prefix and suffix', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput onValueChange={onValueChangeSpy} prefix="$" suffix=" %" defaultValue="1234" />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$1,234 %');

    await user.type(screen.getByRole('textbox'), '56');

    expect(screen.getByRole('textbox')).toHaveValue('$123,456 %');

    await user.keyboard('{Backspace}{Backspace}');

    expect(screen.getByRole('textbox')).toHaveValue('$1,234 %');

    await user.type(screen.getByRole('textbox'), '.9');

    expect(screen.getByRole('textbox')).toHaveValue('$1,234.9 %');
  });
});
