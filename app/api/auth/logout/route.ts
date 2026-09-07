import { NextResponse } from 'next/server';
import { clearSessionCookie, sessionToken, store } from '@/lib/store-helpers';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const token = sessionToken();
  if (token) await store.destroySession(token);
  return clearSessionCookie(res);
}
