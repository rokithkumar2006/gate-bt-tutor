import { NextResponse } from 'next/server';
import { badRequest, createResetCode, findUserByEmail, readJson } from '@/lib/store-helpers';

/**
 * Forgot password (demo mode): the reset code is returned in the response and
 * also "sent by email" — in production this would go through an email provider.
 */
export async function POST(req: Request) {
  const body = await readJson<{ email?: string }>(req);
  const email = (body.email ?? '').trim().toLowerCase();
  if (!email) return badRequest('Email is required');

  const user = findUserByEmail(email);
  if (!user) {
    // Do not leak whether the account exists.
    return NextResponse.json({ ok: true, message: 'If that email is registered, a reset code was sent.', demoCode: null });
  }

  const code = createResetCode(user.id);
  return NextResponse.json({
    ok: true,
    message: 'If that email is registered, a reset code was sent.',
    demoCode: code, // demo mode: surfaced in the UI instead of email
  });
}
