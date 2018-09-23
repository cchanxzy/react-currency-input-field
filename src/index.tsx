import React from 'react';
import ReactDOM from 'react-dom';

import CurrencyInput from './components/CurrencyInput';
import BootstrapExample from './components/BootstrapExample';

// ReactDOM.render(
//   <CurrencyInput
//     onChange={() => {}}
//     placeholder="£100"
//     label="1 .Enter a value: (Max £1000)"
//     limit={1000}
//     errorMessage="This is the error message"
//     description="This is the description"
//     id="currency-input-1"
//     suffix=''
//     prefix="£"
//   />,
//   document.getElementById('example-1'),
// );

ReactDOM.render(
  <BootstrapExample />,
  document.getElementById('example-1'),
);

// ReactDOM.render(
//   <CurrencyInput
//     onChange={() => {}}
//     placeholder="999"
//     label="2. Enter a value: "
//     errorMessage="Enter a number"
//     description="This input field does not have a currency prefix and has a custom error message
//     (Try typing a string)"
//     prefix={''}
//     id="currency-input-1"
//     suffix=''
//     limit={99999999}
//   />,
//   document.getElementById('example-2'),
// );