import React, { FC, useState, useEffect, useRef } from 'react';
import { CurrencyInputProps } from './CurrencyInputProps';
import { checkIsValidNumber, cleanValue, formatValue } from './utilities';

export const CurrencyInput: FC<CurrencyInputProps> = ({
  allowDecimals = true,
  id,
  name,
  className,
  decimalsLimit = 2,
  defaultValue,
  disabled = false,
  onChange,
  placeholder,
  prefix,
  maxLength,
  ...props
}: CurrencyInputProps) => {
  const _defaultValue = defaultValue ? formatValue(String(defaultValue), prefix) : '';
  const [stateValue, setStateValue] = useState(_defaultValue);
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = (): number => (stateValue ? stateValue.length : 0);

  const processChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { selectionStart, value },
    } = event;

    const valueOnly = cleanValue(value, allowDecimals, decimalsLimit, prefix);

    if (!valueOnly) {
      onChange && onChange(null, name);
      return setStateValue('');
    }

    if (checkIsValidNumber(valueOnly)) {
      const formattedValue = formatValue(valueOnly, prefix);
      if (selectionStart) {
        const cursor = selectionStart + (formattedValue.length - value.length) || 1;
        setCursor(cursor);
      }
      setStateValue(formattedValue);
    }

    onChange && onChange(Number(valueOnly), name);
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setSelectionRange(cursor, cursor);
    }
  }, [cursor, inputRef, stateValue]);

  return (
    <input
      type="text"
      inputMode="decimal"
      id={id}
      name={name}
      className={className}
      onChange={processChange}
      onFocus={onFocus}
      placeholder={placeholder}
      disabled={disabled}
      value={stateValue}
      ref={inputRef}
      maxLength={maxLength}
      {...props}
    />
  );
};

export default CurrencyInput;
