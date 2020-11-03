import React, { FC, useState, useEffect, useRef } from 'react';
import { CurrencyInputProps } from './CurrencyInputProps';
import { isNumber, cleanValue, fixedDecimalValue, formatValue, padTrimValue } from './utils';

export const CurrencyInput: FC<CurrencyInputProps> = ({
  allowDecimals = true,
  allowNegativeValue = true,
  id,
  name,
  className,
  decimalsLimit,
  defaultValue,
  disabled = false,
  maxLength: userMaxLength,
  value,
  onChange,
  onBlurValue,
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

  if (isNumber(decimalSeparator)) {
    throw new Error('decimalSeparator cannot be a number');
  }

  if (isNumber(groupSeparator)) {
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
    allowNegativeValue,
    prefix,
  };

  const _defaultValue =
    defaultValue !== undefined
      ? formatValue({ value: String(defaultValue), ...formatValueOptions })
      : '';
  const [stateValue, setStateValue] = useState(_defaultValue);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = (): number => (stateValue ? stateValue.length : 0);

  const processChange = ({
    target: { value, selectionStart },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue({ value: String(value), ...cleanValueOptions });

    if (!valueOnly) {
      onChange && onChange(undefined, name);
      setStateValue('');
      return;
    }

    if (userMaxLength && valueOnly.length > userMaxLength) {
      return;
    }

    if (valueOnly === '-') {
      onChange && onChange(undefined, name);
      setStateValue(value);
      return;
    }

    const formattedValue = formatValue({ value: valueOnly, ...formatValueOptions });

    /* istanbul ignore next */
    if (selectionStart) {
      const cursor = selectionStart + (formattedValue.length - value.length) || 1;
      setCursor(cursor);
    }

    setStateValue(formattedValue);

    onChange && onChange(valueOnly, name);
  };

  const handleOnBlur = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue({ value, ...cleanValueOptions });

    if (valueOnly === '-' || !valueOnly) {
      onBlurValue && onBlurValue(undefined, name);
      setStateValue('');
      return;
    }

    const fixedDecimals = fixedDecimalValue(valueOnly, decimalSeparator, fixedDecimalLength);

    // Add padding or trim value to precision
    const newValue = padTrimValue(fixedDecimals, decimalSeparator, precision || fixedDecimalLength);
    onBlurValue && onBlurValue(newValue, name);

    const formattedValue = formatValue({ value: newValue, ...formatValueOptions });
    setStateValue(formattedValue);
  };

  /* istanbul ignore next */
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setSelectionRange(cursor, cursor);
    }
  }, [cursor, inputRef]);

  const formattedPropsValue =
    value !== undefined ? formatValue({ value: String(value), ...formatValueOptions }) : undefined;

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
      value={
        formattedPropsValue !== undefined && stateValue !== '-' ? formattedPropsValue : stateValue
      }
      ref={inputRef}
      {...props}
    />
  );
};

export default CurrencyInput;
