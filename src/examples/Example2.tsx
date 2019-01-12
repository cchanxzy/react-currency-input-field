import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import CurrencyInput from '../components/CurrencyInput';

interface IState {
  errorMessage: string;
  inputClass: string;
}

export class Example extends PureComponent<{}, IState> {
  private constructor() {
    super({});

    this.state = {
      errorMessage: '',
      inputClass: '',
    };

    this.validateValue = this.validateValue.bind(this);
  }

  private prefix = '$';
  private suffix = '.00';

  private validateValue(value: number) {
    if (Number.isNaN(value)) {
      this.setState({
        errorMessage: 'Please enter a valid number',
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
            <label htmlFor="validationCustom01">Please input a value:</label>
            <CurrencyInput
              id="validationCustom01"
              placeholder="$1999"
              className={`form-control ${this.state.inputClass}`}
              onChange={this.validateValue}
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
