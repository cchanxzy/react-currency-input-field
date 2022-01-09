import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> backspace', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle backspace with suffix', () => {
    render(
      <CurrencyInput
        onValueChange={onValueChangeSpy}
        intlConfig={{ locale: 'de-DE', currency: 'EUR' }}
        decimalsLimit={5}
        defaultValue="12,34"
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('12,34\xa0€');

    userEvent.type(screen.getByRole('textbox'), '56');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('12,3456', undefined, {
      float: 12.3456,
      formatted: '12,3456 €',
      value: '12,3456',
    });
    expect(screen.getByRole('textbox')).toHaveValue('12,3456\xa0€');

    userEvent.type(screen.getByRole('textbox'), '{backspace}{backspace}{backspace}');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('12,3', undefined, {
      float: 12.3,
      formatted: '12,3 €',
      value: '12,3',
    });
    expect(screen.getByRole('textbox')).toHaveValue('12,3\xa0€');
  });

  it('should handle backspace with default value and decimal scale', () => {
    render(
      <CurrencyInput
        defaultValue="1"
        onValueChange={onValueChangeSpy}
        decimalScale={2}
        prefix="£"
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£1.00');

    userEvent.type(screen.getByRole('textbox'), '{backspace}');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1.0', undefined, {
      float: 1,
      formatted: '£1.0',
      value: '1.0',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£1.0');

    userEvent.type(screen.getByRole('textbox'), '{backspace}');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1.', undefined, {
      float: 1,
      formatted: '£1.',
      value: '1.',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£1.');

    userEvent.type(screen.getByRole('textbox'), '{backspace}');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1', undefined, {
      float: 1,
      formatted: '£1',
      value: '1',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£1');

    userEvent.type(screen.getByRole('textbox'), '{backspace}');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should handle Del key without moving cursor', () => {
    render(
      <CurrencyInput
        defaultValue=""
        onValueChange={onValueChangeSpy}
        groupSeparator={','}
        decimalScale={2}
        prefix="$"
      />
    );

    userEvent.type(screen.getByRole('textbox'), '123456789');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123456789', undefined, {
      float: 123456789,
      formatted: '$123,456,789',
      value: '123456789',
    });
    expect(screen.getByRole('textbox')).toHaveValue('$123,456,789');

    userEvent.type(screen.getByRole('textbox'), '{arrowleft}{arrowleft}{arrowleft}{del}');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('12345689', undefined, {
      float: 12345689,
      formatted: '$12,345,689',
      value: '12345689',
    });
    expect(screen.getByRole('textbox')).toHaveValue('$12,345,689');
  });

  it('should handle backspace character when no prefix', () => {
    render(<CurrencyInput prefix="" defaultValue="12345" groupSeparator="," />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12,345');

    userEvent.type(input, '{arrowleft}{arrowleft}{arrowleft}{backspace}');

    expect(input).toHaveValue('1,345');
  });

  it('should handle delete character left of group separator correctly', () => {
    render(<CurrencyInput prefix="£" defaultValue="1234" groupSeparator="," />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('£1,234');

    userEvent.type(input, '{arrowleft}{arrowleft}{arrowleft}{arrowleft}{del}');

    expect(input).toHaveValue('£134');
  });

  it('should handle backspace at the beginning of the input when prefix exists', () => {
    render(<CurrencyInput prefix="£" defaultValue="12345" groupSeparator="," />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('£12,345');

    userEvent.type(
      input,
      '{backspace}{arrowleft}{arrowleft}{arrowleft}{backspace}{backspace}{backspace}'
    );

    expect(input).toHaveValue('£234');
  });

  it('should handle backspace at the beginning of the input when no prefix exists', () => {
    render(<CurrencyInput prefix="" defaultValue="12345" groupSeparator="," />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('12,345');

    userEvent.type(
      input,
      '{backspace}{arrowleft}{arrowleft}{arrowleft}{backspace}{backspace}{backspace}'
    );

    expect(input).toHaveValue('234');
  });
});
