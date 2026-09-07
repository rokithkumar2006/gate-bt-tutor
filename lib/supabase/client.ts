'use client';

// Browser-side Supabase client, used ONLY for authentication.
//
// Uses the anon (publishable) key, which is safe to ship to the browser — it
// grants nothing on its own because every table has RLS enabled. The service
// role key must never appear here.
//
// Session persistence is the whole point of this file: `persistSession` writes
// the session to localStorage so it survives a refresh AND a browser restart,
// and `autoRefreshToken` renews the access token before it expires so long
// sessions do not silently die.
import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

/** True when the browser has what it needs to talk to Supabase Auth. */
export function supabaseAuthEnabled(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

let cached: SupabaseClient | null = null;

/**
 * Returns the singleton browser client, or null when Supabase is not
 * configured (local development falls back to the built-in auth). A singleton
 * matters: multiple clients would each register their own auth listener and
 * fight over the stored session.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (!supabaseAuthEnabled()) return null;
  if (cached) return cached;

  cached = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return cached;
}
