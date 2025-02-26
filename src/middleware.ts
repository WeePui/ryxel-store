import { NextResponse, NextRequest } from 'next/server';
import { checkToken } from '@libs/apiServices';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('jwt');
  const reauthToken = request.cookies.get('reauthenticated');
  const highValueUrls = ['/checkout'];

  // Check if the user is accessing a high-value URL
  if (highValueUrls.includes(request.nextUrl.pathname)) {
    if (!reauthToken) {
      try {
        const tokenValidation = await checkToken(token);

        if (!tokenValidation.valid || tokenValidation.expired) {
          const reauthUrl = new URL('/reauthenticate', request.nextUrl);
          reauthUrl.searchParams.set('redirect', request.nextUrl.pathname);
          return NextResponse.redirect(reauthUrl);
        }

        return NextResponse.next();
      } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.redirect(new URL('/login', request.nextUrl));
      }
    }
  }

  if (request.nextUrl.pathname === '/account') {
    return NextResponse.rewrite(new URL('/account/profile', request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  try {
    const tokenValidation = await checkToken(token);

    if (!tokenValidation.valid || tokenValidation.expired)
      throw new Error('Invalid token');

    return NextResponse.next();
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}

export const config = {
  matcher: [
    '/account',
    '/account/profile',
    '/account/settings',
    '/account/orders',
    '/account/addresses',
    '/account/updatePassword',
    '/cart',
    '/checkout',
    '/reauthenticate',
  ],
};
