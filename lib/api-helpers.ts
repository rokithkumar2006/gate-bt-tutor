// Shared helpers for API route handlers.
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { destroySession, sessionUser } from './store';
import type { User } from './types';

export const SESSION_COOKIE = 'gbt_session';

export function currentUser(): User | null {
  return sessionUser(cookies().get(SESSION_COOKIE)?.value);
}

export function unauthorized(): NextResponse {
  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
}

export function notFound(): NextResponse {
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export function badRequest(error: string): NextResponse {
  return NextResponse.json({ error }, { status: 400 });
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}

export function readJson<T = Record<string, unknown>>(req: Request): Promise<T> {
  return req.json().catch(() => ({} as T));
}
