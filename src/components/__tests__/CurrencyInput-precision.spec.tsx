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

  it('should pad to decimalScale of 5 on blur', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} decimalScale={5} />);

    await user.type(screen.getByRole('textbox'), '1.5');
    await user.tab();

    expect(onValueChangeSpy).toBeCalledWith('1.50000', undefined, {
      float: 1.5,
      formatted: '£1.50000',
      value: '1.50000',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£1.50000');
  });

  it('should pad to decimalScale of 2 on blur', async () => {
    const user = userEvent.setup();
    const onBlurSpy = jest.fn();
    render(
      <CurrencyInput
        prefix="£"
        onValueChange={onValueChangeSpy}
        onBlur={onBlurSpy}
        decimalScale={2}
      />
    );

    await user.type(screen.getByRole('textbox'), '1');
    await user.tab();

    expect(onBlurSpy).toBeCalled();

    expect(onValueChangeSpy).toBeCalledWith('1.00', undefined, {
      float: 1,
      formatted: '£1.00',
      value: '1.00',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£1.00');
  });
});
