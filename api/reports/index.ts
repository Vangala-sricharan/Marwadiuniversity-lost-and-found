import type { VercelRequest, VercelResponse } from '../../src/server/types.js';
import { getReports, createReport } from '../../src/server/reportController.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const { type, category, location, search, page, limit } = req.query;
      const result = await getReports({
        type: type as string,
        category: category as string,
        location: location as string,
        search: search as string,
        page: page as string,
        limit: limit as string,
      });
      return res.status(200).json(result);
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: err.message || 'Failed to retrieve reports from MongoDB.',
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const newReport = await createReport(req.body);
      return res.status(201).json({
        success: true,
        report: newReport,
        message: 'Report submitted successfully to MongoDB Atlas.',
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        error: err.message || 'Failed to create report.',
      });
    }
  }

  return res.status(405).json({ success: false, error: 'Method Not Allowed' });
}
