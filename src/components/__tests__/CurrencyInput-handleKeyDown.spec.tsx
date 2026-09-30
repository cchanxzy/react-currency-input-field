import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> handleKeyDown', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not change value if no step prop', () => {
    render(<CurrencyInput prefix="£" defaultValue={100} onValueChange={onValueChangeSpy} />);

    // Arrow up
    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).not.toBeCalled();
    expect(screen.getByRole('textbox')).toHaveValue('£100');

    // Arrow down
    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).not.toBeCalled();
    expect(screen.getByRole('textbox')).toHaveValue('£100');
  });

  it('should handle negative step', () => {
    render(
      <CurrencyInput prefix="£" defaultValue={100} step={-2} onValueChange={onValueChangeSpy} />
    );

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('98', undefined, {
      float: 98,
      formatted: '£98',
      value: '98',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£98');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('100', undefined, {
      float: 100,
      formatted: '£100',
      value: '100',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£100');
  });

  describe('without value ie. default 0', () => {
    it('should handle arrow down key', () => {
      render(<CurrencyInput prefix="£" step={1} onValueChange={onValueChangeSpy} />);

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).toBeCalledWith('-1', undefined, {
        float: -1,
        formatted: '-£1',
        value: '-1',
      });
      expect(screen.getByRole('textbox')).toHaveValue('-£1');
    });

    it('should handle arrow down key', () => {
      render(<CurrencyInput prefix="£" step={1} onValueChange={onValueChangeSpy} />);

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).toBeCalledWith('1', undefined, {
        float: 1,
        formatted: '£1',
        value: '1',
      });
      expect(screen.getByRole('textbox')).toHaveValue('£1');
    });
  });

  describe('with value 99 and step 1.25', () => {
    it('should handle arrow down key', () => {
      render(<CurrencyInput prefix="£" value={99} step={1.25} onValueChange={onValueChangeSpy} />);

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('97.75', undefined, {
        float: 97.75,
        formatted: '£97.75',
        value: '97.75',
      });
    });

    it('should handle arrow up key', () => {
      render(<CurrencyInput prefix="£" value={99} step={1.25} onValueChange={onValueChangeSpy} />);

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('100.25', undefined, {
        float: 100.25,
        formatted: '£100.25',
        value: '100.25',
      });
    });
  });

  describe('with defaultValue 100 and step 5.5', () => {
    it('should handle arrow down key', () => {
      render(
        <CurrencyInput prefix="£" defaultValue={100} step={5.5} onValueChange={onValueChangeSpy} />
      );

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).toBeCalledWith('94.5', undefined, {
        float: 94.5,
        formatted: '£94.5',
        value: '94.5',
      });
      expect(screen.getByRole('textbox')).toHaveValue('£94.5');

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).toBeCalledWith('89.0', undefined, {
        float: 89,
        formatted: '£89.0',
        value: '89.0',
      });
      expect(screen.getByRole('textbox')).toHaveValue('£89.0');
    });

    it('should handle arrow up key', () => {
      render(
        <CurrencyInput prefix="£" defaultValue={100} step={5.5} onValueChange={onValueChangeSpy} />
      );

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).toBeCalledWith('105.5', undefined, {
        float: 105.5,
        formatted: '£105.5',
        value: '105.5',
      });
      expect(screen.getByRole('textbox')).toHaveValue('£105.5');

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).toBeCalledWith('111.0', undefined, {
        float: 111,
        formatted: '£111.0',
        value: '111.0',
      });
      expect(screen.getByRole('textbox')).toHaveValue('£111.0');
    });
  });

  describe('with max length 2', () => {
    it('should handle negative value', () => {
      render(
        <CurrencyInput
          prefix="£"
          defaultValue={-99}
          step={1}
          maxLength={2}
          onValueChange={onValueChangeSpy}
        />
      );

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).not.toBeCalled();
      expect(screen.getByRole('textbox')).toHaveValue('-£99');

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('-98', undefined, {
        float: -98,
        formatted: '-£98',
        value: '-98',
      });
      expect(screen.getByRole('textbox')).toHaveValue('-£98');
    });

    it('should handle positive value', () => {
      render(
        <CurrencyInput
          prefix="£"
          defaultValue={99}
          step={1}
          maxLength={2}
          onValueChange={onValueChangeSpy}
        />
      );

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).not.toBeCalled();
      expect(screen.getByRole('textbox')).toHaveValue('£99');

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('98', undefined, {
        float: 98,
        formatted: '£98',
        value: '98',
      });
      expect(screen.getByRole('textbox')).toHaveValue('£98');
    });
  });

  it('should handle going into negative value', () => {
    render(
      <CurrencyInput prefix="£" defaultValue={1.99} step={1} onValueChange={onValueChangeSpy} />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£1.99');

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('2.99', undefined, {
      float: 2.99,
      formatted: '£2.99',
      value: '2.99',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£2.99');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1.99', undefined, {
      float: 1.99,
      formatted: '£1.99',
      value: '1.99',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£1.99');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('0.99', undefined, {
      float: 0.99,
      formatted: '£0.99',
      value: '0.99',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£0.99');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('-0.01', undefined, {
      float: -0.01,
      formatted: '-£0.01',
      value: '-0.01',
    });
    expect(screen.getByRole('textbox')).toHaveValue('-£0.01');
  });

  it('should not go into negative value if disallowed', () => {
    render(
      <CurrencyInput
        prefix="£"
        defaultValue={1}
        decimalScale={2}
        step={1}
        allowNegativeValue={false}
        onValueChange={onValueChangeSpy}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£1.00');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('0', undefined, {
      float: 0,
      formatted: '£0',
      value: '0',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£0');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('0', undefined, {
      float: 0,
      formatted: '£0',
      value: '0',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£0');

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1', undefined, {
      float: 1,
      formatted: '£1',
      value: '1',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£1');
  });

  it('should not step below min if specified', () => {
    render(
      <CurrencyInput
        prefix="£"
        defaultValue={1}
        decimalScale={2}
        step={1}
        min={0}
        onValueChange={onValueChangeSpy}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£1.00');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('0', undefined, {
      float: 0,
      formatted: '£0',
      value: '0',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£0');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('0', undefined, {
      float: 0,
      formatted: '£0',
      value: '0',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£0');

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1', undefined, {
      float: 1,
      formatted: '£1',
      value: '1',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£1');
  });

  it('should not step below max if specified', () => {
    render(
      <CurrencyInput
        prefix="£"
        defaultValue={44}
        step={1}
        max={45}
        onValueChange={onValueChangeSpy}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£44');

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('45', undefined, {
      float: 45,
      formatted: '£45',
      value: '45',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£45');

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('45', undefined, {
      float: 45,
      formatted: '£45',
      value: '45',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£45');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('44', undefined, {
      float: 44,
      formatted: '£44',
      value: '44',
    });
    expect(screen.getByRole('textbox')).toHaveValue('£44');
  });

  it('should handle currencies without decimals when controlled', () => {
    const ControlledCurrencyInput = () => {
      const [value, setValue] = useState<number>();
      return (
        <CurrencyInput
          intlConfig={{ locale: 'ja-JP', currency: 'JPY' }}
          onValueChange={(value, name, values) => {
            setValue(values && values.float != null ? values.float : undefined);
            return onValueChangeSpy(value, name, values);
          }}
          step={100}
          value={value}
        />
      );
    };

    render(<ControlledCurrencyInput />);

    expect(screen.getByRole('textbox')).toHaveValue('');

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');

    expect(screen.getByRole('textbox')).toHaveValue('￥100');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('100', undefined, {
      float: 100,
      formatted: '￥100',
      value: '100',
    });

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');

    expect(screen.getByRole('textbox')).toHaveValue('￥200');
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('200', undefined, {
      float: 200,
      formatted: '￥200',
      value: '200',
    });
  });

  describe('stepping values with decimals', () => {
    const stepOnce = (key: '{arrowup}' | '{arrowdown}') =>
      userEvent.type(screen.getByRole('textbox'), key);

    it('should step an integer by an integer step', () => {
      render(<CurrencyInput defaultValue={10} step={3} onValueChange={onValueChangeSpy} />);

      stepOnce('{arrowup}');
      expect(screen.getByRole('textbox')).toHaveValue('13');
      stepOnce('{arrowdown}');
      stepOnce('{arrowdown}');
      expect(screen.getByRole('textbox')).toHaveValue('7');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('7', undefined, {
        float: 7,
        formatted: '7',
        value: '7',
      });
    });

    it('should drop trailing zeros of the value when stepping', () => {
      render(<CurrencyInput value="1.50" step={1} onValueChange={onValueChangeSpy} />);

      stepOnce('{arrowup}');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('2.5', undefined, {
        float: 2.5,
        formatted: '2.5',
        value: '2.5',
      });
    });

    it('should keep the decimals of a decimal step', () => {
      render(<CurrencyInput defaultValue={1.5} step={0.01} onValueChange={onValueChangeSpy} />);

      stepOnce('{arrowup}');
      expect(screen.getByRole('textbox')).toHaveValue('1.51');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('1.51', undefined, {
        float: 1.51,
        formatted: '1.51',
        value: '1.51',
      });
    });

    it('should keep the step decimals for a value in exponent notation', () => {
      render(<CurrencyInput value={1.5e-7} step={0.1} onValueChange={onValueChangeSpy} />);

      stepOnce('{arrowup}');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('0.1', undefined, {
        float: 0.1,
        formatted: '0.1',
        value: '0.1',
      });
    });

    it('should step an integer step down from a decimal value without float errors', () => {
      render(<CurrencyInput defaultValue={8.2} step={1} onValueChange={onValueChangeSpy} />);

      stepOnce('{arrowdown}');
      expect(screen.getByRole('textbox')).toHaveValue('7.2');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('7.2', undefined, {
        float: 7.2,
        formatted: '7.2',
        value: '7.2',
      });
    });

    it('should keep the value decimals when they are more than the step decimals', () => {
      render(<CurrencyInput defaultValue={1.25} step={0.1} onValueChange={onValueChangeSpy} />);

      stepOnce('{arrowup}');
      expect(screen.getByRole('textbox')).toHaveValue('1.35');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('1.35', undefined, {
        float: 1.35,
        formatted: '1.35',
        value: '1.35',
      });
    });

    it('should keep the digits of a result that has no float error after the decimals limit', () => {
      render(<CurrencyInput defaultValue={34.7} step={12} onValueChange={onValueChangeSpy} />);

      stepOnce('{arrowdown}');
      expect(screen.getByRole('textbox')).toHaveValue('22.70');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('22.70', undefined, {
        float: 22.7,
        formatted: '22.70',
        value: '22.70',
      });
    });

    it('should keep the step decimals when a longer value would be cut at the decimals limit', () => {
      render(<CurrencyInput value="271.5037" step={4.6} onValueChange={onValueChangeSpy} />);

      stepOnce('{arrowup}');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('276.1', undefined, {
        float: 276.1,
        formatted: '276.1',
        value: '276.1',
      });
    });

    it('should step a decimal step without float errors', () => {
      render(<CurrencyInput defaultValue={0.1} step={0.2} onValueChange={onValueChangeSpy} />);

      stepOnce('{arrowup}');
      expect(screen.getByRole('textbox')).toHaveValue('0.3');
      expect(onValueChangeSpy).toHaveBeenLastCalledWith('0.3', undefined, {
        float: 0.3,
        formatted: '0.3',
        value: '0.3',
      });
    });
  });
});
