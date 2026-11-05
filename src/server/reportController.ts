import { Db } from 'mongodb';
import { getDb } from './db.js';
import { 
  generateUniqueToken, 
  isValidGRNumber, 
  isValidMUEmail, 
  isValidTokenFormat,
  formatDisplayDateTime 
} from './tokenService.js';

/**
 * Masks phone number for public privacy
 * e.g. "+91 98765 43210" -> "+91 98*** ***10"
 */
function maskContact(contact?: string): string {
  if (!contact) return '';
  const clean = contact.trim();
  if (clean.length <= 4) return '***';
  const start = clean.slice(0, Math.min(6, Math.floor(clean.length / 3)));
  const end = clean.slice(-2);
  return `${start}***${end}`;
}

/**
 * Masks email address for public privacy
 * e.g. "aarav.patel12@marwadiuniversity.ac.in" -> "aa***@marwadiuniversity.ac.in"
 */
function maskEmail(email?: string): string {
  if (!email) return '';
  const parts = email.split('@');
  if (parts.length !== 2) return '***@marwadiuniversity.ac.in';
  const user = parts[0];
  const domain = parts[1];
  const prefix = user.slice(0, 2);
  return `${prefix}***@${domain}`;
}

/**
 * Masks student GR number for public privacy
 * e.g. "135062" -> "13****"
 */
function maskGRNumber(gr?: string): string {
  if (!gr) return '';
  const clean = String(gr).trim();
  if (clean.length < 2) return '******';
  return `${clean.slice(0, 2)}****`;
}

/**
 * Sanitizes report object for public viewing
 */
function sanitizeReport(report: any) {
  if (!report) return null;
  return {
    ...report,
    _id: report._id ? String(report._id) : undefined,
    id: report.token || String(report._id),
    contactMasked: maskContact(report.contact),
    emailMasked: maskEmail(report.email),
    grNumberMasked: maskGRNumber(report.grNumber),
  };
}

export interface AutoStageConfig {
  elapsedMinutes: number;
  stage: string;
  note: string;
}

export const LOST_AUTO_STAGES: AutoStageConfig[] = [
  { elapsedMinutes: 0, stage: 'Submitted', note: 'Report logged in portal' },
  { elapsedMinutes: 5, stage: 'Finder Info Submitted', note: 'Found info logged via QR' },
  { elapsedMinutes: 10, stage: 'Under Verification', note: 'Desk check at MB315' },
  { elapsedMinutes: 15, stage: 'Recovered', note: 'Matched & ready for pickup' },
  { elapsedMinutes: 20, stage: 'Closed', note: 'Handover complete' },
];

function matchesStage(historyStage: string, targetStage: string): boolean {
  const h = (historyStage || '').toLowerCase().trim();
  const t = (targetStage || '').toLowerCase().trim();
  if (h === t) return true;

  const isTargetFinder = t.includes('finder');
  const isHistoryFinder = h.includes('finder');
  if (isTargetFinder || isHistoryFinder) {
    return isTargetFinder && isHistoryFinder;
  }

  const isTargetVerification = t.includes('verification');
  const isHistoryVerification = h.includes('verification');
  if (isTargetVerification || isHistoryVerification) {
    return isTargetVerification && isHistoryVerification;
  }

  const isTargetRecovered = t.includes('recover');
  const isHistoryRecovered = h.includes('recover');
  if (isTargetRecovered || isHistoryRecovered) {
    return isTargetRecovered && isHistoryRecovered;
  }

  const isTargetClosed = t.includes('close');
  const isHistoryClosed = h.includes('close');
  if (isTargetClosed || isHistoryClosed) {
    return isTargetClosed && isHistoryClosed;
  }

  const isTargetInitial = t === 'submitted' || t.includes('pending');
  const isHistoryInitial = h === 'submitted' || h.includes('pending');
  if (isTargetInitial && isHistoryInitial) {
    return true;
  }

  return false;
}

/**
 * Calculates and persists 5-stage automatic progression for Lost reports.
 * 25-minute total duration, exactly 5 minutes per stage.
 * Cumulative elapsed times:
 * 0m: Submitted
 * 5m: Finder Info Submitted
 * 10m: Under Verification
 * 15m: Recovered
 * 20m: Closed
 * 25m+: Remains Closed
 */
export async function applyLostProgression(report: any, db?: Db): Promise<any> {
  if (!report) return report;
  const isLost = report.reportType === 'lost' || report.type === 'lost';
  if (!isLost) return report;

  const createdTime = new Date(report.createdAt || report.submittedAt || Date.now()).getTime();
  if (isNaN(createdTime)) return report;

  const now = Date.now();
  const elapsedMinutes = Math.max(0, (now - createdTime) / (60 * 1000));

  const eligibleStages = LOST_AUTO_STAGES.filter(s => elapsedMinutes >= s.elapsedMinutes);
  if (eligibleStages.length === 0) return report;

  if (!Array.isArray(report.history)) {
    report.history = [];
  }

  let historyUpdated = false;

  for (const stageConfig of eligibleStages) {
    const alreadyRecorded = report.history.some((h: any) => 
      matchesStage(h.stage, stageConfig.stage)
    );

    if (!alreadyRecorded) {
      const stageTime = new Date(createdTime + stageConfig.elapsedMinutes * 60 * 1000).toISOString();
      report.history.push({
        stage: stageConfig.stage,
        timestamp: stageTime,
        note: stageConfig.note,
      });
      historyUpdated = true;
    }
  }

  // Ensure chronological ordering of audit history
  report.history.sort((a: any, b: any) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const latestEligible = eligibleStages[eligibleStages.length - 1];
  let statusUpdated = false;

  if (report.status !== latestEligible.stage) {
    report.status = latestEligible.stage;
    statusUpdated = true;
  }

  if (historyUpdated || statusUpdated) {
    report.updatedAt = new Date().toISOString();

    if (db && report._id) {
      try {
        await db.collection('reports').updateOne(
          { _id: report._id },
          {
            $set: {
              status: report.status,
              history: report.history,
              updatedAt: report.updatedAt,
            },
          }
        );
      } catch (persistErr) {
        console.warn('Auto progression database persistence skipped or failed:', persistErr);
      }
    }
  }

  return report;
}

/**
 * Controller: Check Database Health
 */
export async function getHealth() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    const reportsCount = await db.collection('reports').countDocuments();
    const findersCount = await db.collection('finder_submissions').countDocuments();

    return {
      status: 'ok',
      database: 'connected',
      databaseName: db.databaseName,
      reportsCount,
      findersCount,
      timestamp: new Date().toISOString(),
    };
  } catch (err: any) {
    return {
      status: 'degraded',
      database: 'disconnected',
      error: err.message || 'Database unavailable',
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Controller: Create Report
 */
export async function createReport(data: any) {
  const {
    studentName,
    grNumber,
    email,
    contact,
    itemName,
    category,
    description,
    location,
    rawLocation,
    customLocation,
    specificSpot,
    date,
    approximateTime,
    handedToDesk,
    imageUrl,
    reportType = 'lost',
  } = data;

  // Validation
  if (!studentName || !studentName.trim()) {
    throw new Error('Student name is required.');
  }

  if (!isValidGRNumber(grNumber)) {
    throw new Error('GR Number must contain exactly 6 numeric digits.');
  }

  if (!isValidMUEmail(email)) {
    throw new Error('Valid Marwadi University institutional email (@marwadiuniversity.ac.in) is required.');
  }

  if (!itemName || !itemName.trim()) {
    throw new Error('Item name is required.');
  }

  if (!category || !category.trim()) {
    throw new Error('Item category is required.');
  }

  if (!description || !description.trim()) {
    throw new Error('Item description is required.');
  }

  if (!location || !location.trim()) {
    throw new Error('Campus location is required.');
  }

  if (!date) {
    throw new Error('Date is required.');
  }

  if (!approximateTime) {
    throw new Error('Approximate time is required.');
  }

  const type = reportType === 'found' ? 'found' : 'lost';
  const db = await getDb();
  const reportsCollection = db.collection('reports');

  // Generate unique 12-digit token: DDMMYYYYHHmm
  const { token, submissionDate, formattedDate } = await generateUniqueToken(db);

  // Initial stage & audit history
  const initialStatus = type === 'found' 
    ? (handedToDesk ? 'Item Handed Over to MB315' : 'Pending Verification')
    : 'Submitted';

  const initialNote = type === 'found'
    ? (handedToDesk 
        ? 'Found item deposited at Demonstration Desk MB315. Verified record created.' 
        : 'Found item report registered in portal. Verification pending.')
    : 'Report logged in portal';

  const nowIso = submissionDate.toISOString();

  const newDoc = {
    token,
    id: token,
    reportType: type,
    type,
    studentName: studentName.trim(),
    grNumber: String(grNumber).trim(),
    email: email.trim().toLowerCase(),
    contact: contact ? contact.trim() : email.trim().toLowerCase(),
    itemName: itemName.trim(),
    category: category.trim(),
    description: description.trim(),
    location: location.trim(),
    rawLocation: rawLocation || location,
    customLocation: customLocation || '',
    specificSpot: specificSpot ? specificSpot.trim() : '',
    date,
    approximateTime,
    handedToDesk: Boolean(handedToDesk),
    imageUrl: imageUrl || '',
    status: initialStatus,
    formattedSubmissionDate: formattedDate,
    createdAt: submissionDate,
    submittedAt: nowIso,
    updatedAt: nowIso,
    history: [
      {
        stage: initialStatus,
        timestamp: nowIso,
        note: initialNote,
      },
    ],
  };

  await reportsCollection.insertOne(newDoc);

  return sanitizeReport(newDoc);
}

/**
 * Controller: Get Reports with Filtering, Search, and Pagination
 */
export async function getReports(query: {
  type?: string;
  category?: string;
  location?: string;
  search?: string;
  page?: string | number;
  limit?: string | number;
}) {
  const db = await getDb();
  const reportsCollection = db.collection('reports');

  const filter: any = {};

  // Type filter: lost | found | all
  if (query.type && query.type !== 'all') {
    filter.reportType = query.type;
  }

  // Category filter
  if (query.category && query.category !== 'all') {
    filter.category = query.category;
  }

  // Location filter
  if (query.location && query.location !== 'all') {
    filter.location = query.location;
  }

  // Search keyword filter
  if (query.search && query.search.trim()) {
    const term = query.search.trim();
    filter.$or = [
      { itemName: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } },
      { location: { $regex: term, $options: 'i' } },
      { specificSpot: { $regex: term, $options: 'i' } },
      { token: { $regex: term, $options: 'i' } },
    ];
  }

  const page = Math.max(1, parseInt(String(query.page || 1), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(query.limit || 20), 10)));
  const skip = (page - 1) * limit;

  const total = await reportsCollection.countDocuments(filter);
  const rawReports = await reportsCollection
    .find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  // Apply automatic 25-minute progression for lost reports
  await Promise.all(rawReports.map(r => applyLostProgression(r, db)));

  const reports = rawReports.map(sanitizeReport);
  const totalPages = Math.ceil(total / limit) || 1;

  return {
    success: true,
    reports,
    total,
    page,
    limit,
    totalPages,
  };
}

/**
 * Controller: Get Single Report by 12-Digit Token
 */
export async function getReportByToken(token: string) {
  if (!isValidTokenFormat(token)) {
    throw new Error('Registration token must be exactly 12 digits (format: DDMMYYYYHHmm).');
  }

  const db = await getDb();
  const report = await db.collection('reports').findOne({ token: token.trim() });

  if (!report) {
    return null;
  }

  // Apply automatic 25-minute progression for lost reports
  await applyLostProgression(report, db);

  // Fetch linked finder submissions if any
  const finderSubmissions = await db
    .collection('finder_submissions')
    .find({ reportToken: token.trim() })
    .sort({ createdAt: -1 })
    .toArray();

  return {
    report: sanitizeReport(report),
    finderSubmissions: finderSubmissions.map(sub => ({
      ...sub,
      _id: String(sub._id),
      finderGrNumberMasked: maskGRNumber(sub.finderGrNumber),
      finderEmailMasked: maskEmail(sub.finderEmail),
    })),
  };
}

/**
 * Controller: Update Report Status with History Audit
 */
export async function updateReportStatus(token: string, newStage: string, note?: string) {
  if (!isValidTokenFormat(token)) {
    throw new Error('Registration token must be exactly 12 digits (format: DDMMYYYYHHmm).');
  }

  const db = await getDb();
  const reportsCollection = db.collection('reports');

  const existing = await reportsCollection.findOne({ token: token.trim() });
  if (!existing) {
    throw new Error(`No report found with registration token: ${token}`);
  }

  const nowIso = new Date().toISOString();
  const historyEntry = {
    stage: newStage,
    timestamp: nowIso,
    note: note || `Report status updated to "${newStage}".`,
  };

  await reportsCollection.updateOne(
    { token: token.trim() },
    {
      $set: {
        status: newStage,
        updatedAt: nowIso,
      },
      $push: {
        history: historyEntry as any,
      },
    }
  );

  const updated = await reportsCollection.findOne({ token: token.trim() });
  return sanitizeReport(updated);
}

/**
 * Controller: Submit Finder Information (QR Recovery Workflow)
 */
export async function submitFinderInformation(token: string, finderData: any) {
  const { finderName, finderEmail, finderGrNumber, foundLocation, customLocation } = finderData;

  if (!finderName || !finderName.trim()) {
    throw new Error('Finder name is required.');
  }

  if (!isValidMUEmail(finderEmail)) {
    throw new Error('Valid Marwadi University institutional email is required.');
  }

  if (!isValidGRNumber(finderGrNumber)) {
    throw new Error('Finder GR Number must contain exactly 6 numeric digits.');
  }

  if (!foundLocation || !foundLocation.trim()) {
    throw new Error('Found location is required.');
  }

  const db = await getDb();
  const reportsCollection = db.collection('reports');
  const finderCollection = db.collection('finder_submissions');

  const existingReport = await reportsCollection.findOne({ token: token.trim() });
  if (!existingReport) {
    throw new Error(`Belonging with token ${token} was not found in university records.`);
  }

  const submissionDate = new Date();
  const nowIso = submissionDate.toISOString();
  const effectiveLocation = foundLocation === 'Other' && customLocation 
    ? `Other: ${customLocation.trim()}` 
    : foundLocation;

  const submissionRecord = {
    reportId: String(existingReport._id),
    reportToken: token.trim(),
    originalItemName: existingReport.itemName,
    finderName: finderName.trim(),
    finderEmail: finderEmail.trim().toLowerCase(),
    finderGrNumber: String(finderGrNumber).trim(),
    foundLocation: effectiveLocation,
    customLocation: customLocation || '',
    submissionTimestamp: nowIso,
    createdAt: submissionDate,
  };

  const insertResult = await finderCollection.insertOne(submissionRecord);

  // Update report stage to "Finder Information Submitted"
  const historyEntry = {
    stage: 'Finder Information Submitted',
    timestamp: nowIso,
    note: `Belonging spotted/found at ${effectiveLocation} by student (GR: ${maskGRNumber(finderGrNumber)}). Contact logged for verification.`,
  };

  await reportsCollection.updateOne(
    { token: token.trim() },
    {
      $set: {
        status: 'Finder Information Submitted',
        updatedAt: nowIso,
      },
      $push: {
        history: historyEntry as any,
      },
    }
  );

  const updatedReport = await reportsCollection.findOne({ token: token.trim() });

  return {
    submissionRecord: {
      ...submissionRecord,
      _id: String(insertResult.insertedId),
      finderGrNumberMasked: maskGRNumber(finderGrNumber),
      finderEmailMasked: maskEmail(finderEmail),
    },
    updatedReport: sanitizeReport(updatedReport),
  };
}

/**
 * Controller: Mark Item as Found (Handover / Desk Check)
 */
export async function markItemAsFound(token: string, details: any) {
  const db = await getDb();
  const reportsCollection = db.collection('reports');

  const existing = await reportsCollection.findOne({ token: token.trim() });
  if (!existing) {
    throw new Error(`Report not found for token: ${token}`);
  }

  const nowIso = new Date().toISOString();
  const newStage = 'Under Verification';
  const historyEntry = {
    stage: newStage,
    timestamp: nowIso,
    note: details.note || `Finder information recorded (${details.finderName || 'Student'}). Deposited at ${details.foundLocation || 'MB315'}.`,
  };

  await reportsCollection.updateOne(
    { token: token.trim() },
    {
      $set: {
        status: newStage,
        updatedAt: nowIso,
      },
      $push: {
        history: historyEntry as any,
      },
    }
  );

  const updated = await reportsCollection.findOne({ token: token.trim() });

  return {
    updatedReport: sanitizeReport(updated),
    notificationSimulated: true,
    recipientEmail: existing.email,
  };
}
