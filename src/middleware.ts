import { NextResponse, NextRequest } from 'next/server';
import { checkToken, checkUnpaidOrder } from '@libs/apiServices';
import { sendOTPAction } from './app/_libs/actions';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/account') {
    return NextResponse.rewrite(new URL('/account/profile', request.url));
  }

  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.rewrite(new URL('/admin/dashboard', request.url));
  }

  const token = request.cookies.get('jwt');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // const tokenValidation = await checkToken(token);

  // if (!tokenValidation.valid || tokenValidation.expired) {
  //   const response = NextResponse.redirect(new URL('/login', request.nextUrl));
  //   response.cookies.delete('jwt');
  //   response.cookies.delete('reauthToken');
  //   return response;
  // }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const tokenValidation = await checkToken(token);

    if (
      !tokenValidation.valid ||
      tokenValidation.expired ||
      !tokenValidation.isAdmin
    ) {
      return NextResponse.redirect(new URL('/not-found', request.nextUrl));
    }
  }

  const reauthToken = request.cookies.get('reauthenticated');
  const highValueUrls = ['/checkout'];
  const verifiedNeededUrls = ['/checkout'];

  if (request.nextUrl.pathname === '/checkout') {
    const processPayment = request.nextUrl.searchParams.get('processPayment');

    if (processPayment) {
      return NextResponse.next();
    }

    const unpaidOrderChecking = await checkUnpaidOrder(token);

    const { data: unpaidOrder } = unpaidOrderChecking;

    if (unpaidOrder) {
      const redirectUrl = new URL('/cart', request.nextUrl);
      redirectUrl.searchParams.set('error', 'unpaidOrder');
      redirectUrl.searchParams.set('timestamp', Date.now().toString());
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (verifiedNeededUrls.includes(request.nextUrl.pathname)) {
    const verified = request.cookies.get('verified')?.value;

    if (verified === 'false') {
      const result = await sendOTPAction({ counter: 0 });

      if (result.success) {
        return NextResponse.redirect(
          new URL('/signup/verifyEmail', request.nextUrl)
        );
      } else {
        if (request.nextUrl.pathname === '/checkout') {
          const redirectUrl = new URL('/cart', request.nextUrl);
          redirectUrl.searchParams.set('error', 'verifiedNeeded');
          redirectUrl.searchParams.set('timestamp', Date.now().toString());
          return NextResponse.redirect(redirectUrl);
        }

        return NextResponse.redirect(
          new URL('/account/profile', request.nextUrl)
        );
      }
    } else if (verified !== 'true') {
      const response = NextResponse.redirect(
        new URL('/login', request.nextUrl)
      );
      response.cookies.delete('jwt');
      response.cookies.delete('reauthenticated');
      return response;
    }
  }

  // Check if the user is accessing a high-value URL
  if (highValueUrls.includes(request.nextUrl.pathname)) {
    try {
      if (!reauthToken || reauthToken.value !== 'true') {
        const reauthUrl = new URL('/reauthenticate', request.nextUrl);
        reauthUrl.searchParams.set(
          'redirect',
          encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search)
        );

        return NextResponse.redirect(reauthUrl);
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
  }

  if (request.nextUrl.pathname === '/account') {
    return NextResponse.rewrite(new URL('/account/profile', request.url));
  }

  if (request.nextUrl.pathname === '/admin') {
    return NextResponse.rewrite(new URL('/admin/dashboard', request.url));
  }
}

export const config = {
  matcher: [
    '/account',
    '/account/:path*',
    '/cart',
    '/checkout',
    '/reauthenticate',
    '/signup/verifyEmail',
    '/admin',
    '/admin/:path*',
  ],
};
