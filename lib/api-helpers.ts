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

// When the app is served inside a cross-site iframe (the e2b/Arena sandbox
// preview at https://<port>-<id>.e2b.app), a `SameSite=Lax` cookie is NOT sent
// back by the browser — every API call then looks unauthenticated and the user
// appears to be logged out the moment they click anything. `SameSite=None`
// fixes that, but browsers only accept it together with `Secure`, which in turn
// requires HTTPS. Set GATE_BT_CROSS_SITE_COOKIE=1 for those HTTPS previews.
// Plain local http://localhost development keeps Lax (Secure would be dropped).
const CROSS_SITE_COOKIE = process.env.GATE_BT_CROSS_SITE_COOKIE === '1';

export function sessionCookieOptions() {
  return CROSS_SITE_COOKIE
    ? { sameSite: 'none' as const, secure: true }
    : { sameSite: 'lax' as const, secure: process.env.NODE_ENV === 'production' };
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    ...sessionCookieOptions(),
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, '', {
    httpOnly: true,
    ...sessionCookieOptions(),
    path: '/',
    maxAge: 0,
  });
  return res;
}

export function readJson<T = Record<string, unknown>>(req: Request): Promise<T> {
  return req.json().catch(() => ({} as T));
}
