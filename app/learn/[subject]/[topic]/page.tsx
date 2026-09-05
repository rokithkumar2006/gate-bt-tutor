'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { topicById, topicsForSubject, subjectRoadmap } from '@/lib/content/topics';
import { subjectBySlug } from '@/lib/content/subjects';
import { numericalsForSubject } from '@/lib/content/numericals';
import type { Note } from '@/lib/types';
import { Badge, Card, EmptyState, LevelBadge, PriorityBadge, ProgressBar, SectionTitle } from '@/components/ui';
import {
  CheckCircle2, Circle, ArrowLeft, ArrowRight, Bot, Lightbulb, AlertTriangle, BookOpen,
  Sigma, StickyNote, Trash2, Plus, Sparkles, GraduationCap, Target, Zap, RefreshCcw,
} from 'lucide-react';

function Section({ icon, title, tone, children }: { icon: React.ReactNode; title: string; tone: string; children: React.ReactNode }) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2.5">
        <div className={clsx('flex h-9 w-9 items-center justify-center rounded-xl', tone)}>{icon}</div>
        <h2 className="text-base font-bold text-ink-900">{title}</h2>
      </div>
      {children}
    </Card>
  );
}

function Bullets({ items, marker = '▸' }: { items: string[]; marker?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((x, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
          <span className="mt-0.5 shrink-0 text-brand-500">{marker}</span>
          {x}
        </li>
      ))}
    </ul>
  );
}

export default function LearnPage() {
  const params = useParams<{ subject: string; topic: string }>();
  const subject = params?.subject ?? '';
  const topicId = params?.topic ?? '';
  const router = useRouter();

  const subjectObj = subjectBySlug.get(subject);
  const topic = topicById.get(topicId);

  const [completed, setCompleted] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const loadProgress = useCallback(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => me && setCompleted(me.completedTopics ?? {}))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadProgress();
    fetch(`/api/notes?topic=${encodeURIComponent(topicId)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setNotes(d.notes ?? []))
      .catch(() => {});
    // set current subject/topic + scroll to top on change
    if (topicId) {
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'set-current', subject, topic: topicId }),
      }).catch(() => {});
      mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [topicId, subject, loadProgress]);

  const isDone = !!completed[topicId];
  const nums = topic ? numericalsForSubject(subject).filter((n) => n.topic === topicId) : [];

  const toggleComplete = async () => {
    const action = isDone ? 'uncomplete' : 'complete';
    setSaving(true);
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, topic: topicId }),
    }).catch(() => {});
    setSaving(false);
    loadProgress();
  };

  const addNote = async () => {
    if (!noteText.trim()) return;
    setSaving(true);
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: topicId, text: noteText.trim() }),
    }).catch(() => {});
    setNoteText('');
    setSaving(false);
    const r = await fetch(`/api/notes?topic=${encodeURIComponent(topicId)}`).catch(() => null);
    if (r?.ok) {
      const d = await r.json();
      setNotes(d.notes ?? []);
    }
  };

  const rm = subject ? subjectRoadmap(subject) : null;

  const prevNext = useMemo(() => {
    if (!rm) return { prev: null, next: null };
    const idx = rm.topics.findIndex((t) => t.id === topicId);
    return {
      prev: idx > 0 ? rm.topics[idx - 1] : null,
      next: idx >= 0 && idx < rm.topics.length - 1 ? rm.topics[idx + 1] : null,
    };
  }, [rm, topicId]);

  if (!subjectObj || !topic) {
    return <EmptyState title="Topic not found" action={<Link href="/subjects" className="btn-primary">Back to Subjects</Link>} />;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[240px_1fr_280px]">
      {/* Left: roadmap sidebar */}
      <aside className="order-2 xl:order-1">
        <Card className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto p-4 thin-scroll">
          <Link href={`/subjects/${subject}`} className="mb-3 flex items-center justify-between text-sm font-bold text-ink-800 hover:text-brand-700">
            <span className="truncate">
              {subjectObj.icon} {subjectObj.name}
            </span>
            <ArrowLeft className="h-4 w-4 shrink-0 text-ink-400" />
          </Link>
          {rm &&
            [1, 2, 3, 4].map((level) => {
              const topics = rm.byLevel[level] ?? [];
              if (topics.length === 0) return null;
              return (
                <div key={level} className="mb-3">
                  <div className="px-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-ink-400">L{level}</div>
                  {topics.map((t) => {
                    const active = t.id === topicId;
                    const done = !!completed[t.id];
                    return (
                      <Link
                        key={t.id}
                        href={`/learn/${subject}/${t.id}`}
                        className={clsx(
                          'mb-0.5 flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium transition-colors',
                          active ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-200' : 'text-ink-600 hover:bg-ink-50',
                        )}
                      >
                        {done ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-brand-500" /> : <Circle className={clsx('h-3.5 w-3.5 shrink-0', active ? 'text-brand-400' : 'text-ink-200')} />}
                        <span className={clsx('truncate', done && !active && 'text-ink-400')}>{t.name}</span>
                      </Link>
                    );
                  })}
                </div>
              );
            })}
        </Card>
      </aside>

      {/* Main content */}
      <div ref={mainRef} className="order-1 min-w-0 space-y-5 xl:order-2">
        {/* Header */}
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <LevelBadge level={topic.level} />
            <PriorityBadge priority={topic.priority} />
            <Badge tone="slate">
              {subjectObj.icon} {subjectObj.name}
            </Badge>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-ink-900">{topic.name}</h1>
              <p className="mt-1 text-sm text-ink-500">{topic.short}</p>
            </div>
            <button onClick={toggleComplete} disabled={saving} className={clsx(isDone ? 'btn-secondary' : 'btn-primary')}>
              {isDone ? <><RefreshCcw className="h-4 w-4" /> Mark as not done</> : <><CheckCircle2 className="h-4 w-4" /> Mark topic complete</>}
            </button>
          </div>
        </div>

        {/* 1. BASIC */}
        <Section icon={<GraduationCap className="h-5 w-5" />} title="1 · Basic — start here" tone="bg-sky-50 text-sky-600">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { q: 'What is it?', a: topic.basic.what, icon: '🧬' },
              { q: 'Why does it matter?', a: topic.basic.why, icon: '🎯' },
              { q: 'How does it work?', a: topic.basic.how, icon: '⚙️' },
              { q: 'Where will you meet it?', a: topic.basic.where, icon: '🏭' },
            ].map((c) => (
              <div key={c.q} className="rounded-xl bg-slate-50 p-4 ring-1 ring-ink-100">
                <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-sky-700">
                  {c.icon} {c.q}
                </div>
                <p className="text-sm leading-relaxed text-ink-700">{c.a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 2. COLLEGE */}
        <Section icon={<BookOpen className="h-5 w-5" />} title="2 · College level — definitions, classification, mechanisms" tone="bg-indigo-50 text-indigo-600">
          <Bullets items={topic.college} />
        </Section>

        {/* 3. ADVANCED */}
        <Section icon={<Zap className="h-5 w-5" />} title="3 · Advanced — beyond the textbook" tone="bg-violet-50 text-violet-600">
          <Bullets items={topic.advanced} />
        </Section>

        {/* 4. GATE FOCUS */}
        <Section icon={<Target className="h-5 w-5" />} title="4 · GATE Focus — high-yield & traps" tone="bg-brand-50 text-brand-600">
          <div className="mb-3 rounded-xl bg-brand-50/70 p-4 ring-1 ring-brand-100">
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-700">🔥 What gets asked</div>
            <Bullets items={topic.gate.highYield} marker="🔥" />
          </div>
          <div className="rounded-xl bg-rose-50/70 p-4 ring-1 ring-rose-100">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-rose-700">
              <AlertTriangle className="h-3.5 w-3.5" /> Traps & confused concepts
            </div>
            <Bullets items={topic.gate.traps} marker="⚠️" />
          </div>
        </Section>

        {/* 5. QUICK REVISION */}
        <Section icon={<RefreshCcw className="h-5 w-5" />} title="5 · Quick Revision — before the exam" tone="bg-amber-50 text-amber-600">
          <div className="space-y-3">
            <div className="rounded-xl bg-amber-50 p-4 text-sm font-semibold leading-relaxed text-amber-900 ring-1 ring-amber-100">
              📌 <b>Remember this:</b> {topic.revision.remember}
            </div>
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">Common mistakes</div>
              <Bullets items={topic.revision.mistakes} marker="❌" />
            </div>
            <div className="rounded-xl bg-ink-50 p-4 text-sm leading-relaxed text-ink-700 ring-1 ring-ink-100">
              <b>One-paragraph summary:</b> {topic.revision.summary}
            </div>
          </div>
        </Section>

        {/* Examples */}
        {topic.examples.length > 0 && (
          <Section icon={<Lightbulb className="h-5 w-5" />} title="Worked examples" tone="bg-slate-100 text-ink-600">
            <div className="space-y-2.5">
              {topic.examples.map((ex, i) => (
                <div key={i} className="rounded-xl bg-slate-50 px-4 py-3 text-sm leading-relaxed text-ink-700 ring-1 ring-ink-100">
                  📌 {ex}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Formulas */}
        {topic.formulas.length > 0 && (
          <Section icon={<Sigma className="h-5 w-5" />} title="Formulas" tone="bg-brand-50 text-brand-600">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {topic.formulas.map((f) => (
                <div key={f.name} className="rounded-xl bg-brand-50/50 p-3.5 ring-1 ring-brand-100">
                  <div className="text-xs font-bold text-brand-700">{f.name}</div>
                  <div className="mt-1 font-mono text-sm text-ink-800">{f.expr}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Key points */}
        <Section icon={<Sparkles className="h-5 w-5" />} title="Key points to drill" tone="bg-indigo-50 text-indigo-600">
          <Bullets items={topic.keyPoints} />
        </Section>

        {/* Prev / Next */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {prevNext.prev ? (
            <Link href={`/learn/${subject}/${prevNext.prev.id}`} className="btn-secondary">
              <ArrowLeft className="h-4 w-4" /> {prevNext.prev.name}
            </Link>
          ) : (
            <span />
          )}
          {prevNext.next ? (
            <Link href={`/learn/${subject}/${prevNext.next.id}`} className="btn-primary">
              {prevNext.next.name} <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link href="/subjects" className="btn-primary">
              Back to Subjects <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Right: progress / notes / related */}
      <aside className="order-3 space-y-5">
        <Card className="p-4">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">Subject progress</div>
          {rm ? (
            <>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-semibold text-ink-700">
                  {rm.topics.filter((t) => completed[t.id]).length}/{rm.topics.length} topics
                </span>
                <span className="font-bold text-brand-600">{Math.round((100 * rm.topics.filter((t) => completed[t.id]).length) / Math.max(rm.topics.length, 1))}%</span>
              </div>
              <ProgressBar value={(100 * rm.topics.filter((t) => completed[t.id]).length) / Math.max(rm.topics.length, 1)} />
            </>
          ) : (
            <p className="text-sm text-ink-400">—</p>
          )}
        </Card>

        <Card className="p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-500">
            <StickyNote className="h-3.5 w-3.5" /> Quick notes
          </div>
          <div className="mb-3 space-y-2">
            {notes.length === 0 && <p className="text-sm text-ink-400">Your notes for this topic appear here.</p>}
            {notes.map((n) => (
              <div key={n.id} className="group rounded-xl bg-amber-50/70 p-3 text-sm text-ink-700 ring-1 ring-amber-100">
                <p className="whitespace-pre-wrap">{n.text}</p>
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[11px] text-ink-400">{new Date(n.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={async () => {
                      await fetch(`/api/notes?id=${n.id}`, { method: 'DELETE' }).catch(() => {});
                      setNotes((ns) => ns.filter((x) => x.id !== n.id));
                    }}
                    className="text-ink-300 opacity-0 transition-opacity hover:text-rose-500 group-hover:opacity-100"
                    title="Delete note"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write a quick note…"
            rows={2}
            className="input resize-none text-[13px]"
          />
          <button onClick={addNote} disabled={saving || !noteText.trim()} className="btn-secondary mt-2 w-full text-xs">
            <Plus className="h-3.5 w-3.5" /> Save Note
          </button>
        </Card>

        {nums.length > 0 && (
          <Card className="p-4">
            <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">Practice numerical</div>
            {nums.map((n) => (
              <Link key={n.id} href={`/numericals?id=${n.id}`} className="block rounded-xl bg-brand-50/60 p-3 text-sm font-semibold text-brand-700 ring-1 ring-brand-100 hover:bg-brand-50">
                🧮 {n.name} →
              </Link>
            ))}
          </Card>
        )}

        <Card className="p-4">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-500">Related topics</div>
          <div className="space-y-1.5">
            {topic.related.map((rid) => {
              const rt = topicById.get(rid);
              if (!rt) return null;
              return (
                <Link key={rid} href={`/learn/${rt.subject}/${rid}`} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] font-medium text-ink-600 hover:bg-ink-50 hover:text-brand-700">
                  <ArrowRight className="h-3 w-3 text-ink-300" />
                  <span className="truncate">{rt.name}</span>
                </Link>
              );
            })}
          </div>
        </Card>

        <Link href={`/tutor?subject=${subject}&topic=${topicId}`} className="btn-primary w-full">
          <Bot className="h-4 w-4" /> Ask the AI Tutor
        </Link>
      </aside>
    </div>
  );
}
