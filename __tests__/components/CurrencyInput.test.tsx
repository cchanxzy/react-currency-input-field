import { shallow } from 'enzyme';
import React from 'react';
import CurrencyInput from '../../src/components/CurrencyInput';

describe('<CurrencyInput /> component', () => {
  test('Renders without error', () => {
    const view = shallow(
      <CurrencyInput
        id="validationCustom01"
        placeholder="£1,000"
        className="form-control"
        onChange={() => {}}
      />
    );
    const component = view.find('#settings__checkbox');
    expect(component).toMatchSnapshot();
  });
});
