import { NextResponse } from 'next/server';
import { clearSessionCookie, destroySession, sessionToken } from '@/lib/store-helpers';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const token = sessionToken();
  if (token) destroySession(token);
  return clearSessionCookie(res);
}
