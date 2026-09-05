// AI Tutor engine.
//
// By default the engine is DETERMINISTIC: it answers from the curated topic
// content (the same 5-step teaching structure the Learn pages use), so the
// tutor works with zero API keys and always gives consistent, exam-relevant
// answers. A real LLM can be plugged in later via environment variables —
// see `llmAvailable()` / `llmRespond()`. Responses from the deterministic
// engine are marked aiDraft: true so the UI can label them "AI draft".

import type { Topic, Question, TutorMessage } from '../types';
import { topicById, topicsForSubject, subjectRoadmap } from '../content/topics';
import { questionsForTopic, questionsForSubject } from '../content/questions';
import { numericalsForSubject } from '../content/numericals';
import { subjectBySlug } from '../content/subjects';
import { NUMERICALS } from '../content/numericals';

// ---------------------------------------------------------------------------
// Context passed in with every request
// ---------------------------------------------------------------------------

export interface WeakArea {
  subject: string;
  topic: string;
  accuracy: number; // 0..1
  attempts: number;
}

export interface TutorContext {
  subject?: string; // current subject slug (e.g. from /learn/[subject]/…)
  topic?: string; // current topic id
  history: TutorMessage[];
  weakAreas?: WeakArea[];
}

export interface TutorReply {
  text: string;
  kind: 'text' | 'questions' | 'formula' | 'numerical' | 'revision' | 'nav';
  topicId?: string; // when set, the chat should switch its context topic
  questions?: Question[]; // interactive question list (hidden answers until submitted)
  numericalId?: string; // open in the Numericals page
  nav?: string; // route the UI should offer (e.g. '/mock')
  aiDraft: boolean;
}

// ---------------------------------------------------------------------------
// Command recognition (9 quick commands + 9 global commands)
// ---------------------------------------------------------------------------

export const QUICK_COMMANDS = [
  'Explain Again',
  'Explain Like a Beginner',
  'Give an Example',
  'Give Me Questions',
  'Show Important Formulas',
  'Start Numericals',
  'Quick Revision',
] as const;

const GLOBAL_COMMANDS = ['START', 'NEXT', 'TEST', 'PYQ', 'REVISION', 'MOCK TEST', 'EXPLAIN AGAIN', 'NUMERICALS', 'WEAK AREAS'] as const;
export const ALL_COMMANDS: readonly string[] = [...QUICK_COMMANDS, ...GLOBAL_COMMANDS];

function norm(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

function matchGlobal(input: string): string | null {
  const n = norm(input);
  if (n === 'start' || n.startsWith('start ') || n.startsWith('start[') || n === 'start.') return 'START';
  if (n === 'next') return 'NEXT';
  if (n === 'test' || n === 'take a test' || n === 'quiz me') return 'TEST';
  if (n === 'pyq' || n === 'pyqs' || n.startsWith('previous year')) return 'PYQ';
  if (n === 'revision' || n === 'revise' || n.startsWith('quick revision')) return 'REVISION';
  if (n === 'mock test' || n === 'mock' || n === 'take a mock test') return 'MOCK TEST';
  if (n === 'explain again') return 'EXPLAIN AGAIN';
  if (n === 'numericals' || n === 'numerical' || n === 'practice numericals') return 'NUMERICALS';
  if (n === 'weak areas' || n === 'weak area' || n === 'my weak areas') return 'WEAK AREAS';
  return null;
}

function matchQuick(input: string): string | null {
  const n = norm(input);
  if (n.startsWith('explain like a beginner') || n === 'explain like i am 5' || n === 'beginner mode') return 'Explain Like a Beginner';
  if (n.startsWith('explain again') || n === 'again' || n === 're-explain') return 'Explain Again';
  if (n.startsWith('give an example') || n === 'example' || n === 'give me an example') return 'Give an Example';
  if (n.startsWith('give me questions') || n === 'questions' || n === 'give me a question' || n === 'quiz') return 'Give Me Questions';
  if (n.startsWith('show important formulas') || n === 'formulas' || n === 'formula' || n === 'show formulas') return 'Show Important Formulas';
  if (n.startsWith('start numericals') || n === 'numericals' || n === 'numerical practice') return 'Start Numericals';
  if (n === 'quick revision' || n === 'revision' || n === 'revise this') return 'Quick Revision';
  return null;
}

export function recognizeCommand(input: string): string | null {
  return matchGlobal(input) ?? matchQuick(input);
}

// ---------------------------------------------------------------------------
// Deterministic response builders (from topic content)
// ---------------------------------------------------------------------------

function bullets(items: string[], marker = '• '): string {
  return items.map((x) => `${marker}${x}`).join('\n');
}

function currentTopic(ctx: TutorContext): Topic | undefined {
  if (ctx.topic) return topicById.get(ctx.topic);
  if (ctx.subject) {
    const rm = subjectRoadmap(ctx.subject);
    return rm ? rm.topics[0] : undefined;
  }
  return undefined;
}

function subjectName(slug?: string): string {
  if (!slug) return 'Biotechnology';
  return subjectBySlug.get(slug)?.name ?? slug;
}

function needTopic(ctx: TutorContext, cmd: string): TutorReply | null {
  if (currentTopic(ctx)) return null;
  return {
    text: `I can do **${cmd}** once we pick a topic. Try “Start [subject]” (e.g. *Start Biochemistry*), or tell me a topic name like *Enzyme Kinetics*.`,
    kind: 'text',
    aiDraft: true,
  };
}

function replyBeginner(ctx: TutorContext): TutorReply {
  const t = currentTopic(ctx);
  const missing = needTopic(ctx, 'Explain Like a Beginner');
  if (missing || !t) return missing as TutorReply;
  const lines = [
    `### ${t.name} — from scratch`,
    `**What it is:** ${t.basic.what}`,
    `**Why it matters:** ${t.basic.why}`,
    `**How it works (simply):** ${t.basic.how}`,
    `**Where you'll meet it:** ${t.basic.where}`,
    '',
    `One-line summary: ${t.revision.summary}`,
    '',
    'Want me to go deeper? Say **Explain Again** for the college-level version.',
  ];
  return { text: lines.join('\n'), kind: 'text', aiDraft: true };
}

function replyAgain(ctx: TutorContext): TutorReply {
  const t = currentTopic(ctx);
  const missing = needTopic(ctx, 'Explain Again');
  if (missing || !t) return missing as TutorReply;
  const lines = [
    `### ${t.name} — full explanation`,
    '',
    '**College level**',
    bullets(t.college),
    '',
    '**Advanced level**',
    bullets(t.advanced),
    '',
    '**GATE focus — what actually gets asked**',
    bullets(t.gate.highYield, '🔥 '),
    '**Traps students fall into**',
    bullets(t.gate.traps, '⚠️ '),
    '',
    `**Summary:** ${t.revision.summary}`,
  ];
  return { text: lines.join('\n'), kind: 'text', aiDraft: true };
}

function replyExample(ctx: TutorContext): TutorReply {
  const t = currentTopic(ctx);
  const missing = needTopic(ctx, 'Give an Example');
  if (missing || !t) return missing as TutorReply;
  const nums = t.subject ? numericalsForSubject(t.subject).filter((n) => n.topic === t.id) : [];
  const exampleBlock =
    nums.length > 0
      ? `**Worked example (numerical):**\n${nums[0].simple.stem}\n\n${bullets(nums[0].simple.steps, '   ')}\n\nAnswer: ${nums[0].simple.answer}`
      : '';
  const lines = [
    `### Examples — ${t.name}`,
    '',
    bullets(t.examples, '📌 '),
    exampleBlock ? ['', exampleBlock] : '',
    '',
    `Want a practice question on this? Say **Give Me Questions**.`,
  ];
  return { text: lines.filter((l) => l !== undefined).join('\n'), kind: 'text', aiDraft: true };
}

function pickQuestionsFor(ctx: TutorContext, count = 3): Question[] {
  const t = currentTopic(ctx);
  if (t) {
    const pool = questionsForTopic(t.id);
    if (pool.length >= count) {
      // mix levels if available
      return pool.slice(0, count);
    }
    return [...pool, ...questionsForSubject(t.subject).filter((q) => q.topic !== t.id)].slice(0, count);
  }
  if (ctx.subject) {
    return questionsForSubject(ctx.subject).slice(0, count);
  }
  return [];
}

function replyQuestions(ctx: TutorContext): TutorReply {
  const qs = pickQuestionsFor(ctx, 3);
  if (qs.length === 0) {
    return {
      text: 'Pick a subject first — say **Start [subject]** — then I will quiz you on it.',
      kind: 'text',
      aiDraft: true,
    };
  }
  return {
    text: `Here are ${qs.length} practice questions${ctx.topic ? ` on **${currentTopic(ctx)?.name ?? ''}**` : ''}. Submit your answer before checking — no answer is shown until you do.`,
    kind: 'questions',
    questions: qs,
    aiDraft: true,
  };
}

function replyFormulas(ctx: TutorContext): TutorReply {
  const t = currentTopic(ctx);
  const missing = needTopic(ctx, 'Show Important Formulas');
  if (missing || !t) return missing as TutorReply;
  const lines = [
    `### Formulas — ${t.name}`,
    '',
    ...t.formulas.map((f) => `**${f.name}**\n\`${f.expr}\``),
    '',
    'Memorise the variables and units before the mock — GATE NATs test exactly this.',
  ];
  return { text: lines.join('\n'), kind: 'formula', aiDraft: true };
}

function replyNumericals(ctx: TutorContext): TutorReply {
  const t = currentTopic(ctx);
  const slugs = t ? [t.subject] : ctx.subject ? [ctx.subject] : [];
  let pool = slugs.length ? slugs.flatMap((s) => numericalsForSubject(s)) : [...NUMERICALS];
  if (t) {
    const exact = pool.filter((n) => n.topic === t.id);
    if (exact.length) pool = exact;
  }
  if (pool.length === 0) {
    return {
      text: 'No numericals yet for this area — but there are 14 across the syllabus on the Numericals page.',
      kind: 'nav',
      nav: '/numericals',
      aiDraft: true,
    };
  }
  const n = pool[0];
  return {
    text: `Let's do **${n.name}** — 6 steps: concept → formula → variables & units → simple example → GATE example → practice (with submission).`,
    kind: 'numerical',
    numericalId: n.id,
    nav: '/numericals',
    aiDraft: true,
  };
}

function replyRevision(ctx: TutorContext): TutorReply {
  const t = currentTopic(ctx);
  const missing = needTopic(ctx, 'Quick Revision');
  if (missing || !t) return missing as TutorReply;
  const lines = [
    `### 1-minute revision — ${t.name}`,
    '',
    `**Remember this:** ${t.revision.remember}`,
    '',
    '**Most common mistakes**',
    bullets(t.revision.mistakes, '❌ '),
    '',
    '**GATE focus**',
    bullets(t.gate.highYield, '🔥 '),
    '',
    `**Summary:** ${t.revision.summary}`,
  ];
  return { text: lines.join('\n'), kind: 'revision', aiDraft: true };
}

// ---------------------------------------------------------------------------
// Global (app-level) commands
// ---------------------------------------------------------------------------

function parseStartSubject(input: string): string | null {
  const n = norm(input);
  let rest = n.replace(/^start[\s:\-]*/, '').replace(/^\[|\]$/g, '');
  if (!rest || rest === 'subject') return null;
  const all = Array.from(subjectBySlug.values());
  // exact slug
  const slugHit = all.find((s) => s.slug === rest);
  if (slugHit) return slugHit.slug;
  // name match (full or contains)
  const nameHit =
    all.find((s) => norm(s.name) === rest) ??
    all.find((s) => norm(s.name).includes(rest)) ??
    all.find((s) => rest.includes(norm(s.name)));
  if (nameHit) return nameHit.slug;
  // prefix of a name (e.g. "bio" → first match)
  const prefixHit = all.find((s) => norm(s.name).startsWith(rest));
  return prefixHit ? prefixHit.slug : null;
}

function replyStart(ctx: TutorContext, input: string): TutorReply {
  const slug = parseStartSubject(input);
  if (!slug) {
    return {
      text: 'Tell me the subject after **Start** — e.g. *Start Molecular Biology*. Say just **Start** to see all 18 subjects.',
      kind: 'text',
      aiDraft: true,
    };
  }
  const rm = subjectRoadmap(slug);
  if (!rm) return { text: `Subject “${input}” not found.`, kind: 'text', aiDraft: true };
  const high = rm.topics.filter((t) => t.priority === 'high').slice(0, 4);
  const lines = [
    `## ${subjectName(slug)} — roadmap`,
    '',
    `Weight in GATE BT: ~${rm.subject.weight}. ${rm.topics.length} topics across 4 levels (🔥 ${rm.high} high, ⭐ ${rm.medium} medium, 📖 ${rm.low} low).`,
    '',
    '**Where to start (high-yield 🔥):**',
    bullets(rm.topics.slice(0, 3).map((t) => `${t.name} (L${t.level})`), '→ '),
    high.length ? ['', '**Top priority topics:**', bullets(high.map((t) => t.name), '🔥 ')] : '',
    '',
    `Type **Start** again and I will open the first topic — or tap “Open in Learn” below.`,
  ];
  return {
    text: (lines as unknown[]).flat().filter((x) => x !== '').join('\n'),
    kind: 'nav',
    nav: `/subjects/${slug}`,
    topicId: rm.topics[0]?.id,
    aiDraft: true,
  };
}

function replyNext(ctx: TutorContext): TutorReply {
  if (!ctx.subject) {
    return { text: 'Pick a subject first: **Start [subject]**.', kind: 'text', aiDraft: true };
  }
  const topics = topicsForSubject(ctx.subject);
  if (topics.length === 0) return { text: 'No topics found for that subject.', kind: 'text', aiDraft: true };
  const idx = ctx.topic ? Math.max(topics.findIndex((t) => t.id === ctx.topic), 0) : -1;
  const next = topics[Math.min(idx + 1, topics.length - 1)];
  const lines = [
    `Next up in ${subjectName(ctx.subject)}: **${next.name}** (Level ${next.level}${next.priority === 'high' ? ' 🔥' : ''}).`,
    '',
    replyBeginner({ ...ctx, topic: next.id }).text,
    '',
    'Say **NEXT** again to keep moving, or **TEST** to check yourself.',
  ];
  return { text: lines.join('\n'), kind: 'text', aiDraft: true, topicId: next.id };
}

function replyTest(ctx: TutorContext): TutorReply {
  const qs = pickQuestionsFor(ctx, 3);
  if (qs.length === 0) {
    return { text: 'Say **Start [subject]** first, then **TEST** to get questions on it.', kind: 'text', aiDraft: true };
  }
  return {
    text: `Quick test — ${qs.length} questions. No answer is shown until you submit.`,
    kind: 'questions',
    questions: qs,
    aiDraft: true,
  };
}

function replyPyq(ctx: TutorContext): TutorReply {
  return {
    text: 'The PYQ section has verified GATE BT questions (2016–2021) plus clearly-labelled PYQ-style practice — filterable by subject, topic, year and difficulty. Open it and I will track your attempts.',
    kind: 'nav',
    nav: '/pyqs',
    aiDraft: true,
  };
}

function replyRevisionGlobal(ctx: TutorContext): TutorReply {
  const t = currentTopic(ctx);
  if (t) return replyRevision(ctx);
  return {
    text: 'Quick Revision Center: 1-minute revision, formula sheets, confused concepts and comparison tables for every subject. Say **Start [subject]** first to revise a specific topic here.',
    kind: 'nav',
    nav: '/revision',
    aiDraft: true,
  };
}

function replyMock(ctx: TutorContext): TutorReply {
  return {
    text: 'Mock Test Center: full-length GATE simulation with timer, section palette and mark-for-review, plus subject-focused mocks. Your score, accuracy and per-topic breakdown appear instantly after submitting.',
    kind: 'nav',
    nav: '/mock',
    aiDraft: true,
  };
}

function replyWeakAreas(ctx: TutorContext): TutorReply {
  const weak = (ctx.weakAreas ?? []).filter((w) => w.attempts >= 2 && w.accuracy < 0.5);
  if (weak.length === 0) {
    return {
      text: 'No confirmed weak areas yet (need ≥2 attempts with <50% accuracy). Do a few practice sets and I will track this for you.',
      kind: 'text',
      aiDraft: true,
    };
  }
  const lines = [
    '## Your weak areas',
    '',
    ...weak.map(
      (w) =>
        `- **${subjectName(w.subject)} → ${topicById.get(w.topic)?.name ?? w.topic}** — ${(w.accuracy * 100).toFixed(0)}% accuracy over ${w.attempts} attempts`,
    ),
    '',
    'Recommended: Quick Revision on each of these, then 5 fresh questions. Full analysis lives on the Weak Areas page.',
  ];
  return { text: lines.join('\n'), kind: 'nav', nav: '/weak-areas', aiDraft: true };
}

// ---------------------------------------------------------------------------
// Free-form fallback
// ---------------------------------------------------------------------------

function fallback(ctx: TutorContext, input: string): TutorReply {
  const t = currentTopic(ctx);
  if (t) {
    // Try to answer by scanning the topic content for the question word.
    const n = norm(input);
    const relevant: string[] = [];
    const hay = [...t.college, ...t.advanced, ...t.gate.highYield, ...t.gate.traps, ...t.keyPoints];
    for (const h of hay) {
      const words = n.split(' ').filter((w) => w.length > 4);
      const hits = words.filter((w) => norm(h).includes(w)).length;
      if (hits >= 2) relevant.push(h);
    }
    if (relevant.length > 0) {
      return {
        text: `About **${t.name}**:\n\n${bullets(Array.from(new Set(relevant)).slice(0, 5))}\n\nTry “**Explain Like a Beginner**” for the basics or “**Give Me Questions**” to test yourself.`,
        kind: 'text',
        aiDraft: true,
      };
    }
  }
  const cmdList = QUICK_COMMANDS.map((c) => `• ${c}`).join('\n');
  const globalList = ['• Start [subject]', '• Next', '• Test', '• PYQ', '• Mock Test', '• Numericals', '• Weak Areas'].join('\n');
  return {
    text: `I can help with **${t ? t.name : 'any GATE BT topic'}**. Quick things I can do:\n\n${cmdList}\n\nOr app commands:\n${globalList}\n\n${t ? 'Say anything about this topic and I will pull from the notes.' : 'Start a subject first — e.g. “Start Molecular Biology”.'}`,
    kind: 'text',
    aiDraft: true,
  };
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

export function tutorReply(input: string, ctx: TutorContext): TutorReply {
  const g = matchGlobal(input);
  if (g === 'START') return replyStart(ctx, input);
  if (g === 'NEXT') return replyNext(ctx);
  if (g === 'TEST') return replyTest(ctx);
  if (g === 'PYQ') return replyPyq(ctx);
  if (g === 'MOCK TEST') return replyMock(ctx);
  if (g === 'NUMERICALS') return replyNumericals(ctx);
  if (g === 'WEAK AREAS') return replyWeakAreas(ctx);
  if (g === 'EXPLAIN AGAIN') return replyAgain(ctx);

  const q = matchQuick(input);
  if (q === 'Explain Like a Beginner') return replyBeginner(ctx);
  if (q === 'Explain Again') return replyAgain(ctx);
  if (q === 'Give an Example') return replyExample(ctx);
  if (q === 'Give Me Questions') return replyQuestions(ctx);
  if (q === 'Show Important Formulas') return replyFormulas(ctx);
  if (q === 'Start Numericals') return replyNumericals(ctx);
  if (q === 'Quick Revision') return replyRevision(ctx);

  return fallback(ctx, input);
}

// ---------------------------------------------------------------------------
// Pluggable LLM layer (env-configured, no network by default)
// ---------------------------------------------------------------------------

/**
 * Returns a backend descriptor if the user has configured an LLM key in the
 * server environment, otherwise null (deterministic engine only).
 *   GATE_BT_LLM_BASE_URL — e.g. https://api.openai.com/v1
 *   GATE_BT_LLM_API_KEY  — secret
 *   GATE_BT_LLM_MODEL    — e.g. gpt-4o-mini
 */
export function llmAvailable(): { baseUrl: string; model: string } | null {
  const key = process.env.GATE_BT_LLM_API_KEY;
  if (!key) return null;
  return {
    baseUrl: process.env.GATE_BT_LLM_BASE_URL ?? 'https://api.openai.com/v1',
    model: process.env.GATE_BT_LLM_MODEL ?? 'gpt-4o-mini',
  };
}

/**
 * Optional LLM override. When an env key is present this is called instead of
 * the deterministic engine; on any error we fall back to the deterministic
 * answer so the tutor never goes down.
 */
export async function respondAsync(input: string, ctx: TutorContext): Promise<TutorReply> {
  const cfg = llmAvailable();
  if (cfg) {
    try {
      const system = [
        'You are the GATE BT Personal Tutor for a Biotechnology student preparing for GATE BT, college exams and competitive exams.',
        'Rules: teach one topic at a time; always start from basics; move easy → difficult; distinguish actual PYQs from generated ones; never overwhelm the student.',
        ctx.topic ? `Current topic: ${topicById.get(ctx.topic)?.name ?? ctx.topic} (${subjectName(ctx.subject)}).` : `Current subject: ${subjectName(ctx.subject) ?? 'none'}.`,
        'Keep answers under 300 words unless asked for a full explanation. Use the exact commands the app supports: Explain Again, Explain Like a Beginner, Give an Example, Give Me Questions, Show Important Formulas, Start Numericals, Quick Revision.',
      ].join('\n');
      const res = await fetch(`${cfg.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.GATE_BT_LLM_API_KEY}` },
        body: JSON.stringify({
          model: cfg.model,
          messages: [
            { role: 'system', content: system },
            ...ctx.history.slice(-6).map((m) => ({ role: m.role, content: m.text })),
            { role: 'user', content: input },
          ],
          max_tokens: 700,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
        const text = data.choices?.[0]?.message?.content;
        if (text) return { text, kind: 'text', aiDraft: false };
      }
    } catch {
      // fall through to deterministic engine
    }
  }
  return tutorReply(input, ctx);
}
