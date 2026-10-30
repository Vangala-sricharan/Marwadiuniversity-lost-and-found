/**
 * Centralized LocalStorage Service for CampusFind (Phase 2)
 *
 * Responsibilities:
 * - Persisting Lost and Found reports with 12-digit registration tokens (DDMMYYYYHHmm)
 * - Preventing duplicate tokens with user-friendly minute-collision notice
 * - Validating reports before storage
 * - Graceful handling of corrupted or missing storage data
 * - Retrieving reports by token for tracking
 */

import { imageAssets } from '../config/imageAssets.js';
import { generateSubmissionToken, formatDisplayDateTime } from '../utils/tokenGenerator.js';

const STORAGE_KEY = 'campusfind_reports_v2';
const LEGACY_STORAGE_KEY = 'campusfind_reports_v1';

// Seed sample reports mapped with valid 12-digit tokens matching their timestamps
export const initialSampleReports = [
  {
    token: '281020261435',
    id: '281020261435',
    reportType: 'lost',
    type: 'lost',
    studentName: 'Aarav Patel',
    itemName: 'Blue Dell Inspiron Laptop Sleeve with Charger',
    category: 'electronics',
    description: 'Navy blue padded case containing a 65W Dell USB-C barrel charger and a wireless mouse. Left on a desk after DBMS lecture.',
    location: 'Academic Block',
    specificSpot: 'Lab 402, 3rd row workstation',
    date: '2026-10-28',
    approximateTime: '02:30 PM',
    contact: '+91 98765 43210',
    email: 'aarav.patel12@marwadiuniversity.ac.in',
    imageUrl: imageAssets.categories.electronics,
    status: 'Submitted',
    createdAt: '2026-10-28T14:35:00.000Z',
    submittedAt: '2026-10-28T14:35:00.000Z',
    formattedSubmissionDate: '28 October 2026, 14:35',
  },
  {
    token: '291020261320',
    id: '291020261320',
    reportType: 'found',
    type: 'found',
    studentName: 'Pooja Joshi',
    itemName: 'Marwadi University Student ID Card (B.Tech CSE)',
    category: 'idCards',
    description: 'RFID smart card bearing roll number 92300104. Found on the canteen billing counter after lunch rush.',
    location: 'Cafeteria',
    specificSpot: 'Near Juice and Snacks counter',
    date: '2026-10-29',
    approximateTime: '01:15 PM',
    contact: '+91 97123 45678',
    email: 'pooja.j@marwadiuniversity.ac.in',
    imageUrl: imageAssets.categories.idCards,
    status: 'Submitted',
    createdAt: '2026-10-29T13:20:00.000Z',
    submittedAt: '2026-10-29T13:20:00.000Z',
    formattedSubmissionDate: '29 October 2026, 13:20',
  },
  {
    token: '291020261145',
    id: '291020261145',
    reportType: 'lost',
    type: 'lost',
    studentName: 'Devansh Shah',
    itemName: 'Scientific Calculator Casio fx-991EX',
    category: 'booksStationery',
    description: 'Black and white ClassWiz calculator with a small neon green sticker on the back casing. Misplaced during engineering math tutorial.',
    location: 'Classroom',
    specificSpot: 'Room E-204, front bench',
    date: '2026-10-29',
    approximateTime: '11:00 AM',
    contact: 'devansh.s@marwadiuniversity.ac.in',
    email: 'devansh.s@marwadiuniversity.ac.in',
    imageUrl: imageAssets.categories.booksStationery,
    status: 'Submitted',
    createdAt: '2026-10-29T11:45:00.000Z',
    submittedAt: '2026-10-29T11:45:00.000Z',
    formattedSubmissionDate: '29 October 2026, 11:45',
  },
  {
    token: '301020260910',
    id: '301020260910',
    reportType: 'found',
    type: 'found',
    studentName: 'Vikramsinh Jadeja',
    itemName: 'Honda Two-Wheeler Key with Leather Keychain',
    category: 'keysAccess',
    description: 'Single black ignition key with a dark brown braided leather tag and small brass carabiner.',
    location: 'Parking Area',
    specificSpot: 'Near Two-Wheeler Bay Section C',
    date: '2026-10-30',
    approximateTime: '09:10 AM',
    contact: '+91 94280 11223',
    email: 'security.office@marwadiuniversity.ac.in',
    imageUrl: imageAssets.categories.keysAccess,
    status: 'Submitted',
    createdAt: '2026-10-30T09:10:00.000Z',
    submittedAt: '2026-10-30T09:10:00.000Z',
    formattedSubmissionDate: '30 October 2026, 09:10',
  },
  {
    token: '271020261745',
    id: '271020261745',
    reportType: 'lost',
    type: 'lost',
    studentName: 'Rhea Fernandes',
    itemName: 'Ray-Ban Wayfarer Prescription Glasses in Black Case',
    category: 'personalItems',
    description: 'Matte black frames in a hard leather snap case. Left on an amphitheatre bench during the cultural club orientation.',
    location: 'MB Building',
    specificSpot: 'Middle tier steps facing the stage',
    date: '2026-10-27',
    approximateTime: '05:45 PM',
    contact: '+91 98200 99887',
    email: 'rhea.f@marwadiuniversity.ac.in',
    imageUrl: imageAssets.categories.personalItems,
    status: 'Submitted',
    createdAt: '2026-10-27T17:45:00.000Z',
    submittedAt: '2026-10-27T17:45:00.000Z',
    formattedSubmissionDate: '27 October 2026, 17:45',
  },
  {
    token: '301020261030',
    id: '301020261030',
    reportType: 'found',
    type: 'found',
    studentName: 'Sanjay Rawal',
    itemName: 'Wildcraft Charcoal Grey Water Bottle (750ml)',
    category: 'personalItems',
    description: 'Stainless steel insulated flask with sipper lid. Found on a study desk on the 2nd floor library.',
    location: 'Library',
    specificSpot: '2nd Floor Quiet Zone, Table #14',
    date: '2026-10-30',
    approximateTime: '10:30 AM',
    contact: '+91 99090 33445',
    email: 'library.desk@marwadiuniversity.ac.in',
    imageUrl: imageAssets.categories.personalItems,
    status: 'Submitted',
    createdAt: '2026-10-30T10:30:00.000Z',
    submittedAt: '2026-10-30T10:30:00.000Z',
    formattedSubmissionDate: '30 October 2026, 10:30',
  },
];

/**
 * Validates report fields before saving
 * @param {Object} data
 * @throws {Error} if validation fails
 */
export const validateReportData = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid report payload.');
  }
  if (!data.studentName || !data.studentName.trim()) {
    throw new Error('Student name is required.');
  }
  if (!data.itemName || !data.itemName.trim()) {
    throw new Error('Item name is required.');
  }
  if (!data.category) {
    throw new Error('Item category is required.');
  }
  if (!data.description || !data.description.trim()) {
    throw new Error('Item description is required.');
  }
  if (!data.location || !data.location.trim()) {
    throw new Error('Campus location is required.');
  }
  if (!data.date || !data.date.trim()) {
    throw new Error('Report date is required.');
  }
  if (!data.approximateTime || !data.approximateTime.trim()) {
    throw new Error('Approximate time is required.');
  }
  if (!data.contact || !data.contact.trim()) {
    throw new Error('Contact phone or email is required.');
  }
};

/**
 * Retrieves all stored reports from LocalStorage safely
 * @returns {Array} List of report objects
 */
export const getStoredReports = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleReports));
      return initialSampleReports;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('Corrupted storage data found. Re-initializing with defaults.');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleReports));
      return initialSampleReports;
    }
    return parsed;
  } catch (err) {
    console.error('Failed reading reports from localStorage:', err);
    return initialSampleReports;
  }
};

/**
 * Checks if a 12-digit token already exists in storage
 * @param {string} token
 * @returns {boolean}
 */
export const isTokenTaken = (token) => {
  if (!token) return false;
  const reports = getStoredReports();
  return reports.some(r => r.token === token || r.id === token);
};

/**
 * Retrieves a single report by its 12-digit token
 * @param {string} token
 * @returns {Object|null}
 */
export const getReportByToken = (token) => {
  if (!token) return null;
  const clean = String(token).trim();
  const reports = getStoredReports();
  return reports.find(r => r.token === clean || r.id === clean) || null;
};

/**
 * Basic sanitation utility to strip dangerous markup and escape special chars
 * @param {string} str
 * @returns {string} Sanitized string
 */
export const sanitizeText = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '') // strip any HTML tag
    .trim();
};

/**
 * Saves a new report into LocalStorage with an automatic 12-digit DDMMYYYYHHmm token.
 * Handles collisions if another report exists with the identical minute-token.
 *
 * @param {Object} reportData
 * @returns {Object} Saved report object including the generated token
 * @throws {Error} If validation fails or if token collision occurs
 */
export const saveNewReport = (reportData) => {
  // 1. Validate payload
  validateReportData(reportData);

  // 2. Generate token using current submission timestamp
  const now = new Date();
  const token = generateSubmissionToken(now);

  // 3. Collision handling: prevent duplicate token within the same minute
  if (isTokenTaken(token)) {
    throw new Error(
      `A report with registration token ${token} was already registered during this minute. ` +
      `To ensure unique record identification, please wait until the next minute starts and click submit again.`
    );
  }

  // 4. Build standard report structure with sanitized user inputs
  const reportType = (reportData.reportType || reportData.type || 'lost').toLowerCase();
  
  const newReport = {
    token,
    id: token, // for backward compatibility with components reading item.id
    reportType,
    type: reportType,
    studentName: sanitizeText(reportData.studentName),
    itemName: sanitizeText(reportData.itemName),
    category: reportData.category,
    description: sanitizeText(reportData.description),
    location: sanitizeText(reportData.location),
    rawLocation: sanitizeText(reportData.rawLocation || reportData.location),
    customLocation: sanitizeText(reportData.customLocation || ''),
    specificSpot: sanitizeText(reportData.specificSpot || ''),
    date: reportData.date.trim(),
    approximateTime: sanitizeText(reportData.approximateTime),
    contact: sanitizeText(reportData.contact),
    email: reportData.contact.includes('@') ? sanitizeText(reportData.contact) : '',
    imageUrl: reportData.imageUrl || '',
    status: 'Submitted', // Requirement: Initial status must be "Submitted"
    submittedAt: now.toISOString(),
    createdAt: now.toISOString(),
    formattedSubmissionDate: formatDisplayDateTime(now),
    handedToDesk: sanitizeText(reportData.handedToDesk || (reportType === 'found' ? 'In Finder Care' : '')),
  };

  try {
    const current = getStoredReports();
    const updated = [newReport, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newReport;
  } catch (err) {
    console.error('Failed saving report to localStorage:', err);
    throw new Error('Failed to save report to browser storage. Please try again.');
  }
};

/**
 * Marks a lost item as found, updates its status, and triggers email notification to the owner
 * @param {string} token 
 * @param {Object} finderDetails
 * @returns {Promise<{ updatedReport: Object, emailReceipt: Object }>}
 */
export const markItemAsFound = async (token, finderDetails) => {
  const reports = getStoredReports();
  const index = reports.findIndex(r => r.token === token || r.id === token);
  if (index === -1) {
    throw new Error('Report not found with this registration token.');
  }

  const existing = reports[index];
  const now = new Date();

  const sanitizedFinder = {
    finderName: sanitizeText(finderDetails.finderName),
    finderContact: sanitizeText(finderDetails.finderContact),
    foundLocation: sanitizeText(finderDetails.foundLocation),
    note: sanitizeText(finderDetails.note || ''),
    markedAt: now.toISOString(),
    formattedMarkedAt: formatDisplayDateTime(now),
  };

  const updatedReport = {
    ...existing,
    status: 'Found / Ready for Claim',
    foundDetails: sanitizedFinder,
    updatedAt: now.toISOString(),
  };

  reports[index] = updatedReport;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.error('Failed saving updated status to storage:', err);
  }

  // Send email notification to the original student owner
  let emailReceipt = null;
  try {
    const { sendItemFoundEmailNotification } = await import('./emailService.js');
    emailReceipt = await sendItemFoundEmailNotification({
      report: updatedReport,
      finderDetails: sanitizedFinder,
    });
  } catch (emailErr) {
    console.warn('Email notification dispatch notice:', emailErr);
  }

  return { updatedReport, emailReceipt };
};
