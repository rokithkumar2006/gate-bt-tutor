// Backend selector.
//
// Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY to use Postgres; otherwise the
// app silently falls back to the JSON file store, so a fresh clone still runs
// with zero configuration. Nothing else in the codebase knows which is active.
import type { DataStore } from './types';
import { JsonStore } from './json-store';
import { SupabaseStore, supabaseConfigured } from './supabase-store';

const g = globalThis as unknown as { __gbt_store?: DataStore };

function build(): DataStore {
  if (supabaseConfigured()) {
    try {
      const store = new SupabaseStore();
      console.log('[store] using Supabase backend');
      return store;
    } catch (e) {
      // A misconfigured URL should degrade to a working app, not a crash loop.
      console.error('[store] Supabase init failed, falling back to JSON file store:', e);
    }
  }
  return new JsonStore();
}

export const store: DataStore = g.__gbt_store ?? (g.__gbt_store = build());

export function storeName(): string {
  return store.name;
}

export type { DataStore, RevisionEntry, StoredUser } from './types';
export { hashPassword, publicUser, todayKey, verifyPassword } from './shared';
