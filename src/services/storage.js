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
export const FINDER_STORAGE_KEY = 'campusfind_finder_submissions_v1';

/**
 * Validates Marwadi University institutional email address
 * Must strictly end with @marwadiuniversity.ac.in (case-insensitive, trimmed)
 */
export const isValidMUEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  return /^[a-z0-9._%+-]+@marwadiuniversity\.ac\.in$/.test(clean);
};

/**
 * Validates Marwadi University GR Number
 * Must contain exactly 6 numeric digits
 */
export const isValidGRNumber = (gr) => {
  if (!gr) return false;
  const clean = String(gr).trim();
  return /^\d{6}$/.test(clean);
};

// Seed sample reports mapped with valid 12-digit tokens matching their timestamps
export const initialSampleReports = [
  {
    token: '281020261435',
    id: '281020261435',
    reportType: 'lost',
    type: 'lost',
    studentName: 'Aarav Patel',
    grNumber: '135062',
    email: 'aarav.patel12@marwadiuniversity.ac.in',
    contact: '+91 98765 43210',
    itemName: 'Blue Dell Inspiron Laptop Sleeve with Charger',
    category: 'electronics',
    description: 'Navy blue padded case containing a 65W Dell USB-C barrel charger and a wireless mouse. Left on a desk after DBMS lecture.',
    location: 'Academic Block',
    specificSpot: 'Lab 402, 3rd row workstation',
    date: '2026-10-28',
    approximateTime: '02:30 PM',
    imageUrl: imageAssets.categories.electronics,
    status: 'Submitted',
    createdAt: '2026-10-28T14:35:00.000Z',
    submittedAt: '2026-10-28T14:35:00.000Z',
    updatedAt: '2026-10-28T14:35:00.000Z',
    formattedSubmissionDate: '28 October 2026, 14:35',
    history: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-28T14:35:00.000Z',
        note: 'Report registered in CampusFind browser storage.'
      }
    ]
  },
  {
    token: '291020261320',
    id: '291020261320',
    reportType: 'found',
    type: 'found',
    studentName: 'Pooja Joshi',
    grNumber: '142890',
    email: 'pooja.j@marwadiuniversity.ac.in',
    contact: '+91 97123 45678',
    itemName: 'Marwadi University Student ID Card (B.Tech CSE)',
    category: 'idCards',
    description: 'RFID smart card bearing roll number 92300104. Found on the canteen billing counter after lunch rush.',
    location: 'Cafeteria',
    specificSpot: 'Near Juice and Snacks counter',
    date: '2026-10-29',
    approximateTime: '01:15 PM',
    imageUrl: imageAssets.categories.idCards,
    status: 'Under Verification',
    createdAt: '2026-10-29T13:20:00.000Z',
    submittedAt: '2026-10-29T13:20:00.000Z',
    updatedAt: '2026-10-29T14:00:00.000Z',
    formattedSubmissionDate: '29 October 2026, 13:20',
    history: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-29T13:20:00.000Z',
        note: 'Found ID card report registered in CampusFind.'
      },
      {
        stage: 'Under Verification',
        timestamp: '2026-10-29T14:00:00.000Z',
        note: 'Item verified with Cafeteria supervisor desk at MB315.'
      }
    ]
  },
  {
    token: '291020261145',
    id: '291020261145',
    reportType: 'lost',
    type: 'lost',
    studentName: 'Devansh Shah',
    grNumber: '158204',
    email: 'devansh.s@marwadiuniversity.ac.in',
    contact: 'devansh.s@marwadiuniversity.ac.in',
    itemName: 'Scientific Calculator Casio fx-991EX',
    category: 'booksStationery',
    description: 'Black and white ClassWiz calculator with a small neon green sticker on the back casing. Misplaced during engineering math tutorial.',
    location: 'Classroom',
    specificSpot: 'Room E-204, front bench',
    date: '2026-10-29',
    approximateTime: '11:00 AM',
    imageUrl: imageAssets.categories.booksStationery,
    status: 'Submitted',
    createdAt: '2026-10-29T11:45:00.000Z',
    submittedAt: '2026-10-29T11:45:00.000Z',
    updatedAt: '2026-10-29T11:45:00.000Z',
    formattedSubmissionDate: '29 October 2026, 11:45',
    history: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-29T11:45:00.000Z',
        note: 'Report submitted by student and recorded in CampusFind.'
      }
    ]
  },
  {
    token: '301020260910',
    id: '301020260910',
    reportType: 'found',
    type: 'found',
    studentName: 'Vikramsinh Jadeja',
    grNumber: '139115',
    email: 'security.office@marwadiuniversity.ac.in',
    contact: '+91 94280 11223',
    itemName: 'Honda Two-Wheeler Key with Leather Keychain',
    category: 'keysAccess',
    description: 'Single black ignition key with a dark brown braided leather tag and small brass carabiner.',
    location: 'Parking Area',
    specificSpot: 'Near Two-Wheeler Bay Section C',
    date: '2026-10-30',
    approximateTime: '09:10 AM',
    imageUrl: imageAssets.categories.keysAccess,
    status: 'Recovered',
    createdAt: '2026-10-30T09:10:00.000Z',
    submittedAt: '2026-10-30T09:10:00.000Z',
    updatedAt: '2026-10-30T10:15:00.000Z',
    formattedSubmissionDate: '30 October 2026, 09:10',
    history: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-30T09:10:00.000Z',
        note: 'Found key reported near Parking Bay Section C.'
      },
      {
        stage: 'Under Verification',
        timestamp: '2026-10-30T09:40:00.000Z',
        note: 'Key deposited with Security Gatehouse for safe custody.'
      },
      {
        stage: 'Recovered',
        timestamp: '2026-10-30T10:15:00.000Z',
        note: 'Owner matched key specifications and verified custody at MB315.'
      }
    ]
  },
  {
    token: '271020261745',
    id: '271020261745',
    reportType: 'lost',
    type: 'lost',
    studentName: 'Rhea Fernandes',
    grNumber: '146733',
    email: 'rhea.f@marwadiuniversity.ac.in',
    contact: '+91 98200 99887',
    itemName: 'Ray-Ban Wayfarer Prescription Glasses in Black Case',
    category: 'personalItems',
    description: 'Matte black frames in a hard leather snap case. Left on an amphitheatre bench during the cultural club orientation.',
    location: 'MB Building',
    specificSpot: 'Middle tier steps facing the stage',
    date: '2026-10-27',
    approximateTime: '05:45 PM',
    imageUrl: imageAssets.categories.personalItems,
    status: 'Submitted',
    createdAt: '2026-10-27T17:45:00.000Z',
    submittedAt: '2026-10-27T17:45:00.000Z',
    updatedAt: '2026-10-27T17:45:00.000Z',
    formattedSubmissionDate: '27 October 2026, 17:45',
    history: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-27T17:45:00.000Z',
        note: 'Report submitted by student and recorded in CampusFind.'
      }
    ]
  },
  {
    token: '301020261030',
    id: '301020261030',
    reportType: 'found',
    type: 'found',
    studentName: 'Sanjay Rawal',
    grNumber: '151408',
    email: 'library.desk@marwadiuniversity.ac.in',
    contact: '+91 99090 33445',
    itemName: 'Wildcraft Charcoal Grey Water Bottle (750ml)',
    category: 'personalItems',
    description: 'Stainless steel insulated flask with sipper lid. Found on a study desk on the 2nd floor library.',
    location: 'Library',
    specificSpot: '2nd Floor Quiet Zone, Table #14',
    date: '2026-10-30',
    approximateTime: '10:30 AM',
    imageUrl: imageAssets.categories.personalItems,
    status: 'Submitted',
    createdAt: '2026-10-30T10:30:00.000Z',
    submittedAt: '2026-10-30T10:30:00.000Z',
    updatedAt: '2026-10-30T10:30:00.000Z',
    formattedSubmissionDate: '30 October 2026, 10:30',
    history: [
      {
        stage: 'Submitted',
        timestamp: '2026-10-30T10:30:00.000Z',
        note: 'Item reported and left with 2nd floor library helpdesk.'
      }
    ]
  },
];

/**
 * Normalizes and safely migrates a report to guarantee status timeline compliance
 * @param {Object} report
 * @returns {Object}
 */
export const normalizeReport = (report) => {
  if (!report || typeof report !== 'object') return report;

  const createdAt = report.createdAt || report.submittedAt || new Date().toISOString();
  let status = report.status || 'Submitted';

  const validStatuses = [
    'Submitted', 
    'Finder Information Submitted', 
    'Under Verification', 
    'Recovered', 
    'Closed'
  ];

  // Map legacy status if any
  if (status === 'Found / Ready for Claim') {
    status = 'Recovered';
  } else if (!validStatuses.includes(status)) {
    status = 'Submitted';
  }

  const existingHistory = Array.isArray(report.history) && report.history.length > 0 ? report.history : null;
  const history = existingHistory || [
    {
      stage: 'Submitted',
      timestamp: createdAt,
      note: 'Report submitted by student and recorded in CampusFind LocalStorage.'
    }
  ];

  return {
    ...report,
    grNumber: report.grNumber || '',
    email: report.email || '',
    finderSubmission: report.finderSubmission || null,
    status,
    createdAt,
    submittedAt: report.submittedAt || createdAt,
    updatedAt: report.updatedAt || createdAt,
    history
  };
};

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
  if (!data.grNumber || !isValidGRNumber(data.grNumber)) {
    throw new Error('GR Number must be exactly 6 digits.');
  }
  if (!data.email || !isValidMUEmail(data.email)) {
    throw new Error('Please enter your valid Marwadi University email ID ending with @marwadiuniversity.ac.in.');
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
};

/**
 * Retrieves all stored reports from LocalStorage safely with normalized fields
 * @returns {Array} List of report objects
 */
export const getStoredReports = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleReports));
      return initialSampleReports.map(normalizeReport);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      console.warn('Corrupted storage data found. Re-initializing with defaults.');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSampleReports));
      return initialSampleReports.map(normalizeReport);
    }
    return parsed.map(normalizeReport);
  } catch (err) {
    console.error('Failed reading reports from localStorage:', err);
    return initialSampleReports.map(normalizeReport);
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
 * Retrieves a single report by its 12-digit token with normalized status and history
 * @param {string} token
 * @returns {Object|null}
 */
export const getReportByToken = (token) => {
  if (!token) return null;
  const clean = String(token).trim();
  const reports = getStoredReports();
  const found = reports.find(r => r.token === clean || r.id === clean) || null;
  return found ? normalizeReport(found) : null;
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
 * Defaults status to "Submitted" with full initial history entry.
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
  const nowIso = now.toISOString();
  
  const newReport = {
    token,
    id: token,
    reportType,
    type: reportType,
    studentName: sanitizeText(reportData.studentName),
    grNumber: sanitizeText(reportData.grNumber),
    email: sanitizeText(reportData.email),
    contact: sanitizeText(reportData.contact || reportData.email),
    itemName: sanitizeText(reportData.itemName),
    category: reportData.category,
    description: sanitizeText(reportData.description),
    location: sanitizeText(reportData.location),
    rawLocation: sanitizeText(reportData.rawLocation || reportData.location),
    customLocation: sanitizeText(reportData.customLocation || ''),
    specificSpot: sanitizeText(reportData.specificSpot || ''),
    date: reportData.date.trim(),
    approximateTime: sanitizeText(reportData.approximateTime),
    imageUrl: reportData.imageUrl || '',
    status: 'Submitted', // Requirement: Initial status must be "Submitted"
    submittedAt: nowIso,
    createdAt: nowIso,
    updatedAt: nowIso,
    formattedSubmissionDate: formatDisplayDateTime(now),
    handedToDesk: sanitizeText(reportData.handedToDesk || (reportType === 'found' ? 'In Finder Care' : '')),
    history: [
      {
        stage: 'Submitted',
        timestamp: nowIso,
        note: `Report registered in CampusFind LocalStorage with token ${token}.`
      }
    ]
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
 * Updates a report's status in LocalStorage with audit history for prototype demonstration
 * Valid stages: 'Submitted', 'Finder Information Submitted', 'Under Verification', 'Recovered', 'Closed'
 *
 * @param {string} token
 * @param {string} newStage
 * @param {string} [customNote]
 * @returns {Object} Updated report
 */
export const updateReportStatus = (token, newStage, customNote = '') => {
  const validStages = [
    'Submitted', 
    'Finder Information Submitted', 
    'Under Verification', 
    'Recovered', 
    'Closed'
  ];
  if (!validStages.includes(newStage)) {
    throw new Error(`Invalid stage: ${newStage}. Expected one of: ${validStages.join(', ')}`);
  }

  const reports = getStoredReports();
  const index = reports.findIndex(r => r.token === token || r.id === token);
  if (index === -1) {
    throw new Error('Report not found with this registration token.');
  }

  const existing = normalizeReport(reports[index]);
  const now = new Date();
  const nowIso = now.toISOString();

  const note = customNote || `Status updated to ${newStage} in CampusFind prototype.`;
  const updatedHistory = [
    ...(existing.history || []),
    {
      stage: newStage,
      timestamp: nowIso,
      note
    }
  ];

  const updatedReport = {
    ...existing,
    status: newStage,
    updatedAt: nowIso,
    history: updatedHistory
  };

  reports[index] = updatedReport;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.error('Failed saving updated status to storage:', err);
  }

  return updatedReport;
};

/**
 * Retrieves all finder submissions from LocalStorage
 * @returns {Array} List of finder submission records
 */
export const getStoredFinderSubmissions = () => {
  try {
    const raw = localStorage.getItem(FINDER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed reading finder submissions from localStorage:', err);
    return [];
  }
};

/**
 * Retrieves finder submission linked to a specific token or report id
 * @param {string} token
 * @returns {Object|null}
 */
export const getFinderSubmissionByToken = (token) => {
  if (!token) return null;
  const clean = String(token).trim();
  const list = getStoredFinderSubmissions();
  return list.find(s => s.originalToken === clean || s.originalReportId === clean) || null;
};

/**
 * Submits finder information for a scanned QR report.
 * - Stores linked finder record
 * - Updates report status to "Finder Information Submitted"
 * - Appends history entry
 * - Prevents duplicate submissions
 *
 * @param {string} token
 * @param {Object} finderData { finderName, finderEmail, finderGrNumber, foundLocation, customLocation }
 * @returns {Object} { updatedReport, submissionRecord }
 */
export const submitFinderInformation = (token, finderData) => {
  if (!token) {
    throw new Error('Registration token is required.');
  }
  const cleanToken = String(token).trim();

  // 1. Locate the report
  const reports = getStoredReports();
  const index = reports.findIndex(r => r.token === cleanToken || r.id === cleanToken);
  if (index === -1) {
    throw new Error('Report not found with this registration token.');
  }

  const existingReport = normalizeReport(reports[index]);

  // 2. Duplicate submission prevention check
  const existingSubmissions = getStoredFinderSubmissions();
  const alreadySubmitted = existingSubmissions.some(
    s => s.originalToken === cleanToken || s.originalReportId === cleanToken
  ) || existingReport.finderSubmission;

  if (alreadySubmitted) {
    throw new Error('Finder information has already been submitted for this item report. Please visit MB315, Marwadi University, for further assistance.');
  }

  // 3. Validate Finder Information Fields
  const finderName = sanitizeText(finderData.finderName || '');
  if (!finderName || finderName.length < 2) {
    throw new Error('Finder full name is required (minimum 2 characters).');
  }

  const finderEmail = String(finderData.finderEmail || '').trim();
  if (!isValidMUEmail(finderEmail)) {
    throw new Error('Please enter your valid Marwadi University email ID ending with @marwadiuniversity.ac.in.');
  }

  const finderGrNumber = String(finderData.finderGrNumber || '').trim();
  if (!isValidGRNumber(finderGrNumber)) {
    throw new Error('GR Number must be exactly 6 digits.');
  }

  const effectiveLocation = finderData.foundLocation === 'Other' && finderData.customLocation
    ? `Other: ${sanitizeText(finderData.customLocation)}`
    : sanitizeText(finderData.foundLocation || '');

  if (!effectiveLocation) {
    throw new Error('Please select or specify the place where the item was found.');
  }

  const now = new Date();
  const nowIso = now.toISOString();

  const submissionRecord = {
    id: `FND_${cleanToken}_${Date.now()}`,
    originalReportId: existingReport.id || cleanToken,
    originalToken: cleanToken,
    originalItemName: existingReport.itemName,
    originalReportType: existingReport.reportType || existingReport.type || 'lost',
    finderName,
    finderEmail,
    finderGrNumber,
    foundLocation: effectiveLocation,
    customLocation: sanitizeText(finderData.customLocation || ''),
    submissionTimestamp: nowIso,
    formattedSubmissionDate: formatDisplayDateTime(now),
    recoveryStatus: 'Finder Information Submitted'
  };

  // 4. Update Report Status and Append Timeline Entry
  const updatedHistory = [
    ...(existingReport.history || []),
    {
      stage: 'Finder Information Submitted',
      timestamp: nowIso,
      note: `Finder information recorded by ${finderName} (GR: ${finderGrNumber}) at ${effectiveLocation}.`
    }
  ];

  const updatedReport = {
    ...existingReport,
    status: 'Finder Information Submitted',
    finderSubmission: submissionRecord,
    updatedAt: nowIso,
    history: updatedHistory
  };

  reports[index] = updatedReport;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    localStorage.setItem(FINDER_STORAGE_KEY, JSON.stringify([submissionRecord, ...existingSubmissions]));
  } catch (err) {
    console.error('Failed saving finder submission to localStorage:', err);
    throw new Error('Failed to save finder information to browser storage. Please try again.');
  }

  return { updatedReport, submissionRecord };
};

/**
 * Marks a lost item as found, updates its status to Recovered, and triggers email notification
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

  const existing = normalizeReport(reports[index]);
  const now = new Date();
  const nowIso = now.toISOString();

  const sanitizedFinder = {
    finderName: sanitizeText(finderDetails.finderName),
    finderContact: sanitizeText(finderDetails.finderContact),
    foundLocation: sanitizeText(finderDetails.foundLocation),
    note: sanitizeText(finderDetails.note || ''),
    markedAt: nowIso,
    formattedMarkedAt: formatDisplayDateTime(now),
  };

  const updatedReport = {
    ...existing,
    status: 'Recovered',
    foundDetails: sanitizedFinder,
    updatedAt: nowIso,
    history: [
      ...(existing.history || []),
      {
        stage: 'Recovered',
        timestamp: nowIso,
        note: `Located by ${sanitizedFinder.finderName} at ${sanitizedFinder.foundLocation}.`
      }
    ]
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
