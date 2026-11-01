/**
 * Consent and Cookie Preferences Service for CampusFind (Phase 3)
 * 
 * Handles:
 * - Legal consent persistence (Terms & Conditions + Privacy Policy)
 * - Cookie / LocalStorage preferences (Essential, Analytics, Marketing)
 * - Feedback submissions persistence
 */

export const LEGAL_CONSENT_KEY = 'campusfind_legal_consent';
export const COOKIE_PREFS_KEY = 'campusfind_cookie_preferences';
export const FEEDBACK_KEY = 'campusfind_feedback';

export const CURRENT_TERMS_VERSION = '1.0';
export const CURRENT_PRIVACY_VERSION = '1.0';

/**
 * Get current legal consent state
 * @returns {Object|null}
 */
export const getLegalConsent = () => {
  try {
    const raw = localStorage.getItem(LEGAL_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      parsed.termsAccepted === true &&
      parsed.privacyAccepted === true &&
      parsed.termsVersion === CURRENT_TERMS_VERSION &&
      parsed.privacyVersion === CURRENT_PRIVACY_VERSION
    ) {
      return parsed;
    }
    return null;
  } catch (err) {
    console.error('Error reading legal consent from storage:', err);
    return null;
  }
};

/**
 * Save legal consent (both Terms and Privacy accepted)
 * @returns {Object}
 */
export const saveLegalConsent = () => {
  const record = {
    termsAccepted: true,
    privacyAccepted: true,
    termsVersion: CURRENT_TERMS_VERSION,
    privacyVersion: CURRENT_PRIVACY_VERSION,
    acceptedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(LEGAL_CONSENT_KEY, JSON.stringify(record));
    window.dispatchEvent(new CustomEvent('campusfind_consent_updated', { detail: record }));
  } catch (err) {
    console.error('Error saving legal consent:', err);
  }

  return record;
};

/**
 * Get cookie preferences
 * @returns {Object|null}
 */
export const getCookiePreferences = () => {
  try {
    const raw = localStorage.getItem(COOKIE_PREFS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading cookie preferences:', err);
    return null;
  }
};

/**
 * Save cookie preferences
 * @param {Object} prefs { essential, analytics, marketing }
 */
export const saveCookiePreferences = (prefs = {}) => {
  const record = {
    essential: true, // Always true
    analytics: Boolean(prefs.analytics),
    marketing: Boolean(prefs.marketing),
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(record));
    window.dispatchEvent(new CustomEvent('campusfind_cookie_prefs_updated', { detail: record }));
  } catch (err) {
    console.error('Error saving cookie preferences:', err);
  }

  return record;
};

/**
 * Trigger opening the Cookie Preferences modal from anywhere
 */
export const openCookieModal = () => {
  window.dispatchEvent(new CustomEvent('campusfind_open_cookie_modal'));
};

/**
 * Get all stored feedback entries
 * @returns {Array}
 */
export const getStoredFeedback = () => {
  try {
    const raw = localStorage.getItem(FEEDBACK_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading feedback from storage:', err);
    return [];
  }
};

/**
 * Save a new feedback entry
 * @param {Object} entry 
 */
export const saveFeedback = (entry) => {
  const existing = getStoredFeedback();
  const newFeedback = {
    id: `fb_${Date.now()}`,
    rating: entry.rating || 5,
    easeRating: entry.easeRating || 5,
    category: entry.category || 'General Feedback',
    comments: entry.comments || '',
    studentName: entry.studentName ? entry.studentName.trim() : 'Anonymous Student',
    department: entry.department ? entry.department.trim() : '',
    submittedAt: new Date().toISOString(),
    formattedDate: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };

  const updated = [newFeedback, ...existing];
  try {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving feedback:', err);
  }
  return newFeedback;
};
