import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Use jose for edge compatibility in middleware since jsonwebtoken doesn't work well on Edge
const JWT_SECRET = process.env.JWT_SECRET || 'grand-vista-secret-key';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // Paths that require authentication
  const isAdminRoute = pathname.startsWith('/admin');
  const isGuestRoute = pathname.startsWith('/guest');
  const isApiAdminRoute = pathname.startsWith('/api/admin');

  if (!isAdminRoute && !isGuestRoute && !isApiAdminRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const role = payload.role as string;

    if (isAdminRoute || isApiAdminRoute) {
      if (pathname.startsWith('/admin/settings') || pathname.startsWith('/admin/staff')) {
        if (role !== 'ADMIN') {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
      } else if (!['ADMIN', 'RECEPTIONIST', 'HOUSEKEEPING'].includes(role)) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    if (isGuestRoute && role !== 'GUEST') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.id as string);
    requestHeaders.set('x-user-role', role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Invalid token
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/guest/:path*', '/api/admin/:path*'],
};
