import { NextResponse } from 'next/server';
import { badRequest, currentUser, db, unauthorized } from '@/lib/store-helpers';
import type { UserProfile } from '@/lib/types';

export async function PUT(req: Request) {
  const user = currentUser();
  if (!user) return unauthorized();

  const body = await req
    .json()
    .catch(() => null) as { name?: string; profile?: Partial<UserProfile> } | null;
  if (!body) return badRequest('Invalid JSON body');

  const stored = db.users.find((u) => u.id === user.id);
  if (!stored) return unauthorized();

  if (body.name !== undefined) {
    const name = body.name.trim();
    if (!name) return badRequest('Name cannot be empty');
    stored.name = name;
  }
  if (body.profile) {
    stored.profile = { ...stored.profile, ...body.profile };
  }

  return NextResponse.json({ user: { ...user, name: stored.name, profile: stored.profile } });
}
