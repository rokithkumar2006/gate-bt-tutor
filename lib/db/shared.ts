// Backend-agnostic helpers used by both the JSON and Supabase stores.
import crypto from 'crypto';
import type { User } from '../types';
import type { StoredUser } from './types';

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

/** Strip the password hash before a user object is ever serialised to a client. */
export function publicUser(u: StoredUser): User {
  const { passwordHash: _ph, ...rest } = u;
  return rest;
}

export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}
