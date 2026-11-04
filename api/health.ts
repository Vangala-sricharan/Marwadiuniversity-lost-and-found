import type { VercelRequest, VercelResponse } from '../src/server/types.js';
import { getHealth } from '../src/server/reportController.js';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const health = await getHealth();
    return res.status(200).json(health);
  } catch (err: any) {
    return res.status(503).json({
      status: 'error',
      database: 'disconnected',
      message: err.message,
    });
  }
}
