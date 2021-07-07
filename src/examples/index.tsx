import React from 'react';
import ReactDOM from 'react-dom';

import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import Example4 from './Example4';
import FormatValuesExample from './FormatValuesExample';

ReactDOM.render(<Example1 />, document.getElementById('example-1'));

ReactDOM.render(<Example2 />, document.getElementById('example-2'));

ReactDOM.render(<Example3 />, document.getElementById('example-3'));

ReactDOM.render(<Example4 />, document.getElementById('example-4'));

ReactDOM.render(<FormatValuesExample />, document.getElementById('format-values-example'));
