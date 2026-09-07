'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dna, Loader2 } from 'lucide-react';
import DnaPattern from '@/components/DnaPattern';
import { setToken } from '@/lib/auth-fetch';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => {
        if (r.ok) router.replace('/dashboard');
      })
      .catch(() => {});
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? 'Login failed');
      return;
    }
    // Persist the token BEFORE navigating. The fetch patch also captures it,
    // but doing it here guarantees it is stored before /dashboard mounts and
    // issues its first authenticated request.
    if (data.token) setToken(data.token);
    router.replace('/dashboard');
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden items-center justify-center overflow-hidden bg-gradient-to-br from-brand-600 to-brand-900 lg:flex">
        <DnaPattern className="absolute right-10 h-full w-48" opacity={0.5} />
        <DnaPattern className="absolute left-10 h-full w-40 rotate-180" opacity={0.3} />
        <div className="relative max-w-sm px-8 text-center">
          <h1 className="text-3xl font-bold text-white">Master Biotechnology</h1>
          <p className="mt-3 text-brand-100">from Basics to GATE Level — one topic at a time, easy → difficult, with a tutor that knows exactly what to study next.</p>
        </div>
      </div>

      <div className="flex items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-sm animate-fade-up">
          <Link href="/" className="mb-8 flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Dna className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-ink-900">GATE BT Personal Tutor</div>
              <div className="text-xs font-medium text-brand-600">Sign in to continue</div>
            </div>
          </Link>

          <form onSubmit={submit} className="card space-y-4 p-6">
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@college.edu" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="label" htmlFor="password">Password</label>
                <Link href="/forgot-password" className="mb-1.5 text-xs font-semibold text-brand-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="••••••••" />
            </div>
            {error && <div className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-700 ring-1 ring-rose-200">{error}</div>}
            <button type="submit" disabled={busy} className="btn-primary w-full">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-ink-500">
            New here?{' '}
            <Link href="/signup" className="font-semibold text-brand-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
