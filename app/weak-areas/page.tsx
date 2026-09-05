'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Badge, Card, EmptyState, ProgressBar, SectionTitle } from '@/components/ui';
import { recommendationsFor } from '@/lib/analytics';
import type { TopicStat } from '@/lib/analytics';
import { AlertTriangle, BarChart3, Shield, PenLine, BookOpenCheck } from 'lucide-react';

export default function WeakAreasPage() {
  const [weak, setWeak] = useState<TopicStat[]>([]);
  const [average, setAverage] = useState<TopicStat[]>([]);
  const [strong, setStrong] = useState<TopicStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setWeak(d.weak ?? []);
          setAverage(d.average ?? []);
          setStrong(d.strong ?? []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-24 text-center text-ink-400">Crunching your attempts…</div>;

  const Card3 = ({ stat, tone, icon, recs }: { stat: TopicStat; tone: 'rose' | 'amber' | 'brand'; icon: React.ReactNode; recs?: string[] }) => (
    <Card className="p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              tone === 'rose' ? 'bg-rose-50 text-rose-600' : tone === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-brand-50 text-brand-600'
            }`}
          >
            {icon}
          </div>
          <div>
            <div className="font-bold text-ink-900">{stat.topicName}</div>
            <div className="text-xs text-ink-400">
              {stat.name} · {stat.attempted} attempts
            </div>
          </div>
        </div>
        <Badge tone={tone}>{stat.accuracy}%</Badge>
      </div>
      <ProgressBar value={stat.accuracy} barClass={tone === 'rose' ? 'bg-rose-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-brand-500'} />
      {recs && recs.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {recs.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-ink-600">
              <span className="mt-0.5 text-brand-500">→</span> {r}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex gap-2">
        <Link href={`/practice?subject=${stat.slug}`} className="btn-secondary flex-1 text-xs">
          <PenLine className="h-3.5 w-3.5" /> Practice
        </Link>
        <Link href={`/learn/${stat.slug}/${stat.topic}`} className="btn-secondary flex-1 text-xs">
          <BookOpenCheck className="h-3.5 w-3.5" /> Re-learn
        </Link>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ink-900">Weak Areas</h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-500">
          A topic is <b>weak</b> when your accuracy is under 50% over at least 2 attempts, <b>average</b> between 50–75%, and <b>strong</b> above 75%.
        </p>
      </div>

      {weak.length === 0 && average.length === 0 && strong.length === 0 ? (
        <EmptyState
          title="Not enough data yet"
          sub="Complete at least one practice set or mock test — your weak topics will appear here with specific recommendations."
          action={
            <div className="flex gap-2">
              <Link href="/practice" className="btn-primary">Start Practising</Link>
              <Link href="/mock" className="btn-secondary">Take a Mock</Link>
            </div>
          }
        />
      ) : (
        <>
          <div>
            <SectionTitle title="🔴 Weak — fix these first" sub={`${weak.length} topic${weak.length === 1 ? '' : 's'} under 50% accuracy`} />
            {weak.length === 0 ? (
              <p className="text-sm text-ink-500">No weak topics — great discipline! Keep the streak alive.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {weak.map((w) => (
                  <Card3 key={w.topic} stat={w} tone="rose" icon={<AlertTriangle className="h-5 w-5" />} recs={recommendationsFor(w)} />
                ))}
              </div>
            )}
          </div>

          <div>
            <SectionTitle title="🟡 Average — consolidate" sub={`${average.length} topics between 50–75%`} />
            {average.length === 0 ? (
              <p className="text-sm text-ink-500">Nothing in the average band.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {average.map((w) => (
                  <Card3 key={w.topic} stat={w} tone="amber" icon={<BarChart3 className="h-5 w-5" />} />
                ))}
              </div>
            )}
          </div>

          <div>
            <SectionTitle title="🟢 Strong — keep it warm" sub={`${strong.length} topics above 75%`} />
            {strong.length === 0 ? (
              <p className="text-sm text-ink-500">No strong topics yet — they will appear as your accuracy climbs.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {strong.map((w) => (
                  <Card3 key={w.topic} stat={w} tone="brand" icon={<Shield className="h-5 w-5" />} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
