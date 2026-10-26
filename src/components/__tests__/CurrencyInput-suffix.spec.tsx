import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';
import type { CurrencyInputProps } from '../CurrencyInputProps';

describe('<CurrencyInput/> suffix', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle custom suffix', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput onValueChange={onValueChangeSpy} suffix=" €" defaultValue="1234" />);

    expect(screen.getByRole('textbox')).toHaveValue('1,234 €');

    await user.type(screen.getByRole('textbox'), '56');

    expect(screen.getByRole('textbox')).toHaveValue('123,456 €');

    await user.keyboard('{Backspace}{Backspace}{Backspace}');

    expect(screen.getByRole('textbox')).toHaveValue('123 €');
  });

  it('should handle custom prefix and suffix', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput onValueChange={onValueChangeSpy} prefix="$" suffix=" %" defaultValue="1234" />
    );

    expect(screen.getByRole('textbox')).toHaveValue('$1,234 %');

    await user.type(screen.getByRole('textbox'), '56');

    expect(screen.getByRole('textbox')).toHaveValue('$123,456 %');

    await user.keyboard('{Backspace}{Backspace}');

    expect(screen.getByRole('textbox')).toHaveValue('$1,234 %');

    await user.type(screen.getByRole('textbox'), '.9');

    expect(screen.getByRole('textbox')).toHaveValue('$1,234.9 %');
  });

  describe.each([
    ['" kg"', { suffix: ' kg' }, '12', '12 kg'],
    ['" MB"', { suffix: ' MB' }, '10', '10 MB'],
    ['" -EUR"', { suffix: ' -EUR' }, '5', '5 -EUR'],
    ['" kg" with decimals', { suffix: ' kg' }, '1234.5', '1,234.5 kg'],
    [
      'a plural currency name',
      { intlConfig: { locale: 'en-GB', currency: 'GBP', currencyDisplay: 'name' } },
      '5',
      '5 British pounds',
    ],
    [
      'a singular currency name',
      { intlConfig: { locale: 'en-GB', currency: 'GBP', currencyDisplay: 'name' } },
      '1',
      '1 British pound',
    ],
  ] as const)('suffix %s', (_name, props, typed, expected) => {
    it('should keep the value after typing and blurring twice', async () => {
      const user = userEvent.setup();
      render(<CurrencyInput {...props} onValueChange={onValueChangeSpy} />);

      await user.type(screen.getByRole('textbox'), typed);

      expect(screen.getByRole('textbox')).toHaveValue(expected);
      expect(onValueChangeSpy).toHaveBeenLastCalledWith(
        typed,
        undefined,
        expect.objectContaining({ value: typed, float: Number(typed) })
      );

      await user.tab();
      expect(screen.getByRole('textbox')).toHaveValue(expected);

      await user.click(screen.getByRole('textbox'));
      await user.tab();
      expect(screen.getByRole('textbox')).toHaveValue(expected);
    });
  });

  it('should keep the decimals of a nb-NO value typed before the currency', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput intlConfig={{ locale: 'nb-NO', currency: 'NOK' }} />);

    await user.type(screen.getByRole('textbox'), '12,5');

    expect(screen.getByRole('textbox')).toHaveValue('12,5\u00a0kr');

    await user.tab();

    expect(screen.getByRole('textbox')).toHaveValue('12,5\u00a0kr');
  });

  it('should ignore the letters of a pasted value with text before the number', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput onValueChange={onValueChangeSpy} />);

    await user.click(screen.getByRole('textbox'));
    await user.paste('Balance: 100');

    expect(screen.getByRole('textbox')).toHaveValue('100');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('100', undefined, {
      float: 100,
      formatted: '100',
      value: '100',
    });
  });

  it('should read a pasted abbreviation without a leading digit', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput onValueChange={onValueChangeSpy} />);

    await user.click(screen.getByRole('textbox'));
    await user.paste('.5k');

    expect(screen.getByRole('textbox')).toHaveValue('500');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('500', undefined, {
      float: 500,
      formatted: '500',
      value: '500',
    });
  });

  it('should not move the caret when the value does not end with the custom suffix', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput suffix=" kg" />);

    await user.type(screen.getByRole('textbox'), '-.');
    await user.keyboard('{ArrowLeft}');

    expect(screen.getByRole('textbox')).toHaveValue('-.');
    expect(screen.getByRole<HTMLInputElement>('textbox').selectionStart).toBe(1);
  });

  it('should not move the caret to the start when the value cannot be formatted', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput decimalSeparator="-" groupSeparator="," />);

    await user.type(screen.getByRole('textbox'), '-1');

    expect(screen.getByRole('textbox')).toHaveValue('NaN');
    expect(screen.getByRole<HTMLInputElement>('textbox').selectionStart).toBe(3);
  });

  it('should call transformRawValue once per change', async () => {
    const user = userEvent.setup();
    const transformRawValue = jest.fn((rawValue: string) => rawValue);
    render(<CurrencyInput transformRawValue={transformRawValue} />);

    await user.type(screen.getByRole('textbox'), '12');

    expect(transformRawValue.mock.calls.map(([rawValue]) => rawValue)).toEqual(['1', '12']);
  });

  it('should keep typed decimals before the group separator left by a custom prefix in sv-SE', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="$" intlConfig={{ locale: 'sv-SE', currency: 'SEK' }} />);

    await user.type(screen.getByRole('textbox'), '1234,5');

    expect(screen.getByRole('textbox')).toHaveValue('$1\u00a0234,5\u00a0');
  });

  describe('abbreviations typed after a displayed suffix', () => {
    const nbsp = '\u00a0';
    const name = (locale: string, currency: string) =>
      ({ intlConfig: { locale, currency, currencyDisplay: 'name' } }) as const;

    it.each([
      ['a singular currency name', name('en-US', 'USD'), '1', 'k', '1,000 US dollars', '1000'],
      ['a plural currency name', name('en-GB', 'GBP'), '5', 'k', '5,000 British pounds', '5000'],
      [
        'another plural form of a currency name',
        name('ru-RU', 'RUB'),
        '2',
        'k',
        `2${nbsp}000 российских рублей`,
        '2000',
      ],
      [
        'a currency name with m',
        name('en-US', 'USD'),
        '1.5',
        'm',
        '1,500,000 US dollars',
        '1500000',
      ],
      [
        'a currency symbol',
        { intlConfig: { locale: 'sv-SE', currency: 'SEK' } },
        '1',
        'k',
        `1${nbsp}000${nbsp}kr`,
        '1000',
      ],
      [
        'a currency code',
        { intlConfig: { locale: 'de-DE', currency: 'EUR', currencyDisplay: 'code' } } as const,
        '1',
        'k',
        `1.000${nbsp}EUR`,
        '1000',
      ],
    ])(
      'should expand an abbreviation typed after %s',
      async (_name, props, typed, abbr, expected, value) => {
        const user = userEvent.setup();
        render(<CurrencyInput {...props} onValueChange={onValueChangeSpy} />);

        await user.type(screen.getByRole('textbox'), typed);
        await user.type(screen.getByRole('textbox'), abbr);

        expect(screen.getByRole('textbox')).toHaveValue(expected);
        expect(onValueChangeSpy).toHaveBeenLastCalledWith(
          value,
          undefined,
          expect.objectContaining({ value, float: Number(value), formatted: expected })
        );
      }
    );

    it('should expand an abbreviation typed after a singular currency name in a controlled input', async () => {
      const user = userEvent.setup();
      const Controlled = (props: CurrencyInputProps) => {
        const [value, setValue] = React.useState<string | undefined>('');
        return (
          <CurrencyInput
            {...props}
            value={value}
            onValueChange={(newValue, inputName, values) => {
              onValueChangeSpy(newValue, inputName, values);
              setValue(newValue);
            }}
          />
        );
      };
      render(<Controlled {...name('en-US', 'USD')} />);

      await user.type(screen.getByRole('textbox'), '1');
      expect(screen.getByRole('textbox')).toHaveValue('1 US dollar');

      await user.type(screen.getByRole('textbox'), 'k');

      expect(screen.getByRole('textbox')).toHaveValue('1,000 US dollars');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith(
        '1000',
        undefined,
        expect.objectContaining({ value: '1000', float: 1000 })
      );
    });

    it.each([
      ['padded to decimalScale', { decimalScale: 2, defaultValue: '1' }, '1.00 US dollars'],
      ['trimmed to decimalScale', { decimalScale: 0, defaultValue: '1.5' }, '1 US dollars'],
    ])(
      'should expand an abbreviation typed after a currency name %s',
      async (_name, props, rendered) => {
        const user = userEvent.setup();
        render(
          <CurrencyInput {...name('en-US', 'USD')} {...props} onValueChange={onValueChangeSpy} />
        );

        expect(screen.getByRole('textbox')).toHaveValue(rendered);

        await user.type(screen.getByRole('textbox'), 'k');

        expect(screen.getByRole('textbox')).toHaveValue('1,000 US dollars');
        expect(onValueChangeSpy).toHaveBeenLastCalledWith(
          '1000',
          undefined,
          expect.objectContaining({ value: '1000', float: 1000 })
        );
      }
    );

    it('should expand an abbreviation typed after a currency name padded to decimalScale in ru-RU', async () => {
      const user = userEvent.setup();
      render(
        <CurrencyInput
          {...name('ru-RU', 'RUB')}
          decimalScale={2}
          defaultValue="1"
          onValueChange={onValueChangeSpy}
        />
      );

      expect(screen.getByRole('textbox')).toHaveValue('1,00 российского рубля');

      await user.type(screen.getByRole('textbox'), 'k');

      expect(screen.getByRole('textbox')).toHaveValue(`1${nbsp}000 российских рублей`);
      expect(onValueChangeSpy).toHaveBeenLastCalledWith(
        '1000',
        undefined,
        expect.objectContaining({ value: '1000', float: 1000 })
      );
    });

    it('should expand an abbreviation typed after a currency name padded to decimalScale in a controlled input', async () => {
      const user = userEvent.setup();
      const Controlled = () => {
        const [value, setValue] = React.useState<string | undefined>('1');
        return (
          <CurrencyInput
            {...name('en-US', 'USD')}
            decimalScale={2}
            value={value}
            onValueChange={(newValue) => setValue(newValue)}
          />
        );
      };
      render(<Controlled />);

      expect(screen.getByRole('textbox')).toHaveValue('1.00 US dollars');

      await user.type(screen.getByRole('textbox'), 'k');

      expect(screen.getByRole('textbox')).toHaveValue('1,000 US dollars');
    });

    it.each([
      ['en-US', name('en-US', 'USD'), '1234', '1,234 US dollars', 5],
      ['ru-RU', name('ru-RU', 'RUB'), '1234', `1${nbsp}234 российских рубля`, 5],
      ['pl-PL', name('pl-PL', 'PLN'), '1234', '1234 złote polskie', 4],
    ])(
      'should keep the caret after the digits while the plural form of the name changes in %s',
      async (_locale, props, typed, expected, caret) => {
        const user = userEvent.setup();
        render(<CurrencyInput {...props} onValueChange={onValueChangeSpy} />);

        await user.type(screen.getByRole('textbox'), typed);

        expect(screen.getByRole('textbox')).toHaveValue(expected);
        expect(screen.getByRole<HTMLInputElement>('textbox').selectionStart).toBe(caret);
        expect(onValueChangeSpy).toHaveBeenLastCalledWith(
          '1234',
          undefined,
          expect.objectContaining({ value: '1234', float: 1234 })
        );
      }
    );

    it('should keep the caret after the digits when the plural form of the name shrinks', async () => {
      const user = userEvent.setup();
      render(<CurrencyInput {...name('en-US', 'USD')} onValueChange={onValueChangeSpy} />);

      await user.type(screen.getByRole('textbox'), '12');
      await user.keyboard('{Backspace}');

      expect(screen.getByRole('textbox')).toHaveValue('1 US dollar');
      expect(screen.getByRole<HTMLInputElement>('textbox').selectionStart).toBe(1);

      await user.keyboard('3');

      expect(screen.getByRole('textbox')).toHaveValue('13 US dollars');
    });

    it('should keep the value after blurring with a singular currency name', async () => {
      const user = userEvent.setup();
      render(<CurrencyInput {...name('en-US', 'USD')} onValueChange={onValueChangeSpy} />);

      await user.type(screen.getByRole('textbox'), '1');
      await user.tab();

      expect(screen.getByRole('textbox')).toHaveValue('1 US dollar');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith(
        '1',
        undefined,
        expect.objectContaining({ value: '1', float: 1 })
      );
    });
  });
});
