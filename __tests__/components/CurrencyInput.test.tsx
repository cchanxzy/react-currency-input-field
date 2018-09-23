import { shallow } from 'enzyme';
import * as React from 'react';
import CurrencyInput from '../../src/components/CurrencyInput';

describe('<CurrencyInput /> component', () => {
  test('Renders properly', () => {
    const component = shallow(
      <CurrencyInput compiler="TypeScript" framework="React" />,
    );
    const button = component.find('#settings__checkbox');
    expect(component).toMatchSnapshot();
  });
});
