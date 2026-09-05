import { NextResponse } from 'next/server';
import { addActivity, attemptsForUser, computeStreak, currentUser, getProgress, notFound, revisionHistory, todayKey, unauthorized } from '@/lib/store-helpers';
import { topicById } from '@/lib/content/topics';

/** GET /api/progress → progress record + streak + recent activity */
export async function GET() {
  const user = currentUser();
  if (!user) return unauthorized();
  const progress = getProgress(user.id);
  return NextResponse.json({
    ...progress,
    streak: computeStreak(user.id),
    todaySeconds: getProgress(user.id).studyTime[todayKey()] ?? 0,
    recentAttempts: attemptsForUser(user.id, 10),
    revisionHistory: revisionHistory(user.id),
  });
}

interface ProgressBody {
  action?: 'complete' | 'uncomplete' | 'set-current' | 'log-revision' | 'study-time';
  topic?: string;
  subject?: string;
  seconds?: number;
  kind?: string;
}

/** POST /api/progress → mutate progress (complete topic, set current, log study time) */
export async function POST(req: Request) {
  const user = currentUser();
  if (!user) return unauthorized();

  const body = (await req.json().catch(() => null)) as ProgressBody | null;
  if (!body?.action) return NextResponse.json({ error: 'action required' }, { status: 400 });

  const progress = getProgress(user.id);

  if (body.action === 'complete' && body.topic) {
    if (!topicById.has(body.topic)) return notFound();
    progress.completedTopics[body.topic] = new Date().toISOString();
    addActivity(user.id, `completed:${body.topic}`);
  } else if (body.action === 'uncomplete' && body.topic) {
    delete progress.completedTopics[body.topic];
  } else if (body.action === 'set-current') {
    progress.currentSubject = body.subject ?? null;
    progress.currentTopic = body.topic ?? null;
  } else if (body.action === 'log-revision' && body.topic) {
    const { logRevision } = await import('@/lib/store');
    logRevision(user.id, body.topic, body.kind ?? 'revision-center');
  } else if (body.action === 'study-time') {
    const s = Math.max(0, Math.round(Number(body.seconds ?? 0)));
    const date = todayKey();
    progress.studyTime[date] = (progress.studyTime[date] ?? 0) + s;
    addActivity(user.id, 'study-time', s);
  } else {
    return NextResponse.json({ error: 'unknown action' }, { status: 400 });
  }

  return NextResponse.json({ ok: true, progress, streak: computeStreak(user.id) });
}
