import { NextResponse } from 'next/server';
import { currentUser, store, unauthorized } from '@/lib/store-helpers';
import { computeAnalytics } from '@/lib/analytics';
import { whatToStudyNext } from '@/lib/planner';

export async function GET() {
  const user = await currentUser();
  if (!user) return unauthorized();

  const attempts = await store.attemptsForUser(user.id, 200);
  const analytics = computeAnalytics(user.id, attempts);

  const progress = await store.getProgress(user.id);
  const nextUp = whatToStudyNext(new Set(Object.keys(progress.completedTopics)), 5);

  return NextResponse.json({
    ...analytics,
    whatToStudyNext: nextUp.map((t) => ({
      id: t.id,
      name: t.name,
      subject: t.subject,
      level: t.level,
      priority: t.priority,
    })),
  });
}
