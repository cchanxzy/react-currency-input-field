type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type CurrencyInputProps = Overwrite<
  React.InputHTMLAttributes<HTMLInputElement>,
  {
    /**
     * Allow decimals
     *
     * Default = true
     */
    allowDecimals?: boolean;

    /**
     * Component to render. Can either be a string e.g. 'input', or a component.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: string | React.ComponentType<any> | React.ForwardRefExoticComponent<any>;

    /**
     * Component id
     */
    id?: string;

    /**
     *  Maximum characters the user can enter
     */
    maxLength?: number;

    /**
     * Class names
     */
    className?: string;

    /**
     * Limit length of decimals allowed
     *
     * Default = 2
     */
    decimalsLimit?: number;

    /**
     * Default value
     */
    defaultValue?: number;

    /**
     * Disabled
     *
     * Default = false
     */
    disabled?: boolean;

    /**
     * Handle change in value
     */
    onChange?: (value: string | undefined, name?: string) => void;

    /**
     * Placeholder
     */
    placeholder?: string;

    /**
     * Specify decimal precision for padding/trimming
     */
    precision?: number;

    /**
     * Include a prefix eg. £
     */
    prefix?: string;

    /**
     * Disable auto adding separator between values eg. 1000 > 1,000
     *
     * Default = false
     */
    turnOffSeparators?: boolean;
  }
>;
