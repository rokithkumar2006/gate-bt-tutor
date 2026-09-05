// Study planner — deterministic, no AI needed.
//
// Inputs: exam date, hours/day, current level.
// Outputs (canonical StudyPlan from lib/types): subject order (GATE weight
// first), daily plan items, weekly summaries, a 3-day revision cycle and a
// mock schedule. High-priority (🔥) topics always come before medium (⭐)
// and low (📖) ones.

import type { StudyPlan, Topic } from './types';
import { SUBJECTS, subjectBySlug } from './content/subjects';
import { topicsForSubject, topicById } from './content/topics';
import { MOCK_TESTS } from './content/mockTests';

export interface PlannerInput {
  examDate: string; // ISO date (yyyy-mm-dd)
  hoursPerDay: number;
  startLevel: 1 | 2 | 3 | 4;
}

function isoAddDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function daysBetween(aIso: string, bIso: string): number {
  const a = new Date(`${aIso}T00:00:00`).getTime();
  const b = new Date(`${bIso}T00:00:00`).getTime();
  return Math.round((b - a) / 86400000);
}

const PRIORITY_ICON: Record<string, string> = { high: '🔥', medium: '⭐', low: '📖' };

/** Ordered topic queue: subjects by GATE weight desc; within a subject,
 *  levels from startLevel→4, high → medium → low priority, then ordinal. */
export function buildTopicQueue(startLevel: number): Topic[] {
  const priorityRank: Record<string, number> = { high: 0, medium: 1, low: 2 };
  const subjects = [...SUBJECTS].sort((a, b) => b.weight - a.weight);
  const queue: Topic[] = [];
  for (const s of subjects) {
    const topics = topicsForSubject(s.slug)
      .filter((t) => t.level >= startLevel)
      .sort(
        (a, b) =>
          a.level - b.level ||
          (priorityRank[a.priority] ?? 3) - (priorityRank[b.priority] ?? 3) ||
          a.ord - b.ord,
      );
    queue.push(...topics);
  }
  return queue;
}

export function planStudy(input: PlannerInput): StudyPlan {
  const today = new Date().toISOString().slice(0, 10);
  const daysTotal = Math.max(daysBetween(today, input.examDate), 1);
  const queue = buildTopicQueue(input.startLevel);
  const minutesPerDay = Math.round(input.hoursPerDay * 60);
  const mockName = (id: string) => MOCK_TESTS.find((t) => t.id === id)?.name ?? id;
  const topicName = (id: string) => topicById.get(id)?.name ?? id;

  // Per-topic cost by level; leave room for revision (20 min) and mocks.
  const minutesPerTopic = (level: number) => 45 + level * 15; // L1 60 … L4 105
  let budget = 0;
  for (let d = 0; d < daysTotal; d++) {
    const reserved = d % 3 === 2 ? 20 : 0;
    const isMock = d % 7 === 5 || d >= daysTotal - 3;
    const mockMinutes = isMock ? (d >= daysTotal - 3 ? 60 : 120) : 0;
    budget += Math.max(minutesPerDay - reserved - mockMinutes, 0);
  }

  const covered: Topic[] = [];
  for (const t of queue) {
    const cost = minutesPerTopic(t.level);
    if (budget >= cost) {
      budget -= cost;
      covered.push(t);
    } else {
      break;
    }
  }

  const daily: { date: string; items: string[] }[] = [];
  const revision: { date: string; topics: string[] }[] = [];
  const mocks: { date: string; test: string }[] = [];
  const subjectMinutes = new Map<string, number>();
  let qi = 0;
  const pendingRevision: string[] = [];

  for (let d = 0; d < daysTotal; d++) {
    const date = isoAddDays(today, d);
    const isMock = d % 7 === 5 || d >= daysTotal - 3;
    let remaining = minutesPerDay;
    const items: string[] = [];

    while (qi < covered.length && remaining > 40) {
      const t = covered[qi];
      const cost = Math.min(minutesPerTopic(t.level), remaining - 10);
      if (cost < 40) break;
      remaining -= cost;
      qi++;
      items.push(
        `L${t.level} ${PRIORITY_ICON[t.priority] ?? ''} ${t.name} — ${subjectBySlug.get(t.subject)?.name ?? t.subject} (${cost} min)`,
      );
      subjectMinutes.set(t.subject, (subjectMinutes.get(t.subject) ?? 0) + cost);
      if (d + 2 < daysTotal) pendingRevision.push(t.id);
    }

    // 3-day revision cycle: revise what was studied 2 days ago.
    if (d >= 2 && pendingRevision.length > 0) {
      const toRevise = pendingRevision.splice(0, Math.max(1, Math.ceil(pendingRevision.length / 2)))
        .filter((id, i, arr) => arr.indexOf(id) === i)
        .slice(0, 3);
      items.push(`Revision: ${toRevise.map(topicName).join(' · ')}`);
      if (toRevise.length > 0) revision.push({ date, topics: toRevise });
    }

    if (isMock) {
      const mockId =
        d >= daysTotal - 3
          ? 'core-mock'
          : d % 14 === 5
            ? 'gate-full-1'
            : d % 21 === 5
              ? 'pyq-marathon'
              : 'core-mock';
      items.push(`Mock test: ${mockName(mockId)} (≈${d >= daysTotal - 3 ? 60 : 120} min)`);
      mocks.push({ date, test: mockId });
    }

    if (items.length === 0) items.push('Light revision day — formulas + 1-minute cards');
    daily.push({ date, items });
  }

  const weekly: { week: number; title: string; items: string[] }[] = [];
  for (let w = 0; w * 7 < daysTotal; w++) {
    const chunk = daily.slice(w * 7, (w + 1) * 7);
    const weekMocks = chunk.filter((d) => d.items.some((i) => i.startsWith('Mock'))).length;
    const weekTopics = chunk.reduce(
      (n, d) => n + d.items.filter((i) => i.startsWith('L1') || i.startsWith('L2') || i.startsWith('L3') || i.startsWith('L4')).length,
      0,
    );
    weekly.push({
      week: w + 1,
      title: `Week ${w + 1} — ${chunk[0].date} → ${chunk[chunk.length - 1].date}`,
      items: [
        `Study ${weekTopics} topics · ${Math.round(weekTopics * 0.9)} min avg/day`,
        `Mocks scheduled: ${weekMocks}`,
        `Revision on 3-day cycle (every 3rd day)`,
      ],
    });
  }

  const subjectOrder = [...SUBJECTS]
    .sort((a, b) => b.weight - a.weight)
    .map((s) => {
      const mins = subjectMinutes.get(s.slug) ?? 0;
      const first = queue.find((t) => t.subject === s.slug);
      return {
        subject: s.slug,
        hours: Number((mins / 60).toFixed(1)),
        focus: first ? first.name : '—',
      };
    });

  return {
    examDate: input.examDate,
    hoursDay: input.hoursPerDay,
    level: `L${input.startLevel}+`,
    daysTotal,
    subjectOrder,
    daily,
    weekly,
    revision,
    mocks,
    createdAt: new Date().toISOString(),
  };
}

/** "What to study next" — first uncompleted topic per subject (weight order),
 *  topped up with the next uncompleted topics in queue order. */
export function whatToStudyNext(completedTopicIds: Set<string>, limit = 5): Topic[] {
  const queue = buildTopicQueue(1);
  const pending = queue.filter((t) => !completedTopicIds.has(t.id));
  const out: Topic[] = [];
  const seen = new Set<string>();
  for (const t of pending) {
    if (seen.has(t.subject)) continue;
    out.push(t);
    seen.add(t.subject);
    if (out.length >= limit) return out;
  }
  for (const t of pending) {
    if (out.includes(t)) continue;
    out.push(t);
    if (out.length >= limit) break;
  }
  return out;
}
