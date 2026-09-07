// Backend selector.
//
// Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY to use Postgres; otherwise the
// app silently falls back to the JSON file store, so a fresh clone still runs
// with zero configuration. Nothing else in the codebase knows which is active.
import type { DataStore } from './types';
import { JsonStore } from './json-store';
import { SupabaseStore, supabaseConfigured } from './supabase-store';

const g = globalThis as unknown as { __gbt_store?: DataStore };

/**
 * True on hosts with a read-only / ephemeral filesystem (Vercel, Netlify, most
 * serverless runtimes). There the JSON file store CANNOT persist: every write
 * to `data/db.json` fails or lands in a per-invocation sandbox, so accounts
 * vanish between requests and login always reports "Invalid email or password".
 */
export function isServerlessHost(): boolean {
  return Boolean(process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
}

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

  if (isServerlessHost()) {
    // Fail loudly in the logs rather than pretending the app works. Without a
    // database the deployment can never keep a user account.
    console.error(
      '[store] FATAL CONFIG: running on a serverless host with no database.\n' +
        '  SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY are not set, so the app fell\n' +
        '  back to the JSON file store — but this filesystem is read-only/ephemeral.\n' +
        '  Signup appears to succeed, then the account is gone on the next request and\n' +
        '  login returns "Invalid email or password".\n' +
        '  Fix: add both env vars in your host dashboard and redeploy. See docs/SUPABASE.md.',
    );
  }

  return new JsonStore();
}

export const store: DataStore = g.__gbt_store ?? (g.__gbt_store = build());

export function storeName(): string {
  return store.name;
}

/**
 * True when the app cannot possibly persist data: a serverless host with no
 * database configured. Used to replace the misleading "Invalid email or
 * password" with an accurate message.
 */
export function storageMisconfigured(): boolean {
  return store.name === 'json-file' && isServerlessHost();
}

export type { DataStore, RevisionEntry, StoredUser } from './types';
export { hashPassword, publicUser, todayKey, verifyPassword } from './shared';
