export interface CurrencyInputProps {
  /**
   * Allow decimals.
   * Default = true
   */
  allowDecimals?: boolean;

  /**
   * Component id
   */
  id: string;

  /**
   * Class names
   */
  className?: string;

  /**
   * Limit length of decimals allowed.
   * Default = 2
   */
  decimalsLimit?: number;

  /**
   * Default value
   */
  defaultValue?: number;

  /**
   * Handle change in value
   */
  onChange: (value: number | null) => void;

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * Include a prefix eg. £
   */
  prefix?: string;
}
