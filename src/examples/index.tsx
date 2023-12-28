import React from 'react';
import { createRoot } from 'react-dom/client';

import Example1 from './Example1';
import Example2 from './Example2';
import Example3 from './Example3';
import Example4 from './Example4';
import FormatValuesExample from './FormatValuesExample';

const container = document.getElementById('app');
const root = createRoot(container!);

const Content = () => {
  return (
    <>
      <div id="example-1">
        <Example1 />
      </div>

      <hr />

      <div id="example-2">
        <Example2 />
      </div>

      <hr />

      <div id="example-3">
        <Example3 />
      </div>

      <hr />

      <div id="example-4">
        <Example4 />
      </div>

      <hr />

      <div id="format-values-example">
        <FormatValuesExample />
      </div>

      <hr />
    </>
  );
};

root.render(<Content />);
