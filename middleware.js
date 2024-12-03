import { NextResponse } from 'next/server';
import { checkToken } from '@libs/apiServices';

export async function middleware(request) {
  const token = request.cookies.get('jwt');

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
  ],
};
