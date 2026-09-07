# Supabase setup

The app has two interchangeable storage backends:

| Backend | When it is used | Where data lives |
|---|---|---|
| **JSON file** (default) | no Supabase env vars | `data/db.json` (gitignored) |
| **Supabase** | `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set | Postgres |

No code changes are needed to switch — the app picks the backend at startup
(`lib/db/index.ts`) and logs which one it chose. Check the active backend any
time at **`GET /api/tutor/health`** → `"storage": "supabase" | "json-file"`.

> **Why migrate?** The JSON file lives in the sandbox filesystem, which is wiped
> between sessions — every account and all progress disappears with it.
> Supabase makes data permanent and survives redeploys.

---

## 1. Create the project

1. Sign up at [supabase.com](https://supabase.com) (free tier is enough).
2. **New project** → pick a name, a strong database password and the region
   closest to you (`Southeast Asia (Singapore)` is nearest to India).
3. Wait ~2 minutes for provisioning.

## 2. Create the tables

Open **SQL Editor → New query**, paste the whole of
[`db/supabase-schema.sql`](../db/supabase-schema.sql) and hit **Run**.

It creates nine `app_*` tables (users, sessions, progress, activity, attempts,
notes, plans, revision log, reset codes) and enables Row Level Security on all
of them. The statements are `create table if not exists`, so re-running is safe.

## 3. Copy the credentials

**Project Settings → API**:

| Value in the dashboard | Env var |
|---|---|
| Project URL | `SUPABASE_URL` |
| `service_role` secret | `SUPABASE_SERVICE_ROLE_KEY` |

Add them to `.env.local`:

```bash
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

> ⚠️ **The service role key bypasses all security rules.** Keep it server-side
> only — never prefix it with `NEXT_PUBLIC_`, never commit it, never paste it
> into client code. `.env.local` is gitignored. Use the `anon` key only if you
> later move to Supabase Auth with RLS policies.

## 4. Restart and seed

```bash
npm run dev          # look for: [store] using Supabase backend
npm run seed         # creates demo@demo.com / demo1234 in Postgres
```

Confirm with `GET /api/tutor/health` → `"storage": "supabase"`.

---

## How it works

```
route handler
   └── store  (lib/db/index.ts picks one)
         ├── SupabaseStore  → Postgres
         └── JsonStore      → data/db.json
```

Every method on the `DataStore` interface (`lib/db/types.ts`) is **async**, so
both backends are drop-in equivalents. Route handlers only ever import `store`
from `@/lib/store-helpers` — they never know which one is live.

### Security model

The app does its own authentication (scrypt password hashes + its own session
tokens in `app_sessions`), and reaches Supabase exclusively from server-side
route handlers using the service role key.

RLS is therefore enabled with **no permissive policies**: the service role
bypasses RLS, while a leaked `anon` key grants access to nothing. If you later
switch to Supabase Auth, add per-user policies before relaxing this.

### Notes on the schema

- Nested app objects (`completedTopics`, `studyTime`, plans, whole attempts) are
  stored as `jsonb`, mirroring `lib/store.ts` exactly. Columns are lifted out
  only where they are queried or sorted on (`user_id`, `finished_at`, `day`).
- `app_users.email` has a `lower(email)` unique index, matching the app's
  case-insensitive login.
- The course catalog (subjects, topics, questions, PYQs, mock tests) is **not**
  in the database. It is static content in `lib/content/*`, versioned with the
  code. `db/schema.sql` keeps the fuller relational model for reference.

### Migrating existing JSON data

The JSON store is only ever populated locally, so there is usually nothing to
move. If you do need to, read `data/db.json` and insert the `users`, `progress`,
`notes`, `plans` and `attempts` collections into the matching `app_*` tables —
the field names line up one-to-one. Password hashes are portable as-is (same
scrypt format), so existing logins keep working.

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `health` still says `json-file` | Both env vars must be set; restart the dev server (env is read at startup) |
| `[store] Supabase init failed` | Malformed `SUPABASE_URL` — it must include `https://` |
| `relation "app_users" does not exist` | Step 2 was skipped — run `db/supabase-schema.sql` |
| Login works, data never saves | Using the `anon` key instead of `service_role` (RLS blocks writes) |
| `fetch failed` locally | Network/proxy blocking `*.supabase.co` |
