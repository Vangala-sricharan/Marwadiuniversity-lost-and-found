/**
 * Centralized Registration Token Generation Utility
 *
 * Requirements:
 * - Format: DDMMYYYYHHmm (Exactly 12 digits)
 * - Uses actual local date and 24-hour time at the exact moment of submission
 * - No manual token entry, no random tokens, no hardcoded values
 */

/**
 * Generates an exact 12-digit registration token based on local date & time: DDMMYYYYHHmm
 * @param {Date} [dateObj=new Date()]
 * @returns {string} 12-digit token
 */
export function generateSubmissionToken(dateObj = new Date()) {
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = String(dateObj.getFullYear());
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day}${month}${year}${hours}${minutes}`;
}

/**
 * Validates if a token matches the expected 12-digit format
 * @param {string} token
 * @returns {boolean}
 */
export function isValidTokenFormat(token) {
  if (!token || typeof token !== 'string') return false;
  return /^\d{12}$/.test(token.trim());
}

/**
 * Formats a Date object into human-readable string for display
 * @param {Date|string} dateInput
 * @returns {string} e.g. "30 October 2026, 20:17"
 */
export function formatDisplayDateTime(dateInput) {
  try {
    const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);

    const day = d.getDate();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  } catch {
    return String(dateInput);
  }
}
