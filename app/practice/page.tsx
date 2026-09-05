'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';
import QuestionCard, { scoreAnswer } from '@/components/QuestionCard';
import { Badge, Card, EmptyState, SectionTitle, Spinner } from '@/components/ui';
import { QUESTIONS, pickQuestions } from '@/lib/content/questions';
import { SUBJECTS, subjectBySlug } from '@/lib/content/subjects';
import type { QLevel, QType, Question } from '@/lib/types';
import { Play, CheckCircle2, XCircle, Circle, RotateCcw, ArrowRight, Save } from 'lucide-react';

interface SessionResult {
  q: Question;
  selected: number[] | string;
  correct: boolean;
  earned: number;
  attempted: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function PracticePageInner() {
  const params = useSearchParams();
  const [subject, setSubject] = useState(params.get('subject') ?? '');
  const [level, setLevel] = useState<QLevel | ''>('');
  const [type, setType] = useState<QType | ''>('');
  const [count, setCount] = useState(5);
  const [session, setSession] = useState<Question[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState<SessionResult[]>([]);
  const [saved, setSaved] = useState(false);
  const [starting, setStarting] = useState(false);

  const start = () => {
    setStarting(true);
    // small delay so the button state is visible
    setTimeout(() => {
      const qs = pickQuestions({
        subjects: subject ? [subject] : SUBJECTS.map((s) => s.slug),
        level: (level || 'basic') as QLevel,
        types: type ? [type as QType] : ['mcq', 'msq', 'nat'],
        count,
        seed: Math.floor(Math.random() * 1e9),
      });
      setSession(qs);
      setIdx(0);
      setResults([]);
      setSaved(false);
      setStarting(false);
    }, 60);
  };

  const current = session?.[idx] ?? null;
  const done = session ? results.length >= session.length : false;

  const onSubmit = (r: { correct: boolean; earned: number; attempted: boolean; selected: number[] | string }) => {
    if (!current) return;
    setResults((rs) => [...rs, { q: current, ...r }]);
  };

  const summary = useMemo(() => {
    const correct = results.filter((r) => r.correct).length;
    const incorrect = results.filter((r) => r.attempted && !r.correct).length;
    const unattempted = results.filter((r) => !r.attempted).length;
    const score = results.reduce((n, r) => n + r.earned, 0);
    const maxScore = results.length;
    const attemptedCount = correct + incorrect;
    return {
      correct,
      incorrect,
      unattempted,
      score: Math.round(score * 100) / 100,
      maxScore,
      accuracy: attemptedCount > 0 ? Math.round((100 * correct) / attemptedCount) : 0,
      pct: maxScore > 0 ? Math.round((100 * Math.max(score, 0)) / maxScore) : 0,
    };
  }, [results]);

  const saveAttempt = async () => {
    if (!session) return;
    const body = {
      testId: 'practice',
      testType: 'practice',
      testName: [
        subject ? subjectBySlug.get(subject)?.name : 'All subjects',
        level ? level : '',
        type ? type.toUpperCase() : '',
      ]
        .filter(Boolean)
        .join(' · '),
      startedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      finishedAt: new Date().toISOString(),
      durationSec: 5 * 60,
      score: summary.score,
      maxScore: summary.maxScore,
      correct: summary.correct,
      incorrect: summary.incorrect,
      unattempted: summary.unattempted,
      accuracy: summary.accuracy,
      answers: results.map((r) => ({ questionId: r.q.id, selected: r.selected, correct: r.correct, attempted: r.attempted, earned: r.earned })),
      subject: subject || undefined,
    };
    await fetch('/api/attempts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {});
    setSaved(true);
  };

  // ---------- session complete ----------
  if (session && done) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="p-6">
          <div className="mb-5 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl">{summary.pct >= 75 ? '🏆' : summary.pct >= 50 ? '💪' : '📚'}</div>
            <h1 className="text-xl font-bold text-ink-900">Practice set complete</h1>
            <p className="mt-1 text-sm text-ink-500">
              {[subject ? subjectBySlug.get(subject)?.name : 'All subjects', level, type ? type.toUpperCase() : ''].filter(Boolean).join(' · ')}
            </p>
          </div>
          <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { l: 'Score', v: `${summary.score}/${summary.maxScore}`, c: 'text-brand-600' },
              { l: 'Accuracy', v: `${summary.accuracy}%`, c: summary.accuracy >= 75 ? 'text-brand-600' : summary.accuracy >= 50 ? 'text-amber-600' : 'text-rose-600' },
              { l: 'Correct', v: summary.correct, c: 'text-emerald-600' },
              { l: 'Incorrect', v: summary.incorrect, c: 'text-rose-600' },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-slate-50 p-3 text-center ring-1 ring-ink-100">
                <div className={clsx('text-xl font-bold', s.c)}>{s.v}</div>
                <div className="text-xs font-medium text-ink-500">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Review list */}
          <div className="mb-5 space-y-3">
            {results.map((r, i) => (
              <div key={r.q.id} className={clsx('rounded-xl p-4 ring-1', r.correct ? 'bg-emerald-50/50 ring-emerald-100' : 'bg-rose-50/50 ring-rose-100')}>
                <div className="mb-1.5 flex items-center gap-2 text-sm">
                  {r.correct ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <XCircle className="h-4 w-4 text-rose-600" />}
                  <span className="font-semibold text-ink-800">Q{i + 1}. {r.q.stem.slice(0, 90)}{r.q.stem.length > 90 ? '…' : ''}</span>
                </div>
                <div className="text-xs text-ink-500">
                  Your answer: <b>{typeof r.selected === 'string' ? r.selected || '—' : r.selected.length ? r.selected.map((x) => 'ABCDEF'[x]).join(', ') : '—'}</b>
                  {' · '}Correct: <b>{typeof r.q.answer === 'string' ? r.q.answer : (r.q.answer as number[]).map((x) => 'ABCDEF'[x]).join(', ')}</b>
                  {r.earned < 0 && <span className="ml-1 text-rose-600">(−0.25 negative)</span>}
                </div>
                <div className="mt-2 rounded-lg bg-white/70 p-3 text-xs leading-relaxed text-ink-600">{r.q.explanation}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {!saved ? (
              <button onClick={saveAttempt} className="btn-primary">
                <Save className="h-4 w-4" /> Save to my analytics
              </button>
            ) : (
              <Badge tone="brand">Saved — updated your Performance & Weak Areas</Badge>
            )}
            <button onClick={() => setSession(null)} className="btn-secondary">
              <RotateCcw className="h-4 w-4" /> New practice set
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // ---------- active session ----------
  if (session && current) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        {/* progress strip */}
        <Card className="flex flex-wrap items-center gap-2 p-4">
          <span className="mr-1 text-xs font-bold uppercase tracking-wide text-ink-400">
            Q{idx + 1}/{session.length}
          </span>
          {session.map((q, i) => {
            const r = results[i];
            return (
              <span
                key={q.id}
                className={clsx(
                  'flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ring-1',
                  r ? (r.correct ? 'bg-emerald-100 text-emerald-700 ring-emerald-300' : 'bg-rose-100 text-rose-700 ring-rose-300') : i === idx ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-ink-400 ring-ink-200',
                )}
              >
                {i + 1}
              </span>
            );
          })}
          <button onClick={() => setSession(null)} className="btn-ghost ml-auto text-xs">
            <RotateCcw className="h-3.5 w-3.5" /> Quit
          </button>
        </Card>

        <QuestionCard key={current.id} question={current} index={idx} onSubmitResult={onSubmit} />

        {results.length === idx + 1 && (
          <div className="flex justify-end">
            <button onClick={() => setIdx((i) => i + 1)} className="btn-primary">
              {idx + 1 < session.length ? <>Next Question <ArrowRight className="h-4 w-4" /></> : <>See Results <CheckCircle2 className="h-4 w-4" /></>}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ---------- setup ----------
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Question Practice</h1>
        <p className="mt-1 text-sm text-ink-500">
          MCQ · MSQ · NAT with GATE negative marking. Your answer is never shown until you submit — then you get the full explanation.
        </p>
      </div>
      <Card className="p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="input">
              <option value="">All subjects</option>
              {SUBJECTS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value as QLevel | '')} className="input">
              <option value="">Mix of all levels</option>
              <option value="basic">Basic (L1)</option>
              <option value="college">College (L2–L3)</option>
              <option value="gate">GATE Focus (L4)</option>
            </select>
          </div>
          <div>
            <label className="label">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as QType | '')} className="input">
              <option value="">All types</option>
              <option value="mcq">MCQ (single correct)</option>
              <option value="msq">MSQ (multiple correct)</option>
              <option value="nat">NAT (numerical)</option>
            </select>
          </div>
          <div>
            <label className="label">Questions</label>
            <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="input">
              {[5, 10, 20].map((c) => (
                <option key={c} value={c}>
                  {c} questions
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-400">
            MCQ: +1 / −0.25 · MSQ: +1 (exact set only) · NAT: +1 (±1% tolerance)
          </p>
          <button onClick={start} disabled={starting} className="btn-primary px-6">
            {starting ? <Spinner label="" /> : <><Play className="h-4 w-4" /> Start Practice</>}
          </button>
        </div>
      </Card>

      <div className="mt-6">
        <SectionTitle title="Bank size" sub="Every question includes explanation + concept tag" />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(['mcq', 'msq', 'nat'] as QType[]).map((t) => (
            <div key={t} className="card p-4 text-center">
              <div className="text-xl font-bold text-ink-900">{QUESTIONS.filter((q) => q.type === t).length}</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-400">{t} questions</div>
            </div>
          ))}
          <div className="card p-4 text-center">
            <div className="text-xl font-bold text-brand-600">{QUESTIONS.length}</div>
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-400">total practice</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PracticePage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-ink-400">Loading…</div>}>
      <PracticePageInner />
    </Suspense>
  );
}
