-- ============================================================
-- GATE BT PERSONAL TUTOR — Database Schema
-- Target: PostgreSQL 14+ (fully compatible with Supabase)
-- ============================================================
-- In this deployment the runtime store is a JSON-file
-- persistence layer (lib/store.ts) that mirrors this schema 1:1,
-- so the app runs anywhere with zero setup. To migrate to
-- Supabase/Postgres: create these tables, copy seed content
-- (lib/content/*) and point repositories at the DB.

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- USERS
-- ------------------------------------------------------------
create table users (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null unique,
  password_hash text not null,
  college       text,
  year_of_study text,                 -- '1st year' ... 'M.Tech'
  target_exam   text,                 -- e.g. 'GATE 2027'
  daily_hours   numeric(4,1) not null default 3.0,
  daily_goal_min integer not null default 120, -- minutes
  created_at    timestamptz not null default now()
);

create table sessions (
  token      text primary key,
  user_id    uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

-- ------------------------------------------------------------
-- CATALOG (seeded from lib/content — immutable for students)
-- ------------------------------------------------------------
create table subjects (
  id        text primary key,          -- slug, e.g. 'molecular-biology'
  name      text not null,
  short     text not null,
  description text not null,
  icon      text not null,
  weight    numeric(4,1) not null default 5  -- GATE weight (marks)
);

create table topics (
  id        text primary key,          -- e.g. 'mol-replication'
  subject   text not null references subjects(id),
  name      text not null,
  level     smallint not null check (level between 1 and 4),
  priority  text not null check (priority in ('high','medium','low')),
  ord       integer not null,
  short     text not null
);

create table lessons (
  id         text primary key,         -- = topic id (1 lesson per topic v1)
  topic      text not null references topics(id),
  basic_what text, basic_why text, basic_how text, basic_where text,
  college    jsonb not null default '[]',
  advanced   jsonb not null default '[]',
  gate_high_yield jsonb not null default '[]',
  gate_traps jsonb not null default '[]',
  examples   jsonb not null default '[]',
  formulas   jsonb not null default '[]',
  key_points jsonb not null default '[]',
  revision   jsonb not null default '{}'
);

-- ------------------------------------------------------------
-- QUESTIONS
-- ------------------------------------------------------------
create table questions (
  id         text primary key,
  subject    text not null references subjects(id),
  topic      text not null references topics(id),
  level      text not null check (level in ('basic','college','gate')),
  qtype      text not null check (qtype in ('mcq','msq','nat')),
  difficulty text not null check (difficulty in ('easy','medium','hard')),
  stem       text not null,
  options    jsonb,                    -- 4 strings for mcq/msq, null for nat
  answer     jsonb not null,           -- [0,2] indices | nat numeric string
  explanation text not null,
  concept    text not null
);

create table pyqs (
  id         text primary key,
  subject    text not null references subjects(id),
  topic      text not null references topics(id),
  year       smallint,                 -- null => PYQ-style (generated)
  qtype      text not null check (qtype in ('mcq','msq','nat')),
  verified   boolean not null,         -- true = actual previous year question
  source     text not null,            -- 'GATE BT 2019' or 'PYQ-style practice'
  difficulty text not null,
  stem       text not null,
  options    jsonb,
  answer     jsonb not null,
  explanation text not null,
  concept    text not null
);

-- ------------------------------------------------------------
-- MOCK TESTS & ATTEMPTS
-- ------------------------------------------------------------
create table mock_tests (
  id            text primary key,
  name          text not null,
  description   text not null,
  duration_min  integer not null,
  sections      jsonb not null,        -- [{key,title,level,subjects,count,types}]
  question_ids  jsonb not null         -- resolved ordered list
);

create table test_attempts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references users(id) on delete cascade,
  test_id      text,                   -- mock_tests.id or 'practice:<subject>' etc.
  test_type    text not null check (test_type in ('mock','practice','pyq','numerical')),
  started_at   timestamptz not null,
  finished_at  timestamptz not null,
  duration_sec integer not null,
  score        numeric(6,2) not null,
  max_score    numeric(6,2) not null,
  correct      integer not null,
  incorrect    integer not null,
  unattempted  integer not null,
  accuracy     numeric(5,2) not null,
  subject      text,
  topic        text
);

create table user_answers (
  id          bigint generated always as identity primary key,
  attempt_id  uuid not null references test_attempts(id) on delete cascade,
  question_id text not null,
  selected    jsonb not null,          -- [1] | "3.14" | [] (unattempted)
  correct     boolean not null,
  earned      numeric(6,2) not null
);

-- ------------------------------------------------------------
-- PROGRESS / WEAK AREAS / PLANS / REVISION
-- ------------------------------------------------------------
create table progress (
  user_id        uuid not null references users(id) on delete cascade,
  completed_topics jsonb not null default '{}',  -- { topicId: isoTimestamp }
  study_time     jsonb not null default '{}',    -- { 'YYYY-MM-DD': seconds }
  current_subject text,
  current_topic  text,
  streak_last    date,
  primary key (user_id)
);

create table weak_areas (
  user_id uuid not null references users(id) on delete cascade,
  topic   text not null references topics(id),
  score   numeric(5,2) not null,
  sample  integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic)
);

create table study_plans (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references users(id) on delete cascade,
  exam_date  date not null,
  hours_day  numeric(4,1) not null,
  level      text not null,
  plan       jsonb not null,           -- {daily[], weekly[], subjectOrder[], revision[], mocks[]}
  created_at timestamptz not null default now()
);

create table revision_history (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references users(id) on delete cascade,
  topic      text not null,
  kind       text not null check (kind in ('quick','one_minute','formula','confused')),
  created_at timestamptz not null default now()
);

create table notes (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid not null references users(id) on delete cascade,
  topic     text not null,
  text      text not null,
  created_at timestamptz not null default now()
);
