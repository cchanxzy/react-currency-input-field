import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> decimalScale', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pad to decimalScale of 5 on blur', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} decimalScale={5} />);

    userEvent.type(screen.getByRole('textbox'), '1.5');
    userEvent.tab();
    expect(onValueChangeSpy).toBeCalledWith('1.50000', undefined);

    expect(screen.getByRole('textbox')).toHaveValue('£1.50000');
  });

  it('should pad to decimalScale of 2 on blur', () => {
    const onBlurSpy = jest.fn();
    render(
      <CurrencyInput
        prefix="£"
        onValueChange={onValueChangeSpy}
        onBlur={onBlurSpy}
        decimalScale={2}
      />
    );

    userEvent.type(screen.getByRole('textbox'), '1');
    userEvent.tab();
    expect(onBlurSpy).toBeCalled();

    expect(onValueChangeSpy).toBeCalledWith('1.00', undefined);

    expect(screen.getByRole('textbox')).toHaveValue('£1.00');
  });
});
