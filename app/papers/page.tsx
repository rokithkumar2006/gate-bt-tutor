'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Badge, Card, EmptyState, SectionTitle, Tabs } from '@/components/ui';
import { ATTEMPT_STRATEGY, PAPERS, PAPER_SOURCES, PATTERN_ERAS } from '@/lib/content/papers';
import {
  FileText, Download, KeyRound, ExternalLink, ShieldCheck, Info, Clock,
  Archive, Copy, Check, Landmark,
} from 'lucide-react';

type EraId = 'all' | 'current' | 'legacy2014' | 'legacy2010';

const ERA_TABS: { id: EraId; label: string }[] = [
  { id: 'all', label: 'All years' },
  { id: 'current', label: '2021 → now' },
  { id: 'legacy2014', label: '2014 → 2020' },
  { id: 'legacy2010', label: '2010 → 2013' },
];

function eraOf(year: number): Exclude<EraId, 'all'> {
  if (year >= 2021) return 'current';
  if (year >= 2014) return 'legacy2014';
  return 'legacy2010';
}

export default function PapersPage() {
  const [era, setEra] = useState<EraId>('all');
  const [keysOnly, setKeysOnly] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const list = useMemo(
    () =>
      PAPERS.filter((p) => (era === 'all' || eraOf(p.year) === era) && (!keysOnly || !!p.answerKeyUrl)),
    [era, keysOnly],
  );

  const withKeys = PAPERS.filter((p) => p.answerKeyUrl).length;

  const copyLink = async (year: number, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(year);
      setTimeout(() => setCopied((c) => (c === year ? null : c)), 1600);
    } catch {
      /* clipboard unavailable — the link is still clickable */
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Old Question Papers</h1>
          <p className="mt-1 max-w-2xl text-sm text-ink-500">
            Every GATE Biotechnology (BT) paper below is a{' '}
            <span className="font-semibold text-emerald-700">free, official PDF</span> hosted by the GATE organising
            institutes (IIT Guwahati, IIT Roorkee, IIT Kanpur). No login, no paywall — we only link out, nothing is
            re-hosted here.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="brand">{PAPERS.length} papers · 2010–2026</Badge>
          <Badge tone="slate">{withKeys} with official answer keys</Badge>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6 flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          <Tabs tabs={ERA_TABS} active={era} onChange={(id) => setEra(id as EraId)} />
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-2.5 ring-1 ring-ink-200">
          <input
            type="checkbox"
            checked={keysOnly}
            onChange={(e) => setKeysOnly(e.target.checked)}
            className="h-4 w-4 accent-brand-600"
          />
          <span className="text-sm font-semibold text-ink-700">Only papers with answer keys</span>
        </label>
      </Card>

      {/* Paper list */}
      {list.length === 0 ? (
        <EmptyState title="No papers match this filter" sub="Switch back to All years to see the full archive." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {list.map((p) => (
            <Card key={p.year} className="flex h-full flex-col p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-ink-900">GATE BT {p.year}</div>
                    <div className="flex items-center gap-1 text-xs text-ink-500">
                      <Landmark className="h-3 w-3" /> {p.institute}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-end gap-1.5">
                  {p.linkChecked && (
                    <Badge tone="brand">
                      <ShieldCheck className="h-3 w-3" /> Official
                    </Badge>
                  )}
                  {p.answerKeyUrl && <Badge tone="sky">Answer key</Badge>}
                </div>
              </div>

              <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-ink-500">
                <Clock className="h-3.5 w-3.5" /> {p.examDate}
              </div>

              <div className="mb-3 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs text-ink-600 ring-1 ring-ink-100">
                <div className="font-semibold text-ink-700">{p.pattern}</div>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {p.types.map((t) => (
                    <span key={t} className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-ink-500 ring-1 ring-ink-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mb-4 flex-1 text-sm text-ink-600">{p.note}</p>

              <div className="flex flex-wrap gap-2">
                <a href={p.paperUrl} target="_blank" rel="noreferrer noopener" className="btn-primary">
                  <Download className="h-4 w-4" /> Question paper
                </a>
                {p.answerKeyUrl && (
                  <a href={p.answerKeyUrl} target="_blank" rel="noreferrer noopener" className="btn-secondary">
                    <KeyRound className="h-4 w-4" /> Answer key
                  </a>
                )}
                {p.mirrorUrl && (
                  <a href={p.mirrorUrl} target="_blank" rel="noreferrer noopener" className="btn-ghost" title="Same paper on another official GATE site">
                    <ExternalLink className="h-4 w-4" /> Mirror
                  </a>
                )}
                <button onClick={() => copyLink(p.year, p.paperUrl)} className="btn-ghost" title="Copy the PDF link">
                  {copied === p.year ? <Check className="h-4 w-4 text-brand-600" /> : <Copy className="h-4 w-4" />}
                  {copied === p.year ? 'Copied' : 'Copy link'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pattern change explainer */}
      <div className="mt-10">
        <SectionTitle
          title="How the paper pattern changed"
          sub="Read this before you score an older paper — the marking scheme is not the same across eras."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {PATTERN_ERAS.map((e) => (
            <Card key={e.id} className="p-5">
              <Badge tone="indigo">{e.label}</Badge>
              <div className="mb-2 mt-3 font-bold text-ink-900">{e.title}</div>
              <ul className="space-y-1.5">
                {e.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-sm text-ink-600">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Strategy */}
      <div className="mt-10">
        <SectionTitle title="How to use these papers" sub="A PYQ solved carelessly teaches nothing — work each paper like this." />
        <div className="grid gap-4 sm:grid-cols-2">
          {ATTEMPT_STRATEGY.map((s, i) => (
            <Card key={s.title} className="flex gap-3 p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">
                {i + 1}
              </div>
              <div>
                <div className="mb-1 font-semibold text-ink-900">{s.title}</div>
                <p className="text-sm text-ink-600">{s.body}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Official sources */}
      <div className="mt-10">
        <SectionTitle title="Official download hubs" sub="Bookmark these — GATE papers move to the new organising institute's site each year." />
        <Card className="divide-y divide-ink-100">
          {PAPER_SOURCES.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-ink-50"
            >
              <Archive className="h-4 w-4 shrink-0 text-ink-400" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-700">{s.label}</span>
              <ExternalLink className="h-4 w-4 shrink-0 text-ink-400" />
            </a>
          ))}
        </Card>
      </div>

      {/* Footnote */}
      <Card className="mt-6 flex gap-3 p-5">
        <Info className="h-5 w-5 shrink-0 text-ink-400" />
        <div className="text-sm text-ink-600">
          <p>
            These PDFs are published free of cost by the GATE organising institutes. This app links to them directly and
            does not copy, mirror or sell any exam content. If a link ever 404s, the paper has simply moved to the
            current year’s organising-institute site — use the official download hubs above, or the bulk{' '}
            <span className="font-semibold">BT.zip</span> archive which holds every BT paper from 2007 onwards.
          </p>
          <p className="mt-2">
            Want the same questions solved with explanations instead of a raw PDF? Head to the{' '}
            <Link href="/pyqs" className="font-semibold text-brand-600 hover:underline">
              PYQ Bank
            </Link>{' '}
            or run a timed{' '}
            <Link href="/mock" className="font-semibold text-brand-600 hover:underline">
              Mock Test
            </Link>
            .
          </p>
        </div>
      </Card>
    </div>
  );
}
