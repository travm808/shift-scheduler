import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

console.log('Initializing database connection pool...');

const host = process.env.PGHOST;
const port = process.env.PGPORT ? parseInt(process.env.PGPORT) : 5432;
const user = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const database = process.env.PGDATABASE;

const poolConfig = {
    host,
    port,
    user,
    password,
    database,
    // For some dumb reason, the local DB doesn't like SSL, and the ONLY way to get it to be disabled is to use the ?sslmode=disable flag.
    // This, however, doesn't work in stage and production... so here we are... doing dumb things.
    connectionString: `postgres://${user}:${password}@${host}:${port}/${database}?sslmode=disable`,
    ssl: {
        rejectUnauthorized: false
    },
    max: 10
}
const pool = new Pool(poolConfig);
// Log pool events
pool.on('connect', () => {
    console.log('New client connected to the pool');
    console.log('Total clients in pool:', pool.totalCount);
    console.log('Idle clients:', pool.idleCount);
    console.log('Waiting requests:', pool.waitingCount);
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const db = drizzle(pool, { logger: false });

// Initialize migrations
const runMigrations = async () => {
    try {
        console.log('Running migrations...');
        await migrate(db, { migrationsFolder: './drizzle' });
        console.log('Migrations completed successfully');
    } catch (error) {
        console.error('Error running migrations:', error);
        throw error;
    }
};

// Run migrations immediately
runMigrations()
    .catch(error => {
        console.error('Failed to run migrations:', error);
        process.exit(1);
    });