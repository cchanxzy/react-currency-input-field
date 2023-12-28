import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput/> negative value', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle negative value input', () => {
    render(
      <CurrencyInput
        id={id}
        prefix="$"
        onValueChange={onValueChangeSpy}
        decimalScale={2}
        defaultValue={123}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$123.00');

    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), '-1234');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('-1234', undefined, {
      float: -1234,
      formatted: '-$1,234',
      value: '-1234',
    });

    expect(screen.getByRole('textbox')).toHaveValue('-$1,234');
  });

  it('should call onValueChange with undefined and keep "-" sign as state value', () => {
    render(
      <CurrencyInput
        id={id}
        prefix="$"
        onValueChange={onValueChangeSpy}
        decimalScale={2}
        defaultValue={123}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$123.00');

    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), '-');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    expect(screen.getByRole('textbox')).toHaveValue('-');
  });

  it('should not call onBlur if only negative sign and clears value', () => {
    render(
      <CurrencyInput
        id={id}
        prefix="$"
        onValueChange={onValueChangeSpy}
        decimalScale={2}
        defaultValue={123}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$123.00');

    userEvent.type(
      screen.getByRole('textbox'),
      '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}-'
    );
    expect(screen.getByRole('textbox')).toHaveValue('-');
    expect(onValueChangeSpy).toHaveBeenCalledTimes(7);
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    fireEvent.focusOut(screen.getByRole('textbox'));
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should not allow negative value if allowNegativeValue is false', () => {
    render(
      <CurrencyInput
        id={id}
        prefix="$"
        onValueChange={onValueChangeSpy}
        allowNegativeValue={false}
        defaultValue={123}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$123');

    userEvent.clear(screen.getByRole('textbox'));
    userEvent.type(screen.getByRole('textbox'), '-1234');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234', undefined, {
      float: 1234,
      formatted: '$1,234',
      value: '1234',
    });

    expect(screen.getByRole('textbox')).toHaveValue('$1,234');
  });
});
