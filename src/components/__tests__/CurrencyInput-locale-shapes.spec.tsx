import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CurrencyInput from '../CurrencyInput';
import type { CurrencyInputProps } from '../CurrencyInputProps';

const nbsp = '\u00a0';
const rlm = '\u200f';
const lrm = '\u200e';
const minus = '\u2212';

/** [value passed as prop, expected display] */
type DisplayCase = [string, string];
/** [text typed, expected display, expected `value`, expected `float`] */
type TypingCase = [string, string, string, number];

type Shape = {
  name: string;
  props: Partial<CurrencyInputProps>;
  /** Controlled and default values that display correctly. */
  display: ReadonlyArray<DisplayCase>;
  /** Digits, decimals and negatives typed into an empty input. */
  typing: ReadonlyArray<TypingCase>;
  /** Abbreviations typed into an empty input. */
  abbreviations: ReadonlyArray<TypingCase>;
  /** Expected displays after ArrowUp and ArrowDown from a value of 10. */
  stepping?: [string, string];
};

const shapes: ReadonlyArray<Shape> = [
  {
    name: 'en-US / USD (symbol before, "." decimal, "," group)',
    props: { intlConfig: { locale: 'en-US', currency: 'USD' } },
    display: [
      ['1234', '$1,234'],
      ['1234.56', '$1,234.56'],
      ['1234567', '$1,234,567'],
      ['-1234', '-$1,234'],
    ],
    typing: [
      ['1234', '$1,234', '1234', 1234],
      ['1234567', '$1,234,567', '1234567', 1234567],
      ['12.34', '$12.34', '12.34', 12.34],
      ['-1234', '-$1,234', '-1234', -1234],
      ['-12.5', '-$12.5', '-12.5', -12.5],
    ],
    abbreviations: [
      ['1k', '$1,000', '1000', 1000],
      ['2.5m', '$2,500,000', '2500000', 2500000],
    ],
    stepping: ['$11', '$9'],
  },
  {
    name: 'en-GB / GBP (symbol before, "." decimal, "," group)',
    props: { intlConfig: { locale: 'en-GB', currency: 'GBP' } },
    display: [
      ['1234', '£1,234'],
      ['1234.56', '£1,234.56'],
      ['1234567', '£1,234,567'],
      ['-1234', '-£1,234'],
    ],
    typing: [
      ['1234', '£1,234', '1234', 1234],
      ['1234567', '£1,234,567', '1234567', 1234567],
      ['12.34', '£12.34', '12.34', 12.34],
      ['-1234', '-£1,234', '-1234', -1234],
      ['-12.5', '-£12.5', '-12.5', -12.5],
    ],
    abbreviations: [
      ['1k', '£1,000', '1000', 1000],
      ['2.5m', '£2,500,000', '2500000', 2500000],
    ],
    stepping: ['£11', '£9'],
  },
  {
    name: 'de-DE / EUR (symbol after, "," decimal, "." group)',
    props: { intlConfig: { locale: 'de-DE', currency: 'EUR' } },
    display: [
      ['1234', `1.234${nbsp}€`],
      ['1234.56', `1.234,56${nbsp}€`],
      ['1234567', `1.234.567${nbsp}€`],
      ['-1234', `-1.234${nbsp}€`],
    ],
    typing: [
      ['1234', `1.234${nbsp}€`, '1234', 1234],
      ['1234567', `1.234.567${nbsp}€`, '1234567', 1234567],
      ['12,34', `12,34${nbsp}€`, '12,34', 12.34],
      ['-1234', `-1.234${nbsp}€`, '-1234', -1234],
      ['-12,5', `-12,5${nbsp}€`, '-12,5', -12.5],
    ],
    abbreviations: [
      ['1k', `1.000${nbsp}€`, '1000', 1000],
      ['2,5m', `2.500.000${nbsp}€`, '2500000', 2500000],
    ],
    stepping: [`11${nbsp}€`, `9${nbsp}€`],
  },
  {
    name: 'en-IN / INR (lakh grouping)',
    props: { intlConfig: { locale: 'en-IN', currency: 'INR' } },
    display: [
      ['1234', '₹1,234'],
      ['1234.56', '₹1,234.56'],
      ['1234567', '₹12,34,567'],
      ['-1234', '-₹1,234'],
    ],
    typing: [
      ['1234', '₹1,234', '1234', 1234],
      ['1234567', '₹12,34,567', '1234567', 1234567],
      ['12.34', '₹12.34', '12.34', 12.34],
      ['-1234', '-₹1,234', '-1234', -1234],
      ['-12.5', '-₹12.5', '-12.5', -12.5],
    ],
    abbreviations: [
      ['1k', '₹1,000', '1000', 1000],
      ['2.5m', '₹25,00,000', '2500000', 2500000],
    ],
    stepping: ['₹11', '₹9'],
  },
  {
    name: 'he-IL / ILS (right-to-left with bidi marks)',
    props: { intlConfig: { locale: 'he-IL', currency: 'ILS' } },
    display: [
      ['1234', `${rlm}1,234${nbsp}${rlm}₪`],
      ['1234.56', `${rlm}1,234.56${nbsp}${rlm}₪`],
      ['1234567', `${rlm}1,234,567${nbsp}${rlm}₪`],
      ['-1234', `${rlm}${lrm}-1,234${nbsp}${rlm}₪`],
    ],
    typing: [
      ['1234', `${rlm}1,234${nbsp}${rlm}₪`, '1234', 1234],
      ['1234567', `${rlm}1,234,567${nbsp}${rlm}₪`, '1234567', 1234567],
      ['12.34', `${rlm}12.34${nbsp}${rlm}₪`, '12.34', 12.34],
      ['-1234', `${rlm}${lrm}-1,234${nbsp}${rlm}₪`, '-1234', -1234],
      ['-12.5', `${rlm}${lrm}-12.5${nbsp}${rlm}₪`, '-12.5', -12.5],
    ],
    abbreviations: [
      ['1k', `${rlm}1,000${nbsp}${rlm}₪`, '1000', 1000],
      ['2.5m', `${rlm}2,500,000${nbsp}${rlm}₪`, '2500000', 2500000],
    ],
    stepping: [`${rlm}11${nbsp}${rlm}₪`, `${rlm}9${nbsp}${rlm}₪`],
  },
  {
    // Typing is not pinned: the "kr" suffix is read as an abbreviation.
    name: 'sv-SE / SEK (space before the symbol is also the group separator)',
    props: { intlConfig: { locale: 'sv-SE', currency: 'SEK' } },
    display: [
      ['1234', `1${nbsp}234${nbsp}kr`],
      ['1234567', `1${nbsp}234${nbsp}567${nbsp}kr`],
      ['12345', `12${nbsp}345${nbsp}kr`],
    ],
    typing: [],
    abbreviations: [],
  },
  {
    // Typed negatives are not pinned: the sign is dropped.
    name: 'fi-FI / EUR (negatives use U+2212)',
    props: { intlConfig: { locale: 'fi-FI', currency: 'EUR' } },
    display: [
      ['1234', `1${nbsp}234${nbsp}€`],
      ['1234.56', `1${nbsp}234,56${nbsp}€`],
      ['1234567', `1${nbsp}234${nbsp}567${nbsp}€`],
      ['-1234', `${minus}1${nbsp}234${nbsp}€`],
    ],
    typing: [
      ['1234', `1${nbsp}234${nbsp}€`, '1234', 1234],
      ['1234567', `1${nbsp}234${nbsp}567${nbsp}€`, '1234567', 1234567],
      ['12,34', `12,34${nbsp}€`, '12,34', 12.34],
    ],
    abbreviations: [
      ['1k', `1${nbsp}000${nbsp}€`, '1000', 1000],
      ['2,5m', `2${nbsp}500${nbsp}000${nbsp}€`, '2500000', 2500000],
    ],
    stepping: [`11${nbsp}€`, `9${nbsp}€`],
  },
  {
    // Integers only: values with decimals and abbreviations are not pinned.
    name: 'ja-JP / JPY (zero-decimal currency)',
    props: { intlConfig: { locale: 'ja-JP', currency: 'JPY' } },
    display: [
      ['1234', '￥1,234'],
      ['1234567', '￥1,234,567'],
      ['-1234', '-￥1,234'],
    ],
    typing: [
      ['1234', '￥1,234', '1234', 1234],
      ['1234567', '￥1,234,567', '1234567', 1234567],
      ['-1234', '-￥1,234', '-1234', -1234],
    ],
    abbreviations: [],
    stepping: ['￥11', '￥9'],
  },
  {
    // Grouping is only pinned up to 4 digits: es-ES has no group separator below 5 digits.
    name: 'es-ES / EUR (grouping only from 5 digits)',
    props: { intlConfig: { locale: 'es-ES', currency: 'EUR' } },
    display: [
      ['1234', `1234${nbsp}€`],
      ['1234.56', `1234,56${nbsp}€`],
      ['-1234', `-1234${nbsp}€`],
    ],
    typing: [
      ['1234', `1234${nbsp}€`, '1234', 1234],
      ['12,34', `12,34${nbsp}€`, '12,34', 12.34],
      ['-1234', `-1234${nbsp}€`, '-1234', -1234],
      ['-12,5', `-12,5${nbsp}€`, '-12,5', -12.5],
    ],
    abbreviations: [['1k', `1000${nbsp}€`, '1000', 1000]],
    stepping: [`11${nbsp}€`, `9${nbsp}€`],
  },
  {
    name: 'custom prefix and separators, no intlConfig',
    props: { prefix: '£', decimalSeparator: '.', groupSeparator: ',' },
    display: [
      ['1234', '£1,234'],
      ['1234.56', '£1,234.56'],
      ['1234567', '£1,234,567'],
      ['-1234', '-£1,234'],
    ],
    typing: [
      ['1234', '£1,234', '1234', 1234],
      ['1234567', '£1,234,567', '1234567', 1234567],
      ['12.34', '£12.34', '12.34', 12.34],
      ['-1234', '-£1,234', '-1234', -1234],
      ['-12.5', '-£12.5', '-12.5', -12.5],
    ],
    abbreviations: [
      ['1k', '£1,000', '1000', 1000],
      ['2.5m', '£2,500,000', '2500000', 2500000],
    ],
    stepping: ['£11', '£9'],
  },
];

const getInput = (): HTMLInputElement => screen.getByRole('textbox');

describe('<CurrencyInput/> currency shapes', () => {
  const onValueChangeSpy = jest.fn();

  const lastValues = () => {
    const { calls } = onValueChangeSpy.mock;
    return calls[calls.length - 1][2];
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.each(shapes)('$name', ({ props, display, typing, abbreviations, stepping }) => {
    if (display.length > 0) {
      it.each(display)('displays controlled value %s as expected', (value, expected) => {
        render(<CurrencyInput {...props} value={value} />);

        expect(getInput()).toHaveValue(expected);
      });

      it.each(display)('displays default value %s as expected', (value, expected) => {
        render(<CurrencyInput {...props} defaultValue={value} />);

        expect(getInput()).toHaveValue(expected);
      });
    }

    if (typing.length > 0) {
      it.each(typing)(
        'formats typed text %s and reports the value',
        (text, expected, value, float) => {
          render(<CurrencyInput {...props} onValueChange={onValueChangeSpy} />);

          userEvent.type(getInput(), text);

          expect(getInput()).toHaveValue(expected);
          expect(lastValues()).toEqual({ value, float, formatted: expected });

          fireEvent.blur(getInput());

          expect(getInput()).toHaveValue(expected);
        }
      );

      it.each(typing)('keeps the display after blurring twice for %s', (text, expected) => {
        render(<CurrencyInput {...props} />);

        userEvent.type(getInput(), text);
        fireEvent.blur(getInput());
        const afterFirstBlur = getInput().value;
        fireEvent.focus(getInput());
        fireEvent.blur(getInput());

        expect(afterFirstBlur).toBe(expected);
        expect(getInput()).toHaveValue(expected);
      });
    }

    if (abbreviations.length > 0) {
      it.each(abbreviations)('expands abbreviation %s', (text, expected, value, float) => {
        render(<CurrencyInput {...props} onValueChange={onValueChangeSpy} />);

        userEvent.type(getInput(), text);

        expect(getInput()).toHaveValue(expected);
        expect(lastValues()).toEqual({ value, float, formatted: expected });

        fireEvent.blur(getInput());

        expect(getInput()).toHaveValue(expected);
      });
    }

    if (stepping) {
      const [up, down] = stepping;

      it('increases an integer value with ArrowUp', () => {
        render(<CurrencyInput {...props} defaultValue="10" step={1} />);

        userEvent.type(getInput(), '{arrowup}');

        expect(getInput()).toHaveValue(up);
      });

      it('decreases an integer value with ArrowDown', () => {
        render(<CurrencyInput {...props} defaultValue="10" step={1} />);

        userEvent.type(getInput(), '{arrowdown}');

        expect(getInput()).toHaveValue(down);
      });
    }
  });

  describe('es-ES / EUR', () => {
    it('reports the float of a 7-digit abbreviation', () => {
      render(
        <CurrencyInput
          intlConfig={{ locale: 'es-ES', currency: 'EUR' }}
          onValueChange={onValueChangeSpy}
        />
      );

      userEvent.type(getInput(), '2,5m');

      expect(lastValues()).toMatchObject({ value: '2500000', float: 2500000 });
    });
  });
});
