import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const setup = () => {
    if (!process.env.DATABASE_URL) {
        const DB_NOT_SET_ERROR = 'DATABASE_URL is not set';
        console.error(DB_NOT_SET_ERROR);
        throw new Error(DB_NOT_SET_ERROR);
    }

    // for query purposes
    const queryClient = postgres(process.env.DATABASE_URL);
    const db = drizzle(queryClient, { schema });
    return db;
};

export default setup();
