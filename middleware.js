import { NextResponse } from 'next/server';
import { checkToken } from '@libs/apiServices';

export async function middleware(req) {
  const token = req.cookies.get('jwt');

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  try {
    console.log(token);

    const tokenValidation = await checkToken(token);
    console.log(tokenValidation);

    if (!tokenValidation.valid || tokenValidation.expired)
      throw new Error('Invalid token');
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
}

export const config = {
  matcher: ['/account'],
};
