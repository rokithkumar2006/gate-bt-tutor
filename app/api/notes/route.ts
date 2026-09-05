import { NextResponse } from 'next/server';
import { addNote, currentUser, deleteNote, notesForUser, unauthorized } from '@/lib/store-helpers';

/** GET /api/notes?topic=… */
export async function GET(req: Request) {
  const user = currentUser();
  if (!user) return unauthorized();
  const url = new URL(req.url);
  const topic = url.searchParams.get('topic') ?? undefined;
  return NextResponse.json({ notes: notesForUser(user.id, topic) });
}

/** POST /api/notes { topic, text } */
export async function POST(req: Request) {
  const user = currentUser();
  if (!user) return unauthorized();
  const body = (await req.json().catch(() => null)) as { topic?: string; text?: string } | null;
  if (!body?.topic || !body.text || !body.text.trim()) {
    return NextResponse.json({ error: 'topic and text are required' }, { status: 400 });
  }
  const note = addNote(user.id, body.topic, body.text.trim());
  return NextResponse.json({ ok: true, note }, { status: 201 });
}

/** DELETE /api/notes?id=… */
export async function DELETE(req: Request) {
  const user = currentUser();
  if (!user) return unauthorized();
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  deleteNote(user.id, id);
  return NextResponse.json({ ok: true });
}
