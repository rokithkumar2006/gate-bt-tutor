import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { clearSessionCookie, destroySession, SESSION_COOKIE } from '@/lib/store-helpers';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (token) destroySession(token);
  return clearSessionCookie(res);
}
