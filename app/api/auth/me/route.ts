import { NextResponse } from 'next/server';
import { currentUser, store, unauthorized } from '@/lib/store-helpers';

export async function GET() {
  const user = await currentUser();
  if (!user) return unauthorized();

  const progress = await store.getProgress(user.id);
  const attempts = await store.attemptsForUser(user.id, 10);

  return NextResponse.json({
    user,
    streak: await store.computeStreak(user.id),
    completedTopics: progress.completedTopics,
    currentSubject: progress.currentSubject,
    currentTopic: progress.currentTopic,
    recentAttempts: attempts,
  });
}
