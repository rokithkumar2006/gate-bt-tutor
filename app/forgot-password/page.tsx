'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dna, Loader2, KeyRound } from 'lucide-react';

function ForgotPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState(params.get('email') ?? '');
  const [code, setCode] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await fetch('/api/auth/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setBusy(false);
    if (res.ok && data.demoCode) {
      setCode(data.demoCode);
      setSent(true);
    } else if (res.ok) {
      setSent(true);
    }
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
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <KeyRound className="h-5 w-5" />
          </div>
          <h1 className="text-lg font-bold text-ink-900">Forgot your password?</h1>
          <p className="mt-1 text-sm text-ink-500">Enter your account email and we will send a 6-digit reset code.</p>

          {sent ? (
            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">
                If <b>{email}</b> is registered, a reset code has been “emailed”.
              </div>
              {code && (
                <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">
                  <b>Demo mode:</b> your reset code is <span className="font-mono text-base font-bold tracking-widest">{code}</span>
                </div>
              )}
              <Link href={code ? `/reset-password?email=${encodeURIComponent(email)}` : '/login'} className="btn-primary w-full">
                {code ? 'Enter Reset Code' : 'Back to Login'}
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-5 space-y-4">
              <div>
                <label className="label">Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="you@college.edu" />
              </div>
              <button type="submit" disabled={busy} className="btn-primary w-full">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Reset Code'}
              </button>
            </form>
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
      <ForgotPasswordForm />
    </Suspense>
  );
}
