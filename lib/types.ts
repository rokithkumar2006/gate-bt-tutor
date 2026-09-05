// Core domain types for GATE BT Personal Tutor

export type Priority = 'high' | 'medium' | 'low';
export type Level = 1 | 2 | 3 | 4; // 1 basic, 2 college, 3 advanced, 4 GATE focus
export type QLevel = 'basic' | 'college' | 'gate';
export type QType = 'mcq' | 'msq' | 'nat';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Subject {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: string; // lucide icon key
  weight: number; // approximate GATE BT weight (marks out of 100)
}

export interface Formula {
  name: string;
  expr: string;
}

export interface Topic {
  id: string;
  subject: string; // subject slug
  name: string;
  level: Level;
  priority: Priority;
  ord: number;
  short: string;
  basic: {
    what: string;
    why: string;
    how: string;
    where: string;
  };
  college: string[];
  advanced: string[];
  gate: {
    highYield: string[];
    traps: string[];
  };
  examples: string[];
  formulas: Formula[];
  keyPoints: string[];
  revision: {
    remember: string;
    mistakes: string[];
    summary: string;
  };
  related: string[]; // topic ids
}

export interface Question {
  id: string;
  subject: string;
  topic: string;
  level: QLevel;
  type: QType;
  difficulty: Difficulty;
  stem: string;
  options?: string[]; // mcq / msq
  answer: number[] | string; // indices (mcq/msq) or numeric string (nat)
  explanation: string;
  concept: string;
}

export interface Pyq extends Question {
  year: number | null; // null => PYQ-style
  verified: boolean; // true = actual previous year question
  source: string; // e.g. 'GATE BT 2019' | 'PYQ-style practice'
}

export interface NumericalExample {
  stem: string;
  steps: string[];
  answer: string;
}

export interface Numerical {
  id: string;
  subject: string;
  topic: string;
  name: string;
  concept: string; // STEP 1
  formulaExpr: string; // STEP 2
  variables: { v: string; meaning: string; unit: string }[]; // STEP 3
  simple: NumericalExample; // STEP 4
  gate: NumericalExample; // STEP 5
  practice: { stem: string; answer: string }[]; // STEP 6
}

export interface MockSection {
  key: string; // A | B | C | D
  title: string;
  level: QLevel;
  subjects: string[]; // subject slugs
  count: number;
  types: QType[];
}

export interface MockTest {
  id: string;
  name: string;
  description: string;
  durationMin: number;
  sections: MockSection[];
  questionIds: string[]; // resolved, ordered
}

// ---------------- runtime / DB types (mirror db/schema.sql) ----------------

export interface UserProfile {
  college: string;
  yearOfStudy: string;
  targetExam: string;
  dailyHours: number;
  dailyGoalMin: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  profile: UserProfile;
}

export interface AnswerRecord {
  questionId: string;
  selected: number[] | string; // [] = unattempted
  correct: boolean;
  attempted: boolean;
  earned: number;
}

export interface Attempt {
  id: string;
  userId: string;
  testId: string;
  testType: 'mock' | 'practice' | 'pyq' | 'numerical';
  testName: string;
  startedAt: string;
  finishedAt: string;
  durationSec: number;
  score: number;
  maxScore: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  accuracy: number; // 0-100
  answers: AnswerRecord[];
  subject?: string;
  topic?: string;
}

export interface Note {
  id: string;
  userId: string;
  topic: string;
  text: string;
  createdAt: string;
}

export interface StudyPlan {
  examDate: string;
  hoursDay: number;
  level: string;
  daysTotal: number;
  subjectOrder: { subject: string; hours: number; focus: string }[];
  daily: { date: string; items: string[] }[];
  weekly: { week: number; title: string; items: string[] }[];
  revision: { date: string; topics: string[] }[];
  mocks: { date: string; test: string }[];
  createdAt: string;
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  seconds: number;
  events: string[];
}

export interface ProgressRecord {
  userId: string;
  completedTopics: Record<string, string>; // topicId -> ISO date
  studyTime: Record<string, number>; // date -> seconds
  currentSubject: string | null;
  currentTopic: string | null;
}

export interface TutorMessage {
  id: string;
  role: 'user' | 'tutor';
  text: string;
  meta?: { kind?: string; topic?: string };
}
