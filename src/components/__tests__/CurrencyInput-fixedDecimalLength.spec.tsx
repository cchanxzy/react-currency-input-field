import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> fixedDecimalLength', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fixedDecimalLength', () => {
    it('should convert value on blur if fixedDecimalLength specified', () => {
      render(
        <CurrencyInput
          prefix="$"
          onValueChange={onValueChangeSpy}
          fixedDecimalLength={3}
          decimalScale={3}
          defaultValue={123}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('$123.000');

      // delete .000
      userEvent.type(screen.getByRole('textbox'), '{backspace}{backspace}{backspace}{backspace}');

      fireEvent.focusOut(screen.getByRole('textbox'));

      expect(onValueChangeSpy).toBeCalledWith('1.230', undefined);

      expect(screen.getByRole('textbox')).toHaveValue('$1.230');
    });

    it('should work with decimalScale and decimalSeparator', () => {
      render(
        <CurrencyInput
          prefix="$"
          onValueChange={onValueChangeSpy}
          fixedDecimalLength={3}
          decimalSeparator="."
          decimalScale={3}
          defaultValue={123}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('$123.000');

      // delete .00
      userEvent.type(screen.getByRole('textbox'), '{backspace}{backspace}');
      fireEvent.focusOut(screen.getByRole('textbox'));

      expect(onValueChangeSpy).toBeCalledWith('123.0', undefined);

      expect(screen.getByRole('textbox')).toHaveValue('$123.000');
    });
  });
});
