// The persistence contract shared by both backends.
//
// Every method is async. The JSON backend resolves immediately; the Supabase
// backend performs real network calls. Making the *interface* async — rather
// than only the Supabase implementation — is what lets the two be swapped with
// a single env var and no route changes.
import type { Attempt, Note, ProgressRecord, StudyPlan, User, UserProfile } from '../types';

export type StoredUser = User & { passwordHash: string };

export interface RevisionEntry {
  topic: string;
  kind: string;
  at: string;
}

export interface DataStore {
  /** Human-readable backend name, surfaced by /api/tutor/health. */
  readonly name: string;

  // users
  findUserByEmail(email: string): Promise<StoredUser | null>;
  findUserById(id: string): Promise<StoredUser | null>;
  createUser(input: { name: string; email: string; password: string; profile: UserProfile }): Promise<User>;
  updateUser(id: string, patch: { name?: string; profile?: UserProfile; passwordHash?: string }): Promise<void>;

  // sessions
  createSession(userId: string): Promise<string>;
  sessionUser(token: string | undefined | null): Promise<User | null>;
  destroySession(token: string): Promise<void>;

  // progress + activity
  getProgress(userId: string): Promise<ProgressRecord>;
  saveProgress(progress: ProgressRecord): Promise<void>;
  addActivity(userId: string, event: string, seconds?: number, date?: string): Promise<void>;
  computeStreak(userId: string): Promise<number>;

  // attempts
  saveAttempt(attempt: Attempt): Promise<void>;
  attemptsForUser(userId: string, limit?: number): Promise<Attempt[]>;

  // notes
  notesForUser(userId: string, topic?: string): Promise<Note[]>;
  addNote(userId: string, topic: string, text: string): Promise<Note>;
  deleteNote(userId: string, noteId: string): Promise<void>;

  // plans
  getPlan(userId: string): Promise<StudyPlan | null>;
  savePlan(userId: string, plan: StudyPlan): Promise<void>;

  // revision
  logRevision(userId: string, topic: string, kind: string): Promise<void>;
  revisionHistory(userId: string): Promise<RevisionEntry[]>;

  // password reset
  createResetCode(userId: string): Promise<string | null>;
  consumeResetCode(userId: string, code: string): Promise<boolean>;
}
