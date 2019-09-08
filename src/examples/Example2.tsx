import React, { FC, useState } from 'react';
import { hot } from 'react-hot-loader';
import CurrencyInput from '../components/CurrencyInput';

export const Example2: FC = () => {
  const [errorMessage, setErrorMessage] = useState();
  const [className, setClassName] = useState();

  const validateValue = (value: number | null) => {
    if (value === null) {
      setClassName('');
    } else if (Number.isNaN(value)) {
      setErrorMessage('Please enter a valid number');
      setClassName('is-invalid');
    } else {
      setClassName('is-valid');
    }
  };

  return (
    <form className="needs-validation">
      <div className="form-row">
        <div className="col-sm-12">
          <label htmlFor="validationCustom01">Please input a value:</label>
          <CurrencyInput
            id="validationCustom01"
            placeholder="$1999"
            className={`form-control ${className}`}
            onChange={validateValue}
            prefix={'$'}
          />
          <div className="invalid-feedback">{errorMessage}</div>
        </div>
      </div>
    </form>
  );
};

export default hot(module)(Example2);
