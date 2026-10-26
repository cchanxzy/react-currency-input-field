import React from 'react';
import { createRoot } from 'react-dom/client';

import CurrencyInput from '../../src';

// A test-only page for Playwright. It is built and served by playwright.config.ts, and is not
// part of the demo.
createRoot(document.getElementById('app')!).render(
  <>
    <CurrencyInput id="sv-se" intlConfig={{ locale: 'sv-SE', currency: 'SEK' }} />
    <CurrencyInput id="custom-suffix" suffix=" kg" />
  </>
);
