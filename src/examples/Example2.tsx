import React, { FC, useState } from 'react';
import { hot } from 'react-hot-loader';
import CurrencyInput from '../components/CurrencyInput';

export const Example2: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [className, setClassName] = useState('');
  const [rawValue, setRawValue] = useState<string | undefined>(' ');
  const [rawBlurValue, setRawBlurValue] = useState<string | undefined>(' ');

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

  const handleOnBlurValue = (value: string | undefined) => {
    const rawBlurValue = value === undefined ? 'undefined' : value;
    setRawBlurValue(rawBlurValue || ' ');
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <a href="https://github.com/cchanxzy/react-currency-input-field/blob/master/src/examples/Example2.tsx">
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
                onChange={validateValue}
                onBlurValue={handleOnBlurValue}
                prefix={'$'}
                step={10}
              />
              <div className="invalid-feedback">{errorMessage}</div>
            </div>
            <div className="form-group col">
              <pre className="h-100 p-3 bg-dark text-white">
                <div className="row">
                  <div className="col-6">
                    <div className="text-muted mr-3">onChange:</div>
                    {rawValue}
                  </div>
                  <div className="col-6">
                    <div className="text-muted mr-3">onBlurValue:</div>
                    {rawBlurValue}
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

export default hot(module)(Example2);
