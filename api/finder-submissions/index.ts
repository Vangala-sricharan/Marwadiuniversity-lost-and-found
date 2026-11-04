import type { VercelRequest, VercelResponse } from '../../src/server/types.js';
import { submitFinderInformation } from '../../src/server/reportController.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    try {
      const { reportToken, ...finderData } = req.body;
      if (!reportToken) {
        return res.status(400).json({ success: false, error: 'Target report token is required.' });
      }
      const result = await submitFinderInformation(reportToken, finderData);
      return res.status(201).json({
        success: true,
        ...result,
        message: 'Finder submission saved and report status updated.',
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        error: err.message || 'Failed to record finder submission.',
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
