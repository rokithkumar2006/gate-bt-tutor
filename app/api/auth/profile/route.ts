import { NextResponse } from 'next/server';
import { badRequest, currentUser, store, unauthorized } from '@/lib/store-helpers';
import type { UserProfile } from '@/lib/types';

export async function PUT(req: Request) {
  const user = await currentUser();
  if (!user) return unauthorized();

  const body = await req
    .json()
    .catch(() => null) as { name?: string; profile?: Partial<UserProfile> } | null;
  if (!body) return badRequest('Invalid JSON body');

  const stored = await store.findUserById(user.id);
  if (!stored) return unauthorized();

  let name = stored.name;
  let profile = stored.profile;

  if (body.name !== undefined) {
    const trimmed = body.name.trim();
    if (!trimmed) return badRequest('Name cannot be empty');
    name = trimmed;
  }
  if (body.profile) {
    profile = { ...stored.profile, ...body.profile };
  }
  await store.updateUser(user.id, { name, profile });

  return NextResponse.json({ user: { ...user, name, profile } });
}
