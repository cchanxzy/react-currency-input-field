import React, { FC, useState } from 'react';
import { CurrencyInputProps } from './types';
import { checkIsValidNumber, cleanValue, formatValue } from './utilities';

export const CurrencyInput: FC<CurrencyInputProps> = ({
  allowDecimals = true,
  id,
  name,
  className,
  decimalsLimit = 2,
  defaultValue,
  onChange,
  placeholder,
  prefix,
}: CurrencyInputProps) => {
  const [stateValue, setStateValue] = useState(
    defaultValue ? formatValue(String(defaultValue), prefix) : ''
  );

  const onFocus = (): number => (stateValue ? stateValue.length : 0);

  const processChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = event;

    const valueOnly = cleanValue(value, allowDecimals, decimalsLimit, prefix);

    if (!valueOnly) {
      onChange(null, name);
      return setStateValue('');
    }

    if (checkIsValidNumber(valueOnly)) {
      setStateValue(formatValue(valueOnly, prefix));
    }

    onChange(Number(valueOnly), name);
  };

  return (
    <input
      type="string"
      id={id}
      name={name}
      className={className}
      onChange={processChange}
      onFocus={onFocus}
      placeholder={placeholder}
      value={stateValue}
      pattern="[0-9]*"
    />
  );
};

export default CurrencyInput;
