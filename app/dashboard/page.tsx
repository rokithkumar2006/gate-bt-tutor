'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useAppData } from '@/components/AppShell';
import { Badge, Card, EmptyState, ProgressBar, SectionTitle, StatCard } from '@/components/ui';
import { SUBJECTS, subjectBySlug } from '@/lib/content/subjects';
import { TOPICS, topicById, topicsForSubject } from '@/lib/content/topics';
import type { Attempt, StudyPlan, User } from '@/lib/types';
import {
  Flame, Target, BookOpenCheck, Trophy, ArrowRight, Bot, PenLine, Timer, Archive, BookOpen, Sparkles, CalendarRange,
} from 'lucide-react';

interface AnalyticsLite {
  weak: { slug: string; topic: string; topicName: string; accuracy: number; attempted: number }[];
  whatToStudyNext: { id: string; name: string; subject: string; level: number; priority: string }[];
}

export default function DashboardPage() {
  const { user, streak, refresh } = useAppData();
  const [completed, setCompleted] = useState<Record<string, string>>({});
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsLite | null>(null);
  const [plan, setPlan] = useState<StudyPlan | null>(null);

  const load = useCallback(() => {
    Promise.all([
      fetch('/api/auth/me').then((r) => (r.ok ? r.json() : null)),
      fetch('/api/analytics').then((r) => (r.ok ? r.json() : null)),
      fetch('/api/planner').then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([me, an, pl]) => {
        if (me) {
          setCompleted(me.completedTopics ?? {});
          setAttempts(me.recentAttempts ?? []);
        }
        if (an) setAnalytics(an);
        if (pl) setPlan(pl.plan);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const todayKey = new Date().toISOString().slice(0, 10);

  const subjectProgress = useMemo(() => {
    return SUBJECTS.map((s) => {
      const topics = TOPICS.filter((t) => t.subject === s.slug);
      const done = topics.filter((t) => completed[t.id]).length;
      return { ...s, total: topics.length, done, pct: topics.length ? Math.round((100 * done) / topics.length) : 0 };
    });
  }, [completed]);

  const overallPct = useMemo(() => {
    const done = Object.keys(completed).filter((id) => topicById.has(id)).length;
    return Math.round((100 * done) / TOPICS.length);
  }, [completed]);

  const todayMinutes = useMemo(() => {
    const me = user as (User & { profile: { dailyGoalMin?: number } }) | null;
    // study time today comes from analytics-free source: approximate via attempts today
    const todaySec = attempts
      .filter((a) => a.finishedAt.slice(0, 10) === todayKey)
      .reduce((n, a) => n + a.durationSec, 0);
    return Math.round(todaySec / 60);
  }, [attempts, todayKey, user]);

  const dailyGoalMin = (user?.profile as { dailyGoalMin?: number } | undefined)?.dailyGoalMin ?? 120;

  const current = useMemo(() => {
    // current subject/topic if present in completed-based progress; else whatToStudyNext[0]
    const next = analytics?.whatToStudyNext?.[0];
    if (!next) return null;
    return { ...next, subjectName: subjectBySlug.get(next.subject)?.name ?? next.subject };
  }, [analytics]);

  const lastScore = attempts[0];

  const todayPlan = plan?.daily.find((d) => d.date === todayKey) ?? null;

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">
            Hello, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            {user?.profile?.targetExam || 'GATE BT'} · {user?.profile?.yearOfStudy || 'Biotechnology'}
            {streak > 0 ? ` · ${streak}-day streak, keep it alive!` : ' · Start today to build your streak.'}
          </p>
        </div>
        <Link href="/planner" className="btn-secondary">
          <CalendarRange className="h-4 w-4" /> Study Plan
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Target className="h-5 w-5" />} label="Today's goal" value={`${Math.min(todayMinutes, dailyGoalMin)}/${dailyGoalMin} min`} sub={todayMinutes >= dailyGoalMin ? 'Goal achieved 🎉' : `${dailyGoalMin - Math.min(todayMinutes, dailyGoalMin)} min to go`} />
        <StatCard icon={<Flame className="h-5 w-5" />} label="Streak" value={`${streak} days`} sub={streak >= 7 ? 'On fire 🔥' : 'Study daily to extend'} tone="amber" />
        <StatCard icon={<BookOpenCheck className="h-5 w-5" />} label="Syllabus progress" value={`${overallPct}%`} sub={`${Object.keys(completed).filter((id) => topicById.has(id)).length}/${TOPICS.length} topics completed`} tone="indigo" />
        <StatCard icon={<Trophy className="h-5 w-5" />} label="Last score" value={lastScore ? `${Math.round((lastScore.score / Math.max(lastScore.maxScore, 1)) * 100)}%` : '—'} sub={lastScore ? lastScore.testName : 'No attempts yet'} tone="rose" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2/3 */}
        <div className="space-y-6 lg:col-span-2">
          {/* Continue learning */}
          <Card className="p-5">
            <SectionTitle title="Continue Learning" sub="One topic at a time — basics first" />
            {current ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-ink-400">{current.subjectName}</div>
                  <div className="mt-0.5 truncate text-base font-bold text-ink-900">
                    {current.priority === 'high' ? '🔥 ' : current.priority === 'medium' ? '⭐ ' : ''}
                    {current.name}
                  </div>
                  <div className="mt-1 text-xs text-ink-500">
                    Level {current.level} · {topicById.get(current.id)?.short ?? ''}
                  </div>
                </div>
                <Link href={`/learn/${current.subject}/${current.id}`} className="btn-primary shrink-0">
                  Start Topic <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <EmptyState title="Pick your first topic" sub="Say “Start [subject]” to the AI tutor, or open a subject page." action={<Link href="/subjects" className="btn-primary">Browse Subjects</Link>} />
            )}
          </Card>

          {/* Today's plan */}
          <Card className="p-5">
            <SectionTitle
              title="Today's Study Plan"
              sub={plan ? `Plan for ${plan.examDate} · ${plan.hoursDay} h/day` : 'No plan yet — the planner builds one from your exam date'}
              action={plan ? <Link href="/planner" className="btn-ghost text-xs">Regenerate</Link> : undefined}
            />
            {todayPlan ? (
              <ul className="space-y-2.5">
                {todayPlan.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-ink-700 ring-1 ring-ink-100">
                    <span className="mt-0.5 text-brand-600">{item.startsWith('Mock') ? '🧪' : item.startsWith('Revision') ? '🔁' : '📚'}</span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="Create your study plan"
                sub="Give your exam date and hours per day — get a day-by-day schedule with revisions and mocks."
                action={<Link href="/planner" className="btn-primary">Open Planner</Link>}
              />
            )}
          </Card>

          {/* Recent performance */}
          <Card className="p-5">
            <SectionTitle title="Recent Performance" action={<Link href="/performance" className="btn-ghost text-xs">Full analytics →</Link>} />
            {attempts.length === 0 ? (
              <EmptyState title="No attempts yet" sub="Take a mock test or a practice set — your scores land here." action={<Link href="/mock" className="btn-primary">Take a Mock Test</Link>} />
            ) : (
              <div className="divide-y divide-ink-100">
                {attempts.slice(0, 5).map((a) => {
                  const pct = Math.round((a.score / Math.max(a.maxScore, 1)) * 100);
                  return (
                    <div key={a.id} className="flex items-center justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-ink-800">{a.testName}</div>
                        <div className="text-xs text-ink-400">
                          {new Date(a.finishedAt).toLocaleDateString()} · {a.correct}✓ {a.incorrect}✗ {a.unattempted}○
                        </div>
                      </div>
                      <div className="flex w-32 shrink-0 items-center gap-2">
                        <ProgressBar value={pct} barClass={pct >= 75 ? 'bg-brand-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'} className="flex-1" />
                        <span className={`w-10 text-right text-sm font-bold ${pct >= 75 ? 'text-brand-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Right 1/3 */}
        <div className="space-y-6">
          {/* Quick actions */}
          <Card className="p-5">
            <SectionTitle title="Quick Actions" />
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { href: '/tutor', label: 'AI Tutor', icon: <Bot className="h-4 w-4" />, cls: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' },
                { href: '/practice', label: 'Practice', icon: <PenLine className="h-4 w-4" />, cls: 'bg-brand-50 text-brand-600 hover:bg-brand-100' },
                { href: '/mock', label: 'Mock Test', icon: <Timer className="h-4 w-4" />, cls: 'bg-amber-50 text-amber-600 hover:bg-amber-100' },
                { href: '/pyqs', label: 'PYQ Bank', icon: <Archive className="h-4 w-4" />, cls: 'bg-sky-50 text-sky-600 hover:bg-sky-100' },
                { href: '/revision', label: 'Revise', icon: <BookOpen className="h-4 w-4" />, cls: 'bg-violet-50 text-violet-600 hover:bg-violet-100' },
                { href: '/numericals', label: 'Numericals', icon: <Sparkles className="h-4 w-4" />, cls: 'bg-rose-50 text-rose-600 hover:bg-rose-100' },
              ].map((a) => (
                <Link key={a.href} href={a.href} className={`flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold ring-1 ring-ink-100 transition-colors ${a.cls}`}>
                  {a.icon} {a.label}
                </Link>
              ))}
            </div>
          </Card>

          {/* Weak areas */}
          <Card className="p-5">
            <SectionTitle title="Weak Areas" action={<Link href="/weak-areas" className="btn-ghost text-xs">All →</Link>} />
            {!analytics || analytics.weak.length === 0 ? (
              <p className="text-sm text-ink-500">
                Nothing confirmed weak yet — do a few question sets and I will track accuracy per topic (under 50% over 2+ attempts).
              </p>
            ) : (
              <ul className="space-y-2.5">
                {analytics.weak.slice(0, 4).map((w) => (
                  <li key={w.topic} className="rounded-xl bg-rose-50/60 px-4 py-3 ring-1 ring-rose-100">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-ink-800">{w.topicName}</span>
                      <Badge tone="rose">{w.accuracy}%</Badge>
                    </div>
                    <div className="mt-0.5 text-xs text-ink-500">{subjectBySlug.get(w.slug)?.name}</div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Upcoming revision (from plan) */}
          <Card className="p-5">
            <SectionTitle title="Upcoming Revision" />
            {plan ? (
              <ul className="space-y-2">
                {plan.revision.slice(0, 4).map((r) => (
                  <li key={r.date} className="flex items-start gap-2 text-sm text-ink-600">
                    <span className="text-violet-500">🔁</span>
                    <span>
                      <b className="text-ink-800">{r.date.slice(5)}</b> · {r.topics.slice(0, 2).map((t) => topicById.get(t)?.name ?? t).join(' · ')}
                      {r.topics.length > 2 ? ` +${r.topics.length - 2}` : ''}
                    </span>
                  </li>
                ))}
                {plan.revision.length === 0 && <li className="text-sm text-ink-500">No revision days in this plan yet.</li>}
              </ul>
            ) : (
              <p className="text-sm text-ink-500">Create a plan to see your 3-day revision cycle.</p>
            )}
          </Card>
        </div>
      </div>

      {/* Subject progress */}
      <Card className="p-5">
        <SectionTitle title="Subject Progress" sub="Completed topics per subject — easy → difficult, level by level" action={<Link href="/subjects" className="btn-ghost text-xs">All subjects →</Link>} />
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjectProgress.map((s) => (
            <Link key={s.slug} href={`/subjects/${s.slug}`} className="group">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="truncate font-medium text-ink-700 group-hover:text-brand-700">
                  {s.icon} {s.name}
                </span>
                <span className="ml-2 shrink-0 text-xs font-semibold text-ink-400">
                  {s.done}/{s.total}
                </span>
              </div>
              <ProgressBar value={s.pct} />
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
