import type { Topic, Subject } from '../types';
import { SUBJECTS } from './subjects';
import {
  TOPICS_AN,
  TOPICS_BIO,
  TOPICS_INF,
  TOPICS_INS,
} from './topics-1';
import {
  TOPICS_BAE,
  TOPICS_CEL,
  TOPICS_ENV,
  TOPICS_GEN,
} from './topics-2';
import {
  TOPICS_IMM,
  TOPICS_MIB,
  TOPICS_MIC,
  TOPICS_MOL,
} from './topics-3';
import {
  TOPICS_PLB,
  TOPICS_PRO,
  TOPICS_RDT,
  TOPICS_TRP,
} from './topics-4';
import { TOPICS_EMT, TOPICS_APT } from './topics-5';

export const TOPICS: Topic[] = [
  ...TOPICS_AN,
  ...TOPICS_BIO,
  ...TOPICS_INF,
  ...TOPICS_INS,
  ...TOPICS_BAE,
  ...TOPICS_CEL,
  ...TOPICS_ENV,
  ...TOPICS_GEN,
  ...TOPICS_IMM,
  ...TOPICS_MIB,
  ...TOPICS_MIC,
  ...TOPICS_MOL,
  ...TOPICS_PLB,
  ...TOPICS_PRO,
  ...TOPICS_RDT,
  ...TOPICS_TRP,
  ...TOPICS_EMT,
  ...TOPICS_APT,
];

export const topicById = new Map(TOPICS.map((t) => [t.id, t]));

export function topicsForSubject(slug: string): Topic[] {
  return TOPICS.filter((t) => t.subject === slug).sort(
    (a, b) => a.level - b.level || a.ord - b.ord,
  );
}

export interface SubjectRoadmap {
  subject: Subject;
  topics: Topic[];
  byLevel: Record<number, Topic[]>;
  total: number;
  high: number;
  medium: number;
  low: number;
}

export function subjectRoadmap(slug: string): SubjectRoadmap | null {
  const subject = SUBJECTS.find((s) => s.slug === slug);
  if (!subject) return null;
  const topics = topicsForSubject(slug);
  const byLevel: Record<number, Topic[]> = { 1: [], 2: [], 3: [], 4: [] };
  for (const t of topics) byLevel[t.level].push(t);
  return {
    subject,
    topics,
    byLevel,
    total: topics.length,
    high: topics.filter((t) => t.priority === 'high').length,
    medium: topics.filter((t) => t.priority === 'medium').length,
    low: topics.filter((t) => t.priority === 'low').length,
  };
}

export const LEVEL_NAMES: Record<number, string> = {
  1: 'Basic Foundation',
  2: 'Intermediate',
  3: 'Advanced',
  4: 'GATE Focus',
};
