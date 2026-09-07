import { NextResponse } from 'next/server';
import { badRequest, publicUser, readJson, setSessionCookie, storageMisconfigured, store, verifyPassword } from '@/lib/store-helpers';

export async function POST(req: Request) {
  const body = await readJson<{ email?: string; password?: string }>(req);
  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';
  if (!email || !password) return badRequest('Email and password are required');

  let user;
  try {
    user = await store.findUserByEmail(email);
  } catch (e) {
    // Never disguise an infrastructure failure as bad credentials.
    console.error('[auth] login lookup failed:', e);
    return NextResponse.json(
      { error: 'Could not reach the account database. Please try again shortly.' },
      { status: 503 },
    );
  }

  if (!user) {
    // On a serverless host with no database, signup cannot have persisted the
    // account. Say so instead of blaming the password.
    if (storageMisconfigured()) {
      console.error('[auth] no account found and storage is not persistent — see startup log');
      return NextResponse.json(
        {
          error:
            'The server has no database configured, so accounts cannot be saved. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY and redeploy.',
        },
        { status: 503 },
      );
    }
    return badRequest('Invalid email or password');
  }

  if (!verifyPassword(password, user.passwordHash)) {
    return badRequest('Invalid email or password');
  }

  const token = await store.createSession(user.id);
  const res = NextResponse.json({ user: publicUser(user), token });
  return setSessionCookie(res, token);
}
