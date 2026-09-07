import { NextResponse } from 'next/server';
import { badRequest, readJson, setSessionCookie, store } from '@/lib/store-helpers';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await readJson<{
    name?: string;
    email?: string;
    password?: string;
    profile?: { college?: string; yearOfStudy?: string; targetExam?: string; dailyHours?: number; dailyGoalMin?: number };
  }>(req);

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';

  if (!name) return badRequest('Name is required');
  if (!EMAIL_RE.test(email)) return badRequest('Valid email is required');
  if (password.length < 6) return badRequest('Password must be at least 6 characters');
  if (await store.findUserByEmail(email)) return badRequest('An account with this email already exists');

  const user = await store.createUser({
    name,
    email,
    password,
    profile: {
      college: (body.profile?.college ?? '').trim(),
      yearOfStudy: (body.profile?.yearOfStudy ?? '').trim(),
      targetExam: (body.profile?.targetExam ?? '').trim(),
      dailyHours: Number(body.profile?.dailyHours ?? 2),
      dailyGoalMin: Number(body.profile?.dailyGoalMin ?? 120),
    },
  });

  const token = await store.createSession(user.id);
  const res = NextResponse.json({ user, token }, { status: 201 });
  return setSessionCookie(res, token);
}
