import { NextResponse } from 'next/server';
import { badRequest, createSession, findUserByEmail, readJson, setSessionCookie, verifyPassword } from '@/lib/store-helpers';

export async function POST(req: Request) {
  const body = await readJson<{ email?: string; password?: string }>(req);
  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';
  if (!email || !password) return badRequest('Email and password are required');

  const user = findUserByEmail(email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return badRequest('Invalid email or password');
  }

  const token = createSession(user.id);
  const res = NextResponse.json({ user });
  return setSessionCookie(res, token);
}
