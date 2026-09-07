import { NextResponse } from 'next/server';
import { badRequest, hashPassword, readJson, store } from '@/lib/store-helpers';

export async function POST(req: Request) {
  const body = await readJson<{ email?: string; code?: string; password?: string }>(req);
  const email = (body.email ?? '').trim().toLowerCase();
  const code = (body.code ?? '').trim();
  const password = body.password ?? '';

  if (!email || !code || password.length < 6) {
    return badRequest('Email, 6-digit code and a new password (≥6 chars) are required');
  }

  const user = await store.findUserByEmail(email);
  if (!user) return badRequest('Account not found');
  if (!(await store.consumeResetCode(user.id, code))) return badRequest('Invalid or expired reset code');

  await store.updateUser(user.id, { passwordHash: hashPassword(password) });

  return NextResponse.json({ ok: true });
}
