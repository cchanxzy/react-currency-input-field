import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CurrencyInput from '../CurrencyInput';

const name = 'inputName';

describe('<CurrencyInput/> onBlur', () => {
  const onBlurSpy = jest.fn();
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onBlur and onValueChange', () => {
    render(
      <CurrencyInput
        name={name}
        prefix="$"
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpy}
        decimalScale={2}
      />
    );

    userEvent.type(screen.getByRole('textbox'), '123');
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toBeCalled();

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123.00', name, {
      float: 123,
      formatted: '$123.00',
      value: '123.00',
    });

    expect(screen.getByRole('textbox')).toHaveValue('$123.00');
  });

  it('should call onBlur for 0', () => {
    render(<CurrencyInput name={name} prefix="$" onBlur={onBlurSpy} />);

    userEvent.type(screen.getByRole('textbox'), '0');
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toBeCalled();

    expect(screen.getByRole('textbox')).toHaveValue('$0');
  });

  it('should call onBlur for empty value', () => {
    render(<CurrencyInput name={name} prefix="$" onBlur={onBlurSpy} />);

    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toBeCalled();

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should call onBlur for "-" char', () => {
    render(<CurrencyInput name={name} prefix="$" onBlur={onBlurSpy} />);

    userEvent.type(screen.getByRole('textbox'), '-');
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toBeCalled();

    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
