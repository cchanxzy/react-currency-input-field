import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import CurrencyInput from '../CurrencyInput';

const name = 'inputName';

describe('<CurrencyInput/> onBlur', () => {
  const onBlurSpy = jest.fn();
  const onValueChangeSpyWithValue = jest.fn((value) => value);
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

  it('should be have maximum value with maximum limit after focusout', () => {
    render(
      <CurrencyInput
        name={name}
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpyWithValue}
        placeholder="Please enter a number"
        prefix={'$'}
        max={100}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1000000000' } });
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toBeCalled();
    expect(onValueChangeSpyWithValue).toHaveReturnedWith('100');

    expect(screen.getByRole('textbox')).toHaveValue('$100');
  });

  const minMaxLimitations = [
    {
      value: '1000000000',
      onValueReturnWith: '10000000',
      expectValue: '10.000.000',
      min: '100',
      max: '10000000',
      intlConfig: { locale: 'de-DE' },
    },
    {
      value: '100000',
      onValueReturnWith: '10000',
      expectValue: '10.000',
      min: '100',
      max: '10000',
      intlConfig: { locale: 'de-DE' },
    },
    {
      value: '99,99',
      onValueReturnWith: '99,99',
      expectValue: '99,99',
      min: '10',
      max: '100',
      intlConfig: { locale: 'de-DE' },
    },
    {
      value: '100000',
      onValueReturnWith: '124,22',
      expectValue: '124,22',
      min: '100',
      max: '124,22',
      intlConfig: { locale: 'de-DE' },
    },
    {
      value: '10',
      onValueReturnWith: '100,01',
      expectValue: '100,01',
      min: '100,01',
      max: '124,22',
      intlConfig: { locale: 'de-DE' },
    },
    {
      value: '10',
      onValueReturnWith: '100.01',
      expectValue: '100.01',
      min: '100.01',
      max: '124.22',
      intlConfig: { locale: 'en-US' },
    },
    {
      value: '-1000',
      onValueReturnWith: '100.01',
      expectValue: '100.01',
      min: '100.01',
      max: '124.22',
      intlConfig: { locale: 'en-US' },
    },
  ];

  it.each(minMaxLimitations)('should be not exceed the limits %s', (item) => {
    render(
      <CurrencyInput
        name={name}
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpyWithValue}
        placeholder="Please enter a number"
        min={item.min}
        max={item.max}
        intlConfig={item.intlConfig}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: item.value } });
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toBeCalled();
    expect(onValueChangeSpyWithValue).toHaveReturnedWith(item.onValueReturnWith);
    expect(screen.getByRole('textbox')).toHaveValue(item.expectValue);
  });
});
