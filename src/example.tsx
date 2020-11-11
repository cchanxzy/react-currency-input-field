import React from 'react';
import ReactDOM from 'react-dom';

import Example1 from './examples/Example1';
import Example2 from './examples/Example2';
import Example3 from './examples/Example3';
import FormatValuesExample from './examples/FormatValuesExample';

ReactDOM.render(<Example1 />, document.getElementById('example-1'));

ReactDOM.render(<Example2 />, document.getElementById('example-2'));

ReactDOM.render(<Example3 />, document.getElementById('example-3'));

ReactDOM.render(<FormatValuesExample />, document.getElementById('format-values-example'));
