export declare type CurrencyInputProps = {
    /**
     * Allow decimals.
     * Default = true
     */
    allowDecimals?: boolean;
    /**
     * Component id
     */
    id?: string;
    /**
     * Component name
     */
    name?: string;
    /**
     * Class names
     */
    className?: string;
    /**
     * Limit length of decimals allowed
     * Default = 2
     */
    decimalsLimit?: number;
    /**
     * Default value
     */
    defaultValue?: number;
    /**
     * Disabled
     * Default = false
     */
    disabled?: boolean;
    /**
     * Handle change in value
     */
    onChange: (value: number | null, name?: string) => void;
    /**
     * Placeholder
     */
    placeholder?: string;
    /**
     * Include a prefix eg. £
     */
    prefix?: string;
    /**
     *  Max Length
     */
    maxLength?: number;
};
