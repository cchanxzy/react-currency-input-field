import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

const name = 'inputName';

describe('<CurrencyInput/> separators', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not include separator if turned off', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        name={name}
        prefix="£"
        disableGroupSeparators={true}
        onValueChange={onValueChangeSpy}
        defaultValue={10000}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£10000');

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '123456');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123456', name, {
      float: 123456,
      formatted: '£123456',
      value: '123456',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£123456');
  });

  it('should handle decimal and group separators passed in', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        name={name}
        prefix="£"
        decimalSeparator=","
        groupSeparator="."
        onValueChange={onValueChangeSpy}
      />
    );

    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), '123456,33');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123456,33', name, {
      float: 123456.33,
      formatted: '£123.456,33',
      value: '123456,33',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£123.456,33');
  });

  it('should keep a comma decimal separator if group separators are disabled', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        name={name}
        decimalSeparator=","
        disableGroupSeparators={true}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.type(screen.getByRole('textbox'), '1,5');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1,5', name, {
      float: 1.5,
      formatted: '1,5',
      value: '1,5',
    });

    expect(screen.getByRole('textbox')).toHaveValue('1,5');
  });

  it('should still remove the group separator from a paste if group separators are disabled', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput name={name} disableGroupSeparators={true} onValueChange={onValueChangeSpy} />
    );

    await user.click(screen.getByRole('textbox'));

    await user.paste('1,234');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234', name, {
      float: 1234,
      formatted: '1234',
      value: '1234',
    });

    expect(screen.getByRole('textbox')).toHaveValue('1234');
  });

  describe('deleting a comma decimal separator if group separators are disabled', () => {
    const deleteChar = async (user: UserEvent, key: '{Backspace}' | '{Delete}', caret: number) => {
      const input = screen.getByRole<HTMLInputElement>('textbox');
      input.setSelectionRange(caret, caret);
      await user.type(input, key, { initialSelectionStart: caret, initialSelectionEnd: caret });
    };

    const renderWithCommaDecimal = async (user: UserEvent) => {
      render(
        <CurrencyInput
          name={name}
          decimalSeparator=","
          disableGroupSeparators={true}
          onValueChange={onValueChangeSpy}
        />
      );
      await user.type(screen.getByRole('textbox'), '1,5');
    };

    it('should only remove the decimal separator with Backspace', async () => {
      const user = userEvent.setup();
      await renderWithCommaDecimal(user);
      await deleteChar(user, '{Backspace}', 2);

      expect(screen.getByRole('textbox')).toHaveValue('15');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('15', name, {
        float: 15,
        formatted: '15',
        value: '15',
      });
    });

    it('should only remove the decimal separator with Delete', async () => {
      const user = userEvent.setup();
      await renderWithCommaDecimal(user);
      await deleteChar(user, '{Delete}', 1);

      expect(screen.getByRole('textbox')).toHaveValue('15');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('15', name, {
        float: 15,
        formatted: '15',
        value: '15',
      });
    });
  });

  it('should read a pasted comma as the decimal separator if it is also the locale group separator', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        name={name}
        decimalSeparator=","
        disableGroupSeparators={true}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.click(screen.getByRole('textbox'));

    await user.paste('1,000');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1,00', name, {
      float: 1,
      formatted: '1,00',
      value: '1,00',
    });
  });

  describe('throwing errors', () => {
    // Ensure console error fails tests by replacing with a function that throws
    const { error: originalError } = console;

    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation((...args) => {
        originalError(...args);
      });
    });

    beforeEach(() => {
      (console.error as jest.Mock).mockImplementation(jest.fn());
    });

    afterAll(() => {
      (console.error as jest.Mock).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.Mock).mockClear();
    });

    it('should throw error if decimalSeparator and groupSeparator are the same', () => {
      expect(() =>
        render(<CurrencyInput name={name} prefix="£" decimalSeparator="," groupSeparator="," />)
      ).toThrow('decimalSeparator cannot be the same as groupSeparator');
      expect(console.error).toHaveBeenCalled();
    });

    it('should throw error if decimalSeparator and default groupSeparator are the same', () => {
      expect(() => render(<CurrencyInput name={name} prefix="£" decimalSeparator="," />)).toThrow(
        'decimalSeparator cannot be the same as groupSeparator'
      );
      expect(console.error).toHaveBeenCalled();
    });

    it('should NOT throw error if decimalSeparator and default groupSeparator are the same but disableGroupSeparators is true', () => {
      expect(() =>
        render(
          <CurrencyInput
            name={name}
            prefix="£"
            decimalSeparator=","
            disableGroupSeparators={true}
          />
        )
      ).not.toThrow('decimalSeparator cannot be the same as groupSeparator');
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should throw error if groupSeparator and default decimalSeparator are the same', () => {
      expect(() => render(<CurrencyInput name={name} prefix="£" groupSeparator="." />)).toThrow(
        'decimalSeparator cannot be the same as groupSeparator'
      );
      expect(console.error).toHaveBeenCalled();
    });

    it('should throw error if decimalSeparator is a number', () => {
      expect(() =>
        render(<CurrencyInput name={name} prefix="£" decimalSeparator={'1'} groupSeparator="," />)
      ).toThrow('decimalSeparator cannot be a number');
      expect(console.error).toHaveBeenCalled();
    });

    it('should throw error if groupSeparator is a number', () => {
      expect(() =>
        render(
          <CurrencyInput
            name={name}
            prefix="£"
            decimalSeparator="."
            groupSeparator={'2'}
            onValueChange={onValueChangeSpy}
            defaultValue={10000}
          />
        )
      ).toThrow('groupSeparator cannot be a number');
      expect(console.error).toHaveBeenCalled();
    });
  });
});
