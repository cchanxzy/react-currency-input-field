/**
 * Safely multiply a decimal number by an integer multiplier to avoid
 * floating-point precision issues.
 *
 * Uses scientific notation (e.g., 4.1e6) which avoids the precision issues
 * that occur with direct multiplication (e.g., 4.1 * 1000000 = 4099999.9999999995)
 *
 * @param value - The decimal number to multiply (e.g., 4.1)
 * @param multiplier - The integer multiplier (e.g., 1000000)
 * @returns The result as a number
 *
 * @example
 * safeMultiply(4.1, 1_000_000) // Returns 4100000 (using 4.1e6)
 * safeMultiply(1.025, 1_000_000) // Returns 1025000 (using 1.025e6)
 * safeMultiply(2.1, 1_000) // Returns 2100 (using 2.1e3)
 * safeMultiply(-4.1, 1_000_000) // Returns -4100000 (using -4.1e6)
 */
export const safeMultiply = (value: number, multiplier: number): number => {
  if (!isFinite(value) || !isFinite(multiplier)) {
    return NaN;
  }

  // Calculate the exponent (number of zeros in the multiplier)
  // e.g., 1000 -> 3, 1000000 -> 6, 1000000000 -> 9
  const exponent = Math.log10(multiplier);

  // If multiplier is a power of 10 (e.g., 1000, 1000000), use scientific notation
  // This avoids floating-point precision issues
  if (Number.isInteger(exponent)) {
    // Convert to exponential notation, extract mantissa and current exponent
    // then add the multiplier's exponent
    const expString = value.toExponential();
    const [mantissa, currentExp] = expString.split('e');
    const newExp = parseInt(currentExp) + exponent;
    return parseFloat(mantissa + 'e' + newExp);
  }

  // Fallback to regular multiplication for non-power-of-10 multipliers
  return value * multiplier;
};
