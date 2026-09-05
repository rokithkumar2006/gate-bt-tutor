'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import QuestionCard, { scoreAnswer } from '@/components/QuestionCard';
import { Badge, Card, EmptyState, Modal } from '@/components/ui';
import { MOCK_TESTS, getMockTest } from '@/lib/content/mockTests';
import { questionById } from '@/lib/content/questions';
import { pyqById } from '@/lib/content/pyqs';
import type { Attempt, Question } from '@/lib/types';
import { Timer, Flag, CheckCircle2, XCircle, Circle, Send, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

type Sel = number[] | string;

export default function MockRunnerPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const test = getMockTest(params?.id ?? '');

  const questions: Question[] = useMemo(() => {
    if (!test) return [];
    return test.questionIds
      .map((qid) => questionById.get(qid) ?? (pyqById.get(qid) as unknown as Question | undefined))
      .filter((q): q is Question => !!q);
  }, [test]);

  const [answers, setAnswers] = useState<Record<string, Sel>>({});
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [current, setCurrent] = useState(0);
  const [section, setSection] = useState('A');
  const [timeLeft, setTimeLeft] = useState(() => (test ? test.durationMin * 60 : 0));
  const [paused, setPaused] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const submitRef = useRef<(auto?: boolean) => void>(() => {});

  // Section ranges over the flat question list
  const sectionRanges = useMemo(() => {
    if (!test) return [];
    const ranges: { key: string; title: string; start: number; end: number }[] = [];
    let start = 0;
    for (const s of test.sections) {
      const count = Math.min(s.count, questions.length - start);
      ranges.push({ key: s.key, title: s.title, start, end: start + count });
      start += count;
    }
    return ranges;
  }, [test, questions.length]);

  const submit = useCallback(
    async (auto = false) => {
      if (!test || submitting) return;
      setSubmitting(true);
      const records = questions.map((q) => {
        const sel: Sel = answers[q.id] ?? [];
        const r = scoreAnswer(q, sel);
        return { questionId: q.id, selected: sel, correct: r.correct, attempted: r.attempted, earned: r.earned };
      });
      const correct = records.filter((r) => r.correct).length;
      const incorrect = records.filter((r) => r.attempted && !r.correct).length;
      const unattempted = records.filter((r) => !r.attempted).length;
      const score = Math.round(records.reduce((n, r) => n + r.earned, 0) * 100) / 100;
      const maxScore = questions.length;
      const attemptId = crypto.randomUUID();
      const body: Omit<Attempt, 'userId'> = {
        id: attemptId,
        testId: test.id,
        testType: 'mock',
        testName: test.name,
        startedAt: new Date(Date.now() - timeLeft * 1000).toISOString(),
        finishedAt: new Date().toISOString(),
        durationSec: test.durationMin * 60 - timeLeft,
        score,
        maxScore,
        correct,
        incorrect,
        unattempted,
        accuracy: correct + incorrect > 0 ? Math.round((100 * correct) / (correct + incorrect)) : 0,
        answers: records,
      };
      try {
        await fetch('/api/attempts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      } catch {
        // fall through to result page anyway
      }
      router.replace(`/mock/${test.id}/result?a=${attemptId}&auto=${auto ? 1 : 0}`);
    },
    [test, questions, answers, timeLeft, submitting, router],
  );

  submitRef.current = submit;

  // Timer
  useEffect(() => {
    if (!test || paused || confirmOpen || submitting) return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          submitRef.current(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [test, paused, confirmOpen, submitting]);

  if (!test) {
    return <EmptyState title="Mock test not found" action={<Link href="/mock" className="btn-primary">Back to Mock Tests</Link>} />;
  }

  const q = questions[current];
  const answeredCount = questions.filter((q) => {
    const sel = answers[q.id] ?? [];
    return Array.isArray(sel) ? sel.length > 0 : sel !== '';
  }).length;
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');
  const lowTime = timeLeft < 600;

  const setAnswer = (qid: string, sel: Sel) => setAnswers((a) => ({ ...a, [qid]: sel }));
  const toggleMark = (qid: string) =>
    setMarked((m) => {
      const next = new Set(m);
      if (next.has(qid)) next.delete(qid);
      else next.add(qid);
      return next;
    });

  const gotoSection = (key: string) => {
    const r = sectionRanges.find((x) => x.key === key);
    if (r) {
      setSection(key);
      setCurrent(r.start);
    }
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_270px]">
      <div className="min-w-0 space-y-4">
        {/* Header */}
        <Card className="flex flex-wrap items-center justify-between gap-3 p-4">
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-ink-900">{test.name}</h1>
            <p className="text-xs text-ink-500">
              {questions.length} questions · {answeredCount} answered · {marked.size} marked for review
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setPaused((p) => !p)} className="btn-ghost text-xs" title={paused ? 'Resume' : 'Pause timer'}>
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <div className={clsx('flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-lg font-bold ring-1', lowTime ? 'bg-rose-50 text-rose-600 ring-rose-200' : 'bg-brand-50 text-brand-700 ring-brand-200')}>
              <Timer className="h-4 w-4" />
              {mm}:{ss}
            </div>
            <button onClick={() => setConfirmOpen(true)} className="btn-primary">
              <Send className="h-4 w-4" /> Submit
            </button>
          </div>
        </Card>

        {/* Section tabs */}
        <div className="flex gap-1.5 overflow-x-auto thin-scroll">
          {sectionRanges.map((r) => (
            <button
              key={r.key}
              onClick={() => gotoSection(r.key)}
              className={clsx(
                'shrink-0 rounded-xl px-4 py-2 text-sm font-semibold ring-1 transition-colors',
                section === r.key ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-ink-600 ring-ink-200 hover:ring-brand-300',
              )}
            >
              {r.key}
              <span className="ml-1.5 text-xs font-medium opacity-70">
                {questions.slice(r.start, r.end).filter((qq) => {
                  const sel = answers[qq.id] ?? [];
                  return Array.isArray(sel) ? sel.length > 0 : sel !== '';
                }).length}/{r.end - r.start}
              </span>
            </button>
          ))}
        </div>

        {/* Question */}
        {q && <QuestionCard key={q.id} question={q} index={current} hideMeta controlled selected={answers[q.id] ?? []} onSelect={(s) => setAnswer(q.id, s)} />}

        {/* Nav */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} className="btn-secondary">
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>
          <div className="flex gap-2">
            <button onClick={() => toggleMark(q?.id ?? '')} className={clsx(marked.has(q?.id ?? '') ? 'btn bg-amber-500 text-white hover:bg-amber-600' : 'btn-secondary')}>
              <Flag className="h-4 w-4" /> {marked.has(q?.id ?? '') ? 'Unmark' : 'Mark for Review'}
            </button>
            <button onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))} disabled={current === questions.length - 1} className="btn-primary">
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Palette */}
      <aside>
        <Card className="sticky top-20 p-4">
          <div className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-500">Question Palette</div>
          {sectionRanges.map((r) => (
            <div key={r.key} className="mb-3">
              <div className="mb-1.5 text-xs font-bold text-ink-600">{r.title.replace('Section ', 'Section ')}</div>
              <div className="grid grid-cols-6 gap-1.5">
                {questions.slice(r.start, r.end).map((qq, i) => {
                  const sel = answers[qq.id] ?? [];
                  const answered = Array.isArray(sel) ? sel.length > 0 : sel !== '';
                  const isCurrent = r.start + i === current;
                  const isMarked = marked.has(qq.id);
                  return (
                    <button
                      key={qq.id}
                      onClick={() => {
                        setSection(r.key);
                        setCurrent(r.start + i);
                      }}
                      className={clsx(
                        'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ring-1 transition-all',
                        isCurrent && 'ring-2 ring-brand-500',
                        answered ? 'bg-emerald-100 text-emerald-700 ring-emerald-300' : 'bg-white text-ink-500 ring-ink-200',
                        isMarked && 'bg-amber-100 text-amber-700 ring-amber-400',
                      )}
                      title={`Q${r.start + i + 1}${isMarked ? ' (marked)' : ''}${answered ? ' (answered)' : ''}`}
                    >
                      {r.start + i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="mt-4 space-y-1.5 border-t border-ink-100 pt-3 text-[11px] font-medium text-ink-500">
            <div className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-emerald-100 ring-1 ring-emerald-300" /> Answered</div>
            <div className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-amber-100 ring-1 ring-amber-400" /> Marked for review</div>
            <div className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-white ring-1 ring-ink-200" /> Not answered</div>
          </div>
        </Card>
      </aside>

      {/* Confirm submit */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Submit mock test?">
        <div className="space-y-3 text-sm text-ink-600">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-emerald-50 p-3 ring-1 ring-emerald-200">
              <div className="text-lg font-bold text-emerald-700">{answeredCount}</div>
              <div className="text-xs font-semibold">Answered</div>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 ring-1 ring-amber-200">
              <div className="text-lg font-bold text-amber-700">{marked.size}</div>
              <div className="text-xs font-semibold">Marked</div>
            </div>
            <div className="rounded-xl bg-ink-50 p-3 ring-1 ring-ink-200">
              <div className="text-lg font-bold text-ink-600">{questions.length - answeredCount}</div>
              <div className="text-xs font-semibold">Unattempted</div>
            </div>
          </div>
          <p>
            MCQ: +1 / −0.25 wrong · MSQ: +1 for the exact set · NAT: ±1% tolerance. Once submitted you will see your score, accuracy and a full explanation review.
          </p>
        </div>
        <div className="mt-5 flex gap-2">
          <button onClick={() => setConfirmOpen(false)} className="btn-secondary flex-1">
            Keep Going
          </button>
          <button
            onClick={() => {
              setConfirmOpen(false);
              submit(false);
            }}
            disabled={submitting}
            className="btn-primary flex-1"
          >
            <Send className="h-4 w-4" /> {submitting ? 'Submitting…' : 'Submit Test'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
