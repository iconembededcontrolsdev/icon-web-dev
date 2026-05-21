import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const decodedPath = decodeURIComponent(request.nextUrl.pathname);

    if (decodedPath.startsWith('/images/')) {
        const siteUrl = request.nextUrl.origin;
        const referer = request.headers.get('referer') || '';
        const origin = request.headers.get('origin') || '';
        const secFetchSite = request.headers.get('sec-fetch-site') || '';

        const isSameSite =
            referer.startsWith(siteUrl) ||
            origin.startsWith(siteUrl) ||
            secFetchSite === 'same-origin' ||
            secFetchSite === 'same-site';

        if (!isSameSite) {
            return new NextResponse('Forbidden', { status: 403 });
        }
    }

    return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
    matcher: '/images/:path*',
}
