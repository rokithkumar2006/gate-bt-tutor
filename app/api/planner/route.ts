import { NextResponse } from 'next/server';
import { currentUser, store, unauthorized } from '@/lib/store-helpers';
import { planStudy } from '@/lib/planner';

/** GET /api/planner → saved plan (if any) */
export async function GET() {
  const user = await currentUser();
  if (!user) return unauthorized();
  const plan = await store.getPlan(user.id);
  return NextResponse.json({ plan });
}

/** POST /api/planner { examDate, hoursPerDay, startLevel } → generate + save */
export async function POST(req: Request) {
  const user = await currentUser();
  if (!user) return unauthorized();

  const body = (await req.json().catch(() => null)) as {
    examDate?: string;
    hoursPerDay?: number;
    startLevel?: number;
  } | null;

  if (!body?.examDate || !/^\d{4}-\d{2}-\d{2}$/.test(body.examDate)) {
    return NextResponse.json({ error: 'examDate (yyyy-mm-dd) is required' }, { status: 400 });
  }
  const hoursPerDay = Math.min(Math.max(Number(body.hoursPerDay ?? user.profile.dailyHours ?? 2), 0.5), 12);
  const startLevel = ([1, 2, 3, 4] as const).find((l) => l === Number(body.startLevel)) ?? 1;

  const plan = planStudy({ examDate: body.examDate, hoursPerDay, startLevel });
  await store.savePlan(user.id, plan);

  return NextResponse.json({ plan });
}
