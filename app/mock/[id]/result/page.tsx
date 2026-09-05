'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';
import { Badge, Card, EmptyState, ProgressBar } from '@/components/ui';
import { OutcomeDonut } from '@/components/charts';
import { getMockTest } from '@/lib/content/mockTests';
import { questionById } from '@/lib/content/questions';
import { pyqById } from '@/lib/content/pyqs';
import type { AnswerRecord, Attempt, Question } from '@/lib/types';
import { Trophy, RotateCcw, ChevronLeft, CheckCircle2, XCircle, HelpCircle, TimerOff } from 'lucide-react';

function ResultView() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const attemptId = search.get('a');
  const auto = search.get('auto') === '1';
  const test = getMockTest(params?.id ?? '');

  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/attempts?limit=100')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        const list: Attempt[] = d?.attempts ?? [];
        setAttempt(list.find((a) => a.id === attemptId) ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [attemptId]);

  const questions = useMemo(() => {
    if (!test) return [];
    return test.questionIds
      .map((qid) => questionById.get(qid) ?? (pyqById.get(qid) as unknown as Question | undefined))
      .filter((q): q is Question => !!q);
  }, [test]);

  const sectionStats = useMemo(() => {
    if (!test || !attempt) return [];
    const byQid = new Map(attempt.answers.map((a) => [a.questionId, a]));
    let start = 0;
    return test.sections.map((s) => {
      const slice = questions.slice(start, start + s.count);
      start += s.count;
      let correct = 0;
      let incorrect = 0;
      let unattempted = 0;
      let earned = 0;
      slice.forEach((q) => {
        const a = byQid.get(q.id);
        if (!a) return;
        if (!a.attempted) unattempted++;
        else if (a.correct) correct++;
        else incorrect++;
        earned += a.earned;
      });
      return { key: s.key, title: s.title, count: slice.length, correct, incorrect, unattempted, earned: Math.round(earned * 100) / 100 };
    });
  }, [test, attempt, questions]);

  if (!test) {
    return <EmptyState title="Mock test not found" action={<Link href="/mock" className="btn-primary">Back to Mock Tests</Link>} />;
  }
  if (loading) {
    return <div className="py-24 text-center text-ink-400">Loading results…</div>;
  }
  if (!attempt) {
    return <EmptyState title="Attempt not found" sub="It may have been saved under a different session." action={<Link href="/mock" className="btn-primary">Back to Mock Tests</Link>} />;
  }

  const pct = Math.round((attempt.score / Math.max(attempt.maxScore, 1)) * 100);
  const byQid = new Map(attempt.answers.map((a) => [a.questionId, a]));
  const LETTERS = 'ABCDEF';

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {auto && (
        <div className="flex items-center gap-2.5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 ring-1 ring-amber-200">
          <TimerOff className="h-4 w-4" /> Time expired — the test was submitted automatically.
        </div>
      )}

      {/* Score hero */}
      <Card className="overflow-hidden">
        <div className={clsx('px-6 py-5', pct >= 75 ? 'bg-gradient-to-br from-brand-600 to-brand-800' : pct >= 50 ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-rose-500 to-rose-700')}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-white/80">
                <Trophy className="h-4 w-4" />
                <span className="text-sm font-semibold">{test.name}</span>
              </div>
              <div className="mt-1 text-3xl font-bold text-white">
                {attempt.score} / {attempt.maxScore} <span className="text-xl opacity-80">({pct}%)</span>
              </div>
              <div className="mt-1 text-sm text-white/80">
                Accuracy {attempt.accuracy}% · {new Date(attempt.finishedAt).toLocaleString()}
              </div>
            </div>
            <div className="text-center">
              <div className="text-5xl">{pct >= 75 ? '🏆' : pct >= 50 ? '💪' : '📚'}</div>
              <div className="mt-1 text-sm font-bold text-white">{pct >= 75 ? 'Excellent' : pct >= 50 ? 'Good effort' : 'Keep practising'}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-px bg-ink-100 sm:grid-cols-4">
          {[
            { l: 'Correct', v: attempt.correct, c: 'text-emerald-600' },
            { l: 'Incorrect', v: attempt.incorrect, c: 'text-rose-600' },
            { l: 'Unattempted', v: attempt.unattempted, c: 'text-ink-500' },
            { l: 'Accuracy', v: `${attempt.accuracy}%`, c: 'text-brand-600' },
          ].map((s) => (
            <div key={s.l} className="bg-white p-4 text-center">
              <div className={clsx('text-2xl font-bold', s.c)}>{s.v}</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-400">{s.l}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Donut + sections */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-5">
          <div className="mb-2 text-sm font-bold text-ink-800">Answer breakdown</div>
          <OutcomeDonut correct={attempt.correct} incorrect={attempt.incorrect} unattempted={attempt.unattempted} />
        </Card>
        <Card className="p-5">
          <div className="mb-3 text-sm font-bold text-ink-800">Section performance</div>
          <div className="space-y-3">
            {sectionStats.map((s) => {
              const spct = s.count > 0 ? Math.round((100 * Math.max(s.earned, 0)) / s.count) : 0;
              return (
                <div key={s.key}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink-700">{s.title}</span>
                    <span className="text-xs font-bold text-ink-500">
                      {s.correct}✓ {s.incorrect}✗ {s.unattempted}○ · {s.earned}
                    </span>
                  </div>
                  <ProgressBar value={spct} barClass={spct >= 75 ? 'bg-brand-500' : spct >= 50 ? 'bg-amber-500' : 'bg-rose-500'} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <Link href={`/mock/${test.id}`} className="btn-primary">
          <RotateCcw className="h-4 w-4" /> Retake Test
        </Link>
        <Link href="/weak-areas" className="btn-secondary">
          See Weak Areas
        </Link>
        <Link href="/mock" className="btn-ghost">
          <ChevronLeft className="h-4 w-4" /> All Mocks
        </Link>
      </div>

      {/* Review */}
      <div>
        <div className="mb-3 text-lg font-bold text-ink-900">Question review</div>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const a: AnswerRecord | undefined = byQid.get(q.id);
            const state = !a || !a.attempted ? 'un' : a.correct ? 'ok' : 'no';
            const sectionOf = test.sections.findIndex((s, si) => {
              const start = test.sections.slice(0, si).reduce((n, x) => n + x.count, 0);
              return i >= start && i < start + s.count;
            });
            return (
              <div key={q.id} className={clsx('card p-5', state === 'ok' ? 'ring-emerald-200' : state === 'no' ? 'ring-rose-200' : 'ring-ink-100')}>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {state === 'ok' ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : state === 'no' ? <XCircle className="h-4 w-4 text-rose-600" /> : <HelpCircle className="h-4 w-4 text-ink-400" />}
                  <span className="text-xs font-bold uppercase tracking-wide text-ink-400">Q{i + 1} · Section {test.sections[sectionOf]?.key ?? '—'}</span>
                  <Badge tone="slate">{q.type.toUpperCase()}</Badge>
                  <span className="ml-auto text-xs font-semibold text-ink-400">{a ? (a.attempted ? (a.correct ? `+${a.earned}` : a.earned < 0 ? `−${Math.abs(a.earned)}` : '0') : 'skipped') : '—'}</span>
                </div>
                <p className="mb-3 text-sm font-medium leading-relaxed text-ink-900">{q.stem}</p>

                {q.type !== 'nat' && q.options && (
                  <div className={clsx('mb-3 grid gap-1.5', q.type === 'msq' && 'sm:grid-cols-2')}>
                    {q.options.map((opt, oi) => {
                      const isAns = (q.answer as number[]).includes(oi);
                      const isSel = Array.isArray(a?.selected) && a.selected.includes(oi);
                      return (
                        <div
                          key={oi}
                          className={clsx(
                            'flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] ring-1',
                            isAns ? 'bg-emerald-50 text-emerald-800 ring-emerald-300' : isSel ? 'bg-rose-50 text-rose-700 ring-rose-300' : 'bg-white text-ink-600 ring-ink-100',
                          )}
                        >
                          <span className="font-bold">{LETTERS[oi]}</span> {opt}
                          {isAns && <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-emerald-600" />}
                          {isSel && !isAns && <XCircle className="ml-auto h-3.5 w-3.5 text-rose-500" />}
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.type === 'nat' && (
                  <div className="mb-3 flex flex-wrap gap-2 text-[13px]">
                    <span className={clsx('rounded-lg px-3 py-1.5 font-semibold ring-1', a && a.attempted ? (a.correct ? 'bg-emerald-50 text-emerald-700 ring-emerald-300' : 'bg-rose-50 text-rose-700 ring-rose-300') : 'bg-ink-50 text-ink-600 ring-ink-200')}>
                      Your answer: {typeof a?.selected === 'string' && a.selected !== '' ? a.selected : '—'}
                    </span>
                    <span className="rounded-lg bg-emerald-50 px-3 py-1.5 font-semibold text-emerald-700 ring-1 ring-emerald-300">Correct: {String(q.answer)}</span>
                  </div>
                )}

                <div className="rounded-xl bg-ink-50 p-3.5 text-[13px] leading-relaxed text-ink-700 ring-1 ring-ink-100">
                  <b className="text-ink-800">Explanation:</b> {q.explanation}
                  <div className="mt-1.5 text-xs text-ink-500">
                    Concept: <span className="font-semibold">{q.concept}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MockResultPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-ink-400">Loading…</div>}>
      <ResultView />
    </Suspense>
  );
}
