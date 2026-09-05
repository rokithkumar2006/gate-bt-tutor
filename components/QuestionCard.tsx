'use client';

import React, { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { CheckCircle2, XCircle, HelpCircle, Lightbulb } from 'lucide-react';
import type { Question } from '@/lib/types';
import { subjectBySlug } from '@/lib/content/subjects';
import { topicById } from '@/lib/content/topics';
import { Badge, LevelBadge } from './ui';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export type AnswerSelection = number[] | string; // [] = unattempted

/** MCQ +1 / −0.25 wrong; MSQ full only for exact set; NAT correct within 1% (min 0.01). */
export function scoreAnswer(q: Question, selected: AnswerSelection): { attempted: boolean; correct: boolean; earned: number } {
  if (q.type === 'nat') {
    const given = typeof selected === 'string' ? selected.trim() : '';
    if (given === '') return { attempted: false, correct: false, earned: 0 };
    const val = parseFloat(given);
    const ans = parseFloat(String(q.answer));
    if (Number.isNaN(val) || Number.isNaN(ans)) return { attempted: true, correct: false, earned: 0 };
    const tol = Math.max(Math.abs(ans) * 0.01, 0.01);
    const correct = Math.abs(val - ans) <= tol;
    return { attempted: true, correct, earned: correct ? 1 : 0 };
  }
  const sel = Array.isArray(selected) ? [...selected].sort((a, b) => a - b) : [];
  if (sel.length === 0) return { attempted: false, correct: false, earned: 0 };
  const ans = [...(q.answer as number[])].sort((a, b) => a - b);
  const exact = sel.length === ans.length && sel.every((v, i) => v === ans[i]);
  if (q.type === 'mcq') {
    return { attempted: true, correct: exact, earned: exact ? 1 : -0.25 };
  }
  // msq: no negative marking
  return { attempted: true, correct: exact, earned: exact ? 1 : 0 };
}

interface Props {
  question: Question;
  index?: number;
  // Self-contained mode (practice / tutor / PYQ):
  onSubmitResult?: (r: { correct: boolean; earned: number; attempted: boolean; selected: AnswerSelection }) => void;
  // Controlled mode (mock test): parent owns selection + reveal
  controlled?: boolean;
  selected?: AnswerSelection;
  onSelect?: (s: AnswerSelection) => void;
  revealed?: boolean;
  hideMeta?: boolean;
}

export default function QuestionCard({
  question: q,
  index,
  onSubmitResult,
  controlled = false,
  selected: ctrlSelected,
  onSelect,
  revealed: ctrlRevealed,
  hideMeta,
}: Props) {
  const [localSel, setLocalSel] = useState<AnswerSelection>([]);
  const [revealed, setRevealed] = useState(false);
  const selected = controlled ? (ctrlSelected ?? []) : localSel;
  const isRevealed = controlled ? !!ctrlRevealed : revealed;

  const setSel = (s: AnswerSelection) => {
    if (controlled) onSelect?.(s);
    else setLocalSel(s);
  };

  const result = useMemo(() => scoreAnswer(q, selected), [q, selected]);
  const isNat = q.type === 'nat';
  const natValue = typeof selected === 'string' ? selected : '';
  const idxSel = Array.isArray(selected) ? selected : [];

  const hasAttemptableAnswer = isNat ? natValue.trim() !== '' : idxSel.length > 0;

  const submit = () => {
    if (isRevealed || !hasAttemptableAnswer) return;
    const r = scoreAnswer(q, selected);
    if (!controlled) setRevealed(true);
    onSubmitResult?.({ ...r, selected });
  };

  const optionState = (i: number) => {
    if (!isRevealed) return 'idle';
    const isCorrect = (q.answer as number[]).includes(i);
    const isPicked = idxSel.includes(i);
    if (isCorrect) return 'correct';
    if (isPicked) return 'wrong';
    return 'muted';
  };

  return (
    <div className="card p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {!hideMeta && (
          <>
            <Badge tone="slate">{subjectBySlug.get(q.subject)?.name ?? q.subject}</Badge>
            <LevelBadge level={q.level === 'basic' ? 1 : q.level === 'college' ? 2 : 4} />
            <Badge tone="indigo">{q.type.toUpperCase()}</Badge>
            <Badge tone={q.difficulty === 'easy' ? 'sky' : q.difficulty === 'medium' ? 'amber' : 'rose'}>{q.difficulty}</Badge>
          </>
        )}
        {typeof index === 'number' && <span className="ml-auto text-xs font-semibold text-ink-400">Q{index + 1}</span>}
      </div>

      <p className="mb-4 text-[15px] font-medium leading-relaxed text-ink-900">{q.stem}</p>

      {!isNat ? (
        <div className={clsx('grid gap-2', q.type === 'msq' && 'sm:grid-cols-2')}>
          {(q.options ?? []).map((opt, i) => {
            const st = optionState(i);
            const picked = idxSel.includes(i);
            const toggle = () => {
              if (isRevealed) return;
              if (q.type === 'mcq') setSel([i]);
              else {
                const next = picked ? idxSel.filter((x) => x !== i) : [...idxSel, i];
                setSel(next);
              }
            };
            return (
              <button
                key={i}
                onClick={toggle}
                disabled={isRevealed}
                className={clsx(
                  'flex items-start gap-3 rounded-xl px-3.5 py-3 text-left text-sm ring-1 transition-all',
                  st === 'idle' && (picked ? 'bg-brand-50 ring-brand-400' : 'bg-white ring-ink-200 hover:ring-brand-300'),
                  st === 'correct' && 'bg-emerald-50 ring-2 ring-emerald-500',
                  st === 'wrong' && 'bg-rose-50 ring-2 ring-rose-400',
                  st === 'muted' && 'bg-white ring-ink-100 opacity-60',
                )}
              >
                <span
                  className={clsx(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    st === 'correct' ? 'bg-emerald-500 text-white' : st === 'wrong' ? 'bg-rose-500 text-white' : picked ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-500',
                  )}
                >
                  {LETTERS[i]}
                </span>
                <span className="pt-0.5 text-ink-800">{opt}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            inputMode="decimal"
            value={natValue}
            disabled={isRevealed}
            onChange={(e) => setSel(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="Your numerical answer…"
            className="input max-w-xs"
          />
          {isRevealed && (
            <div className={clsx('flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold ring-1', result.correct ? 'bg-emerald-50 text-emerald-700 ring-emerald-300' : 'bg-rose-50 text-rose-700 ring-rose-300')}>
              <CheckCircle2 className="h-4 w-4" />
              Correct: {String(q.answer)}
            </div>
          )}
        </div>
      )}

      {/* Feedback */}
      {isRevealed && (
        <div className="mt-4 space-y-3 animate-fade-up">
          <div
            className={clsx(
              'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ring-1',
              !result.attempted
                ? 'bg-ink-50 text-ink-600 ring-ink-200'
                : result.correct
                  ? 'bg-emerald-50 text-emerald-700 ring-emerald-300'
                  : 'bg-rose-50 text-rose-700 ring-rose-300',
            )}
          >
            {!result.attempted ? <HelpCircle className="h-4 w-4" /> : result.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {!result.attempted ? (
              <span>
                Correct answer: {isNat ? String(q.answer) : (q.answer as number[]).map((i) => LETTERS[i]).join(', ')}
              </span>
            ) : result.correct ? (
              <span>Correct! +{result.earned} mark</span>
            ) : (
              <span>
                Incorrect{result.earned < 0 ? ` (−${Math.abs(result.earned)} negative)` : ''}. Correct:{' '}
                {isNat ? String(q.answer) : (q.answer as number[]).map((i) => LETTERS[i]).join(', ')}
              </span>
            )}
          </div>
          <div className="rounded-xl bg-ink-50 p-4 text-sm leading-relaxed text-ink-700 ring-1 ring-ink-100">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-500">
              <Lightbulb className="h-3.5 w-3.5" /> Explanation
            </div>
            {q.explanation}
            <div className="mt-2 border-t border-ink-200 pt-2 text-xs text-ink-500">
              Concept: <span className="font-semibold text-ink-600">{q.concept}</span>
              {topicById.has(q.topic) ? ` · ${topicById.get(q.topic)?.name}` : ''}
            </div>
          </div>
        </div>
      )}

      {!controlled && !isRevealed && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xs text-ink-400">Answer is hidden until you submit</p>
          <button onClick={submit} disabled={!hasAttemptableAnswer} className="btn-primary">
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
}
