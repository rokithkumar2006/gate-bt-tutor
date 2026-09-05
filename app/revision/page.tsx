'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { Badge, Card, EmptyState, SectionTitle, Tabs } from '@/components/ui';
import { SUBJECTS, subjectBySlug } from '@/lib/content/subjects';
import { topicsForSubject, topicById } from '@/lib/content/topics';
import { REV_EXTRA } from '@/lib/content/revision-extra';
import { AlertTriangle, BookOpenCheck, Sigma, Target, Timer } from 'lucide-react';

export default function RevisionPage() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [priority, setPriority] = useState('');
  const [tab, setTab] = useState('1min');
  const [logged, setLogged] = useState<Set<string>>(new Set());

  const topics = useMemo(() => {
    let list = subject ? topicsForSubject(subject) : [];
    if (!subject) {
      // when no subject is chosen, pick a subject's topics only if a topic filter exists
      list = [];
    }
    if (priority) list = list.filter((t) => t.priority === priority);
    return list;
  }, [subject, priority]);

  const allTopicsForFilter = useMemo(() => (subject ? topicsForSubject(subject) : []), [subject]);
  const t = topic ? topicById.get(topic) : topics[0];

  const extraCards = subject ? (REV_EXTRA[subject] ?? []) : [];

  const logRevision = async (topicId: string) => {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'log-revision', topic: topicId, kind: 'revision-center' }),
    }).catch(() => {});
    setLogged((s) => new Set(s).add(topicId));
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Revision Center</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-500">
            1-minute cards, formula sheets, traps and GATE focus — for the night before the exam. Every card you revise is logged to your history.
          </p>
        </div>
        {t && (
          <button onClick={() => logRevision(t.id)} className={clsx(logged.has(t.id) ? 'btn-secondary' : 'btn-primary')}>
            <BookOpenCheck className="h-4 w-4" /> {logged.has(t.id) ? 'Revised ✓' : 'Log this revision'}
          </button>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-5 p-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="label">Subject</label>
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setTopic('');
              }}
              className="input"
            >
              <option value="">Pick a subject to revise</option>
              {SUBJECTS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.icon} {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Topic</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="input" disabled={!subject}>
              <option value="">All topics (in level order)</option>
              {allTopicsForFilter.map((tt) => (
                <option key={tt.id} value={tt.id}>
                  {tt.priority === 'high' ? '🔥 ' : tt.priority === 'medium' ? '⭐ ' : '📖 '}
                  {tt.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="input">
              <option value="">All priorities</option>
              <option value="high">🔥 High yield</option>
              <option value="medium">⭐ Medium</option>
              <option value="low">📖 Foundation</option>
            </select>
          </div>
        </div>
      </Card>

      {!subject ? (
        <EmptyState
          title="Choose a subject"
          sub="Pick a subject above to open its 1-minute revision cards, formula sheet and GATE traps."
          icon={<BookOpenCheck className="h-8 w-8" />}
        />
      ) : (
        <div className="space-y-5">
          <Tabs
            tabs={[
              { id: '1min', label: '⏱ 1-Minute Revision' },
              { id: 'formulas', label: 'Σ Formula Sheet' },
              { id: 'traps', label: '⚠️ Traps & Confused' },
              { id: 'gate', label: '🔥 GATE Focus' },
              { id: 'curated', label: '📚 Quick Notes' },
            ]}
            active={tab}
            onChange={setTab}
          />

          {/* 1-minute cards */}
          {tab === '1min' && (
            <div className="grid gap-4 md:grid-cols-2">
              {(topic ? [t].filter(Boolean) : topics.slice(0, 12)).map((tt) => {
                if (!tt) return null;
                return (
                  <Card key={tt.id} className="p-5">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-ink-400">
                          L{tt.level} · {tt.priority === 'high' ? '🔥 High yield' : tt.priority === 'medium' ? '⭐ Medium' : '📖 Foundation'}
                        </div>
                        <div className="font-bold text-ink-900">{tt.name}</div>
                      </div>
                      <button
                        onClick={() => logRevision(tt.id)}
                        className={clsx('shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-bold ring-1 transition-colors', logged.has(tt.id) ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-brand-50 text-brand-700 ring-brand-200 hover:bg-brand-100')}
                      >
                        {logged.has(tt.id) ? '✓ Revised' : 'Log revision'}
                      </button>
                    </div>
                    <div className="mb-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-sm font-semibold text-amber-900 ring-1 ring-amber-100">
                      📌 {tt.revision.remember}
                    </div>
                    <div className="mb-2">
                      {tt.revision.mistakes.slice(0, 3).map((m, i) => (
                        <div key={i} className="flex items-start gap-2 py-1 text-[13px] text-ink-600">
                          <span className="text-rose-500">❌</span> {m}
                        </div>
                      ))}
                    </div>
                    <p className="border-t border-ink-100 pt-2 text-[13px] leading-relaxed text-ink-500">{tt.revision.summary}</p>
                    <button onClick={() => router.push(`/learn/${tt.subject}/${tt.id}`)} className="mt-3 text-xs font-bold text-brand-600 hover:underline">
                      Full notes →
                    </button>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Formula sheet */}
          {tab === 'formulas' && (
            <Card className="p-5">
              <SectionTitle title={`${subjectBySlug.get(subject)?.name} — formula sheet`} sub={`${topics.reduce((n, tt) => n + tt.formulas.length, 0)} formulas across ${topics.length} topics`} />
              <div className="grid gap-3 sm:grid-cols-2">
                {topics.flatMap((tt) => tt.formulas.map((f) => ({ tt, f }))).map(({ tt, f }, i) => (
                  <div key={i} className="rounded-xl bg-brand-50/50 p-3.5 ring-1 ring-brand-100">
                    <div className="text-xs font-bold text-brand-700">{f.name}</div>
                    <div className="mt-1 font-mono text-sm text-ink-800">{f.expr}</div>
                    <div className="mt-1 text-[11px] text-ink-400">{tt.name}</div>
                  </div>
                ))}
                {topics.reduce((n, tt) => n + tt.formulas.length, 0) === 0 && <p className="text-sm text-ink-400">No formulas catalogued for the filtered topics.</p>}
              </div>
            </Card>
          )}

          {/* Traps */}
          {tab === 'traps' && (
            <div className="space-y-3">
              {topics.flatMap((tt) => tt.gate.traps.map((tr) => ({ tt, tr }))).map(({ tt, tr }, i) => (
                <div key={i} className="card flex items-start gap-3 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm leading-relaxed text-ink-800">{tr}</div>
                    <div className="mt-0.5 text-xs font-semibold text-ink-400">{tt.name}</div>
                  </div>
                </div>
              ))}
              {topics.flatMap((tt) => tt.gate.traps).length === 0 && <EmptyState title="No traps for this filter" />}
            </div>
          )}

          {/* GATE focus */}
          {tab === 'gate' && (
            <div className="grid gap-3 md:grid-cols-2">
              {topics.filter((tt) => tt.priority !== 'low').map((tt) => (
                <Card key={tt.id} className="p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-bold text-ink-900">
                    <Target className="h-4 w-4 text-brand-600" /> {tt.name}
                  </div>
                  {tt.gate.highYield.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 py-1 text-[13px] text-ink-700">
                      <span>🔥</span> {h}
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          )}

          {/* Curated quick notes */}
          {tab === 'curated' && (
            <div className="grid gap-4 md:grid-cols-2">
              {extraCards.length === 0 && <EmptyState title="No curated cards for this subject yet" />}
              {extraCards.map((c) => (
                <Card key={c.title} className="p-5">
                  <div className="mb-2.5 flex items-center gap-2 text-sm font-bold text-ink-900">
                    <Timer className="h-4 w-4 text-indigo-500" /> {c.title}
                  </div>
                  <ul className="space-y-1.5">
                    {c.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-700">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
