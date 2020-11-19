import React, { FC, useState } from 'react';
import CurrencyInput from '../components/CurrencyInput';

export const Example1: FC = () => {
  const limit = 1000;
  const prefix = '£';

  const [errorMessage, setErrorMessage] = useState('');
  const [className, setClassName] = useState('');
  const [value, setValue] = useState<string | number>(999.99);
  const [rawValue, setRawValue] = useState<string | undefined>(' ');
  const [rawBlurValue, setRawBlurValue] = useState<string | undefined>(' ');

  /**
   * Handle validation
   */
  const validateValue = (value: string | undefined): void => {
    const rawValue = value === undefined ? 'undefined' : value;
    setRawValue(rawValue || ' ');

    if (!value) {
      setClassName('');
      setValue('');
      return;
    }

    if (Number.isNaN(Number(value))) {
      setErrorMessage('Please enter a valid number');
      setClassName('is-invalid');
      return;
    }

    if (Number(value) > limit) {
      setErrorMessage(`Max: ${prefix}${limit}`);
      setClassName('is-invalid');
      setValue(value);
      return;
    }

    setClassName('is-valid');
    setValue(value);
  };

  const handleOnBlurValue = (value: string | undefined) => {
    const rawBlurValue = value === undefined ? 'undefined' : value;
    setRawBlurValue(rawBlurValue || ' ');
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <a href="https://github.com/cchanxzy/react-currency-input-field/blob/master/src/examples/Example1.tsx">
          <h2>Example 1</h2>
        </a>
        <ul>
          <li>{`'£'`} prefix</li>
          <li>Allows decimals (up to 2 decimal places)</li>
          <li>Has default value (999.99)</li>
          <li>Value is set programmatically (passed in via props)</li>
        </ul>

        <form className="needs-validation">
          <div className="row">
            <div className="form-group col">
              <label htmlFor="validationCustom01">Please enter a value (max £1,000)</label>
              <CurrencyInput
                id="validationCustom01"
                name="input-1"
                defaultValue={999.99}
                className={`form-control ${className}`}
                value={value}
                onChange={validateValue}
                onBlurValue={handleOnBlurValue}
                prefix={prefix}
                precision={2}
                step={1}
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

export default Example1;
