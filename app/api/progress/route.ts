import { NextResponse } from 'next/server';
import { currentUser, notFound, store, todayKey, unauthorized } from '@/lib/store-helpers';
import { topicById } from '@/lib/content/topics';

/** GET /api/progress → progress record + streak + recent activity */
export async function GET() {
  const user = await currentUser();
  if (!user) return unauthorized();
  const progress = await store.getProgress(user.id);
  return NextResponse.json({
    ...progress,
    streak: await store.computeStreak(user.id),
    todaySeconds: progress.studyTime[todayKey()] ?? 0,
    recentAttempts: await store.attemptsForUser(user.id, 10),
    revisionHistory: await store.revisionHistory(user.id),
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
  const user = await currentUser();
  if (!user) return unauthorized();

  const body = (await req.json().catch(() => null)) as ProgressBody | null;
  if (!body?.action) return NextResponse.json({ error: 'action required' }, { status: 400 });

  const progress = await store.getProgress(user.id);

  if (body.action === 'complete' && body.topic) {
    if (!topicById.has(body.topic)) return notFound();
    progress.completedTopics[body.topic] = new Date().toISOString();
    await store.saveProgress(progress);
    await store.addActivity(user.id, `completed:${body.topic}`);
  } else if (body.action === 'uncomplete' && body.topic) {
    delete progress.completedTopics[body.topic];
    await store.saveProgress(progress);
  } else if (body.action === 'set-current') {
    progress.currentSubject = body.subject ?? null;
    progress.currentTopic = body.topic ?? null;
    await store.saveProgress(progress);
  } else if (body.action === 'log-revision' && body.topic) {
    await store.logRevision(user.id, body.topic, body.kind ?? 'revision-center');
  } else if (body.action === 'study-time') {
    const s = Math.max(0, Math.round(Number(body.seconds ?? 0)));
    const date = todayKey();
    progress.studyTime[date] = (progress.studyTime[date] ?? 0) + s;
    await store.saveProgress(progress);
    await store.addActivity(user.id, 'study-time', s);
  } else {
    return NextResponse.json({ error: 'unknown action' }, { status: 400 });
  }

  return NextResponse.json({ ok: true, progress, streak: await store.computeStreak(user.id) });
}
