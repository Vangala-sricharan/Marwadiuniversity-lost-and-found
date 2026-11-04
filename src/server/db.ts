import { MongoClient, Db } from 'mongodb';

// Ensure dotenv is configured if running standalone
if (process.env.NODE_ENV !== 'production') {
  try {
    // Dynamic import or require handled in server entry
  } catch {
    // ignore
  }
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;
let indexesInitialized = false;

/**
 * Sanitizes MongoDB URI for logging (masks password)
 */
export function getSanitizedUri(uri?: string): string {
  if (!uri) return 'MONGODB_URI not set';
  try {
    return uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');
  } catch {
    return 'mongodb+srv://****:****@...';
  }
}

/**
 * Gets or initializes the MongoDB connection
 */
export async function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'MONGODB_URI environment variable is not defined. Please add MONGODB_URI to your .env file or deployment settings.'
    );
  }

  // In development and serverless, cache the client across hot reloads / invocations
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;

  return clientPromise;
}

/**
 * Retrieves the MongoDB database instance for CampusFind
 */
export async function getDb(): Promise<Db> {
  const mongoClient = await getMongoClient();
  
  // Extract database name from URI if provided, otherwise default to 'campusfind'
  const uri = process.env.MONGODB_URI || '';
  let dbName = 'campusfind';
  try {
    const url = new URL(uri.replace(/^mongodb\+srv:\/\//, 'http://').replace(/^mongodb:\/\//, 'http://'));
    const pathname = url.pathname.replace(/^\//, '');
    if (pathname && !pathname.includes('?')) {
      dbName = pathname;
    }
  } catch {
    // Default to campusfind
    dbName = 'campusfind';
  }

  const db = mongoClient.db(dbName);

  // Initialize essential indexes once per process lifetime
  if (!indexesInitialized) {
    ensureIndexes(db).catch((err) => {
      console.warn('[MongoDB] Index creation warning:', err.message);
    });
    indexesInitialized = true;
  }

  return db;
}

/**
 * Ensures unique and search indexes on reports and finder_submissions collections
 */
async function ensureIndexes(db: Db): Promise<void> {
  try {
    const reportsCollection = db.collection('reports');
    const finderCollection = db.collection('finder_submissions');

    // 1. Unique index on 12-digit registration token
    await reportsCollection.createIndex({ token: 1 }, { unique: true });

    // 2. Query optimization indexes for filters and sorting
    await reportsCollection.createIndex({ reportType: 1, createdAt: -1 });
    await reportsCollection.createIndex({ status: 1 });
    await reportsCollection.createIndex({ category: 1 });
    await reportsCollection.createIndex({ location: 1 });
    await reportsCollection.createIndex({ createdAt: -1 });

    // 3. Finder submissions indexes
    await finderCollection.createIndex({ reportToken: 1 });
    await finderCollection.createIndex({ reportId: 1 });
    await finderCollection.createIndex({ createdAt: -1 });

    console.log('[MongoDB] Database indexes verified for "campusfind".');
  } catch (err: any) {
    console.warn('[MongoDB] Could not ensure indexes:', err.message);
  }
}
