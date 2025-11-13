/**
 * Centralized Math.js utility module
 * Provides standardized access to math.js functionality across all converters
 * Prevents conflicts, errors, and ensures consistent precision for large number calculations
 */

import * as math from 'mathjs';

/**
 * Safely multiply two numbers with high precision using BigNumber
 * @param value - The value to multiply
 * @param factor - The multiplication factor
 * @returns Precise multiplication result as a number
 */
export const preciseMultiply = (value: number | string, factor: number | string): number => {
  try {
    const result = math.multiply(math.bignumber(value), math.bignumber(factor));
    return Number(result.toString());
  } catch (error) {
    console.error('Math multiplication error:', error);
    return Number(value) * Number(factor); // Fallback to standard multiplication
  }
};

/**
 * Safely divide two numbers with high precision using BigNumber
 * @param value - The value to divide
 * @param factor - The division factor
 * @returns Precise division result as a number
 */
export const preciseDivide = (value: number | string, factor: number | string): number => {
  try {
    const result = math.divide(math.bignumber(value), math.bignumber(factor));
    return Number(result.toString());
  } catch (error) {
    console.error('Math division error:', error);
    return Number(value) / Number(factor); // Fallback to standard division
  }
};

/**
 * Convert a value between units using conversion factors
 * @param value - The value to convert
 * @param fromFactor - The conversion factor of the source unit
 * @param toFactor - The conversion factor of the target unit
 * @returns Converted value with high precision
 */
export const convertUnit = (
  value: number | string, 
  fromFactor: number | string, 
  toFactor: number | string
): number => {
  // Convert to base unit, then to target unit
  const baseValue = preciseMultiply(value, fromFactor);
  return preciseDivide(baseValue, toFactor);
};

/**
 * Round a number to specified decimal places
 * @param value - The value to round
 * @param decimals - Number of decimal places (default: 6)
 * @returns Rounded value
 */
export const preciseRound = (value: number, decimals: number = 6): number => {
  try {
    const result = math.round(math.bignumber(value), decimals);
    return Number(result.toString());
  } catch (error) {
    console.error('Math rounding error:', error);
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }
};

/**
 * Format a number for display with appropriate precision
 * @param value - The value to format
 * @param maxDecimals - Maximum decimal places (default: 6)
 * @returns Formatted string
 */
export const formatNumber = (value: number, maxDecimals: number = 6): string => {
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(4);
  }
  
  const rounded = preciseRound(value, maxDecimals);
  
  // Remove trailing zeros
  return rounded.toString().replace(/\.?0+$/, '');
};

/**
 * Check if a value is a valid number
 * @param value - The value to check
 * @returns True if valid number
 */
export const isValidNumber = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Export the entire math.js library for advanced use cases
export { math };
