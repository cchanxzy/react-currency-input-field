import React, { FC, useState, useEffect, useRef, forwardRef, useMemo } from 'react';
import { CurrencyInputProps } from './CurrencyInputProps';
import {
  isNumber,
  cleanValue,
  fixedDecimalValue,
  formatValue,
  getLocaleConfig,
  padTrimValue,
  CleanValueOptions,
} from './utils';

export const CurrencyInput: FC<CurrencyInputProps> = forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(
  (
    {
      allowDecimals = true,
      allowNegativeValue = true,
      id,
      name,
      className,
      decimalsLimit,
      defaultValue,
      disabled = false,
      maxLength: userMaxLength,
      value: userValue,
      onChange,
      onBlurValue,
      fixedDecimalLength,
      placeholder,
      decimalScale,
      prefix,
      intlConfig,
      step,
      disableGroupSeparators = false,
      disableAbbreviations = false,
      ...props
    }: CurrencyInputProps,
    ref
  ) => {
    if (
      props.decimalSeparator &&
      props.groupSeparator &&
      props.decimalSeparator === props.groupSeparator
    ) {
      throw new Error('decimalSeparator cannot be the same as groupSeparator');
    }

    if (props.decimalSeparator && isNumber(props.decimalSeparator)) {
      throw new Error('decimalSeparator cannot be a number');
    }

    if (props.groupSeparator && isNumber(props.groupSeparator)) {
      throw new Error('groupSeparator cannot be a number');
    }

    const localeConfig = useMemo(() => getLocaleConfig(intlConfig), [intlConfig]);
    const decimalSeparator = props.decimalSeparator || localeConfig.decimalSeparator || '';
    const groupSeparator = props.groupSeparator || localeConfig.groupSeparator || '';

    const formatValueOptions = {
      decimalSeparator,
      groupSeparator,
      disableGroupSeparators,
      intlConfig,
      prefix,
    };

    const cleanValueOptions: Partial<CleanValueOptions> = {
      decimalSeparator,
      groupSeparator,
      allowDecimals,
      decimalsLimit: decimalsLimit || fixedDecimalLength || 2,
      allowNegativeValue,
      disableAbbreviations,
      prefix,
    };

    const _defaultValue =
      defaultValue !== undefined
        ? formatValue({ value: String(defaultValue), ...formatValueOptions })
        : '';
    const [stateValue, setStateValue] = useState(_defaultValue);
    const [cursor, setCursor] = useState(0);
    const inputRef = ref || useRef<HTMLInputElement>(null);

    const onFocus = (): number => (stateValue ? stateValue.length : 0);

    const processChange = (value: string, selectionStart?: number | null): void => {
      const valueOnly = cleanValue({ value, ...cleanValueOptions });

      if (!valueOnly) {
        onChange && onChange(undefined, name);
        setStateValue('');
        return;
      }

      if (userMaxLength && valueOnly.replace(/-/g, '').length > userMaxLength) {
        return;
      }

      if (valueOnly === '-') {
        onChange && onChange(undefined, name);
        setStateValue(value);
        return;
      }

      const formattedValue = formatValue({ value: valueOnly, ...formatValueOptions });

      /* istanbul ignore next */
      if (selectionStart !== undefined && selectionStart !== null) {
        const cursor = selectionStart + (formattedValue.length - value.length) || 1;
        setCursor(cursor);
      }

      setStateValue(formattedValue);

      onChange && onChange(valueOnly, name);
    };

    const handleOnChange = ({
      target: { value, selectionStart },
    }: React.ChangeEvent<HTMLInputElement>): void => {
      processChange(value, selectionStart);
    };

    const handleOnBlur = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
      const valueOnly = cleanValue({ value, ...cleanValueOptions });

      if (valueOnly === '-' || !valueOnly) {
        onBlurValue && onBlurValue(undefined, name);
        setStateValue('');
        return;
      }

      const fixedDecimals = fixedDecimalValue(valueOnly, decimalSeparator, fixedDecimalLength);

      // Add padding or trim value to decimalScale
      const newValue = padTrimValue(
        fixedDecimals,
        decimalSeparator,
        decimalScale || fixedDecimalLength
      );
      onChange && onChange(newValue, name);
      onBlurValue && onBlurValue(newValue, name);

      const formattedValue = formatValue({
        ...formatValueOptions,
        value: newValue,
      });
      setStateValue(formattedValue);
    };

    const handleOnKeyDown = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
      if (step && (key === 'ArrowUp' || key === 'ArrowDown')) {
        const currentValue =
          Number(
            userValue !== undefined
              ? userValue
              : cleanValue({ value: stateValue, ...cleanValueOptions })
          ) || 0;
        const newValue =
          key === 'ArrowUp'
            ? String(currentValue + Number(step))
            : String(currentValue - Number(step));

        processChange(newValue);
      }
    };

    /* istanbul ignore next */
    useEffect(() => {
      if (inputRef && typeof inputRef === 'object' && inputRef.current) {
        inputRef.current.setSelectionRange(cursor, cursor);
      }
    }, [cursor, inputRef]);

    const formattedPropsValue =
      userValue !== undefined
        ? formatValue({
            ...formatValueOptions,
            value: String(userValue),
          })
        : undefined;

    return (
      <input
        type="text"
        inputMode="decimal"
        id={id}
        name={name}
        className={className}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onFocus={onFocus}
        onKeyDown={handleOnKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        value={
          formattedPropsValue !== undefined && stateValue !== '-' ? formattedPropsValue : stateValue
        }
        ref={inputRef}
        {...props}
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;
