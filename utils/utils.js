import { DateTime, IANAZone } from 'luxon';

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



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



/**
 * Converts an ISO datetime string to another timezone, returning ISO format.
 *
 * @param isoString - The original ISO datetime string (e.g. 2025-10-17T06:00:00Z)
 * @param targetZone - The IANA timezone name (e.g. "Africa/Lagos", "America/New_York")
 * @returns ISO datetime string converted to the target timezone
 */
export function convertToTimezone({ isoString, targetZone }) {
  const dt = DateTime.fromISO(isoString, { zone: "utc" }); // interpret input as UTC
  const converted = dt.setZone(targetZone);
  return converted.toISO(); // return in ISO 8601 format
}



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




export const timezones = {
  "UTC": "UTC",
  "Africa/Lagos": "Africa/Lagos",
  "Africa/Cairo": "Africa/Cairo",
  "America/New_York": "America/New_York",
  "Asia/Tokyo": "Asia/Tokyo",
  "Europe/London": "Europe/London",
  "Europe/Berlin": "Europe/Berlin",
  "Asia/Dubai": "Asia/Dubai",
  "Australia/Sydney": "Australia/Sydney",
};



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



export function isValidTimezone({ zone }) {
  return IANAZone.isValidZone(zone);
}



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



export function isValidEmail({ email }) {
  if (typeof email !== "string") return false;

  // RFC 5322–compliant pattern (simplified for practical use)
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return pattern.test(email.trim());
}

export const formatNumberWithCommas = ({ value }) => {
  if (value === null || value === undefined || isNaN(Number(value))) return '0';
  return Number(value).toLocaleString();
};