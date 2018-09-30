import React, { PureComponent } from 'react';

import {
  addCommas,
  removeCommas,
  checkIsValidNumber,
} from './utilities';

interface IProps {
  id: string;
  className?: string;
  limit?: number;
  prefix?: string;
  handleError?: () => void,
  onChange: (value: number) => void;
  placeholder?: string;
}

interface IState {
  value: string;
}

export class CurrenyInput extends PureComponent<IProps, IState> {
  private constructor(props: IProps) {
    super(props);

    this.state = {
      value: '',
    };

    this.processChange = this.processChange.bind(this);
  }

  processChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: {
        value,
      }
    } = event;

    const {
      onChange,
      limit,
      prefix,
    } = this.props;

    let stringValue = value;

    if (prefix) {
      stringValue = value.replace(prefix, '');
    }

    if (stringValue === '' || stringValue === null) {
      this.setState({
        value: '',
      });
      onChange(null);
      return false;
    }

    let intValue = parseInt(removeCommas(stringValue), 10);

    const max = limit || 9999999999999;

    if (checkIsValidNumber(intValue, max)) {
      let setValue = addCommas(intValue);

      if (prefix) {
        setValue = `${prefix}${setValue}`;
      }

      this.setState({ value: setValue });
    }
    onChange(intValue);
  }

  render() {
    const {
      className,
      id,
      handleError,
      placeholder,
    } = this.props;

    const { value } = this.state;

    return (
      <input
        type="string"
        id={id}
        className={className}
        onChange={this.processChange}
        placeholder={placeholder}
        value={value}
      />
    );
  }
}

export default CurrenyInput;
