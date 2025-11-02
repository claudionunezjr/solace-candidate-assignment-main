import db from '@/db';
import { advocates } from '@/db/schema';
import { or, ilike, and, gt, lt, sql, desc, asc } from 'drizzle-orm';

export type AdvocatesUtilsArgs = {
    query: string | null;
    cursor: number | null;
    direction: 'next' | 'prev';
    pageSize: number;
};

export const fetchRecords = async (args: AdvocatesUtilsArgs) =>
    await db.query.advocates.findMany({
        where: getWhereClause(args),
        limit: args.pageSize,
        orderBy:
            args.direction === 'next' ? asc(advocates.id) : desc(advocates.id)
    });

/* Filters */

export const getWhereClause = (args: AdvocatesUtilsArgs) => {
    const queryFilter = getQueryFilter(args);
    const cursorFilter = getCursorFilter(args);

    const whereClause =
        queryFilter && cursorFilter
            ? and(queryFilter, cursorFilter)
            : queryFilter || cursorFilter;

    return whereClause;
};

export const getQueryFilter = ({ query }: AdvocatesUtilsArgs) => {
    if (!query) return undefined;

    const search = `%${query}%`;
    return or(
        ilike(advocates.firstName, search),
        ilike(advocates.lastName, search),
        ilike(advocates.city, search),
        ilike(advocates.degree, search),
        sql`${advocates.specialties}::text ILIKE ${search}`
    );
};

export const getCursorFilter = ({ cursor, direction }: AdvocatesUtilsArgs) => {
    if (!cursor) return undefined;

    return direction === 'next'
        ? gt(advocates.id, cursor)
        : lt(advocates.id, cursor);
};

/* Previous & Next Page Detection */

export const hasPrevPage = async (
    args: AdvocatesUtilsArgs,
    hasMoreRecords: boolean
) => {
    if (args.direction === 'next') {
        return hasMoreRecords;
    }

    return Boolean(args.cursor) && (await getPrevRecord(args)).length > 0;
};

export const hasNextPage = async (
    args: AdvocatesUtilsArgs,
    hasMoreRecords: boolean
) => {
    if (args.direction !== 'next') {
        return hasMoreRecords;
    }

    return Boolean(args.cursor) && (await getNextRecord(args)).length > 0;
};

export const getNextRecord = async (args: AdvocatesUtilsArgs) =>
    await db.query.advocates.findMany({
        where: getWhereClause({ ...args, direction: 'next' }),
        limit: 1,
        orderBy: asc(advocates.id)
    });

export const getPrevRecord = async (args: AdvocatesUtilsArgs) =>
    await db.query.advocates.findMany({
        where: getWhereClause({ ...args, direction: 'prev' }),
        limit: 1,
        orderBy: desc(advocates.id)
    });
