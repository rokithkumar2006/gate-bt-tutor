// Mock test catalog. Section question composition is resolved deterministically
// (seeded Fisher–Yates) at module load, so every user sees the same paper.
//
// Sections follow the GATE-style structure:
//   A — Basic  | B — College  | C — GATE Focus  | D — Numerical (NAT)

import type { MockTest, MockSection, Question } from '../types';
import { pickQuestions } from './questions';
import { PYQS } from './pyqs';

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const rnd = mulberry32(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface TestDef {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  seed: number;
  sections: MockSection[];
  pyqOnly?: boolean; // resolve from PYQ bank first (top-up from question bank)
}

const ALL_SUBJECTS = [
  'animal-biotechnology', 'biochemistry', 'bioinformatics', 'bioinstrumentation',
  'bioreaction-engineering', 'cell-biology', 'engineering-mathematics',
  'environmental-biotechnology', 'general-aptitude', 'genetics-evolution',
  'immunology', 'microbial-biotechnology', 'microbiology', 'molecular-biology',
  'plant-biotechnology', 'process-biotechnology', 'recombinant-dna', 'transport-processes',
];

const defs: TestDef[] = [
  {
    id: 'gate-full-1',
    name: 'GATE BT Full Mock Test 1',
    description:
      'Full-length simulation across all 18 subjects. Sections A (Basic), B (College), C (GATE Focus) and D (Numerical). 180 minutes — same timing as the real exam.',
    durationMin: 180,
    seed: 20260901,
    sections: [
      { key: 'A', title: 'Section A — Basic Foundation', level: 'basic', subjects: ALL_SUBJECTS, count: 8, types: ['mcq', 'nat'] },
      { key: 'B', title: 'Section B — College Level', level: 'college', subjects: ALL_SUBJECTS, count: 10, types: ['mcq', 'msq', 'nat'] },
      { key: 'C', title: 'Section C — GATE Focus', level: 'gate', subjects: ALL_SUBJECTS, count: 12, types: ['mcq', 'msq', 'nat'] },
      { key: 'D', title: 'Section D — Numerical', level: 'gate', subjects: ALL_SUBJECTS, count: 4, types: ['nat'] },
    ],
  },
  {
    id: 'core-mock',
    name: 'Core Subjects Mock (Molecular · Genetics · Bio · Process)',
    description:
      'High-yield core subjects: Molecular Biology, Genetics, Biochemistry, Bioreaction, Process Biotech and Microbiology. 120 minutes.',
    durationMin: 120,
    seed: 20260902,
    sections: [
      { key: 'A', title: 'Section A — Basic', level: 'basic', subjects: ['molecular-biology', 'genetics-evolution', 'biochemistry', 'bioreaction-engineering', 'process-biotechnology', 'microbiology'], count: 6, types: ['mcq', 'nat'] },
      { key: 'B', title: 'Section B — College', level: 'college', subjects: ['molecular-biology', 'genetics-evolution', 'biochemistry', 'bioreaction-engineering', 'process-biotechnology', 'microbiology'], count: 8, types: ['mcq', 'msq', 'nat'] },
      { key: 'C', title: 'Section C — GATE Focus', level: 'gate', subjects: ['molecular-biology', 'genetics-evolution', 'biochemistry', 'bioreaction-engineering', 'process-biotechnology', 'microbiology'], count: 8, types: ['mcq', 'msq', 'nat'] },
      { key: 'D', title: 'Section D — Numerical', level: 'gate', subjects: ['molecular-biology', 'genetics-evolution', 'biochemistry', 'bioreaction-engineering', 'process-biotechnology', 'microbiology'], count: 2, types: ['nat'] },
    ],
  },
  {
    id: 'apt-mock',
    name: 'Maths + Aptitude Mock',
    description:
      'Engineering Mathematics and General Aptitude only. 20 questions, 60 minutes — the fastest marks in GATE BT.',
    durationMin: 60,
    seed: 20260903,
    sections: [
      { key: 'A', title: 'Section A — Basic', level: 'basic', subjects: ['general-aptitude', 'engineering-mathematics'], count: 4, types: ['mcq', 'nat'] },
      { key: 'B', title: 'Section B — College', level: 'college', subjects: ['general-aptitude', 'engineering-mathematics'], count: 4, types: ['mcq', 'msq'] },
      { key: 'C', title: 'Section C — GATE Focus', level: 'gate', subjects: ['general-aptitude', 'engineering-mathematics'], count: 4, types: ['mcq', 'msq', 'nat'] },
      { key: 'D', title: 'Section D — Numerical', level: 'gate', subjects: ['general-aptitude', 'engineering-mathematics'], count: 2, types: ['nat'] },
    ],
  },
  {
    id: 'pyq-marathon',
    name: 'PYQ-Style Marathon (30 Q)',
    description:
      '30 questions drawn from the PYQ bank first (actual GATE BT papers 2016–2021 where available, PYQ-style otherwise), topped up from the practice bank if a level is short. 180 minutes.',
    durationMin: 180,
    seed: 20260904,
    pyqOnly: true,
    sections: [
      { key: 'A', title: 'Section A — Basic', level: 'basic', subjects: ALL_SUBJECTS, count: 8, types: ['mcq', 'nat'] },
      { key: 'B', title: 'Section B — College', level: 'college', subjects: ALL_SUBJECTS, count: 10, types: ['mcq', 'msq', 'nat'] },
      { key: 'C', title: 'Section C — GATE Focus', level: 'gate', subjects: ALL_SUBJECTS, count: 12, types: ['mcq', 'msq', 'nat'] },
    ],
  },
];

function resolveSection(def: TestDef, section: MockSection, sectionIdx: number, used?: Set<string>): Question[] {
  const seed = def.seed * 31 + sectionIdx;
  if (def.pyqOnly) {
    const fromBank = seededShuffle(
      PYQS.filter((q) => q.level === section.level && section.subjects.includes(q.subject) && section.types.includes(q.type) && !(used && used.has(q.id))),
      seed,
    );
    const chosen = fromBank.slice(0, section.count);
    if (chosen.length >= section.count) return chosen;
    // Top up from the general practice bank (deterministic).
    const exclude = new Set(chosen.map((q) => q.id));
    const extra = pickQuestions({
      subjects: section.subjects,
      level: section.level,
      types: section.types,
      count: section.count - chosen.length,
      seed,
      excludeIds: exclude,
    });
    return [...chosen, ...extra];
  }
  return pickQuestions({
    subjects: section.subjects,
    level: section.level,
    types: section.types,
    count: section.count,
    seed,
    excludeIds: used,
  });
}

export const MOCK_TESTS: MockTest[] = defs.map((def) => {
  const questionIds: string[] = [];
  const used = new Set<string>();
  def.sections.forEach((section, i) => {
    const qs = resolveSection(def, section, i, used);
    qs.forEach((q) => {
      questionIds.push(q.id);
      used.add(q.id);
    });
  });
  return {
    id: def.id,
    name: def.name,
    description: def.description,
    durationMin: def.durationMin,
    sections: def.sections,
    questionIds,
  };
});

export const mockTestById = new Map(MOCK_TESTS.map((t) => [t.id, t]));

export function getMockTest(id: string): MockTest | undefined {
  return mockTestById.get(id);
}
