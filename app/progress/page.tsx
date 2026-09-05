'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { StudyTimeChart } from '@/components/charts';
import { Badge, Card, EmptyState, ProgressBar, SectionTitle, StatCard } from '@/components/ui';
import { TOPICS, topicById, topicsForSubject } from '@/lib/content/topics';
import { SUBJECTS, subjectBySlug } from '@/lib/content/subjects';
import { Flame, BookOpenCheck, Clock, CheckSquare } from 'lucide-react';

export default function ProgressPage() {
  const [progress, setProgress] = useState<{
    completedTopics: Record<string, string>;
    studyTime: Record<string, number>;
    streak: number;
    recentAttempts: { id: string; testName: string; finishedAt: string; score: number; maxScore: number }[];
    revisionHistory: { topic: string; kind: string; at: string }[];
  } | null>(null);


  useEffect(() => {
    fetch('/api/progress')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setProgress(d))
      .catch(() => {});
  }, []);

  const todayKey = new Date().toISOString().slice(0, 10);

  const studyChartData = useMemo(() => {
    if (!progress) return [];
    return Object.entries(progress.studyTime)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-14)
      .map(([date, sec]) => ({ date, minutes: Math.round(sec / 60) }));
  }, [progress]);

  if (!progress) return <div className="py-24 text-center text-ink-400">Loading your progress…</div>;

  const completed = progress.completedTopics;
  const totalDone = Object.keys(completed).filter((id) => topicById.has(id)).length;
  const overallPct = Math.round((100 * totalDone) / TOPICS.length);
  const totalMinutes = Math.round(Object.values(progress.studyTime).reduce((a, b) => a + b, 0) / 60);
  const todayMinutes = Math.round((progress.studyTime[todayKey] ?? 0) / 60);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">My Progress</h1>
        <p className="mt-1 text-sm text-ink-500">Everything you have completed, studied and revised — all in one place.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<BookOpenCheck className="h-5 w-5" />} label="Topics completed" value={`${totalDone}/${TOPICS.length}`} sub={`${overallPct}% of syllabus`} />
        <StatCard icon={<Flame className="h-5 w-5" />} label="Streak" value={`${progress.streak} days`} tone="amber" sub="consecutive study days" />
        <StatCard icon={<Clock className="h-5 w-5" />} label="Total study time" value={`${Math.round(totalMinutes / 60)}h`} tone="indigo" sub={`${totalMinutes} min logged`} />
        <StatCard icon={<CheckSquare className="h-5 w-5" />} label="Today" value={`${todayMinutes} min`} tone="rose" sub={progress.recentAttempts.length ? `${progress.recentAttempts.length} recent attempts` : 'no attempts yet'} />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <SectionTitle title="Study time — last 14 active days" />
          {studyChartData.length > 0 ? <StudyTimeChart data={studyChartData} /> : <p className="text-sm text-ink-400">Study time is logged automatically when you complete topics, attempt tests and use the tutor.</p>}
        </Card>

        <Card className="p-5">
          <SectionTitle title="Recent activity" />
          {progress.recentAttempts.length === 0 ? (
            <EmptyState title="No attempts yet" action={<Link href="/practice" className="btn-primary">Do a practice set</Link>} />
          ) : (
            <div className="space-y-2.5">
              {progress.recentAttempts.slice(0, 6).map((a) => {
                const pct = Math.round((a.score / Math.max(a.maxScore, 1)) * 100);
                return (
                  <div key={a.id} className="rounded-xl bg-slate-50 px-3.5 py-2.5 ring-1 ring-ink-100">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-ink-800">{a.testName}</span>
                      <span className={`text-sm font-bold ${pct >= 75 ? 'text-brand-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{pct}%</span>
                    </div>
                    <div className="text-xs text-ink-400">{new Date(a.finishedAt).toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Per-subject completion */}
      <Card className="p-5">
        <SectionTitle title="Syllabus completion by subject" />
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUBJECTS.map((s) => {
            const topics = topicsForSubject(s.slug);
            const done = topics.filter((t) => completed[t.id]).length;
            const pct = topics.length ? Math.round((100 * done) / topics.length) : 0;
            return (
              <div key={s.slug}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="truncate font-medium text-ink-700">
                    {s.icon} {s.name}
                  </span>
                  <span className="ml-2 shrink-0 text-xs font-semibold text-ink-400">
                    {done}/{topics.length}
                  </span>
                </div>
                <ProgressBar value={pct} barClass={pct === 100 ? 'bg-brand-600' : undefined} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Revision history */}
      <Card className="p-5">
        <SectionTitle title="Revision history" sub="Logged from the Revision Center and the AI Tutor" />
        {(progress.revisionHistory ?? []).length === 0 ? (
          <p className="text-sm text-ink-500">
            Nothing logged yet — use <Link href="/revision" className="font-semibold text-brand-600 hover:underline">Revision Center</Link> or the tutor&apos;s Quick Revision command.
          </p>
        ) : (
          <div className="space-y-2">
            {(progress.revisionHistory ?? []).slice(-10).reverse().map((r, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl bg-violet-50/50 px-4 py-2.5 text-sm ring-1 ring-violet-100">
                <span className="font-semibold text-ink-800">🔁 {topicById.get(r.topic)?.name ?? r.topic}</span>
                <span className="text-xs text-ink-400">
                  {r.kind} · {new Date(r.at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
