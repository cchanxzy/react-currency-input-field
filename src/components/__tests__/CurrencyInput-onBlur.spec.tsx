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

  it('should be have maximum value with maximum limit after focusout without prefix', () => {
    render(
      <CurrencyInput
        name={name}
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpyWithValue}
        placeholder="Please enter a number"
        max={10000}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1000000000' } });
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toBeCalled();
    expect(onValueChangeSpyWithValue).toHaveReturnedWith('10000');
    expect(screen.getByRole('textbox')).toHaveValue('10,000');
  });

  it('should be have maximum value with maximum limit after focusout without prefix', () => {
    render(
      <CurrencyInput
        name={name}
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpyWithValue}
        max={10000}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1000000000' } });
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toBeCalled();
    expect(onValueChangeSpyWithValue).toHaveReturnedWith('10000');
    expect(screen.getByRole('textbox')).toHaveValue('10,000');
  });

  it('should be have minimum value with minimum limit after focusout without prefix', () => {
    render(
      <CurrencyInput
        name={name}
        onBlur={onBlurSpy}
        onValueChange={onValueChangeSpyWithValue}
        min={1000}
        max={90000}
      />
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '1' } });
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(onBlurSpy).toBeCalled();
    expect(onValueChangeSpyWithValue).toHaveReturnedWith('1000');
    expect(screen.getByRole('textbox')).toHaveValue('1,000');
  });
});
