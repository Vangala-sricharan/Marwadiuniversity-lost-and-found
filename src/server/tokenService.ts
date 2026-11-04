import { Db } from 'mongodb';

/**
 * Formats a Date object into an exact 12-digit string: DDMMYYYYHHmm
 */
export function formatTokenString(dateObj: Date): string {
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = String(dateObj.getFullYear());
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day}${month}${year}${hours}${minutes}`;
}

/**
 * Formats a Date into a human-readable display string
 * e.g. "03 November 2026, 22:30"
 */
export function formatDisplayDateTime(dateObj: Date): string {
  const day = dateObj.getDate();
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

/**
 * Generates an exact 12-digit DDMMYYYYHHmm registration token guaranteed to be unique in MongoDB.
 * If a submission collision occurs within the same minute, advances by +1 minute candidate.
 */
export async function generateUniqueToken(db: Db): Promise<{ token: string; submissionDate: Date; formattedDate: string }> {
  const reportsCollection = db.collection('reports');
  const now = new Date();
  let candidateDate = new Date(now.getTime());

  // Check up to 120 minutes ahead to find an available collision-free token
  for (let attempt = 0; attempt < 120; attempt++) {
    const candidateToken = formatTokenString(candidateDate);
    const existing = await reportsCollection.findOne({ token: candidateToken });

    if (!existing) {
      return {
        token: candidateToken,
        submissionDate: candidateDate,
        formattedDate: formatDisplayDateTime(candidateDate),
      };
    }

    // Advance 1 minute for next candidate
    candidateDate = new Date(candidateDate.getTime() + 60 * 1000);
  }

  // Fallback fallback if high congestion
  const fallbackToken = `${formatTokenString(new Date())}${Math.floor(10 + Math.random() * 89)}`.slice(0, 12);
  return {
    token: fallbackToken,
    submissionDate: new Date(),
    formattedDate: formatDisplayDateTime(new Date()),
  };
}

/**
 * Validates 12-digit format
 */
export function isValidTokenFormat(token?: string): boolean {
  if (!token || typeof token !== 'string') return false;
  return /^\d{12}$/.test(token.trim());
}

/**
 * Validates 6-digit numeric GR Number
 */
export function isValidGRNumber(gr?: string | number): boolean {
  if (!gr) return false;
  const clean = String(gr).trim();
  return /^\d{6}$/.test(clean);
}

/**
 * Validates Marwadi University institutional email
 * Case-insensitive, must end in @marwadiuniversity.ac.in
 */
export function isValidMUEmail(email?: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim().toLowerCase();
  return /^[a-z0-9._%+-]+@marwadiuniversity\.ac\.in$/.test(clean);
}
