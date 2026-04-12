import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // Only intercept requests to the /images/ directory
    if (request.nextUrl.pathname.startsWith('/images/')) {
        // TEMPORARILY PERMISSIVE MIDDLEWARE FOR DEBUGGING
        // We are allowing all requests to pass through to verify if images load on Netlify.
        // Once confirmed, we can re-enable the referer checks.
        return NextResponse.next();
    }

    return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
    matcher: '/images/:path*',
}
