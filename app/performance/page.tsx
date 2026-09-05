'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ScoreHistoryChart, SubjectAccuracyChart, OutcomeDonut, StudyTimeChart } from '@/components/charts';
import { Badge, Card, EmptyState, ProgressBar, SectionTitle, StatCard } from '@/components/ui';
import type { Analytics } from '@/lib/analytics';
import { subjectBySlug } from '@/lib/content/subjects';
import { topicById } from '@/lib/content/topics';
import { TrendingUp, Target, Award, BrainCircuit } from 'lucide-react';

export default function PerformancePage() {
  const [data, setData] = useState<Analytics & { whatToStudyNext: { id: string; name: string; subject: string; level: number; priority: string }[] } | null>(null);
  const [studyTime, setStudyTime] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
    fetch('/api/progress')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStudyTime(d.studyTime ?? {}))
      .catch(() => {});
  }, []);

  const studyChartData = useMemo(() => {
    const days = Object.entries(studyTime)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-14)
      .map(([date, sec]) => ({ date, minutes: Math.round(sec / 60) }));
    return days;
  }, [studyTime]);

  if (!data) {
    return <div className="py-24 text-center text-ink-400">Loading analytics…</div>;
  }

  const { overall, bySubject, scoreHistory, whatToStudyNext } = data;

  const scoreData = scoreHistory.slice(-12).map((s, i) => ({
    label: String(i + 1),
    testName: s.testName,
    pct: s.pct,
    accuracy: s.accuracy,
  }));

  const subjectData = bySubject
    .filter((s) => s.attempted >= 1)
    .map((s) => ({ name: s.name, accuracy: s.accuracy, attempted: s.attempted }))
    .reverse();

  const totalCorrect = overall.correct;
  const totalWrong = overall.attemptedQuestions - overall.correct;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Performance Analytics</h1>
        <p className="mt-1 text-sm text-ink-500">Every practice set, PYQ and mock feeds these charts — and the “What to study next” list.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Average score" value={`${overall.averagePct}%`} sub={`best ${overall.bestPct}%`} />
        <StatCard icon={<Target className="h-5 w-5" />} label="Overall accuracy" value={`${overall.accuracy}%`} sub={`${totalCorrect} of ${overall.attemptedQuestions} questions`} tone="amber" />
        <StatCard icon={<Award className="h-5 w-5" />} label="Tests taken" value={overall.attempts} sub={`${Math.round(overall.totalEarned * 100) / 100} / ${overall.totalMax} marks earned`} tone="indigo" />
        <StatCard icon={<BrainCircuit className="h-5 w-5" />} label="Weak topics" value={data.weak.length} sub={`${data.strong.length} strong · ${data.average.length} average`} tone="rose" />
      </div>

      {overall.attempts === 0 ? (
        <EmptyState
          title="No data yet"
          sub="Take a mock test or a practice set — analytics appear the moment you submit your first attempt."
          action={<Link href="/mock" className="btn-primary">Take a Mock Test</Link>}
        />
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-5 lg:col-span-2">
              <SectionTitle title="Score history" sub="Score % vs accuracy % over your last attempts" />
              {scoreData.length > 0 ? <ScoreHistoryChart data={scoreData} /> : <p className="text-sm text-ink-400">Not enough attempts for a trend yet.</p>}
            </Card>
            <Card className="p-5">
              <SectionTitle title="Last attempt" sub="Outcome split" />
              {scoreHistory.length > 0 && (
                <OutcomeDonut
                  correct={totalCorrect}
                  incorrect={totalWrong}
                  unattempted={0}
                />
              )}
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="p-5 lg:col-span-2">
              <SectionTitle title="Subject accuracy" sub="Red = weak (<50%) · amber = average · green = strong (>75%)" />
              {subjectData.length > 0 ? <SubjectAccuracyChart data={subjectData} /> : <p className="text-sm text-ink-400">Answer questions to populate this chart.</p>}
            </Card>
            <Card className="p-5">
              <SectionTitle title="Study time" sub="Last 14 active days" />
              {studyChartData.length > 0 ? <StudyTimeChart data={studyChartData} /> : <p className="text-sm text-ink-400">No study time logged yet.</p>}
            </Card>
          </div>

          {/* What to study next */}
          <Card className="p-5">
            <SectionTitle title="What to study next" sub="Weakest areas first, then high-weight subjects with the least coverage" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {whatToStudyNext.map((t, i) => (
                <Link key={t.id} href={`/learn/${t.subject}/${t.id}`}>
                  <div className="card card-hover flex items-center gap-3 p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-600">{i + 1}</div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-bold text-ink-800">{t.priority === 'high' ? '🔥 ' : t.priority === 'medium' ? '⭐ ' : ''}{t.name}</div>
                      <div className="truncate text-xs text-ink-400">{subjectBySlug.get(t.subject)?.name} · L{t.level}</div>
                    </div>
                  </div>
                </Link>
              ))}
              {whatToStudyNext.length === 0 && <p className="text-sm text-ink-500">Nothing pending — brilliant.</p>}
            </div>
          </Card>

          {/* Per-topic table */}
          <Card className="p-5">
            <SectionTitle title="Topic-level breakdown" sub="Topics ordered by accuracy — weak first" />
            {data.byTopic.length === 0 ? (
              <p className="text-sm text-ink-400">No topic-level data yet.</p>
            ) : (
              <div className="overflow-x-auto thin-scroll">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-ink-100 text-left text-xs font-bold uppercase tracking-wide text-ink-400">
                      <th className="pb-2 pr-3">Topic</th>
                      <th className="pb-2 pr-3">Subject</th>
                      <th className="pb-2 pr-3">Qs</th>
                      <th className="pb-2 pr-3 w-40">Accuracy</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.byTopic.slice(0, 15).map((t) => (
                      <tr key={`${t.slug}-${t.topic}`} className="border-b border-ink-50 last:border-0">
                        <td className="py-2.5 pr-3 font-semibold text-ink-800">{t.topicName}</td>
                        <td className="py-2.5 pr-3 text-ink-500">{t.name}</td>
                        <td className="py-2.5 pr-3 text-ink-500">{t.attempted}</td>
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-2">
                            <ProgressBar value={t.accuracy} className="flex-1" barClass={t.accuracy < 50 ? 'bg-rose-500' : t.accuracy > 75 ? 'bg-brand-500' : 'bg-amber-500'} />
                            <span className="w-9 text-right text-xs font-bold text-ink-600">{t.accuracy}%</span>
                          </div>
                        </td>
                        <td className="py-2.5">
                          {t.status === 'weak' ? <Badge tone="rose">Weak</Badge> : t.status === 'strong' ? <Badge tone="brand">Strong</Badge> : <Badge tone="amber">Average</Badge>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
