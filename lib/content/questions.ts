import type { Question } from '../types';
import { QUESTIONS_1 } from './questions-1';
import { QUESTIONS_2 } from './questions-2';

export const QUESTIONS: Question[] = [...QUESTIONS_1, ...QUESTIONS_2];

export const questionById = new Map(QUESTIONS.map((q) => [q.id, q]));

export function questionsForSubject(subject: string, level?: Question['level']) {
  return QUESTIONS.filter(
    (q) => q.subject === subject && (!level || q.level === level),
  );
}

export function questionsForTopic(topic: string, level?: Question['level']) {
  return QUESTIONS.filter(
    (q) => q.topic === topic && (!level || q.level === level),
  );
}

// Deterministic pseudo-random selection (stable per seed) so mock tests
// resolve to the same questions across requests.
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWith<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * `level: null` (or omitted) means "any level" — previously callers had to pass
 * a concrete level, so the practice page's "Mix of all levels" option silently
 * collapsed to 'basic' and searched only ~18% of the bank.
 */
export function pickQuestions(opts: {
  subjects: string[];
  level?: Question['level'] | null;
  types?: Question['type'][];
  count: number;
  seed: number;
  excludeIds?: Set<string>;
}): Question[] {
  return selectQuestions(opts).questions;
}

export interface SelectionResult {
  questions: Question[];
  /** Questions matching the exact filters, before any widening. */
  exactMatches: number;
  /** True when the level filter had to be relaxed to reach `count`. */
  widenedLevel: boolean;
  /** Total available under the exact filters (what the UI should report). */
  available: number;
}

/**
 * Filter → shuffle → take. Returns metadata so the UI can tell the user when
 * fewer questions exist than they asked for, instead of silently under-filling.
 *
 * Guarantees: no duplicate ids, respects `excludeIds`, and only ever widens the
 * LEVEL (never subject or type) — and reports it when it does.
 */
export function selectQuestions(opts: {
  subjects: string[];
  level?: Question['level'] | null;
  types?: Question['type'][];
  count: number;
  seed: number;
  excludeIds?: Set<string>;
}): SelectionResult {
  const rnd = mulberry32(opts.seed);
  const wantTypes = opts.types && opts.types.length > 0 ? opts.types : null;

  const matchesBase = (q: Question) =>
    opts.subjects.includes(q.subject) &&
    (!wantTypes || wantTypes.includes(q.type)) &&
    !(opts.excludeIds && opts.excludeIds.has(q.id));

  // Exact pool: honours the level filter when one was given.
  const exactPool = QUESTIONS.filter((q) => matchesBase(q) && (!opts.level || q.level === opts.level));

  const picked = shuffleWith(exactPool, rnd).slice(0, opts.count);
  const exactMatches = exactPool.length;
  let widenedLevel = false;

  // Top up from other levels only if the user pinned a level and it ran dry.
  if (picked.length < opts.count && opts.level) {
    const used = new Set(picked.map((q) => q.id));
    const others = QUESTIONS.filter((q) => matchesBase(q) && q.level !== opts.level && !used.has(q.id));
    for (const q of shuffleWith(others, rnd)) {
      if (picked.length >= opts.count) break;
      picked.push(q);
      widenedLevel = true;
    }
  }

  return { questions: picked, exactMatches, widenedLevel, available: exactMatches };
}

/** How many questions match a filter combination — used to drive the UI. */
export function countMatching(opts: {
  subjects: string[];
  level?: Question['level'] | null;
  types?: Question['type'][];
}): number {
  const wantTypes = opts.types && opts.types.length > 0 ? opts.types : null;
  return QUESTIONS.filter(
    (q) =>
      opts.subjects.includes(q.subject) &&
      (!opts.level || q.level === opts.level) &&
      (!wantTypes || wantTypes.includes(q.type)),
  ).length;
}
