import React, { useState } from 'react';
import CurrencyInput from '../index';

export const Example2 = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [className, setClassName] = useState('');
  const [rawValue, setRawValue] = useState<string | undefined>(' ');

  const validateValue = (value: string | undefined): void => {
    const rawValue = value === undefined ? 'undefined' : value;
    setRawValue(rawValue || ' ');

    if (!value) {
      setClassName('');
    } else if (Number.isNaN(Number(value))) {
      setErrorMessage('Please enter a valid number');
      setClassName('is-invalid');
    } else {
      setClassName('is-valid');
    }
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <a
          href="https://github.com/cchanxzy/react-currency-input-field/blob/main/src/examples/Example2.tsx"
          target="_blank"
          rel="noreferrer"
        >
          <h2>Example 2</h2>
        </a>
        <ul>
          <li>{`'$'`} prefix</li>
          <li>Has placeholder</li>
          <li>Does not allow decimals</li>
          <li>Value is stored via component state</li>
        </ul>
        <form className="needs-validation">
          <div className="row">
            <div className="col">
              <label htmlFor="validation-example-2-field">Please enter a value:</label>
              <CurrencyInput
                id="validation-example-2-field"
                placeholder="$1,234,567"
                allowDecimals={false}
                className={`form-control ${className}`}
                onValueChange={validateValue}
                prefix={'$'}
                step={10}
              />
              <div className="invalid-feedback">{errorMessage}</div>
            </div>
            <div className="form-group col">
              <pre className="h-100 p-3 bg-dark text-white">
                <div className="row">
                  <div className="col-6">
                    <div className="text-muted mr-3">onValueChange:</div>
                    {rawValue}
                  </div>
                </div>
              </pre>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Example2;
