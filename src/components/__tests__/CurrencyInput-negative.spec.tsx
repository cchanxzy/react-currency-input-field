import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

const id = 'validationCustom01';

describe('<CurrencyInput/> negative value', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle negative value input', async () => {
    const user = userEvent.setup();
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

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '-1234');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('-1234', undefined, {
      float: -1234,
      formatted: '-$1,234',
      value: '-1234',
    });

    expect(screen.getByRole('textbox')).toHaveValue('-$1,234');
  });

  it('should call onValueChange with undefined and keep "-" sign as state value', async () => {
    const user = userEvent.setup();
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

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '-');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    expect(screen.getByRole('textbox')).toHaveValue('-');
  });

  it('should not call onBlur if only negative sign and clears value', async () => {
    const user = userEvent.setup();
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

    await user.type(
      screen.getByRole('textbox'),
      '{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}-'
    );
    expect(screen.getByRole('textbox')).toHaveValue('-');
    expect(onValueChangeSpy).toHaveBeenCalledTimes(7);
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    await user.tab();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should not allow negative value if allowNegativeValue is false', async () => {
    const user = userEvent.setup();
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

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '-1234');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234', undefined, {
      float: 1234,
      formatted: '$1,234',
      value: '1234',
    });

    expect(screen.getByRole('textbox')).toHaveValue('$1,234');
  });

  it('should not show a lone minus sign if allowNegativeValue is false', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput id={id} onValueChange={onValueChangeSpy} allowNegativeValue={false} />);

    await user.type(screen.getByRole('textbox'), '-');

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(onValueChangeSpy).toHaveBeenCalledTimes(1);
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    await user.type(screen.getByRole('textbox'), '5');

    expect(screen.getByRole('textbox')).toHaveValue('5');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('5', undefined, {
      float: 5,
      formatted: '5',
      value: '5',
    });
  });
});

describe('<CurrencyInput/> minus sign followed by the decimal separator', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const emptyValues = { float: null, formatted: '', value: '' };

  it('should keep "-." as typed without a prefix', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput onValueChange={onValueChangeSpy} />);

    await user.type(screen.getByRole('textbox'), '-.');

    expect(screen.getByRole('textbox')).toHaveValue('-.');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, emptyValues);
    expect(onValueChangeSpy).not.toHaveBeenCalledWith('-.', undefined, expect.anything());

    await user.type(screen.getByRole('textbox'), '5');

    expect(screen.getByRole('textbox')).toHaveValue('-0.5');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('-.5', undefined, {
      float: -0.5,
      formatted: '-0.5',
      value: '-.5',
    });
  });

  it('should keep "-." as typed for en-US', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        intlConfig={{ locale: 'en-US', currency: 'USD' }}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.type(screen.getByRole('textbox'), '-.');

    expect(screen.getByRole('textbox')).toHaveValue('-.');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, emptyValues);

    await user.type(screen.getByRole('textbox'), '5');

    expect(screen.getByRole('textbox')).toHaveValue('-$0.5');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('-.5', undefined, {
      float: -0.5,
      formatted: '-$0.5',
      value: '-.5',
    });
  });

  it('should keep "-," as typed for de-DE', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        intlConfig={{ locale: 'de-DE', currency: 'EUR' }}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.type(screen.getByRole('textbox'), '-,');

    expect(screen.getByRole('textbox')).toHaveValue('-,');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, emptyValues);

    await user.type(screen.getByRole('textbox'), '5');

    expect(screen.getByRole('textbox')).toHaveValue('-0,5 €');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('-,5', undefined, {
      float: -0.5,
      formatted: '-0,5 €',
      value: '-,5',
    });
  });

  it('should clear "-." on blur', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput onValueChange={onValueChangeSpy} />);

    await user.type(screen.getByRole('textbox'), '-.');
    await user.tab();

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should show the decimal separator alone if allowNegativeValue is false', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        intlConfig={{ locale: 'de-DE', currency: 'EUR' }}
        allowNegativeValue={false}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.type(screen.getByRole('textbox'), '-,');

    expect(screen.getByRole('textbox')).toHaveValue(',');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, emptyValues);
  });

  it('should show the minus sign alone if allowDecimals is false', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        intlConfig={{ locale: 'en-US', currency: 'USD' }}
        allowDecimals={false}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.type(screen.getByRole('textbox'), '-.');

    expect(screen.getByRole('textbox')).toHaveValue('-');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, emptyValues);
  });
});
