import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> fixedDecimalLength', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fixedDecimalLength', () => {
    it('should convert value on blur if fixedDecimalLength specified', async () => {
      const user = userEvent.setup();
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
      await user.type(screen.getByRole('textbox'), '{Backspace}{Backspace}{Backspace}{Backspace}');

      await user.tab();

      expect(onValueChangeSpy).toHaveBeenLastCalledWith('1.230', undefined, {
        float: 1.23,
        formatted: '$1.230',
        value: '1.230',
      });

      expect(screen.getByRole('textbox')).toHaveValue('$1.230');
    });

    it('should work with decimalScale and decimalSeparator', async () => {
      const user = userEvent.setup();
      render(
        <CurrencyInput
          prefix="$"
          onValueChange={onValueChangeSpy}
          fixedDecimalLength={2}
          decimalSeparator="."
          defaultValue={1}
          decimalScale={2}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('$1.00');

      // delete .00
      await user.type(screen.getByRole('textbox'), '{Backspace}{Backspace}');
      await user.type(screen.getByRole('textbox'), '23');
      await user.tab();

      expect(onValueChangeSpy).toHaveBeenLastCalledWith('1.23', undefined, {
        float: 1.23,
        formatted: '$1.23',
        value: '1.23',
      });

      expect(screen.getByRole('textbox')).toHaveValue('$1.23');
    });
  });
});
