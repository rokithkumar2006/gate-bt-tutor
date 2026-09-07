import { NextResponse } from 'next/server';
import { adminClient, profileToUser, supabaseAuthConfigured, type ProfileRow } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/auth/supabase-signup
 *
 * Creates the Supabase Auth user AND its user_profiles row in one server-side
 * step, using the service role key.
 *
 * Why server-side rather than calling supabase.auth.signUp() in the browser:
 *  - the profile row can be written atomically with the account, so a user can
 *    never end up authenticated but profile-less;
 *  - email_confirm can be set, so sign-in works immediately without the user
 *    being told to check an inbox that may never receive anything.
 *
 * The password is passed straight to Supabase Auth and never stored by us.
 */
export async function POST(req: Request) {
  if (!supabaseAuthConfigured()) {
    return NextResponse.json({ error: 'Supabase Auth is not configured on this server.' }, { status: 503 });
  }

  const body = (await req.json().catch(() => null)) as {
    name?: string;
    email?: string;
    password?: string;
    profile?: {
      college?: string;
      yearOfStudy?: string;
      targetExam?: string;
      dailyHours?: number;
      dailyGoalMin?: number;
    };
  } | null;

  const name = (body?.name ?? '').trim();
  const email = (body?.email ?? '').trim().toLowerCase();
  const password = body?.password ?? '';

  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
  }

  const db = adminClient();

  const { data: created, error: createErr } = await db.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // no verification round-trip; sign-in works immediately
    user_metadata: {
      full_name: name,
      college: body?.profile?.college ?? '',
      year_of_study: body?.profile?.yearOfStudy ?? '',
      target_exam: body?.profile?.targetExam ?? '',
      daily_study_hours: Number(body?.profile?.dailyHours ?? 2),
      daily_goal_min: Number(body?.profile?.dailyGoalMin ?? 120),
    },
  });

  if (createErr || !created?.user) {
    const msg = createErr?.message ?? 'Could not create the account';
    console.error('[auth] Supabase signup failed:', msg);
    if (/already|registered|exists/i.test(msg)) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { data: row, error: profileErr } = await db
    .from('user_profiles')
    .upsert({
      id: created.user.id,
      full_name: name,
      email,
      college: body?.profile?.college ?? '',
      year_of_study: body?.profile?.yearOfStudy ?? '',
      target_exam: body?.profile?.targetExam ?? '',
      daily_study_hours: Number(body?.profile?.dailyHours ?? 2),
      daily_goal_min: Number(body?.profile?.dailyGoalMin ?? 120),
    })
    .select('*')
    .single();

  if (profileErr) {
    // Don't leave an auth user with no profile behind.
    console.error('[auth] profile insert failed, rolling back auth user:', profileErr.message);
    await db.auth.admin.deleteUser(created.user.id).catch(() => {});
    return NextResponse.json(
      { error: `Account created but the profile could not be saved: ${profileErr.message}` },
      { status: 500 },
    );
  }

  return NextResponse.json({ user: profileToUser(row as ProfileRow) }, { status: 201 });
}
