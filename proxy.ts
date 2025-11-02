import { NextResponse, type NextRequest } from 'next/server';

export default function proxy(request: NextRequest) {
    return NextResponse.redirect(new URL('/search', request.url));
}

export const config = {
    matcher: ['/']
};
