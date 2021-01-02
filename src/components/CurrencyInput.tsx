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
import { getSuffix } from './utils/getSuffix';

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
      onValueChange,
      fixedDecimalLength,
      placeholder,
      decimalScale,
      prefix,
      intlConfig,
      step,
      disableGroupSeparators = false,
      disableAbbreviations = false,
      decimalSeparator: _decimalSeparator,
      groupSeparator: _groupSeparator,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    }: CurrencyInputProps,
    ref
  ) => {
    if (_decimalSeparator && _groupSeparator && _decimalSeparator === _groupSeparator) {
      throw new Error('decimalSeparator cannot be the same as groupSeparator');
    }

    if (_decimalSeparator && isNumber(_decimalSeparator)) {
      throw new Error('decimalSeparator cannot be a number');
    }

    if (_groupSeparator && isNumber(_groupSeparator)) {
      throw new Error('groupSeparator cannot be a number');
    }

    const localeConfig = useMemo(() => getLocaleConfig(intlConfig), [intlConfig]);
    const decimalSeparator = _decimalSeparator || localeConfig.decimalSeparator || '';
    const groupSeparator = _groupSeparator || localeConfig.groupSeparator || '';

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
        : userValue !== undefined
        ? formatValue({ value: String(userValue), ...formatValueOptions })
        : '';
    const [stateValue, setStateValue] = useState(_defaultValue);
    const [cursor, setCursor] = useState(0);
    const inputRef = ref || useRef<HTMLInputElement>(null);

    const processChange = (value: string, selectionStart?: number | null): void => {
      const valueOnly = cleanValue({ value, ...cleanValueOptions });

      if (valueOnly === '') {
        onValueChange && onValueChange(undefined, name);
        setStateValue('');
        return;
      }

      if (userMaxLength && valueOnly.replace(/-/g, '').length > userMaxLength) {
        return;
      }

      if (valueOnly === '-') {
        onValueChange && onValueChange(undefined, name);
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

      onValueChange && onValueChange(valueOnly, name);
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const {
        target: { value, selectionStart },
      } = event;

      processChange(value, selectionStart);

      onChange && onChange(event);
    };

    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>): number => {
      onFocus && onFocus(event);
      return stateValue ? stateValue.length : 0;
    };

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
      const {
        target: { value },
      } = event;

      const valueOnly = cleanValue({ value, ...cleanValueOptions });

      if (valueOnly === '-' || !valueOnly) {
        setStateValue('');
        onBlur && onBlur(event);
        return;
      }

      const fixedDecimals = fixedDecimalValue(valueOnly, decimalSeparator, fixedDecimalLength);

      // Add padding or trim value to decimalScale
      const newValue = padTrimValue(
        fixedDecimals,
        decimalSeparator,
        decimalScale || fixedDecimalLength
      );

      onValueChange && onValueChange(newValue, name);

      const formattedValue = formatValue({
        ...formatValueOptions,
        value: newValue,
      });

      setStateValue(formattedValue);

      onBlur && onBlur(event);
    };

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const {
        key,
        currentTarget: { selectionStart },
      } = event;

      if (step && (key === 'ArrowUp' || key === 'ArrowDown')) {
        event.preventDefault();
        const currentValue =
          Number(
            userValue !== undefined
              ? userValue
              : cleanValue({ value: stateValue, ...cleanValueOptions })
          ) || 0;
        const newValue = key === 'ArrowUp' ? currentValue + step : currentValue - step;
        processChange(String(newValue));
      } else if (selectionStart && key === 'Backspace') {
        const suffix = getSuffix(stateValue, { groupSeparator, decimalSeparator });

        if (suffix && selectionStart > stateValue.length - suffix.length) {
          if (inputRef && typeof inputRef === 'object' && inputRef.current) {
            event.preventDefault();
            const newCursor = stateValue.length - suffix.length;
            inputRef.current.setSelectionRange(newCursor, newCursor);
          }
        }
      }

      onKeyDown && onKeyDown(event);
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
        onFocus={handleOnFocus}
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
