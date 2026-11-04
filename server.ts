import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { apiRouter } from './src/server/apiRouter.js';
import { getSanitizedUri } from './src/server/db.js';

// Load environment variables (.env)
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

async function startServer() {
  const app = express();

  // Parse JSON payloads up to 10MB (supports base64 image uploads)
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logger in dev
  if (!isProduction) {
    app.use((req: Request, _res: Response, next: NextFunction) => {
      if (req.url.startsWith('/api')) {
        console.log(`[API ${req.method}] ${req.url}`);
      }
      next();
    });
  }

  // Mount backend API routes under /api
  app.use('/api', apiRouter);

  if (!isProduction) {
    // Development mode: Attach Vite as middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static files from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`🚀 CampusFind Server Running on http://localhost:${PORT}`);
    console.log(`📦 Environment: ${isProduction ? 'production' : 'development'}`);
    console.log(`🗄️  MongoDB URI: ${getSanitizedUri(process.env.MONGODB_URI)}`);
    console.log(`📡 API Endpoints available at /api/*`);
    console.log(`======================================================\n`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
