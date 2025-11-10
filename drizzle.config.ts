import { defineConfig } from 'drizzle-kit';

const DB_URL = process.env.DATABASE_URL as string;

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: DB_URL,
  },
  verbose: true,
  strict: true,
});
