'use client';

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';
import QuestionCard from '@/components/QuestionCard';
import { Badge, Card, Spinner } from '@/components/ui';
import { subjectBySlug, SUBJECTS } from '@/lib/content/subjects';
import { topicById } from '@/lib/content/topics';
import { numericalById } from '@/lib/content/numericals';
import type { TutorMessage } from '@/lib/types';
import type { TutorReply } from '@/lib/ai/tutor';
import { Bot, Send, Sparkles, ArrowUpRight, Calculator, ExternalLink } from 'lucide-react';

const QUICK = ['Explain Again', 'Explain Like a Beginner', 'Give an Example', 'Give Me Questions', 'Show Important Formulas', 'Start Numericals', 'Quick Revision'];
const GLOBAL = ['Start', 'Next', 'Test', 'PYQ', 'Mock Test', 'Numericals', 'Weak Areas'];

function renderInline(text: string, key: number) {
  // **bold** and `code`
  const parts: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) parts.push(<b key={`${key}-${i++}`} className="font-semibold text-ink-900">{tok.slice(2, -2)}</b>);
    else parts.push(<code key={`${key}-${i++}`} className="rounded bg-ink-100 px-1.5 py-0.5 font-mono text-[13px] text-brand-700">{tok.slice(1, -1)}</code>);
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <span key={key}>{parts}</span>;
}

function TutorText({ text }: { text: string }) {
  const lines = text.split('\n');
  const out: React.ReactNode[] = [];
  lines.forEach((line, i) => {
    const t = line.trimEnd();
    if (t.startsWith('### ')) out.push(<h3 key={i} className="mb-1 mt-3 text-base font-bold text-ink-900 first:mt-0">{renderInline(t.slice(4), i)}</h3>);
    else if (t.startsWith('## ')) out.push(<h2 key={i} className="mb-1 mt-3 text-lg font-bold text-ink-900 first:mt-0">{renderInline(t.slice(3), i)}</h2>);
    else if (t.startsWith('**') && t.endsWith('**') && !t.includes('\n')) out.push(<div key={i} className="mb-1 mt-2 text-sm font-bold text-ink-800">{renderInline(t.slice(2, -2), i)}</div>);
    else if (t.startsWith('• ') || t.startsWith('🔥 ') || t.startsWith('⚠️ ') || t.startsWith('❌ ') || t.startsWith('→ ') || t.startsWith('- '))
      out.push(
        <div key={i} className="flex items-start gap-2 py-0.5 text-sm leading-relaxed text-ink-700">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
          <span className="min-w-0">{renderInline(t.replace(/^[•🔥⚠️❌→-]\s*/, ''), i)}</span>
        </div>,
      );
    else if (t.startsWith('> ')) out.push(<div key={i} className="my-1 border-l-2 border-brand-300 pl-3 text-sm italic text-ink-600">{renderInline(t.slice(2), i)}</div>);
    else if (t === '') out.push(<div key={i} className="h-2" />);
    else out.push(<p key={i} className="py-0.5 text-sm leading-relaxed text-ink-700">{renderInline(t, i)}</p>);
  });
  return <div>{out}</div>;
}

interface Msg {
  id: string;
  role: 'user' | 'tutor';
  text: string;
  reply?: TutorReply;
}

function TutorPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [subject, setSubject] = useState<string>(params.get('subject') ?? '');
  const [topic, setTopic] = useState<string>(params.get('topic') ?? '');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const contextLine = useMemo(() => {
    const s = subject ? subjectBySlug.get(subject)?.name : null;
    const t = topic ? topicById.get(topic)?.name : null;
    if (!s && !t) return null;
    return { s, t };
  }, [subject, topic]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, busy]);

  const send = async (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || busy) return;
    setInput('');
    const userMsg: Msg = { id: crypto.randomUUID(), role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setBusy(true);

    // client-side context sync for Start commands
    let nextSubject = subject;
    const startMatch = text.match(/^start\s+[:\-]?\s*(.+)$/i);
    if (startMatch && startMatch[1].trim() && !startMatch[1].trim().toLowerCase().startsWith('[')) {
      const q = startMatch[1].trim().toLowerCase();
      const hit = SUBJECTS.find((s) => s.slug === q) ?? SUBJECTS.find((s) => s.name.toLowerCase().includes(q)) ?? SUBJECTS.find((s) => q.includes(s.name.toLowerCase()));
      if (hit) nextSubject = hit.slug;
    }

    const history: TutorMessage[] = messages.slice(-10).map((m) => ({ id: m.id, role: m.role, text: m.text }));
    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: text, subject: subject || undefined, topic: topic || undefined, history }),
      });
      // Session expired / logged out — send the user to log in instead of
      // printing a raw "Not authenticated" string into the chat.
      if (res.status === 401) {
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            role: 'tutor',
            text: 'Your session has expired. Redirecting you to the login page — your chat will work again once you sign back in.',
          },
        ]);
        setTimeout(() => router.replace('/login'), 1200);
        setBusy(false);
        return;
      }

      const data = await res.json();
      if (res.ok && data.reply) {
        setSubject(data.context?.subject ?? nextSubject);
        setTopic(data.reply.topicId ?? (data.context?.topic ?? topic));
        setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'tutor', text: data.reply.text, reply: data.reply }]);
      } else {
        setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'tutor', text: data.error ?? 'I could not process that — try one of the quick commands.' }]);
      }
    } catch {
      setMessages((m) => [...m, { id: crypto.randomUUID(), role: 'tutor', text: 'Network error — please try again.' }]);
    }
    setBusy(false);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[230px_1fr]">
      {/* Command rail */}
      <aside className="order-2 lg:order-1">
        <Card className="sticky top-20 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink-500">
            <Sparkles className="h-3.5 w-3.5" /> Quick commands
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK.map((c) => (
              <button key={c} onClick={() => send(c)} disabled={busy} className="chip bg-brand-50 text-brand-700 ring-brand-200 hover:bg-brand-100 disabled:opacity-50">
                {c}
              </button>
            ))}
          </div>
          <div className="mb-2 mt-5 text-xs font-bold uppercase tracking-wide text-ink-500">App commands</div>
          <div className="flex flex-wrap gap-1.5">
            {GLOBAL.map((c) => (
              <button key={c} onClick={() => send(c)} disabled={busy} className="chip bg-ink-50 text-ink-600 ring-ink-200 hover:bg-ink-100 disabled:opacity-50">
                {c === 'Start' ? 'Start [subject]' : c}
              </button>
            ))}
          </div>
          {contextLine && (
            <div className="mt-5 rounded-xl bg-slate-50 p-3 text-xs text-ink-500 ring-1 ring-ink-100">
              <div className="font-bold text-ink-600">Current context</div>
              <div className="mt-1">{contextLine.s}</div>
              {contextLine.t && <div className="font-semibold text-brand-700">{contextLine.t}</div>}
            </div>
          )}
        </Card>
      </aside>

      {/* Chat */}
      <Card className="order-1 flex h-[calc(100vh-7.5rem)] min-h-[480px] flex-col overflow-hidden lg:order-2">
        <div className="flex items-center gap-3 border-b border-ink-100 px-5 py-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-ink-900">AI Tutor</div>
            <div className="text-xs text-ink-400">Teaches from the GATE BT syllabus · answers marked as AI draft</div>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4 thin-scroll">
          {messages.length === 0 && (
            <div className="mx-auto max-w-md py-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-2xl">🧬</div>
              <h2 className="text-lg font-bold text-ink-900">Your personal GATE BT tutor</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                I teach one topic at a time, always from the basics up. Start a subject, or tap a quick command:
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button onClick={() => send('Start Molecular Biology')} className="chip bg-brand-50 text-brand-700 ring-brand-200 hover:bg-brand-100">Start Molecular Biology</button>
                <button onClick={() => send('Start Biochemistry')} className="chip bg-brand-50 text-brand-700 ring-brand-200 hover:bg-brand-100">Start Biochemistry</button>
                <button onClick={() => send('Weak Areas')} className="chip bg-ink-50 text-ink-600 ring-ink-200 hover:bg-ink-100">Weak Areas</button>
                <button onClick={() => send('Mock Test')} className="chip bg-ink-50 text-ink-600 ring-ink-200 hover:bg-ink-100">Mock Test</button>
              </div>
            </div>
          )}

          {messages.map((m) =>
            m.role === 'user' ? (
              <div key={m.id} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-sm text-white shadow-card">{m.text}</div>
              </div>
            ) : (
              <div key={m.id} className="flex gap-2.5">
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="max-w-[88%] space-y-3">
                  <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 ring-1 ring-ink-100 shadow-card">
                    <TutorText text={m.text} />
                  </div>

                  {m.reply?.questions && (
                    <div className="space-y-3">
                      {m.reply.questions.map((q, i) => (
                        <QuestionCard key={q.id} question={q} index={i} hideMeta onSubmitResult={() => {}} />
                      ))}
                    </div>
                  )}

                  {m.reply?.numericalId && (
                    <Link href={`/numericals?id=${m.reply.numericalId}`} className="flex items-center gap-2.5 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700 ring-1 ring-brand-200 hover:bg-brand-100">
                      <Calculator className="h-4 w-4" />
                      Open: {numericalById.get(m.reply.numericalId)?.name}
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Link>
                  )}

                  {m.reply?.nav ? (
                    <button
                      onClick={() => {
                        const nav = m.reply?.nav;
                        if (nav) router.push(nav);
                      }}
                      className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-200 hover:bg-indigo-100"
                    >
                      <ExternalLink className="h-4 w-4" /> Open in app
                    </button>
                  ) : null}

                  {m.reply?.aiDraft && <div className="pl-1 text-[10px] font-medium uppercase tracking-wide text-ink-300">AI draft · built from your syllabus</div>}
                </div>
              </div>
            ),
          )}

          {busy && (
            <div className="flex gap-2.5">
              <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tl-md bg-white px-4 py-3 ring-1 ring-ink-100 shadow-card">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-ink-100 p-3.5">
          <div className="flex items-end gap-2.5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={1}
              placeholder={contextLine?.t ? `Ask about ${contextLine.t}…` : 'Type “Start [subject]” or a question…'}
              className="input max-h-32 flex-1 resize-none"
            />
            <button onClick={() => send()} disabled={busy || !input.trim()} className="btn-primary h-11 w-11 shrink-0 rounded-xl p-0">
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-1.5 pl-1 text-[11px] text-ink-400">Enter to send · Shift+Enter for a new line</p>
        </div>
      </Card>
    </div>
  );
}

export default function TutorPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-ink-400">Loading…</div>}>
      <TutorPageInner />
    </Suspense>
  );
}
