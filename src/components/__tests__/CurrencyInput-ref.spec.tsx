import React, { createRef } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> ref', () => {
  it('should be able to add HTML ref to component', () => {
    const ref = createRef<HTMLInputElement>();

    render(<CurrencyInput value="123456789" ref={ref} />);

    expect(screen.getByRole('textbox')).toBe(ref.current);
  });
});
