import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/>', () => {
  const onValueChangeSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renders without error', () => {
    render(
      <CurrencyInput
        id="validationCustom01"
        name="inputName"
        placeholder="£1,000"
        className="form-control"
      />
    );
    const input = screen.getByRole('textbox');

    expect(input).toMatchSnapshot();

    expect(input).toHaveValue('');
  });

  it('Renders with default value', () => {
    render(<CurrencyInput defaultValue={1234.56} prefix="£" />);
    const input = screen.getByRole('textbox');

    expect(input).toMatchSnapshot();

    expect(input).toHaveValue('£1,234.56');
  });

  it('Renders with default value 0', () => {
    render(<CurrencyInput defaultValue={0} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('£0');
  });

  it('Renders with default value undefined', () => {
    render(<CurrencyInput defaultValue={undefined} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('Renders with default value null', () => {
    render(<CurrencyInput defaultValue={null as any} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('Renders with default value 0 with decimalScale 2', () => {
    render(<CurrencyInput defaultValue={0} decimalScale={2} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('£0.00');
  });

  it('Renders with value prop', () => {
    render(<CurrencyInput value={49.99} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('£49.99');
  });

  it('Renders with value 0', () => {
    render(<CurrencyInput value={0} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('£0');
  });

  it('Renders with value undefined', () => {
    render(<CurrencyInput value={undefined} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('Renders with value null', () => {
    render(<CurrencyInput value={null as any} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('Renders with value 0 with decimalScale 2', () => {
    render(<CurrencyInput value={0} prefix="£" decimalScale={2} />);

    expect(screen.getByRole('textbox')).toHaveValue('£0.00');
  });

  it('Renders with value 0.1 with decimalScale 2', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput value={0.1} prefix="£" decimalScale={2} />);

    expect(screen.getByRole('textbox')).toHaveValue('£0.10');

    await user.type(screen.getByRole('textbox'), '{Backspace}');

    expect(screen.getByRole('textbox')).toHaveValue('£0.1');
  });

  it('should go to end of string on focus', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput defaultValue={123} />);
    await user.type(screen.getByRole('textbox'), '{ArrowLeft}4{ArrowRight}6');

    expect(screen.getByRole('textbox')).toHaveValue('12,436');
  });

  it('should allow value change with number', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '100');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('100', undefined, {
      float: 100,
      formatted: '£100',
      value: '100',
    });
  });

  it('should prefix 0 value', () => {
    render(<CurrencyInput prefix="£" value={0} onValueChange={onValueChangeSpy} />);

    expect(screen.getByRole('textbox')).toHaveValue('£0');
  });

  it('should allow 0 value on change', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '0');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('0', undefined, {
      float: 0,
      formatted: '£0',
      value: '0',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£0');
  });

  it('should allow empty value', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} defaultValue={1} />);
    await user.clear(screen.getByRole('textbox'));

    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should callback name as second parameter if name prop provided', async () => {
    const user = userEvent.setup();
    const name = 'inputName';
    render(<CurrencyInput name={name} prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '123');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123', name, {
      float: 123,
      formatted: '£123',
      value: '123',
    });
  });

  it('should not allow invalid characters', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), 'hello');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should ignore invalid characters', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '£123hello');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('123', undefined, {
      float: 123,
      formatted: '£123',
      value: '123',
    });

    expect(screen.getByRole('textbox')).toHaveValue('£123');
  });

  it('should clear decimal point only input', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '.');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith(undefined, undefined, {
      float: null,
      formatted: '',
      value: '',
    });

    await user.tab();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should allow .3 decimal inputs', async () => {
    const user = userEvent.setup();
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '.3');

    expect(onValueChangeSpy).toHaveBeenLastCalledWith('.3', undefined, {
      float: 0.3,
      formatted: '£0.3',
      value: '.3',
    });

    await user.tab();
    expect(screen.getByRole('textbox')).toHaveValue('£0.3');
  });

  it('should call onChange', async () => {
    const user = userEvent.setup();
    const onChangeSpy = jest.fn();
    render(<CurrencyInput prefix="£" onChange={onChangeSpy} />);
    await user.type(screen.getByRole('textbox'), '123');

    expect(onChangeSpy).toHaveBeenCalledTimes(3);

    expect(screen.getByRole('textbox')).toHaveValue('£123');
  });

  it('should call onBlur', async () => {
    const user = userEvent.setup();
    const onBlurSpy = jest.fn();
    render(<CurrencyInput prefix="£" onBlur={onBlurSpy} />);
    await user.click(screen.getByRole('textbox'));
    await user.tab();

    expect(onBlurSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onFocus', async () => {
    const user = userEvent.setup();
    const onFocusSpy = jest.fn();
    render(<CurrencyInput onFocus={onFocusSpy} />);
    await user.click(screen.getByRole('textbox'));

    expect(onFocusSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onKeyDown', async () => {
    const user = userEvent.setup();
    const onKeyDownSpy = jest.fn();
    render(<CurrencyInput onKeyDown={onKeyDownSpy} />);
    await user.type(screen.getByRole('textbox'), '1');

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onKeyUp', async () => {
    const user = userEvent.setup();
    const onKeyUpSpy = jest.fn();
    render(<CurrencyInput onKeyUp={onKeyUpSpy} />);
    await user.type(screen.getByRole('textbox'), '1');

    expect(onKeyUpSpy).toHaveBeenCalledTimes(1);
  });

  it('should update the input when prop value changes to another number', () => {
    const { rerender } = render(
      <CurrencyInput value="1" placeholder="Please enter a number" prefix="£" />
    );

    const field = screen.getByRole('textbox');
    expect(field).toHaveValue('£1');

    act(() => {
      rerender(<CurrencyInput value="2" placeholder="Please enter a number" prefix="£" />);
    });

    expect(field).toHaveValue('£2');
  });

  it('should update the input when prop value changes to undefined', () => {
    const { rerender } = render(<CurrencyInput value="1" prefix="£" />);

    const field = screen.getByRole('textbox');
    expect(field).toHaveValue('£1');

    act(() => {
      rerender(<CurrencyInput value={undefined} prefix="£" />);
    });

    expect(field).toHaveValue('');
  });
});
