'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge, Card, SectionTitle } from '@/components/ui';
import { MOCK_TESTS } from '@/lib/content/mockTests';
import { Timer, Play, CheckCircle2 } from 'lucide-react';
import type { Attempt } from '@/lib/types';

export default function MockListPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    fetch('/api/attempts?limit=100')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setAttempts(d.attempts ?? []))
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-ink-900">Mock Tests</h1>
        <p className="mt-1 text-sm text-ink-500">
          GATE-style simulation: Sections A (Basic) · B (College) · C (GATE Focus) · D (Numerical), full timer, palette and mark-for-review.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MOCK_TESTS.map((t) => {
          const totalQ = t.questionIds.length;
          const past = attempts.filter((a) => a.testId === t.id);
          const best = past.length ? Math.max(...past.map((a) => Math.round((a.score / Math.max(a.maxScore, 1)) * 100))) : null;
          const sections = t.sections.map((s) => `${s.key}: ${s.count}`).join(' · ');
          return (
            <Link key={t.id} href={`/mock/${t.id}`}>
              <Card className="card-hover h-full p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Timer className="h-5 w-5" />
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    <Badge tone="slate">{t.durationMin} min</Badge>
                    <Badge tone="brand">{totalQ} Qs</Badge>
                    {best !== null && (
                      <Badge tone={best >= 75 ? 'brand' : best >= 50 ? 'amber' : 'rose'}>
                        <CheckCircle2 className="h-3 w-3" /> best {best}%
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="mb-1 font-bold text-ink-900">{t.name}</div>
                <p className="mb-4 line-clamp-2 text-sm text-ink-500">{t.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-ink-400">{sections}</span>
                  <span className="flex items-center gap-1.5 text-sm font-bold text-brand-600">
                    <Play className="h-4 w-4" /> Start
                  </span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {attempts.length > 0 && (
        <div className="mt-8">
          <SectionTitle title="Your attempt history" />
          <div className="card divide-y divide-ink-100">
            {attempts.slice(0, 8).map((a) => {
              const pct = Math.round((a.score / Math.max(a.maxScore, 1)) * 100);
              return (
                <div key={a.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-ink-800">{a.testName}</div>
                    <div className="text-xs text-ink-400">{new Date(a.finishedAt).toLocaleString()} · {a.correct}✓ {a.incorrect}✗ {a.unattempted}○</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold ${pct >= 75 ? 'text-brand-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>{pct}%</span>
                    {a.testId !== 'practice' && (
                      <Link href={`/mock/${a.testId}/result?a=${a.id}`} className="btn-ghost text-xs">
                        Review
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
