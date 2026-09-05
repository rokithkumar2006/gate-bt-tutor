'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dna, Loader2 } from 'lucide-react';

function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get('email') ?? '');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch('/api/auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, password }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? 'Reset failed');
      return;
    }
    setOk(true);
    setTimeout(() => router.replace('/login'), 1400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md animate-fade-up">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
            <Dna className="h-5 w-5" />
          </div>
          <div className="font-bold text-ink-900">GATE BT Personal Tutor</div>
        </Link>

        <div className="card p-6">
          {ok ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl">✅</div>
              <h1 className="text-lg font-bold text-ink-900">Password updated</h1>
              <p className="mt-1 text-sm text-ink-500">Redirecting you to the login page…</p>
            </div>
          ) : (
            <>
              <h1 className="text-lg font-bold text-ink-900">Reset your password</h1>
              <p className="mt-1 text-sm text-ink-500">Enter the 6-digit code and choose a new password.</p>
              <form onSubmit={submit} className="mt-5 space-y-4">
                <div>
                  <label className="label">Email</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@college.edu" />
                </div>
                <div>
                  <label className="label">Reset code</label>
                  <input required value={code} onChange={(e) => setCode(e.target.value)} className="input font-mono tracking-widest" placeholder="123456" maxLength={6} />
                </div>
                <div>
                  <label className="label">New password</label>
                  <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="At least 6 characters" />
                </div>
                {error && <div className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-700 ring-1 ring-rose-200">{error}</div>}
                <button type="submit" disabled={busy} className="btn-primary w-full">
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Reset Password'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-sm">
          <Link href="/login" className="font-semibold text-brand-600 hover:underline">
            ← Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
