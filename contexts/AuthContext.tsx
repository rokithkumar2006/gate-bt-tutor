'use client';

// Global authentication state.
//
// Works in two modes so the app runs everywhere:
//
//   Supabase mode  — NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
//                    are set. Real Supabase Auth, session persisted by the
//                    Supabase client in localStorage, kept fresh by
//                    autoRefreshToken, and mirrored into our fetch layer so
//                    every /api route sees the access token.
//
//   Legacy mode    — no Supabase env. Falls back to the built-in session
//                    endpoints, so local development needs no configuration.
//
// The `loading` flag is the important part: it starts true and only clears once
// the stored session has been restored. Route guards MUST wait for it, or a
// logged-in user gets bounced to /login on every refresh while Supabase is
// still reading the session back.
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getSupabaseBrowserClient, supabaseAuthEnabled } from '@/lib/supabase/client';
import { clearToken, setToken } from '@/lib/auth-fetch';
import type { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  /** True when real Supabase Auth is active. */
  supabase: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (input: SignUpInput) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  profile: {
    college: string;
    yearOfStudy: string;
    targetExam: string;
    dailyHours: number;
    dailyGoalMin?: number;
  };
}

const Ctx = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const isSupabase = supabaseAuthEnabled();

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  /** Load the app profile for the signed-in user via our own API. */
  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        setUser(null);
        return;
      }
      const data = await res.json();
      setUser(data.user ?? null);
    } catch (e) {
      console.error('[auth] failed to load profile:', e);
      setUser(null);
    }
  }, []);

  // ---- restore the session on startup, then follow auth changes ----
  useEffect(() => {
    let cancelled = false;

    if (!isSupabase || !supabase) {
      // Legacy mode: ask the server who we are.
      loadProfile().finally(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('[auth] getSession error:', error.message);

      if (!cancelled) {
        const s = data.session ?? null;
        setSession(s);
        if (s?.access_token) {
          setToken(s.access_token); // hand the token to the fetch layer
          await loadProfile();
        } else {
          clearToken();
          setUser(null);
        }
        setLoading(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange(async (event, s) => {
      setSession(s);
      if (s?.access_token) {
        setToken(s.access_token);
        // TOKEN_REFRESHED fires often; only reload the profile when it changed.
        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED') {
          await loadProfile();
        }
      } else {
        clearToken();
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [isSupabase, supabase, loadProfile]);

  // ------------------------------ actions ---------------------------------

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error: string | null }> => {
      if (isSupabase && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          console.error('[auth] signInWithPassword error:', error);
          if (/email not confirmed/i.test(error.message)) {
            return { error: 'Please verify your email before signing in.' };
          }
          if (/invalid login credentials/i.test(error.message)) {
            return { error: 'Invalid email or password' };
          }
          return { error: error.message };
        }
        if (data.session?.access_token) setToken(data.session.access_token);
        await loadProfile();
        return { error: null };
      }

      // Legacy mode
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) return { error: body.error ?? 'Login failed' };
      if (body.token) setToken(body.token);
      await loadProfile();
      return { error: null };
    },
    [isSupabase, supabase, loadProfile],
  );

  const signUp = useCallback(
    async (input: SignUpInput): Promise<{ error: string | null }> => {
      if (isSupabase && supabase) {
        // Create the auth user + profile row server-side, then sign in.
        const res = await fetch('/api/auth/supabase-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          console.error('[auth] signup error:', body.error);
          return { error: body.error ?? 'Could not create the account' };
        }
        return signIn(input.email, input.password);
      }

      // Legacy mode
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) return { error: body.error ?? 'Signup failed' };
      if (body.token) setToken(body.token);
      await loadProfile();
      return { error: null };
    },
    [isSupabase, supabase, signIn, loadProfile],
  );

  const signOut = useCallback(async () => {
    if (isSupabase && supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('[auth] signOut error:', error.message);
    } else {
      await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    }
    clearToken();
    setUser(null);
    setSession(null);
  }, [isSupabase, supabase]);

  const value = useMemo<AuthState>(
    () => ({ user, session, loading, supabase: isSupabase, signIn, signUp, signOut, refresh: loadProfile }),
    [user, session, loading, isSupabase, signIn, signUp, signOut, loadProfile],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
