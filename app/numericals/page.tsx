'use client';

import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Badge, Card, EmptyState, SectionTitle } from '@/components/ui';
import { NUMERICALS, numericalById } from '@/lib/content/numericals';
import { SUBJECTS, subjectBySlug } from '@/lib/content/subjects';
import { topicById } from '@/lib/content/topics';
import type { Numerical } from '@/lib/types';
import { Calculator, CheckCircle2, XCircle, Eye, EyeOff, ArrowLeft, Lightbulb, Sigma, FlaskConical, Trophy, PenTool } from 'lucide-react';

function checkAnswer(given: string, expected: string): boolean {
  const g = given.trim();
  const e = expected.trim();
  const gn = parseFloat(g);
  const en = parseFloat(e);
  if (!Number.isNaN(gn) && !Number.isNaN(en)) {
    return Math.abs(gn - en) <= Math.max(Math.abs(en) * 0.01, 0.01);
  }
  return g.toLowerCase() === e.toLowerCase();
}

function Step({ n, title, icon, children }: { n: number; title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-600">{n}</div>
        <div className="flex items-center gap-2 text-base font-bold text-ink-900">
          {icon} {title}
        </div>
      </div>
      {children}
    </Card>
  );
}

function ExampleBlock({ title, stem, steps, answer, tone }: { title: string; stem: string; steps: string[]; answer: string; tone: 'sky' | 'brand' }) {
  const [open, setOpen] = useState(false);
  const t = tone === 'sky' ? { box: 'bg-sky-50/60 ring-sky-100', head: 'text-sky-700' } : { box: 'bg-brand-50/60 ring-brand-100', head: 'text-brand-700' };
  return (
    <div className={clsx('rounded-xl p-4 ring-1', t.box)}>
      <div className={clsx('mb-1.5 text-xs font-bold uppercase tracking-wide', t.head)}>{title}</div>
      <p className="text-sm font-medium leading-relaxed text-ink-800">{stem}</p>
      <button onClick={() => setOpen((o) => !o)} className={clsx('mt-2.5 flex items-center gap-1.5 text-xs font-bold', t.head)}>
        {open ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
        {open ? 'Hide solution' : 'Show solution step by step'}
      </button>
      {open && (
        <div className="mt-3 space-y-1.5 animate-fade-up">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-ink-700">
              <span className={clsx('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white', tone === 'sky' ? 'bg-sky-500' : 'bg-brand-500')}>{i + 1}</span>
              {s}
            </div>
          ))}
          <div className="mt-2 rounded-lg bg-white px-3.5 py-2 text-sm font-bold text-ink-900 ring-1 ring-ink-100">Answer: {answer}</div>
        </div>
      )}
    </div>
  );
}

function PracticeBlock({ n }: { n: Numerical }) {
  const [values, setValues] = useState<string[]>(n.practice.map(() => ''));
  const [checked, setChecked] = useState<boolean[]>(n.practice.map(() => false));
  const [results, setResults] = useState<(boolean | null)[]>(n.practice.map(() => null));

  const submitAll = () => {
    setChecked(n.practice.map(() => true));
    setResults(n.practice.map((p, i) => (values[i].trim() === '' ? null : checkAnswer(values[i], p.answer))));
  };

  return (
    <div className="space-y-3">
      {n.practice.map((p, i) => (
        <div key={i} className="rounded-xl bg-white p-4 ring-1 ring-ink-100">
          <p className="mb-2.5 text-sm font-medium text-ink-800">{i + 1}. {p.stem}</p>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              inputMode="decimal"
              value={values[i]}
              disabled={checked[i]}
              onChange={(e) => {
                const v = [...values];
                v[i] = e.target.value;
                setValues(v);
                const r = [...results];
                r[i] = null;
                setResults(r);
              }}
              onKeyDown={(e) => e.key === 'Enter' && submitAll()}
              placeholder="Your answer"
              className="input max-w-[220px]"
            />
            {checked[i] &&
              (results[i] === null ? (
                <span className="text-xs font-semibold text-ink-400">Not attempted · correct: {p.answer}</span>
              ) : results[i] ? (
                <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600"><CheckCircle2 className="h-4 w-4" /> Correct ({p.answer})</span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm font-bold text-rose-600"><XCircle className="h-4 w-4" /> Not quite — answer: {p.answer}</span>
              ))}
          </div>
        </div>
      ))}
      <button onClick={submitAll} disabled={checked.every(Boolean)} className="btn-primary">
        <CheckCircle2 className="h-4 w-4" /> Check Practice Answers
      </button>
    </div>
  );
}

function NumericalView({ id }: { id: string }) {
  const n = numericalById.get(id);
  const [back, setBack] = useState('');
  useEffect(() => setBack(id), [id]);

  if (!n) return <EmptyState title="Numerical not found" action={<Link href="/numericals" className="btn-primary">Back to list</Link>} />;

  const subject = subjectBySlug.get(n.subject);
  const topic = topicById.get(n.topic);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <button onClick={() => window.history.back()} className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" /> All numericals
        </button>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge tone="brand">{subject?.icon} {subject?.name}</Badge>
          {topic && <Badge tone="slate">{topic.name}</Badge>}
        </div>
        <h1 className="text-2xl font-bold text-ink-900">{n.name}</h1>
      </div>

      <Step n={1} title="Concept" icon={<Lightbulb className="h-4 w-4" />}>
        <p className="text-sm leading-relaxed text-ink-700">{n.concept}</p>
      </Step>

      <Step n={2} title="Formula" icon={<Sigma className="h-4 w-4" />}>
        <div className="rounded-xl bg-brand-50/70 px-4 py-3.5 font-mono text-base font-semibold text-brand-800 ring-1 ring-brand-100">{n.formulaExpr}</div>
      </Step>

      <Step n={3} title="Variables & units" icon={<Calculator className="h-4 w-4" />}>
        <div className="overflow-hidden rounded-xl ring-1 ring-ink-100">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left text-xs font-bold uppercase tracking-wide text-ink-500">
              <tr>
                <th className="px-3.5 py-2">Symbol</th>
                <th className="px-3.5 py-2">Meaning</th>
                <th className="px-3.5 py-2">Unit</th>
              </tr>
            </thead>
            <tbody>
              {n.variables.map((v) => (
                <tr key={v.v} className="border-t border-ink-100">
                  <td className="px-3.5 py-2 font-mono font-bold text-brand-700">{v.v}</td>
                  <td className="px-3.5 py-2 text-ink-700">{v.meaning}</td>
                  <td className="px-3.5 py-2 text-ink-500">{v.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Step>

      <Step n={4} title="Simple example" icon={<FlaskConical className="h-4 w-4" />}>
        <ExampleBlock title="Easy · build confidence" stem={n.simple.stem} steps={n.simple.steps} answer={n.simple.answer} tone="sky" />
      </Step>

      <Step n={5} title="GATE example" icon={<Trophy className="h-4 w-4" />}>
        <ExampleBlock title="GATE-style · exam difficulty" stem={n.gate.stem} steps={n.gate.steps} answer={n.gate.answer} tone="brand" />
      </Step>

      <Step n={6} title="Practice (submit your answers)" icon={<PenTool className="h-4 w-4" />}>
        <PracticeBlock key={n.id} n={n} />
      </Step>
    </div>
  );
}

function NumericalsPageInner() {
  const params = useSearchParams();
  const activeId = params.get('id') ?? '';

  const groups = useMemo(
    () =>
      SUBJECTS.map((s) => ({ subject: s, nums: NUMERICALS.filter((n) => n.subject === s.slug) })).filter((g) => g.nums.length > 0),
    [],
  );

  if (activeId) {
    return <NumericalView id={activeId} />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Numerical Practice</h1>
        <p className="mt-1 text-sm text-ink-500">
          {NUMERICALS.length} guided numericals, each in 6 steps: concept → formula → variables & units → simple example → GATE example → practice with submission.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((g) => (
          <Card key={g.subject.slug} className="p-5">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-lg ring-1 ring-ink-100">{g.subject.icon}</div>
              <div className="text-sm font-bold text-ink-900">{g.subject.name}</div>
            </div>
            <div className="space-y-2">
              {g.nums.map((n) => (
                <Link key={n.id} href={`/numericals?id=${n.id}`} className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-ink-700 ring-1 ring-ink-100 transition-colors hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200">
                  <Calculator className="h-4 w-4 shrink-0 text-brand-500" />
                  {n.name}
                </Link>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function NumericalsPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-ink-400">Loading…</div>}>
      <NumericalsPageInner />
    </Suspense>
  );
}
