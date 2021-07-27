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
  getSuffix,
  parseAsFloat
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
      customInput,
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
      suffix,
      intlConfig,
      step,
      min,
      max,
      disableGroupSeparators = false,
      disableAbbreviations = false,
      decimalSeparator: _decimalSeparator,
      groupSeparator: _groupSeparator,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
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
      prefix: prefix || localeConfig.prefix,
      suffix: suffix,
    };

    const cleanValueOptions: Partial<CleanValueOptions> = {
      decimalSeparator,
      groupSeparator,
      allowDecimals,
      decimalsLimit: decimalsLimit || fixedDecimalLength || 2,
      allowNegativeValue,
      disableAbbreviations,
      prefix: prefix || localeConfig.prefix,
    };

    const formattedStateValue =
      defaultValue !== undefined
        ? formatValue({ ...formatValueOptions, decimalScale, value: String(defaultValue) })
        : userValue !== undefined
        ? formatValue({ ...formatValueOptions, decimalScale, value: String(userValue) })
        : '';

    const [stateValue, setStateValue] = useState(formattedStateValue);
    const [dirty, setDirty] = useState(false);
    const [cursor, setCursor] = useState(0);
    const inputRef = ref || useRef<HTMLInputElement>(null);

    const processChange = (value: string, selectionStart?: number | null): void => {
      setDirty(true);
      const valueOnly = cleanValue({ value, ...cleanValueOptions });
      const numberValue = parseAsFloat(valueOnly, cleanValueOptions.groupSeparator || '.');

      if (valueOnly === '') {
        onValueChange && onValueChange(undefined, name, numberValue);
        setStateValue('');
        return;
      }

      if (userMaxLength && valueOnly.replace(/-/g, '').length > userMaxLength) {
        return;
      }

      if (valueOnly === '-' || valueOnly === decimalSeparator) {
        onValueChange && onValueChange(undefined, name, numberValue);
        setStateValue(value);
        return;
      }

      const formattedValue = formatValue({ value: valueOnly, ...formatValueOptions });

      /* istanbul ignore next */
      if (selectionStart !== undefined && selectionStart !== null) {
        // Prevent cursor jumping
        const newCursor = selectionStart + (formattedValue.length - value.length) || 1;
        setCursor(newCursor);
      }

      setStateValue(formattedValue);

      onValueChange && onValueChange(valueOnly, name, numberValue);
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
      const numberValue = parseAsFloat(valueOnly, cleanValueOptions.groupSeparator || '.');

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
        decimalScale !== undefined ? decimalScale : fixedDecimalLength
      );

      onValueChange && onValueChange(newValue, name, numberValue);

      const formattedValue = formatValue({
        ...formatValueOptions,
        value: newValue,
      });

      setStateValue(formattedValue);

      onBlur && onBlur(event);
    };

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;

      if (step && (key === 'ArrowUp' || key === 'ArrowDown')) {
        event.preventDefault();
        setCursor(stateValue.length);

        const currentValue =
          parseFloat(
            userValue !== undefined
              ? String(userValue).replace(decimalSeparator, '.')
              : cleanValue({ value: stateValue, ...cleanValueOptions })
          ) || 0;
        const newValue = key === 'ArrowUp' ? currentValue + step : currentValue - step;

        if (min !== undefined && newValue < min) {
          return;
        }

        if (max !== undefined && newValue > max) {
          return;
        }

        const fixedLength = String(step).includes(decimalSeparator)
          ? Number(String(step).split(decimalSeparator)[1].length)
          : undefined;

        processChange(
          String(fixedLength ? newValue.toFixed(fixedLength) : newValue).replace(
            '.',
            decimalSeparator
          )
        );
      }

      onKeyDown && onKeyDown(event);
    };

    const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const {
        key,
        currentTarget: { selectionStart },
      } = event;
      if (key !== 'ArrowUp' && key !== 'ArrowDown' && stateValue !== '-') {
        const suffix = getSuffix(stateValue, { groupSeparator, decimalSeparator });

        if (suffix && selectionStart && selectionStart > stateValue.length - suffix.length) {
          if (inputRef && typeof inputRef === 'object' && inputRef.current) {
            const newCursor = stateValue.length - suffix.length;
            inputRef.current.setSelectionRange(newCursor, newCursor);
          }
        }
      }

      onKeyUp && onKeyUp(event);
    };

    /* istanbul ignore next */
    useEffect(() => {
      // prevent cursor jumping if editing value
      if (
        dirty &&
        stateValue !== '-' &&
        inputRef &&
        typeof inputRef === 'object' &&
        inputRef.current
      ) {
        inputRef.current.setSelectionRange(cursor, cursor);
      }
    }, [stateValue, cursor, inputRef, dirty]);

    const formattedPropsValue =
      userValue !== undefined
        ? formatValue({
            ...formatValueOptions,
            decimalScale: dirty ? undefined : decimalScale,
            value: String(userValue),
          })
        : undefined;

    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      type: 'text',
      inputMode: 'decimal',
      id,
      name,
      className,
      onChange: handleOnChange,
      onBlur: handleOnBlur,
      onFocus: handleOnFocus,
      onKeyDown: handleOnKeyDown,
      onKeyUp: handleOnKeyUp,
      placeholder,
      disabled,
      value:
        formattedPropsValue !== undefined && stateValue !== '-' && stateValue !== decimalSeparator
          ? formattedPropsValue
          : stateValue,
      ref: inputRef,
      ...props,
    };

    if (customInput) {
      const CustomInput = customInput;
      return <CustomInput {...inputProps} />;
    }

    return <input {...inputProps} />;
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;
