import { NextResponse } from 'next/server';
import { badRequest, publicUser, readJson, setSessionCookie, store, verifyPassword } from '@/lib/store-helpers';

export async function POST(req: Request) {
  const body = await readJson<{ email?: string; password?: string }>(req);
  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';
  if (!email || !password) return badRequest('Email and password are required');

  const user = await store.findUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return badRequest('Invalid email or password');
  }

  const token = await store.createSession(user.id);
  const res = NextResponse.json({ user: publicUser(user), token });
  return setSessionCookie(res, token);
}
