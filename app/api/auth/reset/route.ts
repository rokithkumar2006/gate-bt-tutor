import { NextResponse } from 'next/server';
import { badRequest, consumeResetCode, findUserByEmail, hashPassword, readJson } from '@/lib/store-helpers';
import { db } from '@/lib/store-helpers';

export async function POST(req: Request) {
  const body = await readJson<{ email?: string; code?: string; password?: string }>(req);
  const email = (body.email ?? '').trim().toLowerCase();
  const code = (body.code ?? '').trim();
  const password = body.password ?? '';

  if (!email || !code || password.length < 6) {
    return badRequest('Email, 6-digit code and a new password (≥6 chars) are required');
  }

  const user = findUserByEmail(email);
  if (!user) return badRequest('Account not found');
  if (!consumeResetCode(user.id, code)) return badRequest('Invalid or expired reset code');

  const stored = db.users.find((u) => u.id === user.id);
  if (!stored) return badRequest('Account not found');
  stored.passwordHash = hashPassword(password);

  return NextResponse.json({ ok: true });
}
