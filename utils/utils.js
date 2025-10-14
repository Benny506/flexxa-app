import { DateTime } from 'luxon';

/**
 * Validate a date built from numeric year, month, and day.
 *
 * @param {number} year - The full year (e.g., 2025)
 * @param {number} month - The month (1–12)
 * @param {number} day - The day of the month (1–31)
 * @param {Object} [options] - Optional validation flags
 * @param {boolean} [options.mustBeFuture=false] - Require the date to be today or in the future
 * @param {boolean} [options.mustBePast=false] - Require the date to be in the past
 * @returns {{ valid: boolean, reason?: string }}
 */
export function validateDate({ year, month, day, options = {} }) {
  const { mustBeFuture = false, mustBePast = false } = options;

  // Try constructing the date safely with Luxon
  const date = DateTime.fromObject({ year, month, day });

  // ✅ Check if it's a valid date (e.g. Feb 30 will fail)
  if (!date.isValid) {
    return { valid: false, reason: date.invalidExplanation || 'Invalid date' };
  }

  const now = DateTime.now();

  // ✅ Optional future/past validations
  if (mustBeFuture && date.startOf('day') < now.startOf('day')) {
    return { valid: false, reason: 'Date must be today or in the future' };
  }

  if (mustBePast && date.endOf('day') > now.endOf('day')) {
    return { valid: false, reason: 'Date must be in the past' };
  }

  // ✅ Month/day range validation (redundant but explicit)
  if (month < 1 || month > 12) {
    return { valid: false, reason: 'Month must be between 1 and 12' };
  }

  const daysInMonth = DateTime.local(year, month).daysInMonth;
  if (day < 1 || day > daysInMonth) {
    return { valid: false, reason: `Day must be between 1 and ${daysInMonth} for the given month` };
  }

  return { valid: true };
}
