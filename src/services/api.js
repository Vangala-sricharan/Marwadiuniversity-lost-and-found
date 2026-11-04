/**
 * CampusFind Centralized API Client
 * Interacts with MongoDB Atlas backend via /api/* routes
 */

const API_BASE = '/api';

/**
 * Helper to parse fetch response or throw descriptive Error
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  let data = null;

  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    const text = await response.text();
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text || `HTTP error ${response.status}` };
    }
  }

  if (!response.ok) {
    const message = data?.error || data?.message || `Request failed with status ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

/**
 * Check MongoDB database connection health
 */
export async function checkDbHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, {
      headers: { 'Accept': 'application/json' },
    });
    return await handleResponse(res);
  } catch (err) {
    return {
      status: 'error',
      database: 'disconnected',
      message: err.message,
    };
  }
}

/**
 * Submit a new Lost or Found report to MongoDB Atlas
 * @param {Object} reportData
 * @returns {Promise<Object>} Created report object
 */
export async function createReport(reportData) {
  const res = await fetch(`${API_BASE}/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(reportData),
  });

  const data = await handleResponse(res);
  return data.report;
}

/**
 * Fetch reports from MongoDB Atlas with optional filtering, search, and pagination
 * @param {Object} [params={}]
 * @returns {Promise<{ reports: Array, total: number, page: number, totalPages: number }>}
 */
export async function fetchReports(params = {}) {
  const query = new URLSearchParams();

  if (params.type && params.type !== 'all') query.set('type', params.type);
  if (params.category && params.category !== 'all') query.set('category', params.category);
  if (params.location && params.location !== 'all') query.set('location', params.location);
  if (params.search && params.search.trim()) query.set('search', params.search.trim());
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));

  const url = `${API_BASE}/reports${query.toString() ? `?${query.toString()}` : ''}`;
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
  });

  return await handleResponse(res);
}

/**
 * Fetch a single report by its 12-digit registration token (DDMMYYYYHHmm)
 * @param {string} token
 * @returns {Promise<{ report: Object, finderSubmissions: Array }>}
 */
export async function fetchReportByToken(token) {
  if (!token) throw new Error('Token is required.');
  const cleanToken = String(token).trim();

  const res = await fetch(`${API_BASE}/reports/${encodeURIComponent(cleanToken)}`, {
    headers: { 'Accept': 'application/json' },
  });

  return await handleResponse(res);
}

/**
 * Update report timeline status stage
 * @param {string} token
 * @param {string} status
 * @param {string} [note]
 * @returns {Promise<Object>} Updated report object
 */
export async function updateReportStatusApi(token, status, note) {
  if (!token) throw new Error('Token is required.');
  const cleanToken = String(token).trim();

  const res = await fetch(`${API_BASE}/reports/${encodeURIComponent(cleanToken)}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ status, note }),
  });

  const data = await handleResponse(res);
  return data.report;
}

/**
 * Submit finder information when scanning a belonging QR tag
 * @param {string} reportToken
 * @param {Object} finderData
 * @returns {Promise<{ submissionRecord: Object, updatedReport: Object }>}
 */
export async function submitFinderInfoApi(reportToken, finderData) {
  if (!reportToken) throw new Error('Report token is required.');

  const res = await fetch(`${API_BASE}/finder-submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      reportToken: String(reportToken).trim(),
      ...finderData,
    }),
  });

  return await handleResponse(res);
}

/**
 * Mark item as found / handed over at desk
 * @param {string} token
 * @param {Object} details
 * @returns {Promise<{ updatedReport: Object, notificationSimulated: boolean }>}
 */
export async function markItemAsFoundApi(token, details) {
  if (!token) throw new Error('Token is required.');
  const cleanToken = String(token).trim();

  const res = await fetch(`${API_BASE}/reports/${encodeURIComponent(cleanToken)}/mark-found`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(details),
  });

  return await handleResponse(res);
}
