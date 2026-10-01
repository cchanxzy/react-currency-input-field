import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CurrencyInput from '../CurrencyInput';

const name = 'inputName';

describe('<CurrencyInput/> onBlur', () => {
  const onBlurSpy = jest.fn();
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call onBlur and onValueChange', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        name={name}
        prefix="$"
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpy}
        decimalScale={2}
      />
    );

    await user.type(screen.getByRole('textbox'), '123');
    await user.tab();

    expect(onBlurSpy).toHaveBeenCalled();

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123.00', name, {
      float: 123,
      formatted: '$123.00',
      value: '123.00',
    });

    expect(screen.getByRole('textbox')).toHaveValue('$123.00');
  });

  it('should call onBlur, but not onValueChange', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        name={name}
        prefix="$"
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpy}
        formatValueOnBlur={false}
        decimalScale={2}
      />
    );

    await user.type(screen.getByRole('textbox'), '123');
    await user.tab();

    expect(onBlurSpy).toHaveBeenCalled();

    expect(onValueChangeSpy).toHaveBeenCalledTimes(3);
    expect(screen.getByRole('textbox')).toHaveValue('$123.00');
  });

  it('should call onBlur for 0', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput name={name} prefix="$" onBlur={onBlurSpy} />);

    await user.type(screen.getByRole('textbox'), '0');
    await user.tab();

    expect(onBlurSpy).toHaveBeenCalled();

    expect(screen.getByRole('textbox')).toHaveValue('$0');
  });

  it('should call onBlur for empty value', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput name={name} prefix="$" onBlur={onBlurSpy} />);

    await user.click(screen.getByRole('textbox'));
    await user.tab();

    expect(onBlurSpy).toHaveBeenCalled();

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should call onBlur for "-" char', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput name={name} prefix="$" onBlur={onBlurSpy} />);

    await user.type(screen.getByRole('textbox'), '-');
    await user.tab();

    expect(onBlurSpy).toHaveBeenCalled();

    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
