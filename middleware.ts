import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Root domains this app is served on directly (not agent storefronts).
// Everything else — {slug}.crestwelltravels.com — gets rewritten to the
// agent storefront route, with the slug passed through as a URL param
// rather than a dynamic route segment, so this stays a simple rewrite
// rather than needing per-agent static generation.
const ROOT_HOSTS = new Set([
  'crestwelltravels.com',
  'www.crestwelltravels.com',
  'crestwellgetaways.com',
  'www.crestwellgetaways.com',
  'localhost:3000', // local dev
]);

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const { pathname } = request.nextUrl;

  response_setup: {
    const response = NextResponse.next();
    response.headers.set('x-pathname', pathname);

    // Not a recognized root host, and not already inside the agent-site
    // route (avoid rewrite loops) — treat the subdomain as an agent slug.
    if (!ROOT_HOSTS.has(host) && !pathname.startsWith('/agent-site')) {
      const slug = host.split('.')[0];
      if (slug && slug !== 'www') {
        const url = request.nextUrl.clone();
        url.pathname = `/agent-site/${slug}`;
        return NextResponse.rewrite(url);
      }
    }

    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
