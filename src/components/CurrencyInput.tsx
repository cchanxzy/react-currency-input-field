import React, { FC, useState } from 'react';

import { addCommas, checkIsValidNumber, removeCommas } from './utilities';

interface IProps {
  id: string;
  className?: string;
  onChange: (value: number | null) => void;
  placeholder?: string;
  prefix?: string;
}

export const CurrencyInput: FC<IProps> = ({ id, className, onChange, placeholder, prefix }) => {
  const [value, setValue] = useState('');

  const processChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: eventVal },
    } = event;

    let stringValue = eventVal;

    if (prefix) {
      stringValue = stringValue.replace(prefix, '');
    }

    if (stringValue === '' || stringValue === null) {
      onChange(null);
      return setValue('');
    }

    const intValue = parseInt(removeCommas(stringValue), 10);

    if (checkIsValidNumber(intValue)) {
      let newValue = addCommas(intValue);

      if (prefix) {
        newValue = `${prefix}${newValue}`;
      }

      setValue(newValue);
    }

    onChange(intValue);
  };

  return (
    <input
      type="string"
      id={id}
      className={className}
      onChange={processChange}
      placeholder={placeholder}
      value={value}
    />
  );
};

export default CurrencyInput;
