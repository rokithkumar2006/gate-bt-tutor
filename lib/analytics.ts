// Performance analytics — pure functions over saved attempts.
// Thresholds (spec): accuracy <50% with ≥2 samples = WEAK; 50–75 = average; >75 = strong.

import type { Attempt } from './types';
import { questionById } from './content/questions';
import { pyqById } from './content/pyqs';
import { subjectBySlug } from './content/subjects';
import { topicById } from './content/topics';
import { MOCK_TESTS } from './content/mockTests';

export type AreaStatus = 'strong' | 'average' | 'weak' | 'none';

export interface SubjectStat {
  slug: string;
  name: string;
  attempted: number;
  correct: number;
  accuracy: number; // 0-100
  status: AreaStatus;
}

export interface TopicStat extends SubjectStat {
  topic: string;
  topicName: string;
  levels: number[]; // levels of attempted questions
}

export interface ScorePoint {
  date: string; // yyyy-mm-dd
  ts: number;
  testId: string;
  testName: string;
  testType: Attempt['testType'];
  score: number;
  maxScore: number;
  pct: number;
  accuracy: number;
}

export interface OverallStat {
  attempts: number;
  attemptedQuestions: number;
  correct: number;
  accuracy: number;
  averagePct: number;
  bestPct: number;
  totalEarned: number;
  totalMax: number;
}

export interface Analytics {
  overall: OverallStat;
  bySubject: SubjectStat[];
  byTopic: TopicStat[];
  scoreHistory: ScorePoint[];
  weak: TopicStat[];
  average: TopicStat[];
  strong: TopicStat[];
}

function statusFor(accuracy: number, samples: number): AreaStatus {
  if (samples === 0) return 'none';
  if (samples >= 2 && accuracy < 50) return 'weak';
  if (accuracy > 75) return 'strong';
  return 'average';
}

function questionMeta(questionId: string): { subject: string; topic: string; level: number } | null {
  const q = questionById.get(questionId) ?? (pyqById.get(questionId) as unknown as { subject: string; topic: string; level: number } | undefined);
  if (!q) return null;
  return { subject: q.subject, topic: q.topic, level: (q as { level: number }).level };
}

export function computeAnalytics(userId: string, attemptsIn: Attempt[]): Analytics {
  const attempts = [...attemptsIn].sort((a, b) => a.finishedAt.localeCompare(b.finishedAt));

  const subjMap = new Map<string, { attempted: number; correct: number }>();
  const topicMap = new Map<string, { attempted: number; correct: number; levels: Set<number> }>();

  for (const att of attempts) {
    for (const ans of att.answers) {
      if (!ans.attempted) continue;
      const meta = questionMeta(ans.questionId);
      if (!meta) continue;
      const s = subjMap.get(meta.subject) ?? { attempted: 0, correct: 0 };
      s.attempted++;
      if (ans.correct) s.correct++;
      subjMap.set(meta.subject, s);

      const key = `${meta.subject}::${meta.topic}`;
      const t = topicMap.get(key) ?? { attempted: 0, correct: 0, levels: new Set<number>() };
      t.attempted++;
      if (ans.correct) t.correct++;
      t.levels.add(meta.level);
      topicMap.set(key, t);
    }
  }

  const bySubject: SubjectStat[] = Array.from(subjMap.entries())
    .map(([slug, v]) => {
      const accuracy = v.attempted > 0 ? Math.round((100 * v.correct) / v.attempted) : 0;
      return {
        slug,
        name: subjectBySlug.get(slug)?.name ?? slug,
        attempted: v.attempted,
        correct: v.correct,
        accuracy,
        status: statusFor(accuracy, v.attempted),
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy);

  const byTopic: TopicStat[] = Array.from(topicMap.entries())
    .map(([key, v]) => {
      const [slug, topic] = key.split('::');
      const accuracy = v.attempted > 0 ? Math.round((100 * v.correct) / v.attempted) : 0;
      return {
        slug,
        name: subjectBySlug.get(slug)?.name ?? slug,
        topic,
        topicName: topicById.get(topic)?.name ?? topic,
        attempted: v.attempted,
        correct: v.correct,
        accuracy,
        status: statusFor(accuracy, v.attempted),
        levels: Array.from(v.levels).sort(),
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy || b.attempted - a.attempted);

  const scoreHistory: ScorePoint[] = attempts.map((a) => ({
    date: a.finishedAt.slice(0, 10),
    ts: new Date(a.finishedAt).getTime(),
    testId: a.testId,
    testName: a.testId === 'practice' ? `Practice — ${a.testName}` : a.testName,
    testType: a.testType,
    score: a.score,
    maxScore: a.maxScore,
    pct: a.maxScore > 0 ? Math.round((100 * a.score) / a.maxScore) : 0,
    accuracy: a.accuracy,
  }));

  const attemptedQ = attempts.reduce((n, a) => n + a.correct + a.incorrect, 0);
  const correctQ = attempts.reduce((n, a) => n + a.correct, 0);
  const totalEarned = attempts.reduce((n, a) => n + a.score, 0);
  const totalMax = attempts.reduce((n, a) => n + a.maxScore, 0);
  const overall: OverallStat = {
    attempts: attempts.length,
    attemptedQuestions: attemptedQ,
    correct: correctQ,
    accuracy: attemptedQ > 0 ? Math.round((100 * correctQ) / attemptedQ) : 0,
    averagePct: attempts.length > 0 ? Math.round(attempts.reduce((n, a) => n + (a.maxScore > 0 ? (100 * a.score) / a.maxScore : 0), 0) / attempts.length) : 0,
    bestPct: attempts.length > 0 ? Math.max(...attempts.map((a) => (a.maxScore > 0 ? Math.round((100 * a.score) / a.maxScore) : 0))) : 0,
    totalEarned,
    totalMax,
  };

  return {
    overall,
    bySubject,
    byTopic,
    scoreHistory,
    weak: byTopic.filter((t) => t.status === 'weak'),
    average: byTopic.filter((t) => t.status === 'average'),
    strong: byTopic.filter((t) => t.status === 'strong'),
  };
}

/** Recommendation strings for a weak topic, used by the Weak Areas page. */
export function recommendationsFor(topicStat: TopicStat): string[] {
  const out: string[] = [];
  const t = topicById.get(topicStat.topic);
  if (t) {
    out.push(`Read the GATE focus: ${t.gate.highYield[0] ?? 'key points'}`);
    if (t.gate.traps.length > 0) out.push(`Avoid the classic trap: ${t.gate.traps[0]}`);
  }
  out.push('Do 5 fresh questions on this topic (Practice page).');
  out.push('Revisit the 1-minute revision card in the Revision Center.');
  if (topicStat.levels.length > 0 && topicStat.levels[0] >= 3) {
    out.push('Drop one level: re-read the Basic/College explanation first.');
  }
  return out;
}

export function mockTestName(id: string): string {
  return MOCK_TESTS.find((t) => t.id === id)?.name ?? id;
}
