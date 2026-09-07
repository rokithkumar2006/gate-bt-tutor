// Single import surface for API routes: data-store + HTTP helpers.
//
// Routes talk to the async `store` object, which is backed by either Supabase
// or the JSON file store depending on env (see lib/db/index.ts). The legacy
// synchronous exports from lib/store.ts are deliberately NOT re-exported here
// any more — mixing the two would let a route silently read stale in-memory
// state while writing to Postgres.
export { store, storeName, storageMisconfigured, isServerlessHost, hashPassword, publicUser, todayKey, verifyPassword } from './db';
export type { DataStore, RevisionEntry, StoredUser } from './db';
export * from './api-helpers';
