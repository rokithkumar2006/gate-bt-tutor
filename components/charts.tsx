'use client';

import React from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  AreaChart, Area, Cell, PieChart, Pie, Legend,
} from 'recharts';

const BRAND = '#059669';
const ROSE = '#f43f5e';
const INDIGO = '#6366f1';
const AMBER = '#f59e0b';
const SLATE = '#94a3b8';

export function SubjectAccuracyChart({ data }: { data: { name: string; accuracy: number; attempted: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(data.length * 44, 180)}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
        <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 11, fill: '#475569' }} tickFormatter={(v: string) => (v.length > 20 ? `${v.slice(0, 18)}…` : v)} />
        <Tooltip formatter={(v: number, _n, p) => [`${v}%  (${(p.payload as { attempted: number }).attempted} Qs)`, 'Accuracy']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
        <Bar dataKey="accuracy" radius={[0, 6, 6, 0]} barSize={14}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.accuracy < 50 ? ROSE : d.accuracy > 75 ? BRAND : AMBER} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ScoreHistoryChart({ data }: { data: { label: string; testName: string; pct: number; accuracy: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ left: 0, right: 12, top: 12, bottom: 0 }}>
        <defs>
          <linearGradient id="gScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={BRAND} stopOpacity={0.35} />
            <stop offset="100%" stopColor={BRAND} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94a3b8' }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
          formatter={(v: number, name) => [`${v}%`, name === 'pct' ? 'Score' : 'Accuracy']}
        />
        <Area type="monotone" dataKey="pct" stroke={BRAND} strokeWidth={2.5} fill="url(#gScore)" dot={{ r: 3 }} />
        <Area type="monotone" dataKey="accuracy" stroke={INDIGO} strokeWidth={2} fill="none" strokeDasharray="4 3" dot={false} />
        <Legend wrapperStyle={{ fontSize: 12 }} formatter={(v) => (v === 'pct' ? 'Score %' : 'Accuracy %')} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function OutcomeDonut({ correct, incorrect, unattempted }: { correct: number; incorrect: number; unattempted: number }) {
  const data = [
    { name: 'Correct', value: correct, color: BRAND },
    { name: 'Incorrect', value: incorrect, color: ROSE },
    { name: 'Unattempted', value: unattempted, color: SLATE },
  ].filter((d) => d.value > 0);
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3} strokeWidth={0}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function StudyTimeChart({ data }: { data: { date: string; minutes: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v: string) => v.slice(5)} />
        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
        <Tooltip formatter={(v: number) => [`${v} min`, 'Study time']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
        <Bar dataKey="minutes" fill={AMBER} radius={[6, 6, 0, 0]} barSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}
