'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppData } from '@/components/AppShell';
import { Badge, Card, SectionTitle } from '@/components/ui';
import { Loader2, LogOut, Save, ShieldCheck } from 'lucide-react';

const YEARS = ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Working Professional'];
const EXAMS = ['GATE BT 2026', 'GATE BT 2027', 'GATE BT 2028', 'College Exams', 'Other'];

export default function SettingsPage() {
  const { user, refresh } = useAppData();
  const router = useRouter();
  const [form, setForm] = useState({
    name: user?.name ?? '',
    college: user?.profile.college ?? '',
    yearOfStudy: user?.profile.yearOfStudy ?? YEARS[0],
    targetExam: user?.profile.targetExam ?? EXAMS[0],
    dailyHours: user?.profile.dailyHours ?? 2,
  });
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string | number) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  const save = async () => {
    setBusy(true);
    setError('');
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        profile: {
          college: form.college,
          yearOfStudy: form.yearOfStudy,
          targetExam: form.targetExam,
          dailyHours: Number(form.dailyHours),
          dailyGoalMin: Math.round(Number(form.dailyHours) * 60),
        },
      }),
    });
    setBusy(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error ?? 'Save failed');
      return;
    }
    setSaved(true);
    refresh();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Settings</h1>
        <p className="mt-1 text-sm text-ink-500">Your profile drives the planner, daily goal and the tutor&apos;s context.</p>
      </div>

      <Card className="p-6">
        <SectionTitle title="Profile" />
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Full name</label>
              <input value={form.name} onChange={(e) => set('name', e.target.value)} className="input" />
            </div>
            <div>
              <label className="label">Email</label>
              <input value={user?.email ?? ''} disabled className="input cursor-not-allowed bg-ink-50 text-ink-500" />
              <p className="mt-1 text-xs text-ink-400">Email is your login — changing it is not supported in the demo.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">College</label>
              <input value={form.college} onChange={(e) => set('college', e.target.value)} className="input" placeholder="e.g. NIT Surathkal" />
            </div>
            <div>
              <label className="label">Year of study</label>
              <select value={form.yearOfStudy} onChange={(e) => set('yearOfStudy', e.target.value)} className="input">
                {YEARS.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Target exam</label>
              <select value={form.targetExam} onChange={(e) => set('targetExam', e.target.value)} className="input">
                {EXAMS.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Daily study hours: {form.dailyHours}h</label>
              <input type="range" min={1} max={10} step={0.5} value={form.dailyHours} onChange={(e) => set('dailyHours', Number(e.target.value))} className="mt-2 w-full accent-brand-600" />
              <p className="mt-1 text-xs text-ink-400">Daily goal = {Math.round(Number(form.dailyHours) * 60)} min</p>
            </div>
          </div>
          {error && <div className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-700 ring-1 ring-rose-200">{error}</div>}
          <div className="flex items-center justify-between">
            {saved ? <Badge tone="brand">Saved ✓</Badge> : <span />}
            <button onClick={save} disabled={busy} className="btn-primary">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Changes
            </button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <SectionTitle title="Account" sub={<span className="flex items-center gap-1 text-xs"><ShieldCheck className="h-3 w-3" /> Demo data is stored in the local JSON database</span>} />
        <div className="flex items-center justify-between">
          <div className="text-sm text-ink-500">Sign out of this device.</div>
          <button onClick={logout} className="btn-danger">
            <LogOut className="h-4 w-4" /> Log Out
          </button>
        </div>
      </Card>
    </div>
  );
}
