import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> maxLength', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not allow more values than max length', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput prefix="£" onValueChange={onValueChangeSpy} maxLength={3} defaultValue={123} />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£123');

    await user.type(screen.getByRole('textbox'), '4');
    expect(onValueChangeSpy).not.toBeCalled();

    expect(screen.getByRole('textbox')).toHaveValue('£123');
  });

  it('should apply max length rule to negative value', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        prefix="£"
        onValueChange={onValueChangeSpy}
        maxLength={3}
        defaultValue={-123}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('-£123');

    await user.type(screen.getByRole('textbox'), '4');
    expect(onValueChangeSpy).not.toBeCalled();
    expect(screen.getByRole('textbox')).toHaveValue('-£123');

    await user.type(screen.getByRole('textbox'), '{Backspace}5');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('-125', undefined, {
      float: -125,
      formatted: '-£125',
      value: '-125',
    });
    expect(screen.getByRole('textbox')).toHaveValue('-£125');
  });
});
