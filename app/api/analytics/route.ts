import { NextResponse } from 'next/server';
import { attemptsForUser, currentUser, unauthorized } from '@/lib/store-helpers';
import { computeAnalytics } from '@/lib/analytics';
import { whatToStudyNext } from '@/lib/planner';
import { getProgress } from '@/lib/store';

export async function GET() {
  const user = currentUser();
  if (!user) return unauthorized();

  const attempts = attemptsForUser(user.id, 200);
  const analytics = computeAnalytics(user.id, attempts);

  const progress = getProgress(user.id);
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
