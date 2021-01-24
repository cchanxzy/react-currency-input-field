import React from 'react';
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
    expect(onValueChangeSpy).toHaveBeenCalledWith('98', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£98');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenCalledWith('100', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£100');
  });

  describe('without value ie. default 0', () => {
    it('should handle arrow down key', () => {
      render(<CurrencyInput prefix="£" step={1} onValueChange={onValueChangeSpy} />);

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).toBeCalledWith('-1', undefined);
      expect(screen.getByRole('textbox')).toHaveValue('-£1');
    });

    it('should handle arrow down key', () => {
      render(<CurrencyInput prefix="£" step={1} onValueChange={onValueChangeSpy} />);

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).toBeCalledWith('1', undefined);
      expect(screen.getByRole('textbox')).toHaveValue('£1');
    });
  });

  describe('with value 99 and step 1.25', () => {
    it('should handle arrow down key', () => {
      render(<CurrencyInput prefix="£" value={99} step={1.25} onValueChange={onValueChangeSpy} />);

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).toHaveBeenCalledWith('97.75', undefined);
    });

    it('should handle arrow up key', () => {
      render(<CurrencyInput prefix="£" value={99} step={1.25} onValueChange={onValueChangeSpy} />);

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).toHaveBeenCalledWith('100.25', undefined);
    });
  });

  describe('with defaultValue 100 and step 5.5', () => {
    it('should handle arrow down key', () => {
      render(
        <CurrencyInput prefix="£" defaultValue={100} step={5.5} onValueChange={onValueChangeSpy} />
      );

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).toBeCalledWith('94.5', undefined);
      expect(screen.getByRole('textbox')).toHaveValue('£94.5');

      userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
      expect(onValueChangeSpy).toBeCalledWith('89.0', undefined);
      expect(screen.getByRole('textbox')).toHaveValue('£89.0');
    });

    it('should handle arrow up key', () => {
      render(
        <CurrencyInput prefix="£" defaultValue={100} step={5.5} onValueChange={onValueChangeSpy} />
      );

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).toBeCalledWith('105.5', undefined);
      expect(screen.getByRole('textbox')).toHaveValue('£105.5');

      userEvent.type(screen.getByRole('textbox'), '{arrowup}');
      expect(onValueChangeSpy).toBeCalledWith('111.0', undefined);
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
      expect(onValueChangeSpy).toHaveBeenCalledWith('-98', undefined);
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
      expect(onValueChangeSpy).toHaveBeenCalledWith('98', undefined);
      expect(screen.getByRole('textbox')).toHaveValue('£98');
    });
  });

  it('should handle going into negative value', () => {
    render(
      <CurrencyInput prefix="£" defaultValue={1.99} step={1} onValueChange={onValueChangeSpy} />
    );

    expect(screen.getByRole('textbox')).toHaveValue('£1.99');

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).toHaveBeenCalledWith('2.99', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£2.99');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenCalledWith('1.99', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£1.99');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenCalledWith('0.99', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£0.99');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenCalledWith('-0.01', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('-£0.01');
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
    expect(onValueChangeSpy).toHaveBeenCalledWith('0', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£0');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenCalledWith('0', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£0');

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).toHaveBeenCalledWith('1', undefined);
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
    expect(onValueChangeSpy).toHaveBeenCalledWith('45', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£45');

    userEvent.type(screen.getByRole('textbox'), '{arrowup}');
    expect(onValueChangeSpy).toHaveBeenCalledWith('45', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£45');

    userEvent.type(screen.getByRole('textbox'), '{arrowdown}');
    expect(onValueChangeSpy).toHaveBeenCalledWith('44', undefined);
    expect(screen.getByRole('textbox')).toHaveValue('£44');
  });
});
