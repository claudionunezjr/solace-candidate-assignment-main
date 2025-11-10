import { fetchRecords, hasNextPage, hasPrevPage } from './_utils';
import { type NextRequest } from 'next/server';

const DEFAULT_PAGE_SIZE = 5;

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('q');
    const cursor = Number(req.nextUrl.searchParams.get('cursor'));
    const direction =
        (req.nextUrl.searchParams.get('dir') as 'next' | 'prev') || 'next';
    const pageSize =
        Number(req.nextUrl.searchParams.get('size')) || DEFAULT_PAGE_SIZE;

    const parsedParams = {
        query,
        cursor,
        direction,
        pageSize
    };

    try {
        // Query with pagination, filter, and proper order
        // Fetch one extra record to determine hasNext/hasPrev
        const data = await fetchRecords({
            ...parsedParams,
            pageSize: pageSize + 1
        });
        // Determine if there are more pages
        const hasMore = data.length > pageSize;
        // Remove the extra record if it exists
        const records = hasMore ? data.slice(0, pageSize) : data;
        // Reverse records for 'prev' direction to maintain correct order
        const finalRecords = direction === 'prev' ? records.reverse() : records;

        // Determine hasNext and hasPrev
        const hasNext = await hasPrevPage(parsedParams, hasMore);
        const hasPrev = await hasNextPage(parsedParams, hasMore);

        return Response.json({
            data: finalRecords,
            hasNext,
            hasPrev,
            success: true
        });
    } catch (error) {
        console.error(error);
        return Response.json({ error });
    }
}
