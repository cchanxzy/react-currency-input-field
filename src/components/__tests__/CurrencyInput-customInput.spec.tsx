import React, { createRef, forwardRef } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyInput from '../CurrencyInput';

const InputComponent = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return <input data-custom-input="true" {...props} ref={ref} />;
  }
);

InputComponent.displayName = 'InputComponent';

describe('<CurrencyInput/> customInput', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with customInput', () => {
    const customInput = forwardRef<HTMLInputElement>(
      (props: React.InputHTMLAttributes<HTMLInputElement>, ref) => {
        return <input {...props} ref={ref} />;
      }
    );

    customInput.displayName = 'CustomInput';

    render(<CurrencyInput defaultValue="1234" customInput={customInput} />);

    expect(screen.getByRole('textbox')).toHaveValue('1,234');
  });

  it('should format typed values and call onValueChange', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput prefix="$" customInput={InputComponent} onValueChange={onValueChangeSpy} />
    );

    await user.type(screen.getByRole('textbox'), '1234.5');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234.5', undefined, {
      float: 1234.5,
      formatted: '$1,234.5',
      value: '1234.5',
    });
    expect(screen.getByRole('textbox')).toHaveValue('$1,234.5');
    expect(screen.getByRole('textbox')).toHaveAttribute('data-custom-input', 'true');
  });

  it('should format the value on blur', async () => {
    const user = userEvent.setup();
    render(
      <CurrencyInput
        prefix="$"
        decimalScale={2}
        customInput={InputComponent}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.type(screen.getByRole('textbox'), '123');
    await user.tab();

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123.00', undefined, {
      float: 123,
      formatted: '$123.00',
      value: '123.00',
    });
    expect(screen.getByRole('textbox')).toHaveValue('$123.00');
    expect(screen.getByRole('textbox')).toHaveAttribute('data-custom-input', 'true');
  });

  it('should pass props through to the custom component', () => {
    render(
      <CurrencyInput
        customInput={InputComponent}
        id="amount"
        name="amount-name"
        className="amount-class"
        placeholder="Enter an amount"
        disabled
        aria-label="Amount"
        data-testid="amount-input"
      />
    );

    const input = screen.getByTestId('amount-input');
    expect(input).toHaveAttribute('data-custom-input', 'true');
    expect(input).toHaveAttribute('id', 'amount');
    expect(input).toHaveAttribute('name', 'amount-name');
    expect(input).toHaveClass('amount-class');
    expect(input).toHaveAttribute('placeholder', 'Enter an amount');
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute('aria-label', 'Amount');
  });

  it('should forward the ref to the DOM input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<CurrencyInput customInput={InputComponent} ref={ref} defaultValue={5} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(screen.getByRole('textbox'));
    expect(ref.current).toHaveAttribute('data-custom-input', 'true');
  });

  it('should still call onChange, onFocus and onBlur', async () => {
    const user = userEvent.setup();
    const onFocusSpy = jest.fn();
    const onBlurSpy = jest.fn();
    const onChangeSpy = jest.fn();
    render(
      <CurrencyInput
        customInput={InputComponent}
        onFocus={onFocusSpy}
        onBlur={onBlurSpy}
        onChange={onChangeSpy}
        onValueChange={onValueChangeSpy}
      />
    );

    await user.click(screen.getByRole('textbox'));
    expect(onFocusSpy).toHaveBeenCalledTimes(1);

    await user.type(screen.getByRole('textbox'), '12');
    expect(onChangeSpy).toHaveBeenCalledTimes(2);
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('12', undefined, {
      float: 12,
      formatted: '12',
      value: '12',
    });

    await user.tab();
    expect(onBlurSpy).toHaveBeenCalledTimes(1);
  });

  it('should work with a custom component that wraps the input', async () => {
    const user = userEvent.setup();
    const WrappedInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
      (props, ref) => (
        <div data-testid="wrapper">
          <label>
            Amount
            <input {...props} ref={ref} />
          </label>
        </div>
      )
    );
    WrappedInput.displayName = 'WrappedInput';

    render(
      <CurrencyInput
        prefix="£"
        decimalScale={2}
        customInput={WrappedInput}
        onValueChange={onValueChangeSpy}
      />
    );

    expect(screen.getByTestId('wrapper')).toContainElement(screen.getByLabelText('Amount'));

    await user.type(screen.getByLabelText('Amount'), '1234');
    expect(screen.getByLabelText('Amount')).toHaveValue('£1,234');

    await user.tab();
    expect(onValueChangeSpy).toHaveBeenLastCalledWith('1234.00', undefined, {
      float: 1234,
      formatted: '£1,234.00',
      value: '1234.00',
    });
    expect(screen.getByLabelText('Amount')).toHaveValue('£1,234.00');
  });
});
