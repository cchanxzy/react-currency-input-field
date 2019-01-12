import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import CurrencyInput from '../components/CurrencyInput';

interface IState {
  errorMessage: string;
  inputClass: string;
}

export class Example extends PureComponent<{}, IState> {
  private constructor(props: {}) {
    super(props);

    this.state = {
      errorMessage: '',
      inputClass: '',
    };

    this.validateValue = this.validateValue.bind(this);
  }

  private limit = 1000;
  private prefix = '£';

  private validateValue(value: number) {
    if (Number.isNaN(value)) {
      this.setState({
        errorMessage: 'Please enter a valid number',
        inputClass: 'is-invalid',
      });
    } else if (value >= this.limit) {
      this.setState({
        errorMessage: `Please enter a value equal or lower than ${this.prefix}${
          this.limit
        }`,
        inputClass: 'is-invalid',
      });
    } else if (value === null) {
      this.setState({
        inputClass: '',
      });
    } else {
      this.setState({
        inputClass: 'is-valid',
      });
    }
  }

  public render() {
    return (
      <form className="needs-validation">
        <div className="form-row">
          <div className="col-sm-12">
            <label htmlFor="validationCustom01">
              Please enter a value (max £1,000)
            </label>
            <CurrencyInput
              id="validationCustom01"
              placeholder="£1,000"
              className={`form-control ${this.state.inputClass}`}
              onChange={this.validateValue}
              limit={this.limit}
              prefix={this.prefix}
            />
            <div className="invalid-feedback">{this.state.errorMessage}</div>
          </div>
        </div>
      </form>
    );
  }
}

export default hot(module)(Example);
