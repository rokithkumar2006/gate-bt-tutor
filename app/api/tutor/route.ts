import { NextResponse } from 'next/server';
import { attemptsForUser, currentUser, getProgress, logRevision, unauthorized } from '@/lib/store-helpers';
import { respondAsync, recognizeCommand } from '@/lib/ai/tutor';
import type { TutorContext } from '@/lib/ai/tutor';
import { computeAnalytics } from '@/lib/analytics';
import type { TutorMessage } from '@/lib/types';

/**
 * POST /api/tutor
 * body: { input: string, subject?: string, topic?: string, history?: TutorMessage[] }
 * reply: { reply: TutorReply, command: string | null, context: { subject, topic } }
 */
export async function POST(req: Request) {
  const user = currentUser();
  if (!user) return unauthorized();

  const body = (await req.json().catch(() => null)) as {
    input?: string;
    subject?: string;
    topic?: string;
    history?: TutorMessage[];
  } | null;
  if (!body?.input || !body.input.trim()) {
    return NextResponse.json({ error: 'input is required' }, { status: 400 });
  }

  // If no explicit context, fall back to the user's current subject/topic.
  const progress = getProgress(user.id);
  const subject = body.subject ?? progress.currentSubject ?? undefined;
  const topic = body.topic ?? progress.currentTopic ?? undefined;

  const attempts = attemptsForUser(user.id, 100);
  const analytics = computeAnalytics(user.id, attempts);

  const ctx: TutorContext = {
    subject,
    topic,
    history: Array.isArray(body.history) ? body.history.slice(-10) : [],
    weakAreas: analytics.weak.map((w) => ({
      subject: w.slug,
      topic: w.topic,
      accuracy: w.accuracy / 100,
      attempts: w.attempted,
    })),
  };

  const input = body.input.trim();
  const command = recognizeCommand(input);

  const reply = await respondAsync(input, ctx);

  // Log "Quick Revision" usage into revision history.
  if (command === 'Quick Revision' && topic) {
    logRevision(user.id, topic, 'tutor');
  }

  return NextResponse.json({ reply, command, context: { subject, topic } });
}
