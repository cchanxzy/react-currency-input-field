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

  it('should allow abbreviated values with k', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '1.5k');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1500', undefined, {
      float: 1500,
      formatted: '£1,500',
      value: '1500',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£1,500');
  });

  it('should allow abbreviated values with m', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} decimalsLimit={3} />);
    await user.type(screen.getByRole('textbox'), '2.123M');
    await user.tab();

    expect(screen.getByRole('textbox')).toHaveValue('£2,123,000');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('2123000', undefined, {
      float: 2123000,
      formatted: '£2,123,000',
      value: '2123000',
    });
  });

  it('should allow abbreviated values with b', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} decimalsLimit={3} />);
    await user.type(screen.getByRole('textbox'), '1.599B');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1599000000', undefined, {
      float: 1599000000,
      formatted: '£1,599,000,000',
      value: '1599000000',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£1,599,000,000');
  });

  it('should handle 4.1m without floating-point precision issues', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '4.1m');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('4100000', undefined, {
      float: 4100000,
      formatted: '£4,100,000',
      value: '4100000',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£4,100,000');
  });

  it('should handle other problematic decimal abbreviations', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="$" onValueChange={onValueChangeSpy} decimalsLimit={3} />);

    await user.type(screen.getByRole('textbox'), '1.025m');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1025000', undefined, {
      float: 1025000,
      formatted: '$1,025,000',
      value: '1025000',
    });
    expect(screen.getByRole('textbox')).toHaveValue('$1,025,000');

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '2.1k');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('2100', undefined, {
      float: 2100,
      formatted: '$2,100',
      value: '2100',
    });
    expect(screen.getByRole('textbox')).toHaveValue('$2,100');
  });

  it('should apply decimalsLimit to a pasted abbreviation', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} decimalsLimit={2} />);
    await user.click(screen.getByRole('textbox'));
    await user.paste('1.2345678k');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234.56', undefined, {
      float: 1234.56,
      formatted: '£1,234.56',
      value: '1234.56',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£1,234.56');
  });

  it('should expand abbreviations with a comma decimal separator', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        decimalSeparator=","
        groupSeparator="."
        decimalsLimit={4}
        onValueChange={onValueChangeSpy}
      />
    );
    await user.click(screen.getByRole('textbox'));
    await user.paste('1,2345k');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234.5', undefined, {
      float: 1234.5,
      formatted: '1.234,5',
      value: '1234.5',
    });
    expect(screen.getByRole('textbox')).toHaveValue('1.234,5');

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '4,1m');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('4100000', undefined, {
      float: 4100000,
      formatted: '4.100.000',
      value: '4100000',
    });
    expect(screen.getByRole('textbox')).toHaveValue('4.100.000');
  });

  it.each(['0k', '0.0k', '00m'])('should expand %s to 0', async (typed) => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), typed);

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('0', undefined, {
      float: 0,
      formatted: '£0',
      value: '0',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£0');

    await user.tab();
    expect(screen.getByRole('textbox')).toHaveValue('£0');
  });

  it('should not abbreviate any other letters', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '1.5e');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1.5', undefined, {
      float: 1.5,
      formatted: '£1.5',
      value: '1.5',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£1.5');
  });

  it('should not allow abbreviation without number', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), 'k');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    expect(screen.getByRole('textbox')).toHaveValue('');

    await user.type(screen.getByRole('textbox'), 'M');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  describe('disableAbbreviations', () => {
    it('should not allow abbreviations if disableAbbreviations is true', async () => {
      const user = userEvent.setup();
      render(<CurrencyInput onValueChange={onValueChangeSpy} disableAbbreviations />);
      await user.type(screen.getByRole('textbox'), '1k');

      expect(screen.getByRole('textbox')).toHaveValue('1');

      await user.clear(screen.getByRole('textbox'));
      await user.type(screen.getByRole('textbox'), '23m');

      expect(onValueChangeSpy).toHaveBeenLastCalledWith('23', undefined, {
        float: 23,
        formatted: '23',
        value: '23',
      });

      expect(screen.getByRole('textbox')).toHaveValue('23');

      await user.clear(screen.getByRole('textbox'));
      await user.type(screen.getByRole('textbox'), '55b');

      expect(onValueChangeSpy).toHaveBeenLastCalledWith('55', undefined, {
        float: 55,
        formatted: '55',
        value: '55',
      });

      expect(screen.getByRole('textbox')).toHaveValue('55');
    });
  });
});
