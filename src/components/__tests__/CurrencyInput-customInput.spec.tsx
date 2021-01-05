import React, { forwardRef } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CurrencyInput from '../CurrencyInput';

describe('<CurrencyInput/> customInput', () => {
  it('should render with customInput', () => {
    const customInput = forwardRef<HTMLInputElement>(
      (props: React.InputHTMLAttributes<HTMLInputElement>, ref) => {
        return <input {...props} ref={ref} />;
      }
    );

    customInput.displayName = 'CustomInput';

    render(<CurrencyInput defaultValue="1234" customInput={customInput} />);

    expect(screen.getByRole('textbox')).toHaveValue('1,234');
  });
});
