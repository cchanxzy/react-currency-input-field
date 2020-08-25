import React, { FC, useState, useRef } from 'react';
import { CurrencyInputProps } from './CurrencyInputProps';
import {
  checkIsValidNumber,
  cleanValue,
  fixedDecimalValue,
  formatValue,
  padTrimValue,
} from './utils';

export const CurrencyInput: FC<CurrencyInputProps> = ({
  allowDecimals = true,
  id,
  name,
  className,
  decimalsLimit,
  defaultValue,
  disabled = false,
  maxLength: userMaxLength,
  value,
  onChange,
  fixedDecimalLength,
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

  if (checkIsValidNumber(decimalSeparator)) {
    throw new Error('decimalSeparator cannot be a number');
  }

  if (checkIsValidNumber(groupSeparator)) {
    throw new Error('groupSeparator cannot be a number');
  }

  const formatValueOptions = {
    decimalSeparator,
    groupSeparator,
    turnOffSeparators,
    prefix,
  };

  const cleanValueOptions = {
    decimalSeparator,
    groupSeparator,
    allowDecimals,
    decimalsLimit: decimalsLimit || fixedDecimalLength || 2,
    prefix,
  };

  const _defaultValue = defaultValue
    ? formatValue({ value: String(defaultValue), ...formatValueOptions })
    : '';
  const [stateValue, setStateValue] = useState(_defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = (): number => (stateValue ? stateValue.length : 0);

  const processChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue({ value, ...cleanValueOptions });

    if (!valueOnly) {
      onChange && onChange(undefined, name);
      setStateValue('');
      return;
    }

    if (userMaxLength && valueOnly.length > userMaxLength) {
      return;
    }

    if (valueOnly === '-') {
      setStateValue(value);
      onChange && onChange(valueOnly, name);
      return;
    }

    const formattedValue = formatValue({ value: valueOnly, ...formatValueOptions });

    setStateValue(formattedValue);
    onChange && onChange(valueOnly, name);
  };

  const handleOnBlur = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue({ value, ...cleanValueOptions });

    if (valueOnly === '-') {
      setStateValue('');
      return;
    }

    const fixedDecimals = fixedDecimalValue(valueOnly, decimalSeparator, fixedDecimalLength);

    // Add padding or trim value to precision
    const newValue = padTrimValue(fixedDecimals, decimalSeparator, precision || fixedDecimalLength);

    const formattedValue = formatValue({ value: newValue, ...formatValueOptions });

    setStateValue(formattedValue);
    onChange && onChange(newValue, name);
  };

  const formattedPropsValue = value
    ? formatValue({ value: String(value), ...formatValueOptions })
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
      {...props}
    />
  );
};

export default CurrencyInput;
