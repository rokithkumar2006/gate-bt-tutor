'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/auth-fetch';
import { Dna, Loader2 } from 'lucide-react';

const YEARS = ['1st Year', '2nd Year', '3rd Year', 'Final Year', 'Working Professional'];
const EXAMS = ['GATE BT 2026', 'GATE BT 2027', 'GATE BT 2028', 'College Exams', 'Other'];

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    yearOfStudy: YEARS[0],
    targetExam: EXAMS[0],
    dailyHours: 2,
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => {
        if (r.ok) router.replace('/dashboard');
      })
      .catch(() => {});
  }, [router]);

  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
        profile: {
          college: form.college,
          yearOfStudy: form.yearOfStudy,
          targetExam: form.targetExam,
          dailyHours: Number(form.dailyHours),
          dailyGoalMin: Math.round(Number(form.dailyHours) * 60),
        },
      }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? 'Signup failed');
      return;
    }
    // Store the token before navigating — see the note in app/login/page.tsx.
    if (data.token) setToken(data.token);
    router.replace('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg animate-fade-up">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Dna className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-ink-900">GATE BT Personal Tutor</div>
            <div className="text-xs font-medium text-brand-600">Create your account</div>
          </div>
        </Link>

        <form onSubmit={submit} className="card space-y-4 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Full name</label>
              <input required value={form.name} onChange={(e) => set('name', e.target.value)} className="input" placeholder="Priya Sharma" />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} className="input" placeholder="you@college.edu" />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" required minLength={6} value={form.password} onChange={(e) => set('password', e.target.value)} className="input" placeholder="At least 6 characters" />
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
            </div>
          </div>
          {error && <div className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-700 ring-1 ring-rose-200">{error}</div>}
          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Create Account & Start Learning'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-ink-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-brand-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
