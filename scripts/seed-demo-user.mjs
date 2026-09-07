// Seeds a known demo account into the local JSON database.
//
// The dev sandbox wipes the gitignored `data/` directory between sessions,
// which silently destroys every signed-up account. Run this after starting
// fresh so there is always a working login:
//
//   node scripts/seed-demo-user.mjs
//
// Credentials: demo@demo.com / demo1234
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const EMAIL = process.env.SEED_EMAIL || 'demo@demo.com';
const PASSWORD = process.env.SEED_PASSWORD || 'demo1234';
const NAME = process.env.SEED_NAME || 'Demo Student';

// Must match hashPassword() in lib/store.ts exactly.
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

const emptyDB = () => ({
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

let db = emptyDB();
if (fs.existsSync(DB_FILE)) {
  try {
    db = { ...emptyDB(), ...JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) };
  } catch {
    console.warn('[seed] existing db.json unreadable — starting fresh');
  }
}

if (db.users.some((u) => u.email.toLowerCase() === EMAIL.toLowerCase())) {
  console.log(`[seed] ${EMAIL} already exists — nothing to do.`);
  process.exit(0);
}

const user = {
  id: crypto.randomUUID(),
  name: NAME,
  email: EMAIL,
  createdAt: new Date().toISOString(),
  profile: { targetYear: 2026, dailyHours: 3, level: 1 },
  passwordHash: hashPassword(PASSWORD),
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

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.writeFileSync(DB_FILE, JSON.stringify(db));

console.log(`[seed] created ${EMAIL} / ${PASSWORD}`);
