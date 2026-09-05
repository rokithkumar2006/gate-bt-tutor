'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge, Card, SectionTitle, Spinner } from '@/components/ui';
import { planStudy } from '@/lib/planner';
import { MOCK_TESTS } from '@/lib/content/mockTests';
import { subjectBySlug } from '@/lib/content/subjects';
import type { StudyPlan } from '@/lib/types';
import { CalendarRange, Flame, Moon, PenLine, Sparkles, Timer } from 'lucide-react';

function defaultExamDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().slice(0, 10);
}

export default function PlannerPage() {
  const [examDate, setExamDate] = useState(defaultExamDate());
  const [hours, setHours] = useState(3);
  const [level, setLevel] = useState(1);
  const [saved, setSaved] = useState<StudyPlan | null>(null);
  const [preview, setPreview] = useState<StudyPlan | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/planner')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setSaved(d.plan))
      .catch(() => {});
  }, []);

  const plan = preview ?? saved;

  const today = new Date().toISOString().slice(0, 10);

  const generate = async () => {
    setBusy(true);
    const res = await fetch('/api/planner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ examDate, hoursPerDay: hours, startLevel: level }),
    }).catch(() => null);
    if (res?.ok) {
      const d = await res.json();
      setSaved(d.plan);
      setPreview(d.plan);
    }
    setBusy(false);
  };

  const daysLeft = useMemo(() => {
    const a = new Date(`${today}T00:00:00`).getTime();
    const b = new Date(`${examDate}T00:00:00`).getTime();
    return Math.max(0, Math.round((b - a) / 86400000));
  }, [today, examDate]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Study Planner</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-500">
          Exam date + hours per day + starting level → a deterministic day-by-day plan: GATE-weight subject order, 🔥 topics first, a 3-day revision cycle and a weekly mock schedule.
        </p>
      </div>

      {/* Inputs */}
      <Card className="p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="label">Exam date</label>
            <input type="date" value={examDate} min={today} onChange={(e) => setExamDate(e.target.value)} className="input" />
            <div className="mt-1 text-xs font-semibold text-brand-600">{daysLeft} days left</div>
          </div>
          <div>
            <label className="label">Hours per day: {hours}h</label>
            <input type="range" min={1} max={10} step={0.5} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="mt-2.5 w-full accent-brand-600" />
            <div className="text-xs text-ink-400">{hours * 60} min/day</div>
          </div>
          <div>
            <label className="label">Starting level</label>
            <select value={level} onChange={(e) => setLevel(Number(e.target.value))} className="input">
              <option value={1}>L1 · From basics</option>
              <option value={2}>L2 · Basics done</option>
              <option value={3}>L3 · Intermediate done</option>
              <option value={4}>L4 · GATE revision only</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={generate} disabled={busy || daysLeft === 0} className="btn-primary w-full">
              {busy ? <Spinner label="" /> : <><CalendarRange className="h-4 w-4" /> {saved ? 'Regenerate Plan' : 'Generate Plan'}</>}
            </button>
          </div>
        </div>
      </Card>

      {!plan ? (
        <div className="card p-8 text-center text-sm text-ink-500">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-brand-300" />
          No plan yet — pick your inputs above and hit <b>Generate Plan</b>. It is saved to your account and shown on your dashboard.
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { l: 'Days to exam', v: String(plan.daysTotal), icon: <CalendarRange className="h-4 w-4" /> },
              { l: 'Hours / day', v: `${plan.hoursDay}h`, icon: <Timer className="h-4 w-4" /> },
              { l: 'Topics scheduled', v: String(plan.daily.reduce((n, d) => n + d.items.filter((i) => i.startsWith('L')).length, 0)), icon: <PenLine className="h-4 w-4" /> },
              { l: 'Mocks scheduled', v: String(plan.mocks.length), icon: <Flame className="h-4 w-4" /> },
            ].map((s) => (
              <Card key={s.l} className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">{s.icon}</div>
                <div>
                  <div className="text-xl font-bold text-ink-900">{s.v}</div>
                  <div className="text-xs font-medium text-ink-500">{s.l}</div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* Daily plan */}
            <Card className="p-5 lg:col-span-2">
              <SectionTitle title="Day-by-day plan" sub="Next 14 days (full plan saved)" />
              <div className="max-h-[520px] space-y-2.5 overflow-y-auto pr-1 thin-scroll">
                {plan.daily.slice(0, 14).map((d) => {
                  const isToday = d.date === today;
                  return (
                    <div key={d.date} className={`rounded-xl p-3.5 ring-1 ${isToday ? 'bg-brand-50/60 ring-brand-200' : 'bg-slate-50 ring-ink-100'}`}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm font-bold text-ink-800">
                          {new Date(`${d.date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
                          {isToday && <Badge tone="brand">Today</Badge>}
                        </span>
                        <span className="text-xs font-semibold text-ink-400">{plan.hoursDay}h planned</span>
                      </div>
                      <ul className="space-y-1">
                        {d.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-ink-600">
                            <span>{item.startsWith('Mock') ? '🧪' : item.startsWith('Revision') ? '🔁' : item.startsWith('Light') ? '☕' : '📚'}</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </Card>

            <div className="space-y-5">
              {/* Subject order */}
              <Card className="p-5">
                <SectionTitle title="Subject order" sub="GATE weight desc — where your hours go" />
                <div className="space-y-2">
                  {plan.subjectOrder.slice(0, 10).map((s, i) => (
                    <div key={s.subject} className="flex items-center gap-2.5 text-[13px]">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-ink-100 text-[11px] font-bold text-ink-600">{i + 1}</span>
                      <span className="min-w-0 flex-1 truncate font-medium text-ink-700">{subjectBySlug.get(s.subject)?.name ?? s.subject}</span>
                      <span className="shrink-0 text-xs font-bold text-brand-600">{s.hours}h</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Weekly */}
              <Card className="p-5">
                <SectionTitle title="Weekly rhythm" />
                <div className="space-y-2.5">
                  {plan.weekly.slice(0, 6).map((w) => (
                    <div key={w.week} className="rounded-xl bg-slate-50 p-3 ring-1 ring-ink-100">
                      <div className="mb-1 text-xs font-bold text-ink-700">{w.title}</div>
                      {w.items.map((it, i) => (
                        <div key={i} className="flex items-start gap-2 py-0.5 text-[12px] text-ink-500">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-brand-400" /> {it}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Mocks */}
              <Card className="p-5">
                <SectionTitle title="Mock schedule" sub={<span className="flex items-center gap-1"><Moon className="h-3 w-3" /> spaced, then daily in the last 3 days</span>} />
                <div className="space-y-1.5">
                  {plan.mocks.slice(0, 8).map((m, i) => (
                    <div key={i} className="flex items-center justify-between text-[13px]">
                      <span className="font-semibold text-ink-700">{m.date.slice(5)}</span>
                      <Link href={`/mock/${m.test}`} className="truncate text-xs font-bold text-brand-600 hover:underline">
                        {MOCK_TESTS.find((t) => t.id === m.test)?.name ?? m.test} →
                      </Link>
                    </div>
                  ))}
                  {plan.mocks.length === 0 && <p className="text-sm text-ink-400">No mocks scheduled.</p>}
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
