// Seeds a known demo account into whichever backend is configured.
//
// - Supabase (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY set) -> app_users table
// - otherwise                                               -> data/db.json
//
// The dev sandbox wipes the gitignored `data/` directory between sessions,
// which silently destroys every JSON-backed account. Run this to get a working
// login back:
//
//   npm run seed
//
// Credentials: demo@demo.com / demo1234  (override with SEED_EMAIL etc.)
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Load .env.local so the script sees the same config as the app.
const ENV_FILE = path.join(process.cwd(), '.env.local');
if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const EMAIL = process.env.SEED_EMAIL || 'demo@demo.com';
const PASSWORD = process.env.SEED_PASSWORD || 'demo1234';
const NAME = process.env.SEED_NAME || 'Demo Student';

const PROFILE = {
  college: '',
  yearOfStudy: '',
  targetExam: 'GATE 2026',
  dailyHours: 3,
  dailyGoalMin: 120,
};

// Must match hashPassword() in lib/db/shared.ts exactly.
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt:${salt}:${hash}`;
}

async function seedSupabase() {
  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const { data: existing } = await client
    .from('app_users')
    .select('id')
    .ilike('email', EMAIL)
    .maybeSingle();

  if (existing) {
    console.log(`[seed] ${EMAIL} already exists in Supabase — nothing to do.`);
    return;
  }

  const { data, error } = await client
    .from('app_users')
    .insert({ name: NAME, email: EMAIL, password_hash: hashPassword(PASSWORD), profile: PROFILE })
    .select('id')
    .single();

  if (error) {
    console.error(`[seed] Supabase insert failed: ${error.message}`);
    process.exit(1);
  }

  await client.from('app_progress').upsert({ user_id: data.id });
  console.log(`[seed] created ${EMAIL} / ${PASSWORD} in Supabase`);
}

function seedJson() {
  const DATA_DIR = path.join(process.cwd(), 'data');
  const DB_FILE = path.join(DATA_DIR, 'db.json');

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
    return;
  }

  const user = {
    id: crypto.randomUUID(),
    name: NAME,
    email: EMAIL,
    createdAt: new Date().toISOString(),
    profile: PROFILE,
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
  console.log(`[seed] created ${EMAIL} / ${PASSWORD} in data/db.json`);
}

if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  await seedSupabase();
} else {
  seedJson();
}
