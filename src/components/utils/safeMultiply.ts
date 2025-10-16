/**
 * Safely multiply a decimal number by an integer multiplier to avoid
 * floating-point precision issues.
 *
 * @param value - The decimal number to multiply (e.g., 4.1)
 * @param multiplier - The integer multiplier (e.g., 1000000)
 * @returns The result as a number
 *
 * @example
 * safeMultiply(4.1, 1_000_000) // Returns 4100000 instead of 4099999.9999999995
 * safeMultiply(1.025, 1_000_000) // Returns 1025000 instead of 1024999.9999999999
 * safeMultiply(2.1, 1_000) // Returns 2100
 * safeMultiply(-4.1, 1_000_000) // Returns -4100000
 */
export const safeMultiply = (value: number, multiplier: number): number => {
  if (!isFinite(value) || !isFinite(multiplier)) {
    return NaN;
  }

  // Handle sign separately
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  // Convert to string to get exact decimal representation
  const valueStr = absValue.toString();
  const parts = valueStr.split('.');

  const integerPart = parseInt(parts[0]) || 0;
  const decimalPart = parts[1] || '';

  // Calculate integer part: integer * multiplier
  const integerResult = integerPart * multiplier;

  // Calculate decimal part using integer arithmetic
  // For 4.1: decimalPart = "1", we calculate: 1 * 1_000_000 / 10
  let decimalResult = 0;
  if (decimalPart) {
    const decimalAsInt = parseInt(decimalPart);
    const decimalPlaces = decimalPart.length;
    const divisor = Math.pow(10, decimalPlaces);

    // Multiply the decimal as integer, then divide
    decimalResult = (decimalAsInt * multiplier) / divisor;
  }

  // Combine results
  const result = integerResult + decimalResult;

  // Apply sign
  return isNegative ? -result : result;
};
