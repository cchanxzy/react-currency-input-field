import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import CurrencyInput from './CurrencyInput';

export class BootstrapExample extends PureComponent {
  public render() {
    return (
      <form className="needs-validation">
      <div className="form-row">
        <div className="col-md-4 mb-3">
          <label htmlFor="validationCustom01">First name</label>
          <CurrencyInput
            id="validationCustom01"
            placeholder="First name"
            className="form-control"
            onChange={() => {}}
            prefix="£"
          />
          <div className="invalid-feedback">
            Looks good!
          </div>
        </div>
        </div>
      </form>
    );
  }
}

export default hot(module)(BootstrapExample);