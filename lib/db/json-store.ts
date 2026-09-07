// JSON-file implementation of DataStore — the zero-setup default.
//
// This wraps the original lib/store.ts logic behind the async interface so the
// app behaves identically whether or not Supabase is configured. Data lives in
// data/db.json (gitignored). Note that in ephemeral sandboxes that directory is
// wiped between sessions, which is precisely why the Supabase backend exists.
import crypto from 'crypto';
import type { Attempt, Note, ProgressRecord, StudyPlan, User, UserProfile } from '../types';
import type { DataStore, RevisionEntry, StoredUser } from './types';
import { hashPassword, publicUser, todayKey } from './shared';
import {
  db,
  persist,
  createSession as syncCreateSession,
  sessionUser as syncSessionUser,
  destroySession as syncDestroySession,
  getProgress as syncGetProgress,
  addActivity as syncAddActivity,
  computeStreak as syncComputeStreak,
  saveAttempt as syncSaveAttempt,
  attemptsForUser as syncAttemptsForUser,
  notesForUser as syncNotesForUser,
  addNote as syncAddNote,
  deleteNote as syncDeleteNote,
  getPlan as syncGetPlan,
  savePlan as syncSavePlan,
  logRevision as syncLogRevision,
  revisionHistory as syncRevisionHistory,
  createResetCode as syncCreateResetCode,
  consumeResetCode as syncConsumeResetCode,
} from '../store';

export class JsonStore implements DataStore {
  readonly name = 'json-file';

  async findUserByEmail(email: string): Promise<StoredUser | null> {
    return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
  }

  async findUserById(id: string): Promise<StoredUser | null> {
    return db.users.find((u) => u.id === id) ?? null;
  }

  async createUser(input: {
    name: string;
    email: string;
    password: string;
    profile: UserProfile;
  }): Promise<User> {
    const user: StoredUser = {
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      createdAt: new Date().toISOString(),
      profile: input.profile,
      passwordHash: hashPassword(input.password),
    };
    db.users.push(user);
    db.progress[user.id] = {
      userId: user.id,
      completedTopics: {},
      studyTime: {},
      currentSubject: null,
      currentTopic: null,
    };
    db.activities[user.id] = [];
    db.revisionLog[user.id] = [];
    persist();
    return publicUser(user);
  }

  async updateUser(
    id: string,
    patch: { name?: string; profile?: UserProfile; passwordHash?: string },
  ): Promise<void> {
    const stored = db.users.find((u) => u.id === id);
    if (!stored) return;
    if (patch.name !== undefined) stored.name = patch.name;
    if (patch.profile !== undefined) stored.profile = patch.profile;
    if (patch.passwordHash !== undefined) stored.passwordHash = patch.passwordHash;
    persist();
  }

  async createSession(userId: string): Promise<string> {
    return syncCreateSession(userId);
  }

  async sessionUser(token: string | undefined | null): Promise<User | null> {
    return syncSessionUser(token);
  }

  async destroySession(token: string): Promise<void> {
    syncDestroySession(token);
  }

  async getProgress(userId: string): Promise<ProgressRecord> {
    return syncGetProgress(userId);
  }

  async saveProgress(progress: ProgressRecord): Promise<void> {
    // The JSON store hands out live object references, so callers mutating the
    // record have already updated it in memory; just flush to disk.
    db.progress[progress.userId] = progress;
    persist();
  }

  async addActivity(userId: string, event: string, seconds = 0, date = todayKey()): Promise<void> {
    syncAddActivity(userId, event, seconds, date);
  }

  async computeStreak(userId: string): Promise<number> {
    return syncComputeStreak(userId);
  }

  async saveAttempt(attempt: Attempt): Promise<void> {
    syncSaveAttempt(attempt);
  }

  async attemptsForUser(userId: string, limit = 20): Promise<Attempt[]> {
    return syncAttemptsForUser(userId, limit);
  }

  async notesForUser(userId: string, topic?: string): Promise<Note[]> {
    return syncNotesForUser(userId, topic);
  }

  async addNote(userId: string, topic: string, text: string): Promise<Note> {
    return syncAddNote(userId, topic, text);
  }

  async deleteNote(userId: string, noteId: string): Promise<void> {
    syncDeleteNote(userId, noteId);
  }

  async getPlan(userId: string): Promise<StudyPlan | null> {
    return syncGetPlan(userId);
  }

  async savePlan(userId: string, plan: StudyPlan): Promise<void> {
    syncSavePlan(userId, plan);
  }

  async logRevision(userId: string, topic: string, kind: string): Promise<void> {
    syncLogRevision(userId, topic, kind);
  }

  async revisionHistory(userId: string): Promise<RevisionEntry[]> {
    return syncRevisionHistory(userId);
  }

  async createResetCode(userId: string): Promise<string | null> {
    return syncCreateResetCode(userId);
  }

  async consumeResetCode(userId: string, code: string): Promise<boolean> {
    return syncConsumeResetCode(userId, code);
  }
}
