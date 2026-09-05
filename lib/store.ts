import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type {
  Attempt,
  Note,
  ProgressRecord,
  StudyPlan,
  User,
  UserProfile,
} from './types';

// ---------------------------------------------------------------------------
// JSON-file persistence layer. Mirrors db/schema.sql 1:1 so the app runs with
// zero external services. Swap these repository functions for Postgres /
// Supabase calls to go to production — nothing else changes.
// ---------------------------------------------------------------------------

interface DBShape {
  users: (User & { passwordHash: string })[];
  sessions: Record<string, { userId: string; expiresAt: string }>;
  attempts: Attempt[];
  progress: Record<string, ProgressRecord>; // userId -> record
  notes: Note[];
  plans: Record<string, StudyPlan>; // userId -> latest plan
  revisionLog: Record<string, { topic: string; kind: string; at: string }[]>;
  activities: Record<string, { date: string; seconds: number; events: string[] }[]>;
  resetCodes: Record<string, { code: string; expiresAt: string }>;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const emptyDB = (): DBShape => ({
  users: [],
  sessions: {},
  attempts: [],
  progress: {},
  notes: [],
  plans: {},
  revisionLog: {},
  activities: {},
  resetCodes: {},
});

function load(): DBShape {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      return { ...emptyDB(), ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error('[store] failed to load db, starting fresh', e);
  }
  return emptyDB();
}

// Singleton in globalThis so Next.js dev HMR doesn't fork the database.
const g = globalThis as unknown as { __gbt_db?: DBShape };

export const db: DBShape = g.__gbt_db ?? (g.__gbt_db = load());

let writeQueued = false;
export function persist() {
  if (writeQueued) return;
  writeQueued = true;
  queueMicrotask(() => {
    writeQueued = false;
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      fs.writeFileSync(DB_FILE, JSON.stringify(db));
    } catch (e) {
      console.error('[store] persist failed', e);
    }
  });
}

// ------------------------------ auth ---------------------------------------

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = stored.split(':');
  if (scheme !== 'scrypt' || !salt || !hash) return false;
  const check = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(check, 'hex'));
}

export function publicUser(u: User & { passwordHash: string }): User {
  const { passwordHash: _ph, ...rest } = u;
  return rest;
}

export function findUserByEmail(email: string) {
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string) {
  return db.users.find((u) => u.id === id);
}

export function createUser(input: {
  name: string;
  email: string;
  password: string;
  profile: UserProfile;
}): User {
  const user: User & { passwordHash: string } = {
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

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export function createSession(userId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  db.sessions[token] = {
    userId,
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
  };
  persist();
  return token;
}

export function sessionUser(token: string | undefined | null): User | null {
  if (!token) return null;
  const s = db.sessions[token];
  if (!s) return null;
  if (new Date(s.expiresAt).getTime() < Date.now()) {
    delete db.sessions[token];
    persist();
    return null;
  }
  const u = findUserById(s.userId);
  return u ? publicUser(u) : null;
}

export function destroySession(token: string) {
  if (db.sessions[token]) {
    delete db.sessions[token];
    persist();
  }
}

// ------------------------------ progress -----------------------------------

export function getProgress(userId: string): ProgressRecord {
  if (!db.progress[userId]) {
    db.progress[userId] = {
      userId,
      completedTopics: {},
      studyTime: {},
      currentSubject: null,
      currentTopic: null,
    };
  }
  return db.progress[userId];
}

export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function addActivity(
  userId: string,
  event: string,
  seconds = 0,
  date = todayKey(),
) {
  const list = db.activities[userId] ?? (db.activities[userId] = []);
  let day = list.find((a) => a.date === date);
  if (!day) {
    day = { date, seconds: 0, events: [] };
    list.push(day);
    list.sort((a, b) => a.date.localeCompare(b.date));
  }
  day.seconds += seconds;
  day.events.push(event);
  persist();
}

export function computeStreak(userId: string): number {
  const list = db.activities[userId] ?? [];
  if (list.length === 0) return 0;
  const active = new Set(list.map((a) => a.date));
  let streak = 0;
  const d = new Date();
  // streak can start from yesterday (today not studied yet)
  if (!active.has(todayKey(d))) d.setDate(d.getDate() - 1);
  while (active.has(todayKey(d))) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

// ------------------------------ attempts -----------------------------------

export function saveAttempt(attempt: Attempt) {
  db.attempts.push(attempt);
  const userId = attempt.userId;
  const list = db.activities[userId] ?? (db.activities[userId] = []);
  const date = todayKey();
  let day = list.find((a) => a.date === date);
  if (!day) {
    day = { date, seconds: 0, events: [] };
    list.push(day);
  }
  day.seconds += attempt.durationSec;
  day.events.push(`attempt:${attempt.testType}`);
  persist();
}

export function attemptsForUser(userId: string, limit = 20): Attempt[] {
  return db.attempts
    .filter((a) => a.userId === userId)
    .sort((a, b) => b.finishedAt.localeCompare(a.finishedAt))
    .slice(0, limit);
}

// ------------------------------ notes & plans -------------------------------

export function notesForUser(userId: string, topic?: string): Note[] {
  return db.notes
    .filter((n) => n.userId === userId && (!topic || n.topic === topic))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addNote(userId: string, topic: string, text: string): Note {
  const note: Note = {
    id: crypto.randomUUID(),
    userId,
    topic,
    text,
    createdAt: new Date().toISOString(),
  };
  db.notes.push(note);
  persist();
  return note;
}

export function deleteNote(userId: string, noteId: string) {
  const i = db.notes.findIndex((n) => n.id === noteId && n.userId === userId);
  if (i >= 0) {
    db.notes.splice(i, 1);
    persist();
  }
}

export function getPlan(userId: string): StudyPlan | null {
  return db.plans[userId] ?? null;
}

export function savePlan(userId: string, plan: StudyPlan) {
  db.plans[userId] = plan;
  persist();
}

export function logRevision(userId: string, topic: string, kind: string) {
  const list = db.revisionLog[userId] ?? (db.revisionLog[userId] = []);
  list.push({ topic, kind, at: new Date().toISOString() });
  if (list.length > 200) list.splice(0, list.length - 200);
  persist();
}

export function revisionHistory(userId: string) {
  return db.revisionLog[userId] ?? [];
}

// --------------------------- password reset ---------------------------------

export function createResetCode(userId: string): string | null {
  const u = findUserById(userId);
  if (!u) return null;
  const code = crypto.randomInt(100000, 1000000).toString();
  db.resetCodes[u.id] = {
    code,
    expiresAt: new Date(Date.now() + 1000 * 60 * 15).toISOString(),
  };
  persist();
  return code;
}

export function consumeResetCode(userId: string, code: string): boolean {
  const rc = db.resetCodes[userId];
  if (!rc || rc.code !== code) return false;
  if (new Date(rc.expiresAt).getTime() < Date.now()) {
    delete db.resetCodes[userId];
    persist();
    return false;
  }
  delete db.resetCodes[userId];
  persist();
  return true;
}
