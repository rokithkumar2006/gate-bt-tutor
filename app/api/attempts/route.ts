import { NextResponse } from 'next/server';
import { attemptsForUser, currentUser, saveAttempt, unauthorized } from '@/lib/store-helpers';
import type { Attempt } from '@/lib/types';

/** GET /api/attempts?limit=20 → attempt history */
export async function GET(req: Request) {
  const user = currentUser();
  if (!user) return unauthorized();
  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 20) || 20, 100);
  return NextResponse.json({ attempts: attemptsForUser(user.id, limit) });
}

/** POST /api/attempts → save a finished test/practice attempt */
export async function POST(req: Request) {
  const user = currentUser();
  if (!user) return unauthorized();

  const body = (await req.json().catch(() => null)) as (Omit<Attempt, 'userId' | 'id'> & { id?: string }) | null;
  if (!body || typeof body.testId !== 'string' || !Array.isArray(body.answers)) {
    return NextResponse.json({ error: 'Invalid attempt payload' }, { status: 400 });
  }

  const attempt: Attempt = {
    ...body,
    id: body.id ?? crypto.randomUUID(),
    userId: user.id,
  };
  saveAttempt(attempt);
  return NextResponse.json({ ok: true, attempt }, { status: 201 });
}
