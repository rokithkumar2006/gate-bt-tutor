-- ============================================================
-- GATE BT PERSONAL TUTOR — Supabase Auth profile table
-- ============================================================
-- Run this in: Supabase dashboard -> SQL Editor -> New query -> Run
--
-- Passwords are NOT stored here. Supabase Auth owns them in auth.users.
-- This table holds only the profile fields the signup form collects.
-- ============================================================

create table if not exists user_profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  full_name         text not null,
  email             text not null,
  college           text default '',
  year_of_study     text default '',
  target_exam       text default '',
  daily_study_hours numeric(4,1) not null default 2,
  daily_goal_min    integer not null default 120,
  created_at        timestamptz not null default now()
);

create unique index if not exists user_profiles_email_lower_idx
  on user_profiles (lower(email));

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ------------------------------------------------------------
-- With RLS on and these policies, the public anon key can only ever reach the
-- signed-in user's OWN row. The server's service role key bypasses RLS for
-- trusted work (creating the profile during signup).
alter table user_profiles enable row level security;

drop policy if exists "own profile read"   on user_profiles;
drop policy if exists "own profile update" on user_profiles;
drop policy if exists "own profile insert" on user_profiles;

create policy "own profile read"
  on user_profiles for select
  using (auth.uid() = id);

create policy "own profile update"
  on user_profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "own profile insert"
  on user_profiles for insert
  with check (auth.uid() = id);

-- ------------------------------------------------------------
-- NOTE ON THE REST OF THE APP DATA
-- ------------------------------------------------------------
-- Progress, attempts, notes, plans and revision history live in the app_*
-- tables created by db/supabase-schema.sql. Run that file too if you want
-- study data to persist as well as accounts.
--
-- The app_* tables key off the user id, which is the same uuid as
-- user_profiles.id / auth.users.id, so the two schemas line up.

-- ------------------------------------------------------------
-- IMPORTANT: if you ALSO ran db/supabase-schema.sql
-- ------------------------------------------------------------
-- Those app_* tables reference app_users(id). With Supabase Auth the user id
-- comes from auth.users instead, so the foreign keys would reject every write.
-- Repoint them at auth.users (safe to run more than once):

do $$
declare t text;
begin
  foreach t in array array[
    'app_sessions','app_progress','app_activity','app_attempts',
    'app_notes','app_plans','app_revision_log','app_reset_codes'
  ] loop
    if to_regclass(t) is not null then
      execute format('alter table %I drop constraint if exists %I', t, t || '_user_id_fkey');
      execute format(
        'alter table %I add constraint %I foreign key (user_id) references auth.users(id) on delete cascade',
        t, t || '_user_id_fkey'
      );
    end if;
  end loop;
end $$;
