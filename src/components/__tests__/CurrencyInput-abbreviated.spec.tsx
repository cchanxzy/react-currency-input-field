import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
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

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1500', undefined, {
      float: 1500,
      formatted: '£1,500',
      value: '1500',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£1,500');
  });

  it('should allow abbreviated values with m', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} decimalsLimit={3} />);
    userEvent.type(screen.getByRole('textbox'), '2.123M');
    fireEvent.focusOut(screen.getByRole('textbox'));

    expect(screen.getByRole('textbox')).toHaveValue('£2,123,000');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('2123000', undefined, {
      float: 2123000,
      formatted: '£2,123,000',
      value: '2123000',
    });
  });

  it('should allow abbreviated values with b', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} decimalsLimit={3} />);
    userEvent.type(screen.getByRole('textbox'), '1.599B');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1599000000', undefined, {
      float: 1599000000,
      formatted: '£1,599,000,000',
      value: '1599000000',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£1,599,000,000');
  });

  it('should not abbreviate any other letters', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), '1.5e');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1.5', undefined, {
      float: 1.5,
      formatted: '£1.5',
      value: '1.5',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£1.5');
  });

  it('should not allow abbreviation without number', () => {
    render(<CurrencyInput onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), 'k');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    expect(screen.getByRole('textbox')).toHaveValue('');

    userEvent.type(screen.getByRole('textbox'), 'M');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  describe('disableAbbreviations', () => {
    it('should not allow abbreviations if disableAbbreviations is true', () => {
      render(<CurrencyInput onValueChange={onValueChangeSpy} disableAbbreviations />);
      userEvent.type(screen.getByRole('textbox'), '1k');

      expect(screen.getByRole('textbox')).toHaveValue('1');

      userEvent.clear(screen.getByRole('textbox'));
      userEvent.type(screen.getByRole('textbox'), '23m');

      expect(onValueChangeSpy).toHaveBeenLastCalledWith('23', undefined, {
        float: 23,
        formatted: '23',
        value: '23',
      });

      expect(screen.getByRole('textbox')).toHaveValue('23');

      userEvent.clear(screen.getByRole('textbox'));
      userEvent.type(screen.getByRole('textbox'), '55b');

      expect(onValueChangeSpy).toHaveBeenLastCalledWith('55', undefined, {
        float: 55,
        formatted: '55',
        value: '55',
      });

      expect(screen.getByRole('textbox')).toHaveValue('55');
    });
  });
});
