-- ============================================================
-- GATE BT PERSONAL TUTOR — Supabase runtime schema
-- ============================================================
-- Run this once in your Supabase project:
--   Dashboard → SQL Editor → New query → paste → Run
--
-- Scope: this covers the RUNTIME (per-user) tables only — the data
-- the app actually writes. The course catalog (subjects, topics,
-- lessons, questions, PYQs, mock tests) stays in lib/content/* as
-- code: it is static, versioned with the app and needs no database.
-- db/schema.sql remains the full aspirational relational model.
--
-- Shapes mirror lib/store.ts 1:1 (jsonb where the app stores nested
-- objects) so the JSON and Supabase backends stay interchangeable.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- USERS & SESSIONS
-- ------------------------------------------------------------
create table if not exists app_users (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null unique,
  password_hash text not null,
  profile       jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

-- Case-insensitive email lookup (login normalises to lowercase).
create unique index if not exists app_users_email_lower_idx
  on app_users (lower(email));

create table if not exists app_sessions (
  token      text primary key,
  user_id    uuid not null references app_users(id) on delete cascade,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists app_sessions_user_idx on app_sessions (user_id);
create index if not exists app_sessions_expires_idx on app_sessions (expires_at);

-- ------------------------------------------------------------
-- PROGRESS & ACTIVITY
-- ------------------------------------------------------------
create table if not exists app_progress (
  user_id          uuid primary key references app_users(id) on delete cascade,
  completed_topics jsonb not null default '{}'::jsonb,  -- { topicId: isoTimestamp }
  study_time       jsonb not null default '{}'::jsonb,  -- { 'YYYY-MM-DD': seconds }
  current_subject  text,
  current_topic    text,
  updated_at       timestamptz not null default now()
);

-- One row per user per day; drives the streak calculation.
create table if not exists app_activity (
  user_id uuid not null references app_users(id) on delete cascade,
  day     date not null,
  seconds integer not null default 0,
  events  jsonb not null default '[]'::jsonb,
  primary key (user_id, day)
);

-- ------------------------------------------------------------
-- ATTEMPTS
-- ------------------------------------------------------------
-- The Attempt object is rich and evolving (per-question answers,
-- scoring breakdown), so it is stored whole as jsonb. The columns
-- lifted out are the ones actually queried/sorted on.
create table if not exists app_attempts (
  id          text primary key,
  user_id     uuid not null references app_users(id) on delete cascade,
  finished_at timestamptz not null,
  data        jsonb not null
);

create index if not exists app_attempts_user_finished_idx
  on app_attempts (user_id, finished_at desc);

-- ------------------------------------------------------------
-- NOTES / PLANS / REVISION / RESET CODES
-- ------------------------------------------------------------
create table if not exists app_notes (
  id         text primary key,
  user_id    uuid not null references app_users(id) on delete cascade,
  topic      text not null,
  text       text not null,
  created_at timestamptz not null default now()
);

create index if not exists app_notes_user_created_idx
  on app_notes (user_id, created_at desc);

-- Latest plan per user (the app keeps exactly one).
create table if not exists app_plans (
  user_id    uuid primary key references app_users(id) on delete cascade,
  plan       jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists app_revision_log (
  id      bigint generated always as identity primary key,
  user_id uuid not null references app_users(id) on delete cascade,
  topic   text not null,
  kind    text not null,
  at      timestamptz not null default now()
);

create index if not exists app_revision_log_user_idx
  on app_revision_log (user_id, at desc);

create table if not exists app_reset_codes (
  user_id    uuid primary key references app_users(id) on delete cascade,
  code       text not null,
  expires_at timestamptz not null
);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------
-- The app authenticates users itself (scrypt passwords + its own
-- session tokens) and talks to Supabase with the SERVICE ROLE key
-- from server-side route handlers only. The service role bypasses
-- RLS, so enabling RLS with no permissive policy is the correct,
-- safe default: it means a leaked ANON key grants no data access.
--
-- Do NOT put the service role key in NEXT_PUBLIC_* — it must never
-- reach the browser.
alter table app_users       enable row level security;
alter table app_sessions    enable row level security;
alter table app_progress    enable row level security;
alter table app_activity    enable row level security;
alter table app_attempts    enable row level security;
alter table app_notes       enable row level security;
alter table app_plans       enable row level security;
alter table app_revision_log enable row level security;
alter table app_reset_codes enable row level security;
