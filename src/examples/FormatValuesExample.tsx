import React, { FC, useState } from 'react';
import { formatValue } from '../components/utils';

const FormatValuesExample: FC = () => {
  const [value, setValue] = useState('123456789.999');
  const [prefix, setPrefix] = useState('$');
  const [groupSeparator, setGroupSeparator] = useState(',');
  const [decimalSeparator, setDecimalSeparator] = useState('.');
  const [turnOffSeparators, setTurnOffSeparators] = useState(false);

  const handleValueChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };

  const handlePrefixChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setPrefix(value);
  };

  const handleGroupSeparatorChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setGroupSeparator(value);
  };

  const handleDecimalSeparatorChange = ({
    target: { value: newDecimalSeparator },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setDecimalSeparator(newDecimalSeparator);
  };

  const handleTurnOffSeparatorChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTurnOffSeparators(value === 'true' ? true : false);
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <a href="https://github.com/cchanxzy/react-currency-input-field/blob/master/src/examples/FormatValuesExample.tsx">
          <h2>Format values example</h2>
        </a>
        <ul>
          <li>Use the `formatValue` function convert a value to a user friendly string</li>
        </ul>
        <div className="col-10">
          <div className="row mt-3">
            <div className="col">
              <label>Value</label>
              <input
                type="text"
                className="form-control"
                value={value}
                onChange={handleValueChange}
              />
            </div>
            <div className="col-3">
              <label>Prefix</label>
              <input
                type="text"
                className="form-control"
                value={prefix}
                onChange={handlePrefixChange}
              />
            </div>
            <div className="col-3">
              <label>Group Separator</label>
              <input
                type="text"
                className="form-control"
                value={groupSeparator}
                onChange={handleGroupSeparatorChange}
              />
            </div>
            <div className="col-3">
              <label>Decimal Separator</label>
              <input
                type="text"
                className="form-control"
                value={decimalSeparator}
                onChange={handleDecimalSeparatorChange}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col mt-3">
              Turn off separators:
              <div className="ml-3 custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="turnOffSeparatorsTrue"
                  className="custom-control-input"
                  value="true"
                  onChange={handleTurnOffSeparatorChange}
                  checked={turnOffSeparators}
                />
                <label className="custom-control-label" htmlFor="turnOffSeparatorsTrue">
                  True
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="turnOffSeparatorsFalse"
                  className="custom-control-input"
                  value="false"
                  onChange={handleTurnOffSeparatorChange}
                  checked={turnOffSeparators === false}
                />
                <label className="custom-control-label" htmlFor="turnOffSeparatorsFalse">
                  False
                </label>
              </div>
            </div>
          </div>
          <div className="mt-5">
            Formatted value:
            <div className="display-4">
              {formatValue({
                value,
                groupSeparator,
                decimalSeparator,
                turnOffSeparators,
                prefix,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatValuesExample;
