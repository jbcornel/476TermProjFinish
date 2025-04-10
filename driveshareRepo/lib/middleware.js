import { NextResponse } from 'next/server';
import { authenticate } from './lib/authMiddleware.js';

export async function middleware(request) {
  //Authenticate the users request
  const authResult = await authenticate(request);
  
  //If authentication fails (401), redirect to the login page.
  if (authResult.status === 401) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  //This matcher will run the middleware on all API routes
  matcher: ['/api/:path*'],
};
