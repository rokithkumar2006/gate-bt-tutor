'use client';

import React from 'react';
import { clsx } from 'clsx';
import { Loader2, X } from 'lucide-react';

export function Card({ className, children, onClick }: { className?: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={clsx('card', className)}>
      {children}
    </div>
  );
}

export function SectionTitle({ title, sub, action }: { title: string; sub?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 className="text-lg font-bold text-ink-900">{title}</h2>
        {sub ? <p className="mt-0.5 text-sm text-ink-500">{sub}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ProgressBar({ value, className, barClass }: { value: number; className?: string; barClass?: string }) {
  const v = Math.min(Math.max(value, 0), 100);
  return (
    <div className={clsx('h-2 w-full overflow-hidden rounded-full bg-ink-100', className)}>
      <div
        className={clsx('h-full rounded-full bg-brand-500 transition-all duration-500', barClass)}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}

export function Badge({ children, tone = 'brand' }: { children: React.ReactNode; tone?: 'brand' | 'amber' | 'rose' | 'slate' | 'indigo' | 'sky' }) {
  const tones: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
    amber: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    rose: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    slate: 'bg-ink-100 text-ink-600 ring-1 ring-ink-200',
    indigo: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
    sky: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  };
  return <span className={clsx('badge', tones[tone])}>{children}</span>;
}

export function PriorityBadge({ priority }: { priority: string }) {
  if (priority === 'high') return <Badge tone="rose">🔥 High yield</Badge>;
  if (priority === 'medium') return <Badge tone="amber">⭐ Medium</Badge>;
  return <Badge tone="slate">📖 Foundation</Badge>;
}

export function LevelBadge({ level }: { level: number }) {
  const map: Record<number, { label: string; cls: string }> = {
    1: { label: 'L1 · Basic', cls: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200' },
    2: { label: 'L2 · College', cls: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' },
    3: { label: 'L3 · Advanced', cls: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200' },
    4: { label: 'L4 · GATE Focus', cls: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200' },
  };
  const m = map[level] ?? map[1];
  return <span className={clsx('badge', m.cls)}>{m.label}</span>;
}

export function StatCard({
  icon,
  label,
  value,
  sub,
  tone = 'brand',
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
  tone?: 'brand' | 'amber' | 'indigo' | 'sky' | 'rose';
}) {
  const tones: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-600',
    amber: 'bg-amber-50 text-amber-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    sky: 'bg-sky-50 text-sky-600',
    rose: 'bg-rose-50 text-rose-600',
  };
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className={clsx('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', tones[tone])}>{icon}</div>
      <div className="min-w-0">
        <div className="truncate text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</div>
        <div className="truncate text-xl font-bold text-ink-900">{value}</div>
        {sub ? <div className="truncate text-xs text-ink-400">{sub}</div> : null}
      </div>
    </Card>
  );
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-10 text-ink-500">
      <Loader2 className="h-5 w-5 animate-spin text-brand-600" />
      {label ? <span className="text-sm">{label}</span> : null}
    </div>
  );
}

export function EmptyState({ title, sub, icon, action }: { title: string; sub?: string; icon?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink-200 bg-white/60 px-6 py-12 text-center">
      {icon ? <div className="mb-1 text-ink-300">{icon}</div> : null}
      <div className="font-semibold text-ink-700">{title}</div>
      {sub ? <div className="max-w-sm text-sm text-ink-500">{sub}</div> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

export function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/40 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        className={clsx('max-h-[90vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 shadow-lift thin-scroll sm:rounded-2xl', wide ? 'sm:max-w-3xl' : 'sm:max-w-lg')}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-ink-900">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-100 hover:text-ink-600" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl bg-ink-100 p-1 thin-scroll">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={clsx(
            'whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            active === t.id ? 'bg-white text-ink-900 shadow-card' : 'text-ink-500 hover:text-ink-700',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
