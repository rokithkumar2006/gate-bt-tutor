'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { clsx } from 'clsx';
import { subjectBySlug, SUBJECTS } from '@/lib/content/subjects';
import { subjectRoadmap, LEVEL_NAMES } from '@/lib/content/topics';
import type { Topic } from '@/lib/types';
import { Badge, Card, EmptyState, LevelBadge, PriorityBadge, ProgressBar, SectionTitle } from '@/components/ui';
import { CheckCircle2, Circle, ArrowRight, Bot } from 'lucide-react';

const LEVEL_DESC: Record<number, string> = {
  1: 'Basic Foundation — what, why, how and where. No assumptions.',
  2: 'Intermediate (College) — definitions, classification, mechanisms.',
  3: 'Advanced — the depth that separates college marks from GATE marks.',
  4: 'GATE Focus — high-yield points, traps, confused concepts and formulas.',
};

export default function SubjectPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';
  const subject = subjectBySlug.get(slug);
  const [completed, setCompleted] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => me && setCompleted(me.completedTopics ?? {}))
      .catch(() => {});
  }, []);

  if (!subject) {
    return (
      <EmptyState
        title="Subject not found"
        action={<Link href="/subjects" className="btn-primary">Back to Subjects</Link>}
      />
    );
  }

  const rm = subjectRoadmap(slug);
  const doneCount = rm ? rm.topics.filter((t) => completed[t.id]).length : 0;

  const TopicRow = ({ t, idx }: { t: Topic; idx: number }) => {
    const done = !!completed[t.id];
    return (
      <Link href={`/learn/${slug}/${t.id}`}>
        <div className={clsx('flex items-center gap-3 rounded-xl px-4 py-3 ring-1 transition-all', done ? 'bg-brand-50/60 ring-brand-200' : 'bg-white ring-ink-100 hover:ring-brand-300 hover:shadow-card')}>
          {done ? <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" /> : <Circle className="h-5 w-5 shrink-0 text-ink-200" />}
          <div className="min-w-0 flex-1">
            <div className={clsx('truncate text-sm font-semibold', done ? 'text-ink-500 line-through' : 'text-ink-800')}>
              {t.priority === 'high' ? '🔥 ' : t.priority === 'medium' ? '⭐ ' : '📖 '}
              {t.name}
            </div>
            <div className="truncate text-xs text-ink-400">{t.short}</div>
          </div>
          <div className="hidden shrink-0 sm:block">
            <PriorityBadge priority={t.priority} />
          </div>
          <span className="w-5 text-right text-xs font-bold text-ink-300">{idx + 1}</span>
        </div>
      </Link>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl ring-1 ring-ink-100">{subject.icon}</div>
          <div>
            <h1 className="text-2xl font-bold text-ink-900">{subject.name}</h1>
            <p className="mt-1 max-w-2xl text-sm text-ink-500">{subject.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge tone="brand">~{subject.weight} marks in GATE</Badge>
              {rm && <Badge tone="slate">{rm.topics.length} topics</Badge>}
              {rm && <Badge tone="rose">🔥 {rm.high} high-yield</Badge>}
              {rm && <Badge tone="amber">⭐ {rm.medium} medium</Badge>}
              {rm && <Badge tone="slate">📖 {rm.low} foundation</Badge>}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/tutor?subject=${slug}`} className="btn-secondary">
            <Bot className="h-4 w-4" /> Ask Tutor
          </Link>
          {rm && rm.topics.length > 0 && (
            <Link href={`/learn/${slug}/${rm.topics[0].id}`} className="btn-primary">
              Start L1 <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Progress */}
      {rm && (
        <Card className="mb-6 p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-ink-700">
              {doneCount} of {rm.topics.length} topics completed
            </span>
            <span className="font-bold text-brand-600">{rm.topics.length ? Math.round((100 * doneCount) / rm.topics.length) : 0}%</span>
          </div>
          <ProgressBar value={rm.topics.length ? (100 * doneCount) / rm.topics.length : 0} />
        </Card>
      )}

      {/* Roadmap */}
      {rm && (
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2, 3, 4].map((level) => {
            const topics = rm.byLevel[level] ?? [];
            return (
              <Card key={level} className="p-5">
                <SectionTitle
                  title={`Level ${level} — ${LEVEL_NAMES[level]}`}
                  sub={LEVEL_DESC[level]}
                />
                {topics.length === 0 ? (
                  <p className="text-sm text-ink-400">No topics at this level yet.</p>
                ) : (
                  <div className="space-y-2">
                    {topics.map((t, i) => (
                      <TopicRow key={t.id} t={t} idx={i} />
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
