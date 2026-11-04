import type { VercelRequest, VercelResponse } from '../../src/server/types.js';
import { getReportByToken, updateReportStatus } from '../../src/server/reportController.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query;
  const tokenStr = Array.isArray(token) ? token[0] : token;

  if (!tokenStr) {
    return res.status(400).json({ success: false, error: 'Registration token is required.' });
  }

  if (req.method === 'GET') {
    try {
      const result = await getReportByToken(tokenStr);
      if (!result) {
        return res.status(404).json({
          success: false,
          error: `No report found matching 12-digit registration token: ${tokenStr}`,
        });
      }
      return res.status(200).json({
        success: true,
        ...result,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        error: err.message || 'Error looking up report.',
      });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { status, note } = req.body;
      if (!status) {
        return res.status(400).json({ success: false, error: 'New status is required.' });
      }
      const updated = await updateReportStatus(tokenStr, status, note);
      return res.status(200).json({
        success: true,
        report: updated,
        message: `Report status updated to "${status}".`,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        error: err.message || 'Failed to update report status.',
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
