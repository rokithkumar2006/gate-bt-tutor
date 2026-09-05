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

export function pickQuestions(opts: {
  subjects: string[];
  level: Question['level'];
  types?: Question['type'][];
  count: number;
  seed: number;
  excludeIds?: Set<string>;
}): Question[] {
  const rnd = mulberry32(opts.seed);
  const pool = QUESTIONS.filter(
    (q) =>
      opts.subjects.includes(q.subject) &&
      q.level === opts.level &&
      (!opts.types || opts.types.length === 0 || opts.types.includes(q.type)) &&
      !(opts.excludeIds && opts.excludeIds.has(q.id)),
  );
  // fisher–yates partial shuffle
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const picked = arr.slice(0, opts.count);
  // top-up from adjacent pools if a strict filter left too few
  if (picked.length < opts.count) {
    const used = new Set(picked.map((q) => q.id));
    const fallback = QUESTIONS.filter(
      (q) =>
        opts.subjects.includes(q.subject) &&
        q.level === opts.level &&
        !used.has(q.id) &&
        !(opts.excludeIds && opts.excludeIds.has(q.id)),
    );
    for (const q of fallback) {
      if (picked.length >= opts.count) break;
      picked.push(q);
    }
  }
  return picked;
}
