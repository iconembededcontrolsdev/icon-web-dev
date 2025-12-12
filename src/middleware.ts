import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only intercept requests to the /images/ directory
    if (request.nextUrl.pathname.startsWith('/images/')) {

        // EXCEPTION: Allow access to the specific logo used in emails
        if (request.nextUrl.pathname === '/images/lowres/logo.png') {
            return NextResponse.next();
        }

        const referer = request.headers.get('referer');
        const secFetchMode = request.headers.get('sec-fetch-mode');

        // 1. Block Direct Browser Navigation (User types URL in address bar)
        // 'navigate' mode indicates a top-level navigation to the resource
        if (secFetchMode === 'navigate') {
            return new NextResponse('Access Denied', { status: 403 });
        }

        // 2. Check Referer if present
        if (referer) {
            try {
                const refererUrl = new URL(referer);
                // Allow localhost, local network IPs, and production domain
                const allowedDomains = [
                    'iconembededcontrols.com',
                    'www.iconembededcontrols.com',
                    'localhost',
                    '127.0.0.1',
                    '192.168.'
                ];

                // Check if hostname matches any allowed domain/IP
                const isAllowed = allowedDomains.some(domain => refererUrl.hostname.includes(domain));

                if (isAllowed) {
                    return NextResponse.next();
                }

                // If referer is present but not allowed (Hotlinking) -> Block
                return new NextResponse('Access Denied', { status: 403 });
            } catch (e) {
                // Malformed referer
                return new NextResponse('Access Denied', { status: 403 });
            }
        }

        // 3. No Referer and Not 'navigate' mode
        // This allows:
        // - Next.js Image Optimizer internal fetches (which often have no referer in dev)
        // - Script fetches that omit referer (unless we want to block them too, but unblocking optimizer is priority)
        return NextResponse.next();
    }

    return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
    matcher: '/images/:path*',
}
