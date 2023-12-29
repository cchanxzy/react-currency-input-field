import React, { useState } from 'react';
import CurrencyInput, { CurrencyInputProps } from '../index';

const options: ReadonlyArray<CurrencyInputProps['intlConfig']> = [
  {
    locale: 'de-DE',
    currency: 'EUR',
  },
  {
    locale: 'en-US',
    currency: 'USD',
  },
  {
    locale: 'en-GB',
    currency: 'GBP',
  },
  {
    locale: 'ja-JP',
    currency: 'JPY',
  },
  {
    locale: 'en-IN',
    currency: 'INR',
  },
];

export const Example3 = () => {
  const [intlConfig, setIntlConfig] = useState<CurrencyInputProps['intlConfig']>(options[0]);
  const [value, setValue] = useState<string | undefined>('123');

  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (value) => {
    setValue(value);
  };

  const handleIntlSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const config = options[Number(event.target.value)];
    if (config) {
      setIntlConfig(config);
      setValue('123');
    }
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <a
          href="https://github.com/cchanxzy/react-currency-input-field/blob/main/src/examples/Example3.tsx"
          target="_blank"
          rel="noreferrer"
        >
          <h2>Example 3</h2>
        </a>
        <ul>
          <li>Intl config</li>
        </ul>

        <div className="row"></div>

        <div className="row">
          <div className="form-group col">
            <div className="row">
              <div className="col-12">
                <CurrencyInput
                  id="validationCustom04"
                  name="input-1"
                  intlConfig={intlConfig}
                  className={`form-control`}
                  onValueChange={handleOnValueChange}
                  decimalsLimit={6}
                  value={value}
                  step={1}
                />
              </div>
              <div className="col-12 mt-3">
                <label htmlFor="intlConfigSelect">Intl option</label>
                <select className="form-control" id="intlConfigSelect" onChange={handleIntlSelect}>
                  {options.map((config, i) => {
                    if (config) {
                      const { locale, currency } = config;
                      return (
                        <option key={`${locale}${currency}`} value={i}>
                          {locale}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="form-group col">
            <pre className="h-100 p-3 bg-dark text-white">
              <div className="row">
                <div className="col-12">
                  <div className="text-muted mr-3">onValueChange:</div>
                  {value}
                  <div className="text-muted mr-3 mt-3">intlConfig:</div>
                  {JSON.stringify(intlConfig)}
                </div>
              </div>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example3;
