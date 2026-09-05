'use client';

import React, { useMemo, useState } from 'react';
import QuestionCard from '@/components/QuestionCard';
import { Badge, Card, EmptyState, SectionTitle } from '@/components/ui';
import { filterPyqs, PYQS } from '@/lib/content/pyqs';
import { SUBJECTS, subjectBySlug } from '@/lib/content/subjects';
import { topicById, topicsForSubject } from '@/lib/content/topics';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function PyqsPage() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [year, setYear] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const topics = useMemo(() => (subject ? topicsForSubject(subject) : []), [subject]);

  const years = useMemo(() => {
    const set = new Set<number>();
    PYQS.forEach((p) => p.year && set.add(p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  const list = useMemo(
    () =>
      filterPyqs({
        subject: subject || undefined,
        topic: topic || undefined,
        year: year ? Number(year) : undefined,
        difficulty: (difficulty || undefined) as 'easy' | 'medium' | 'hard' | undefined,
        verifiedOnly,
      }),
    [subject, topic, year, difficulty, verifiedOnly],
  );

  const verifiedCount = list.filter((p) => p.verified).length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Previous Year Questions</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-500">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700"><ShieldCheck className="h-3.5 w-3.5" /> Verified PYQ</span> comes from actual GATE BT papers (year shown).{' '}
            <span className="inline-flex items-center gap-1 font-semibold text-indigo-600"><Sparkles className="h-3.5 w-3.5" /> PYQ-Style</span> is original practice in the same format — never presented as a real PYQ.
          </p>
        </div>
        <Badge tone="slate">
          {list.length} questions · {verifiedCount} verified · {list.length - verifiedCount} PYQ-style
        </Badge>
      </div>

      {/* Filters */}
      <Card className="mb-6 p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="label">Subject</label>
            <select value={subject} onChange={(e) => { setSubject(e.target.value); setTopic(''); }} className="input">
              <option value="">All subjects</option>
              {SUBJECTS.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Topic</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="input" disabled={!subject}>
              <option value="">All topics</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Year</label>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="input">
              <option value="">All years</option>
              {years.map((y) => (
                <option key={y} value={y}>GATE BT {y}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="input">
              <option value="">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 ring-1 ring-ink-200">
              <span className="text-sm font-semibold text-ink-700">Verified PYQs only</span>
              <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="h-4 w-4 accent-brand-600" />
            </label>
          </div>
        </div>
      </Card>

      {list.length === 0 ? (
        <EmptyState title="No PYQs match these filters" sub="Try widening the subject or year filter." />
      ) : (
        <div className="space-y-4">
          {list.map((p, i) => (
            <div key={p.id} className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 px-1">
                {p.verified ? (
                  <Badge tone="brand">
                    <ShieldCheck className="h-3 w-3" /> Verified PYQ — {p.source}
                  </Badge>
                ) : (
                  <Badge tone="indigo">
                    <Sparkles className="h-3 w-3" /> PYQ-Style (practice)
                  </Badge>
                )}
                <Badge tone="slate">{subjectBySlug.get(p.subject)?.name ?? p.subject}</Badge>
                {topicById.has(p.topic) && <Badge tone="slate">{topicById.get(p.topic)?.name}</Badge>}
                <span className="ml-auto text-xs font-semibold text-ink-400">Q{i + 1}</span>
              </div>
              <QuestionCard question={p} hideMeta />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
