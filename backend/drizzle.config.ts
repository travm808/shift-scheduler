import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import path from 'path';

function relFromCwd(p: string) {
    // drizzle-kit has issues when given absolute paths (it may prefix them with "./").
    // Provide paths relative to the current working directory so commands work from
    // either the repo root or the backend package directory.
    return path.relative(process.cwd(), path.resolve(__dirname, p)) || '.';
  }
  
  export default defineConfig({
    out: relFromCwd('./drizzle'),
    schema: relFromCwd('./src/db/schema.ts'),
    dialect: 'postgresql',
    dbCredentials: {
      host: process.env.PGHOST!,
      port: parseInt(process.env.PGPORT!),
      user: process.env.PGUSER!,
      password: process.env.PGPASSWORD!,
      database: process.env.PGDATABASE!,
    },
  });