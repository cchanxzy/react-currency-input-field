import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('Renders with value prop', () => {
    render(<CurrencyInput value={49.99} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('£49.99');
  });

  it('Renders with value 0', () => {
    render(<CurrencyInput value={0} prefix="£" />);

    expect(screen.getByRole('textbox')).toHaveValue('£0');
  });

  it('should go to end of string on focus', () => {
    render(<CurrencyInput defaultValue={123} />);
    userEvent.type(screen.getByRole('textbox'), '{arrowleft}4{arrowright}6');

    expect(screen.getByRole('textbox')).toHaveValue('12,436');
  });

  it('should allow value change with number', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), '100');

    expect(onValueChangeSpy).toBeCalledWith('100', undefined);
  });

  it('should prefix 0 value', () => {
    render(<CurrencyInput prefix="£" value={0} onValueChange={onValueChangeSpy} />);

    expect(screen.getByRole('textbox')).toHaveValue('£0');
  });

  it('should allow 0 value on change', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), '0');

    expect(onValueChangeSpy).toBeCalledWith('0', undefined);

    expect(screen.getByRole('textbox')).toHaveValue('£0');
  });

  it('should allow empty value', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} defaultValue={1} />);
    userEvent.clear(screen.getByRole('textbox'));

    expect(onValueChangeSpy).toBeCalledWith(undefined, undefined);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should callback name as second parameter if name prop provided', () => {
    const name = 'inputName';
    render(<CurrencyInput name={name} prefix="£" onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), '123');

    expect(onValueChangeSpy).toBeCalledWith('123', name);
  });

  it('should not allow invalid characters', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), 'hello');

    expect(onValueChangeSpy).toBeCalledWith(undefined, undefined);

    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('should ignore invalid characters', () => {
    render(<CurrencyInput prefix="£" onValueChange={onValueChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), '£123hello');

    expect(onValueChangeSpy).toBeCalledWith('123', undefined);

    expect(screen.getByRole('textbox')).toHaveValue('£123');
  });

  it('should call onChange', () => {
    const onChangeSpy = jest.fn();
    render(<CurrencyInput prefix="£" onChange={onChangeSpy} />);
    userEvent.type(screen.getByRole('textbox'), '123');

    expect(onChangeSpy).toBeCalledTimes(3);

    expect(screen.getByRole('textbox')).toHaveValue('£123');
  });

  it('should call onBlur', () => {
    const onBlurSpy = jest.fn();
    render(<CurrencyInput prefix="£" onBlur={onBlurSpy} />);
    userEvent.click(screen.getByRole('textbox'));
    userEvent.tab();

    expect(onBlurSpy).toBeCalledTimes(1);
  });

  it('should call onFocus', () => {
    const onFocusSpy = jest.fn();
    render(<CurrencyInput onFocus={onFocusSpy} />);
    userEvent.click(screen.getByRole('textbox'));

    expect(onFocusSpy).toBeCalledTimes(1);
  });

  it('should call onKeyDown', () => {
    const onKeyDownSpy = jest.fn();
    render(<CurrencyInput onKeyDown={onKeyDownSpy} />);
    userEvent.type(screen.getByRole('textbox'), '1');

    expect(onKeyDownSpy).toBeCalledTimes(1);
  });
});
