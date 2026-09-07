// Server-side Supabase helpers.
//
// Two distinct clients, deliberately kept apart:
//
//   adminClient()  — service role key. Bypasses RLS. Used only for trusted
//                    server work (creating a profile row, reading any user).
//                    Must never be exposed to the browser.
//
//   verifyAccessToken() — validates a user's access token with the anon key,
//                    so an API route can prove who is calling without trusting
//                    anything the client claims.
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { User, UserProfile } from '../types';

/** Server env, with NEXT_PUBLIC_ fallbacks so one value can serve both sides. */
export function supabaseUrl(): string {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
}

export function supabaseAnonKey(): string {
  return process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
}

export function supabaseServiceKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || '';
}

/** Supabase Auth is active only when the URL and BOTH keys are present. */
export function supabaseAuthConfigured(): boolean {
  return Boolean(supabaseUrl() && supabaseAnonKey() && supabaseServiceKey());
}

let admin: SupabaseClient | null = null;

/** Service-role client. Bypasses RLS — server-side use only. */
export function adminClient(): SupabaseClient {
  if (!admin) {
    admin = createClient(supabaseUrl(), supabaseServiceKey(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return admin;
}

export interface ProfileRow {
  id: string;
  full_name: string;
  email: string;
  college: string | null;
  year_of_study: string | null;
  target_exam: string | null;
  daily_study_hours: number | null;
  daily_goal_min: number | null;
  created_at: string;
}

/** Map a user_profiles row onto the app's existing User shape. */
export function profileToUser(row: ProfileRow): User {
  const profile: UserProfile = {
    college: row.college ?? '',
    yearOfStudy: row.year_of_study ?? '',
    targetExam: row.target_exam ?? '',
    dailyHours: Number(row.daily_study_hours ?? 2),
    dailyGoalMin: Number(row.daily_goal_min ?? 120),
  };
  return {
    id: row.id,
    name: row.full_name,
    email: row.email,
    createdAt: row.created_at,
    profile,
  };
}

/**
 * Verify a Supabase access token and return the app User.
 *
 * getUser(token) re-validates the JWT against Supabase rather than decoding it
 * locally, so a forged or revoked token is rejected.
 */
export async function verifyAccessToken(token: string): Promise<User | null> {
  if (!token || !supabaseAuthConfigured()) return null;

  const anon = createClient(supabaseUrl(), supabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await anon.auth.getUser(token);
  if (error || !data.user) return null;

  const db = adminClient();
  const { data: row } = await db
    .from('user_profiles')
    .select('*')
    .eq('id', data.user.id)
    .maybeSingle();

  if (row) return profileToUser(row as ProfileRow);

  // Auth user exists but the profile row is missing (e.g. created straight in
  // the Supabase dashboard). Heal it rather than failing the request.
  const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
  const seed = {
    id: data.user.id,
    full_name: (meta.full_name as string) || data.user.email?.split('@')[0] || 'Student',
    email: data.user.email ?? '',
    college: (meta.college as string) ?? '',
    year_of_study: (meta.year_of_study as string) ?? '',
    target_exam: (meta.target_exam as string) ?? '',
    daily_study_hours: Number(meta.daily_study_hours ?? 2),
    daily_goal_min: Number(meta.daily_goal_min ?? 120),
  };
  const { data: created } = await db.from('user_profiles').insert(seed).select('*').single();
  return created ? profileToUser(created as ProfileRow) : null;
}
