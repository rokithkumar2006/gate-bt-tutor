'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SUBJECTS } from '@/lib/content/subjects';
import { TOPICS } from '@/lib/content/topics';
import { Card, ProgressBar } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

export default function SubjectsPage() {
  const [completed, setCompleted] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => me && setCompleted(me.completedTopics ?? {}))
      .catch(() => {});
  }, []);

  const stats = useMemo(
    () =>
      SUBJECTS.map((s) => {
        const topics = TOPICS.filter((t) => t.subject === s.slug);
        const done = topics.filter((t) => completed[t.id]).length;
        const high = topics.filter((t) => t.priority === 'high').length;
        return { ...s, total: topics.length, done, high, pct: topics.length ? Math.round((100 * done) / topics.length) : 0 };
      }),
    [completed],
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Subjects</h1>
        <p className="mt-1 text-sm text-ink-500">
          All {SUBJECTS.length} GATE BT subjects with 4-level roadmaps. Weight shows approximate GATE marks.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.slug} href={`/subjects/${s.slug}`}>
            <Card className="card-hover h-full p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-xl ring-1 ring-ink-100">{s.icon}</div>
                <span className="badge bg-brand-50 text-brand-700 ring-1 ring-brand-200">~{s.weight} marks</span>
              </div>
              <div className="mb-1 font-bold text-ink-900">{s.name}</div>
              <p className="mb-4 line-clamp-2 text-sm text-ink-500">{s.short}</p>
              <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-ink-500">
                <span>
                  {s.done}/{s.total} topics · {s.high} 🔥
                </span>
                <span>{s.pct}%</span>
              </div>
              <ProgressBar value={s.pct} />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
