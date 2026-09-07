// Supabase (Postgres) implementation of DataStore.
//
// Used when SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are set. All calls run
// server-side from route handlers with the service role key, which bypasses
// RLS — see db/supabase-schema.sql for why that is the intended design here.
import crypto from 'crypto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Attempt, Note, ProgressRecord, StudyPlan, User, UserProfile } from '../types';
import type { DataStore, RevisionEntry, StoredUser } from './types';
import { hashPassword, todayKey } from './shared';

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  profile: UserProfile;
  created_at: string;
}

function toStoredUser(row: UserRow): StoredUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
    profile: row.profile,
    passwordHash: row.password_hash,
  };
}

function stripHash(u: StoredUser): User {
  const { passwordHash: _ph, ...rest } = u;
  return rest;
}

export function supabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export class SupabaseStore implements DataStore {
  readonly name = 'supabase';
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }

  // ------------------------------ users ------------------------------------

  async findUserByEmail(email: string): Promise<StoredUser | null> {
    const { data } = await this.client
      .from('app_users')
      .select('*')
      .ilike('email', email)
      .maybeSingle();
    return data ? toStoredUser(data as UserRow) : null;
  }

  async findUserById(id: string): Promise<StoredUser | null> {
    const { data } = await this.client.from('app_users').select('*').eq('id', id).maybeSingle();
    return data ? toStoredUser(data as UserRow) : null;
  }

  async createUser(input: {
    name: string;
    email: string;
    password: string;
    profile: UserProfile;
  }): Promise<User> {
    const { data, error } = await this.client
      .from('app_users')
      .insert({
        name: input.name,
        email: input.email,
        password_hash: hashPassword(input.password),
        profile: input.profile,
      })
      .select('*')
      .single();
    if (error) throw new Error(`[supabase] createUser: ${error.message}`);

    const user = toStoredUser(data as UserRow);
    // Seed the progress row so later reads never 404.
    await this.client.from('app_progress').insert({ user_id: user.id }).select().maybeSingle();
    return stripHash(user);
  }

  async updateUser(
    id: string,
    patch: { name?: string; profile?: UserProfile; passwordHash?: string },
  ): Promise<void> {
    const row: Record<string, unknown> = {};
    if (patch.name !== undefined) row.name = patch.name;
    if (patch.profile !== undefined) row.profile = patch.profile;
    if (patch.passwordHash !== undefined) row.password_hash = patch.passwordHash;
    if (Object.keys(row).length === 0) return;
    await this.client.from('app_users').update(row).eq('id', id);
  }

  // ----------------------------- sessions ----------------------------------

  async createSession(userId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const { error } = await this.client.from('app_sessions').insert({
      token,
      user_id: userId,
      expires_at: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
    });
    if (error) throw new Error(`[supabase] createSession: ${error.message}`);
    return token;
  }

  async sessionUser(token: string | undefined | null): Promise<User | null> {
    if (!token) return null;
    const { data } = await this.client
      .from('app_sessions')
      .select('user_id, expires_at')
      .eq('token', token)
      .maybeSingle();
    if (!data) return null;

    if (new Date(data.expires_at as string).getTime() < Date.now()) {
      await this.destroySession(token);
      return null;
    }
    const u = await this.findUserById(data.user_id as string);
    return u ? stripHash(u) : null;
  }

  async destroySession(token: string): Promise<void> {
    await this.client.from('app_sessions').delete().eq('token', token);
  }

  // ----------------------------- progress ----------------------------------

  async getProgress(userId: string): Promise<ProgressRecord> {
    const { data } = await this.client
      .from('app_progress')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (!data) {
      const fresh: ProgressRecord = {
        userId,
        completedTopics: {},
        studyTime: {},
        currentSubject: null,
        currentTopic: null,
      };
      await this.client.from('app_progress').upsert({ user_id: userId });
      return fresh;
    }

    return {
      userId,
      completedTopics: (data.completed_topics ?? {}) as Record<string, string>,
      studyTime: (data.study_time ?? {}) as Record<string, number>,
      currentSubject: (data.current_subject ?? null) as string | null,
      currentTopic: (data.current_topic ?? null) as string | null,
    };
  }

  async saveProgress(progress: ProgressRecord): Promise<void> {
    await this.client.from('app_progress').upsert({
      user_id: progress.userId,
      completed_topics: progress.completedTopics,
      study_time: progress.studyTime,
      current_subject: progress.currentSubject,
      current_topic: progress.currentTopic,
      updated_at: new Date().toISOString(),
    });
  }

  async addActivity(userId: string, event: string, seconds = 0, date = todayKey()): Promise<void> {
    const { data } = await this.client
      .from('app_activity')
      .select('seconds, events')
      .eq('user_id', userId)
      .eq('day', date)
      .maybeSingle();

    const events = ((data?.events ?? []) as string[]).concat(event);
    await this.client.from('app_activity').upsert({
      user_id: userId,
      day: date,
      seconds: ((data?.seconds ?? 0) as number) + seconds,
      events,
    });
  }

  async computeStreak(userId: string): Promise<number> {
    const { data } = await this.client
      .from('app_activity')
      .select('day')
      .eq('user_id', userId)
      .order('day', { ascending: false })
      .limit(400);

    const active = new Set(((data ?? []) as { day: string }[]).map((r) => r.day));
    if (active.size === 0) return 0;

    let streak = 0;
    const d = new Date();
    if (!active.has(todayKey(d))) d.setDate(d.getDate() - 1);
    while (active.has(todayKey(d))) {
      streak += 1;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }

  // ----------------------------- attempts ----------------------------------

  async saveAttempt(attempt: Attempt): Promise<void> {
    const { error } = await this.client.from('app_attempts').insert({
      id: attempt.id,
      user_id: attempt.userId,
      finished_at: attempt.finishedAt,
      data: attempt,
    });
    if (error) throw new Error(`[supabase] saveAttempt: ${error.message}`);

    await this.addActivity(attempt.userId, `attempt:${attempt.testType}`, attempt.durationSec);
  }

  async attemptsForUser(userId: string, limit = 20): Promise<Attempt[]> {
    const { data } = await this.client
      .from('app_attempts')
      .select('data')
      .eq('user_id', userId)
      .order('finished_at', { ascending: false })
      .limit(limit);
    return ((data ?? []) as { data: Attempt }[]).map((r) => r.data);
  }

  // ------------------------------ notes ------------------------------------

  async notesForUser(userId: string, topic?: string): Promise<Note[]> {
    let q = this.client
      .from('app_notes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (topic) q = q.eq('topic', topic);

    const { data } = await q;
    return ((data ?? []) as Record<string, unknown>[]).map((r) => ({
      id: r.id as string,
      userId: r.user_id as string,
      topic: r.topic as string,
      text: r.text as string,
      createdAt: r.created_at as string,
    }));
  }

  async addNote(userId: string, topic: string, text: string): Promise<Note> {
    const note: Note = {
      id: crypto.randomUUID(),
      userId,
      topic,
      text,
      createdAt: new Date().toISOString(),
    };
    const { error } = await this.client.from('app_notes').insert({
      id: note.id,
      user_id: note.userId,
      topic: note.topic,
      text: note.text,
      created_at: note.createdAt,
    });
    if (error) throw new Error(`[supabase] addNote: ${error.message}`);
    return note;
  }

  async deleteNote(userId: string, noteId: string): Promise<void> {
    await this.client.from('app_notes').delete().eq('id', noteId).eq('user_id', userId);
  }

  // ------------------------------ plans ------------------------------------

  async getPlan(userId: string): Promise<StudyPlan | null> {
    const { data } = await this.client
      .from('app_plans')
      .select('plan')
      .eq('user_id', userId)
      .maybeSingle();
    return data ? ((data.plan ?? null) as StudyPlan | null) : null;
  }

  async savePlan(userId: string, plan: StudyPlan): Promise<void> {
    const { error } = await this.client.from('app_plans').upsert({
      user_id: userId,
      plan,
      created_at: new Date().toISOString(),
    });
    if (error) throw new Error(`[supabase] savePlan: ${error.message}`);
  }

  // ----------------------------- revision ----------------------------------

  async logRevision(userId: string, topic: string, kind: string): Promise<void> {
    await this.client.from('app_revision_log').insert({ user_id: userId, topic, kind });
  }

  async revisionHistory(userId: string): Promise<RevisionEntry[]> {
    const { data } = await this.client
      .from('app_revision_log')
      .select('topic, kind, at')
      .eq('user_id', userId)
      .order('at', { ascending: false })
      .limit(200);
    return ((data ?? []) as RevisionEntry[]).slice().reverse();
  }

  // --------------------------- password reset -------------------------------

  async createResetCode(userId: string): Promise<string | null> {
    const u = await this.findUserById(userId);
    if (!u) return null;
    const code = crypto.randomInt(100000, 1000000).toString();
    await this.client.from('app_reset_codes').upsert({
      user_id: userId,
      code,
      expires_at: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
    });
    return code;
  }

  async consumeResetCode(userId: string, code: string): Promise<boolean> {
    const { data } = await this.client
      .from('app_reset_codes')
      .select('code, expires_at')
      .eq('user_id', userId)
      .maybeSingle();
    if (!data || data.code !== code) return false;

    await this.client.from('app_reset_codes').delete().eq('user_id', userId);
    return new Date(data.expires_at as string).getTime() >= Date.now();
  }
}
