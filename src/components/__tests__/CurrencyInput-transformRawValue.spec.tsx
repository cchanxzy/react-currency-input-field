import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> transformRawValue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should transform the value', () => {
    const onValueChangeSpy = jest.fn();

    render(
      <CurrencyInput
        prefix="$"
        transformRawValue={(rawValue) => rawValue.replace(/,$/, '.')}
        onValueChange={onValueChangeSpy}
        decimalScale={2}
      />
    );

    userEvent.type(screen.getByRole('textbox'), '1234,5');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234.5', undefined, {
      float: 1234.5,
      formatted: '$1,234.5',
      value: '1234.5',
    });

    expect(screen.getByRole('textbox')).toHaveValue('$1,234.5');
  });

  it('should read the prefix position from the transformed value', () => {
    const onValueChangeSpy = jest.fn();
    const movePrefixToFront = (rawValue: string) =>
      rawValue.endsWith('$') ? `$${rawValue.slice(0, -1)}` : rawValue;

    render(
      <CurrencyInput
        prefix="$"
        transformRawValue={movePrefixToFront}
        onValueChange={onValueChangeSpy}
      />
    );

    userEvent.paste(screen.getByRole('textbox'), '12$');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('12', undefined, {
      float: 12,
      formatted: '$12',
      value: '12',
    });

    expect(screen.getByRole('textbox')).toHaveValue('$12');
  });
});
