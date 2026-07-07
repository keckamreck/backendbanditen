import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ['/login', '/register', '/'];
 
export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const sessionCookie = getSessionCookie(req);
  const isPublic = publicRoutes.includes(path);
  const isPrivate = !isPublic;

  if (isPrivate && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  } else if (isPublic && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }
 
  return NextResponse.next();
}