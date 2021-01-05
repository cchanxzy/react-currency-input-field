import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> abbreviated', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should allow abbreviated values with k', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), '1.5k');

    expect(onValueChangeSpy).toBeCalledWith('1500', undefined);

    expect(screen.getByRole('textbox')).toHaveValue('£1,500');
  });

  it('should allow abbreviated values with m', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} decimalsLimit={3} />);
    userEvent.type(screen.getByRole('textbox'), '2.123M');
    userEvent.tab();

    expect(screen.getByRole('textbox')).toHaveValue('£2,123,000');

    expect(onValueChangeSpy).toBeCalledWith('2123000', undefined);
  });

  it('should allow abbreviated values with b', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} decimalsLimit={3} />);
    userEvent.type(screen.getByRole('textbox'), '1.599B');

    expect(onValueChangeSpy).toBeCalledWith('1599000000', undefined);

    expect(screen.getByRole('textbox')).toHaveValue('£1,599,000,000');
  });

  it('should not abbreviate any other letters', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), '1.5e');

    expect(onValueChangeSpy).toBeCalledWith('1.5', undefined);

    expect(screen.getByRole('textbox')).toHaveValue('£1.5');
  });

  it('should not allow abbreviation without number', () => {
    render(<CurrencyInput onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), 'k');

    expect(onValueChangeSpy).toBeCalledWith(undefined, undefined);

    expect(screen.getByRole('textbox')).toHaveValue('');

    userEvent.type(screen.getByRole('textbox'), 'M');

    expect(onValueChangeSpy).toBeCalledWith(undefined, undefined);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  describe('disableAbbreviations', () => {
    it('should not allow abbreviations if disableAbbreviations is true', () => {
      render(<CurrencyInput onValueChange={onValueChangeSpy} disableAbbreviations />);
      userEvent.type(screen.getByRole('textbox'), '1k');

      expect(screen.getByRole('textbox')).toHaveValue('1');

      userEvent.clear(screen.getByRole('textbox'));
      userEvent.type(screen.getByRole('textbox'), '23m');

      expect(onValueChangeSpy).toBeCalledWith('23', undefined);

      expect(screen.getByRole('textbox')).toHaveValue('23');

      userEvent.clear(screen.getByRole('textbox'));
      userEvent.type(screen.getByRole('textbox'), '55b');

      expect(onValueChangeSpy).toBeCalledWith('55', undefined);

      expect(screen.getByRole('textbox')).toHaveValue('55');
    });
  });
});
