import React, { FC, useState, useEffect, useRef, forwardRef, useMemo } from 'react';
import { CurrencyInputProps, Values } from './CurrencyInputProps';
import {
  isNumber,
  cleanValue,
  fixedDecimalValue,
  formatValue,
  getLocaleConfig,
  padTrimValue,
  CleanValueOptions,
  getSuffix,
  FormatValueOptions,
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
    if (_decimalSeparator && isNumber(_decimalSeparator)) {
      throw new Error('decimalSeparator cannot be a number');
    }

    if (_groupSeparator && isNumber(_groupSeparator)) {
      throw new Error('groupSeparator cannot be a number');
    }

    const localeConfig = useMemo(() => getLocaleConfig(intlConfig), [intlConfig]);
    const decimalSeparator = _decimalSeparator || localeConfig.decimalSeparator || '';
    const groupSeparator = _groupSeparator || localeConfig.groupSeparator || '';

    if (
      decimalSeparator &&
      groupSeparator &&
      decimalSeparator === groupSeparator &&
      disableGroupSeparators === false
    ) {
      throw new Error('decimalSeparator cannot be the same as groupSeparator');
    }

    const formatValueOptions: Partial<FormatValueOptions> = {
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
      defaultValue !== undefined && defaultValue !== null
        ? formatValue({ ...formatValueOptions, decimalScale, value: String(defaultValue) })
        : userValue !== undefined && userValue !== null
        ? formatValue({ ...formatValueOptions, decimalScale, value: String(userValue) })
        : '';

    const [stateValue, setStateValue] = useState(formattedStateValue);
    const [dirty, setDirty] = useState(false);
    const [cursor, setCursor] = useState(0);
    const inputRef = ref || useRef<HTMLInputElement>(null);

    /**
     * Process change in value
     */
    const processChange = (value: string, selectionStart?: number | null): void => {
      setDirty(true);
      const stringValue = cleanValue({ value, ...cleanValueOptions });

      if (userMaxLength && stringValue.replace(/-/g, '').length > userMaxLength) {
        return;
      }

      if (stringValue === '' || stringValue === '-' || stringValue === decimalSeparator) {
        onValueChange && onValueChange(undefined, name, { float: null, formatted: '', value: '' });
        setStateValue(stringValue);
        return;
      }

      const numberValue = parseFloat(stringValue.replace(decimalSeparator, '.'));
      const formattedValue = formatValue({ value: stringValue, ...formatValueOptions });

      /* istanbul ignore next */
      if (selectionStart !== undefined && selectionStart !== null) {
        // Prevent cursor jumping
        const newCursor = selectionStart + (formattedValue.length - value.length) || 1;
        setCursor(newCursor);
      }

      setStateValue(formattedValue);

      if (onValueChange) {
        const values: Values = {
          float: numberValue,
          formatted: formattedValue,
          value: stringValue,
        };
        onValueChange(stringValue, name, values);
      }
    };

    /**
     * Handle change event
     */
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const {
        target: { value, selectionStart },
      } = event;

      processChange(value, selectionStart);

      onChange && onChange(event);
    };

    /**
     * Handle focus event
     */
    const handleOnFocus = (event: React.FocusEvent<HTMLInputElement>): number => {
      onFocus && onFocus(event);
      return stateValue ? stateValue.length : 0;
    };

    /**
     * Handle blur event
     *
     * Format value by padding/trimming decimals if required by
     */
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

      const newValue = padTrimValue(
        fixedDecimals,
        decimalSeparator,
        decimalScale !== undefined ? decimalScale : fixedDecimalLength
      );

      const numberValue = parseFloat(newValue.replace(decimalSeparator, '.'));

      const formattedValue = formatValue({
        ...formatValueOptions,
        value: newValue,
      });

      if (onValueChange) {
        onValueChange(newValue, name, {
          float: numberValue,
          formatted: formattedValue,
          value: newValue,
        });
      }

      setStateValue(formattedValue);

      onBlur && onBlur(event);
    };

    /**
     * Handle key down event
     *
     * Increase or decrease value by step
     */
    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = event;

      if (step && (key === 'ArrowUp' || key === 'ArrowDown')) {
        event.preventDefault();
        setCursor(stateValue.length);

        const currentValue =
          parseFloat(
            userValue !== undefined && userValue !== null
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

        const fixedLength = String(step).includes('.')
          ? Number(String(step).split('.')[1].length)
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

    /**
     * Handle key up event
     *
     * Move cursor if there is a suffix to prevent user typing past suffix
     */
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

    /**
     * If user has only entered "-" or decimal separator,
     * keep the char to allow them to enter next value
     */
    const getRenderValue = () => {
      if (
        userValue !== undefined &&
        userValue !== null &&
        stateValue !== '-' &&
        stateValue !== decimalSeparator
      ) {
        return formatValue({
          ...formatValueOptions,
          decimalScale: dirty ? undefined : decimalScale,
          value: String(userValue),
        });
      }

      return stateValue;
    };

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
      value: getRenderValue(),
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
