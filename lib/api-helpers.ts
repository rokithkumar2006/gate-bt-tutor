// Shared helpers for API route handlers.
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { destroySession, sessionUser } from './store';
import type { User } from './types';

export const SESSION_COOKIE = 'gbt_session';

// Resolve the session token from either the cookie or an `Authorization:
// Bearer <token>` header.
//
// Cookies alone are not enough: in the sandbox preview the app runs in a
// cross-site iframe, and browsers with third-party-cookie blocking (Chrome
// incognito, Safari ITP, Firefox ETP) drop the session cookie even when it is
// correctly issued as SameSite=None; Secure. The client therefore also keeps
// the token in localStorage and sends it as a bearer header, which is immune
// to third-party cookie policy.
export function sessionToken(): string | undefined {
  const auth = headers().get('authorization');
  if (auth?.toLowerCase().startsWith('bearer ')) {
    const token = auth.slice(7).trim();
    if (token) return token;
  }
  return cookies().get(SESSION_COOKIE)?.value;
}

export function currentUser(): User | null {
  return sessionUser(sessionToken());
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
