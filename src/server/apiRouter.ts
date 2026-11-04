import { Router, Request, Response } from 'express';
import {
  getHealth,
  createReport,
  getReports,
  getReportByToken,
  updateReportStatus,
  submitFinderInformation,
  markItemAsFound,
} from './reportController.js';

export const apiRouter = Router();

/**
 * GET /api/health
 */
apiRouter.get('/health', async (_req: Request, res: Response) => {
  try {
    const health = await getHealth();
    res.json(health);
  } catch (err: any) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: err.message,
    });
  }
});

/**
 * POST /api/reports
 */
apiRouter.post('/reports', async (req: Request, res: Response) => {
  try {
    const newReport = await createReport(req.body);
    res.status(201).json({
      success: true,
      report: newReport,
      message: 'Report submitted successfully to MongoDB Atlas.',
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message || 'Failed to create report in database.',
    });
  }
});

/**
 * GET /api/reports
 */
apiRouter.get('/reports', async (req: Request, res: Response) => {
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
    res.json(result);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || 'Failed to retrieve reports from MongoDB Atlas.',
    });
  }
});

/**
 * GET /api/reports/:token
 */
apiRouter.get('/reports/:token', async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const result = await getReportByToken(token);
    if (!result) {
      res.status(404).json({
        success: false,
        error: `No report found matching 12-digit registration token: ${token}`,
      });
      return;
    }
    res.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message || 'Error looking up report.',
    });
  }
});

/**
 * PATCH /api/reports/:token/status
 */
apiRouter.patch('/reports/:token/status', async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { status, note } = req.body;
    if (!status) {
      res.status(400).json({ success: false, error: 'New status stage is required.' });
      return;
    }
    const updated = await updateReportStatus(token, status, note);
    res.json({
      success: true,
      report: updated,
      message: `Report status updated to "${status}".`,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message || 'Failed to update report status.',
    });
  }
});

/**
 * POST /api/finder-submissions
 */
apiRouter.post('/finder-submissions', async (req: Request, res: Response) => {
  try {
    const { reportToken, ...finderData } = req.body;
    if (!reportToken) {
      res.status(400).json({ success: false, error: 'Target report token is required.' });
      return;
    }
    const result = await submitFinderInformation(reportToken, finderData);
    res.status(201).json({
      success: true,
      ...result,
      message: 'Finder submission saved and report status updated.',
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message || 'Failed to record finder submission.',
    });
  }
});

/**
 * POST /api/reports/:token/mark-found
 */
apiRouter.post('/reports/:token/mark-found', async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const result = await markItemAsFound(token, req.body);
    res.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      error: err.message || 'Failed to mark item as found.',
    });
  }
});
