'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Dna, Bot, Timer, BarChart3, Calculator, BookOpen, Target, Sparkles, ArrowRight, GraduationCap, TestTube2,
} from 'lucide-react';
import DnaPattern from '@/components/DnaPattern';
import { SUBJECTS } from '@/lib/content/subjects';
import { TOPICS } from '@/lib/content/topics';
import { QUESTIONS } from '@/lib/content/questions';
import { PYQS } from '@/lib/content/pyqs';
import { NUMERICALS } from '@/lib/content/numericals';
import { MOCK_TESTS } from '@/lib/content/mockTests';

const FEATURES = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: 'Basics → GATE, one ladder',
    text: 'Every topic taught in 5 steps: Basic (what/why/how/where) → College → Advanced → GATE Focus → Quick Revision.',
  },
  {
    icon: <Bot className="h-5 w-5" />,
    title: 'AI Tutor that adapts',
    text: 'Explain Like a Beginner, Give Me Questions, Start Numericals, Quick Revision — commands that act, not chatter.',
  },
  {
    icon: <TestTube2 className="h-5 w-5" />,
    title: `${QUESTIONS.length} questions, honest PYQs`,
    text: 'MCQ/MSQ/NAT with negative marking, and PYQs clearly labelled as verified GATE BT papers or PYQ-style practice.',
  },
  {
    icon: <Timer className="h-5 w-5" />,
    title: 'Real mock tests',
    text: `${MOCK_TESTS.length} full simulations with timer, section palette and mark-for-review — GATE-style Sections A–D.`,
  },
  {
    icon: <Calculator className="h-5 w-5" />,
    title: `${NUMERICALS.length} numericals, 6 steps each`,
    text: 'Concept → formula → variables & units → simple example → GATE example → practice with instant checking.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Analytics that tell you what next',
    text: 'Subject & topic accuracy, score history, weak areas with recommendations and a personalised “Study Next” list.',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: 'Revision Center',
    text: '1-minute cards, formula sheets, traps and comparison tables — filtered by subject, topic and priority.',
  },
  {
    icon: <Target className="h-5 w-5" />,
    title: 'Study Planner',
    text: 'Exam date + hours/day = a day-by-day plan with GATE-weight subject order, 3-day revision cycle and mock schedule.',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Dna className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold leading-tight">GATE BT Personal Tutor</div>
              <div className="text-[11px] font-medium text-brand-600">Basics → GATE, one ladder</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            {authed ? (
              <Link href="/dashboard" className="btn-primary">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn-ghost">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-10 top-0 hidden h-full w-64 lg:block">
          <DnaPattern className="h-full w-full" opacity={0.5} />
        </div>
        <div className="pointer-events-none absolute -left-24 bottom-0 hidden h-72 w-56 lg:block">
          <DnaPattern className="h-full w-full rotate-180" opacity={0.35} />
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div className="relative animate-fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-700 ring-1 ring-brand-200">
              <Sparkles className="h-3.5 w-3.5" /> {SUBJECTS.length} subjects · {TOPICS.length} topics · {QUESTIONS.length + PYQS.length}+ questions
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-ink-900 sm:text-5xl">
              GATE BT <span className="text-brand-600">Personal Tutor</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-600">
              Master Biotechnology from <strong className="text-ink-800">Basics to GATE Level</strong>. A tutor that starts where
              you are, teaches one topic at a time, and tracks every mark you make.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="btn-primary px-6 py-3 text-base">
                Start Learning <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/mock" className="btn-secondary px-6 py-3 text-base">
                <Timer className="h-4 w-4" /> Take a Mock Test
              </Link>
            </div>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
              {[
                { v: '4', l: 'learning levels' },
                { v: `${NUMERICALS.length}`, l: 'guided numericals' },
                { v: `${MOCK_TESTS.length}`, l: 'mock simulations' },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-slate-50 p-3 text-center ring-1 ring-ink-100">
                  <div className="text-2xl font-bold text-brand-600">{s.v}</div>
                  <div className="text-xs font-medium text-ink-500">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual: roadmap card */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 -z-0 translate-x-6 translate-y-6 rounded-3xl bg-gradient-to-br from-brand-100 to-indigo-100" />
            <div className="card relative p-6 animate-float">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm font-bold text-ink-900">Molecular Biology — Roadmap</div>
                <span className="badge bg-brand-50 text-brand-700 ring-1 ring-brand-200">🔥 4 high-yield</span>
              </div>
              {[
                { l: 'L1 · Basic', t: 'DNA structure & the central dogma', done: true },
                { l: 'L2 · College', t: 'Replication, transcription, translation', done: true },
                { l: 'L3 · Advanced', t: 'Gene regulation: lac & trp operons', done: false },
                { l: 'L4 · GATE', t: 'PCR, cloning tools & vectors (numericals)', done: false },
              ].map((row, i) => (
                <div key={i} className="mb-3 flex items-center gap-3">
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${row.done ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-500'}`}>
                    {row.done ? '✓' : i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-ink-400">{row.l}</div>
                    <div className={`truncate text-sm font-medium ${row.done ? 'text-ink-400 line-through' : 'text-ink-800'}`}>{row.t}</div>
                  </div>
                </div>
              ))}
              <div className="mt-4 rounded-xl bg-brand-50 p-3 text-xs font-medium leading-relaxed text-brand-800 ring-1 ring-brand-100">
                🔥 GATE trap: Sanger sequencing uses <b>ddNTPs</b> — chain terminators. A classic 1-marker.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Everything a GATE BT aspirant needs</h2>
            <p className="mt-2 text-ink-500">Built around one rule: teach one topic at a time, easy → difficult, and never overwhelm the student.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="card card-hover p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">{f.icon}</div>
                <div className="mb-1 font-bold text-ink-900">{f.title}</div>
                <p className="text-sm leading-relaxed text-ink-500">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects strip */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink-900">The full GATE BT syllabus</h2>
              <p className="mt-1 text-ink-500">18 subjects, every topic mapped to its 4-level roadmap.</p>
            </div>
            <Link href="/signup" className="btn-secondary hidden sm:inline-flex">
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {SUBJECTS.map((s) => (
              <div key={s.slug} className="card card-hover flex flex-col items-start gap-1.5 p-4">
                <div className="text-lg">{s.icon}</div>
                <div className="text-[13px] font-semibold leading-snug text-ink-800">{s.name}</div>
                <div className="text-[11px] font-medium text-brand-600">~{s.weight} marks</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-800 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-white">Your GATE BT journey starts with one topic.</h2>
          <p className="mt-3 max-w-xl text-brand-100">
            Create a free account, set your exam date, and get a personal plan — the tutor does the rest.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/signup" className="btn bg-white px-6 py-3 text-base text-brand-700 hover:bg-brand-50">
              Start Learning Free
            </Link>
            <Link href="/mock" className="btn bg-brand-500/40 px-6 py-3 text-base text-white ring-1 ring-white/40 hover:bg-brand-500/60">
              Try a Mock Test
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-sm text-ink-400 sm:px-6">
          <div className="flex items-center gap-2">
            <Dna className="h-4 w-4 text-brand-600" />
            GATE BT Personal Tutor — Biotechnology, from basics to GATE level.
          </div>
          <div>PYQs are clearly labelled as verified or PYQ-style.</div>
        </div>
      </footer>
    </div>
  );
}
