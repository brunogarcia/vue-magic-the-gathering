import isNil from 'lodash.isnil';

const MIN_LENGTH = 3;

/**
 * Check if the value is a valid filter word
 *
 * @param {string} value - The value to check
 * @returns {boolean} - The validation flag
 */
export default function isValidFilterValue(value) {
  return (
    !isNil(value)
    || value !== ''
    || value.length > MIN_LENGTH
  );
}
