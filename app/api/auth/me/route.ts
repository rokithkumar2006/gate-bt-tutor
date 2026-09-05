import { NextResponse } from 'next/server';
import { attemptsForUser, computeStreak, currentUser, getProgress, unauthorized } from '@/lib/store-helpers';

export async function GET() {
  const user = currentUser();
  if (!user) return unauthorized();

  const progress = getProgress(user.id);
  const attempts = attemptsForUser(user.id, 10);

  return NextResponse.json({
    user,
    streak: computeStreak(user.id),
    completedTopics: progress.completedTopics,
    currentSubject: progress.currentSubject,
    currentTopic: progress.currentTopic,
    recentAttempts: attempts,
  });
}
