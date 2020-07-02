import React, { FC, useState } from 'react';
import CurrencyInput from '../components/CurrencyInput';

export const Example1: FC = () => {
  const limit = 1000;
  const prefix = '£';

  const [errorMessage, setErrorMessage] = useState('');
  const [className, setClassName] = useState('');
  const [value, setValue] = useState<string | number>(999.99);

  /**
   * Handle validation
   */
  const validateValue = (value: string | undefined): void => {
    setValue(value || '');

    if (!value) {
      setClassName('');
    } else if (Number.isNaN(Number(value))) {
      setErrorMessage('Please enter a valid number');
      setClassName('is-invalid');
    } else if (Number(value) > limit) {
      setErrorMessage(`Max: ${prefix}${limit}`);
      setClassName('is-invalid');
    } else {
      setClassName('is-valid');
    }
  };

  return (
    <form className="needs-validation">
      <div className="form-row">
        <div className="col-sm-12">
          <label htmlFor="validationCustom01">Please enter a value (max £1,000)</label>
          <CurrencyInput
            id="validationCustom01"
            name="input-1"
            defaultValue={999.99}
            className={`form-control ${className}`}
            value={value}
            onChange={validateValue}
            prefix={prefix}
            precision={2}
          />
          <div className="invalid-feedback">{errorMessage}</div>
        </div>
      </div>
    </form>
  );
};

export default Example1;
