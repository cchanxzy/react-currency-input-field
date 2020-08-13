import React, { FC, useState, useEffect, useRef } from 'react';
import { CurrencyInputProps } from './CurrencyInputProps';
import { checkIsValidNumber, cleanValue, formatValue, padTrimValue } from './utilities';

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
  turnOffSeparators = false,
  ...props
}: CurrencyInputProps) => {
  const _defaultValue = defaultValue
    ? formatValue(String(defaultValue), turnOffSeparators, prefix)
    : '';
  const [stateValue, setStateValue] = useState(_defaultValue);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = (): number => (stateValue ? stateValue.length : 0);

  const processChange = ({
    target: { selectionStart, value },
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue(value, allowDecimals, decimalsLimit, prefix);

    if (!valueOnly) {
      onChange && onChange(undefined, name);
      return setStateValue('');
    }

    if (checkIsValidNumber(valueOnly)) {
      const formattedValue = formatValue(valueOnly, turnOffSeparators, prefix);
      if (selectionStart) {
        const cursor = selectionStart + (formattedValue.length - value.length) || 1;
        setCursor(cursor);
      }
      setStateValue(formattedValue);
    }

    onChange && onChange(valueOnly, name);
  };

  const handleOnBlur = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const valueOnly = cleanValue(value, allowDecimals, decimalsLimit, prefix);
    const newValue = padTrimValue(valueOnly, precision);
    const formattedValue = formatValue(newValue, turnOffSeparators, prefix);
    setStateValue(formattedValue);
    onChange && onChange(newValue, name);
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setSelectionRange(cursor, cursor);
    }
  }, [cursor, inputRef, stateValue]);

  const formattedPropsValue = value
    ? formatValue(String(value), turnOffSeparators, prefix)
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
