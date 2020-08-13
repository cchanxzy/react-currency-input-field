import React, { FC, useState, useEffect, useRef } from 'react';
import { CurrencyInputProps } from './CurrencyInputProps';
import { checkIsValidNumber, cleanValue, formatValue, padTrimValue } from './utils';

export const CurrencyInput: FC<CurrencyInputProps> = ({
  allowDecimals = true,
  id,
  name,
  className,
  decimalsLimit = 2,
  defaultValue,
  disabled = false,
  maxLength,
  value,
  onChange,
  placeholder,
  precision,
  prefix,
  decimalSeparator = '.',
  groupSeparator = ',',
  turnOffSeparators = false,
  ...props
}: CurrencyInputProps) => {
  if (decimalSeparator === groupSeparator) {
    throw new Error('decimalSeparator cannot be the same as groupSeparator');
  }

  if (decimalSeparator !== ',' && decimalSeparator !== '.') {
    throw new Error('decimalSeparator must be "." or ","');
  }

  if (groupSeparator !== ',' && groupSeparator !== '.') {
    throw new Error('groupSeparator must be "." or ","');
  }

  const _defaultValue = defaultValue
    ? formatValue({
        value: String(defaultValue),
        decimalSeparator,
        groupSeparator,
        turnOffSeparators,
        prefix,
      })
    : '';
  const [stateValue, setStateValue] = useState(_defaultValue);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = (): number => (stateValue ? stateValue.length : 0);

  const processChange = ({
    target: { selectionStart, value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue({
      value,
      decimalSeparator,
      groupSeparator,
      allowDecimals,
      decimalsLimit,
      prefix,
    });

    if (!valueOnly) {
      onChange && onChange(undefined, name);
      return setStateValue('');
    }

    if (checkIsValidNumber(valueOnly)) {
      const formattedValue = formatValue({
        value: valueOnly,
        decimalSeparator,
        groupSeparator,
        turnOffSeparators,
        prefix,
      });

      if (selectionStart) {
        const cursor = selectionStart + (formattedValue.length - value.length) || 1;
        setCursor(cursor);
      }

      setStateValue(formattedValue);
    }

    onChange && onChange(valueOnly, name);
  };

  const handleOnBlur = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue({
      value,
      decimalSeparator,
      groupSeparator,
      allowDecimals,
      decimalsLimit,
      prefix,
    });

    const newValue = padTrimValue(valueOnly, precision);

    const formattedValue = formatValue({
      value: newValue,
      decimalSeparator,
      groupSeparator,
      turnOffSeparators,
      prefix,
    });

    setStateValue(formattedValue);
    onChange && onChange(newValue, name);
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setSelectionRange(cursor, cursor);
    }
  }, [cursor, inputRef, stateValue]);

  const formattedPropsValue = value
    ? formatValue({
        value: String(value),
        decimalSeparator,
        groupSeparator,
        turnOffSeparators,
        prefix,
      })
    : undefined;

  return (
    <input
      type="text"
      inputMode="decimal"
      id={id}
      name={name}
      className={className}
      onChange={processChange}
      onBlur={handleOnBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      disabled={disabled}
      value={formattedPropsValue || stateValue}
      ref={inputRef}
      maxLength={maxLength}
      {...props}
    />
  );
};

export default CurrencyInput;
