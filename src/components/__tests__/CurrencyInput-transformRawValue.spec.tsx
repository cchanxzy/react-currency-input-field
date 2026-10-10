import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> transformRawValue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should transform the value', async () => {
    const user = userEvent.setup();
    const onValueChangeSpy = jest.fn();

    render(
      <CurrencyInput
        prefix="$"
        transformRawValue={(rawValue) => rawValue.replace(/,$/, '.')}
        onValueChange={onValueChangeSpy}
        decimalScale={2}
      />
    );

    await user.type(screen.getByRole('textbox'), '1234,5');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234.5', undefined, {
      float: 1234.5,
      formatted: '$1,234.5',
      value: '1234.5',
    });

    expect(screen.getByRole('textbox')).toHaveValue('$1,234.5');
  });

  it('should read the prefix position from the transformed value', async () => {
    const user = userEvent.setup();
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

    await user.click(screen.getByRole('textbox'));

    await user.paste('12$');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('12', undefined, {
      float: 12,
      formatted: '$12',
      value: '12',
    });

    expect(screen.getByRole('textbox')).toHaveValue('$12');
  });

  it('should receive the raw input value with the prefix and group separators', async () => {
    const user = userEvent.setup();
    const transformRawValueSpy = jest.fn((rawValue: string) => rawValue);

    render(<CurrencyInput prefix="$" transformRawValue={transformRawValueSpy} />);

    await user.type(screen.getByRole('textbox'), '12345');

    expect(transformRawValueSpy).toHaveBeenCalledWith('1');
    expect(transformRawValueSpy).toHaveBeenCalledWith('$12');
    expect(transformRawValueSpy).toHaveBeenCalledWith('$1,2345');
    expect(screen.getByRole('textbox')).toHaveValue('$12,345');
  });

  it('should not change the value with an identity function', async () => {
    const user = userEvent.setup();
    const onValueChangeSpy = jest.fn();

    render(
      <CurrencyInput
        prefix="$"
        transformRawValue={(rawValue) => rawValue}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.type(screen.getByRole('textbox'), '1234.5');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234.5', undefined, {
      float: 1234.5,
      formatted: '$1,234.5',
      value: '1234.5',
    });
    expect(screen.getByRole('textbox')).toHaveValue('$1,234.5');
  });

  it('should strip characters from the raw value before cleaning it', async () => {
    const user = userEvent.setup();
    const onValueChangeSpy = jest.fn();

    render(
      <CurrencyInput
        transformRawValue={(rawValue) => rawValue.replace(/-/g, '')}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.type(screen.getByRole('textbox'), '-1234');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234', undefined, {
      float: 1234,
      formatted: '1,234',
      value: '1234',
    });
    expect(screen.getByRole('textbox')).toHaveValue('1,234');
  });

  it('should transform the value with intlConfig', async () => {
    const user = userEvent.setup();
    const onValueChangeSpy = jest.fn();

    render(
      <CurrencyInput
        intlConfig={{ locale: 'de-DE', currency: 'EUR' }}
        transformRawValue={(rawValue) => rawValue.replace('.', ',')}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.click(screen.getByRole('textbox'));
    await user.paste('1234.5');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234,5', undefined, {
      float: 1234.5,
      formatted: '1.234,5\u00a0€',
      value: '1234,5',
    });
    expect(screen.getByRole('textbox')).toHaveValue('1.234,5\u00a0€');
  });

  it('should transform a pasted value', async () => {
    const user = userEvent.setup();
    const onValueChangeSpy = jest.fn();
    const transformRawValueSpy = jest.fn((rawValue: string) => rawValue.replace(/ /g, ''));

    render(
      <CurrencyInput
        prefix="£"
        transformRawValue={transformRawValueSpy}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.click(screen.getByRole('textbox'));
    await user.paste('1 234 567');

    expect(transformRawValueSpy).toHaveBeenCalledWith('1 234 567');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234567', undefined, {
      float: 1234567,
      formatted: '£1,234,567',
      value: '1234567',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£1,234,567');
  });
});
