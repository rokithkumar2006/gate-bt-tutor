'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard, Dna, Bot, PenLine, Archive, Timer, Calculator, BookOpen,
  BarChart3, AlertTriangle, CalendarRange, TrendingUp, Settings, LogOut,
  Menu, X, Flame,
} from 'lucide-react';
import type { User } from '@/lib/types';

interface AppData {
  user: User | null;
  streak: number;
  loading: boolean;
  refresh: () => void;
}

const AppDataContext = createContext<AppData>({ user: null, streak: 0, loading: true, refresh: () => {} });

export function useAppData(): AppData {
  return useContext(AppDataContext);
}

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Learn' },
  { href: '/subjects', label: 'Subjects', icon: Dna, group: 'Learn' },
  { href: '/tutor', label: 'AI Tutor', icon: Bot, group: 'Learn' },
  { href: '/practice', label: 'Question Practice', icon: PenLine, group: 'Practice' },
  { href: '/pyqs', label: 'PYQ Bank', icon: Archive, group: 'Practice' },
  { href: '/mock', label: 'Mock Tests', icon: Timer, group: 'Practice' },
  { href: '/numericals', label: 'Numericals', icon: Calculator, group: 'Practice' },
  { href: '/revision', label: 'Revision Center', icon: BookOpen, group: 'Revise' },
  { href: '/performance', label: 'Performance', icon: BarChart3, group: 'Analyse' },
  { href: '/weak-areas', label: 'Weak Areas', icon: AlertTriangle, group: 'Analyse' },
  { href: '/planner', label: 'Study Planner', icon: CalendarRange, group: 'Plan' },
  { href: '/progress', label: 'My Progress', icon: TrendingUp, group: 'Plan' },
  { href: '/settings', label: 'Settings', icon: Settings, group: 'Plan' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const refresh = useCallback(() => {
    fetch('/api/auth/me')
      .then(async (r) => {
        if (!r.ok) {
          setUser(null);
          router.replace('/login');
          return;
        }
        const data = await r.json();
        setUser(data.user);
        setStreak(data.streak ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 pb-6 pt-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Dna className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-bold leading-tight text-ink-900">GATE BT</div>
          <div className="text-xs font-medium leading-tight text-brand-600">Personal Tutor</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 thin-scroll">
        {['Learn', 'Practice', 'Revise', 'Analyse', 'Plan'].map((group) => (
          <div key={group} className="mb-4">
            <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">{group}</div>
            {NAV.filter((n) => n.group === group).map((n) => {
              const active = pathname === n.href || pathname.startsWith(`${n.href}/`);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'mb-0.5 flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                    active ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900',
                  )}
                >
                  <n.icon className={clsx('h-4 w-4 shrink-0', active ? 'text-brand-600' : 'text-ink-400')} />
                  {n.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-ink-100 p-3">
        <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            {(user?.name ?? 'S').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-ink-900">{user?.name ?? '…'}</div>
            <div className="truncate text-xs text-ink-400">{user?.email}</div>
          </div>
          <button onClick={logout} title="Log out" className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-rose-50 hover:text-rose-600">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <AppDataContext.Provider value={{ user, streak, loading, refresh }}>
      <div className="min-h-screen">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-ink-100 bg-white lg:block">{sidebar}</aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-ink-900/40" onClick={() => setMobileOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-white shadow-lift">
              <button onClick={() => setMobileOpen(false)} className="absolute right-3 top-5 rounded-lg p-1.5 text-ink-400 hover:bg-ink-100" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
              {sidebar}
            </aside>
          </div>
        )}

        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b border-ink-100 bg-white/80 backdrop-blur lg:pl-64">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-ink-500 hover:bg-ink-100 lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </button>
              <span className="text-sm font-semibold text-ink-700 lg:hidden">GATE BT Tutor</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-600 ring-1 ring-amber-200">
                <Flame className="h-4 w-4" />
                {streak}
                <span className="hidden text-xs font-medium text-amber-500 sm:inline">day streak</span>
              </div>
              <Link href="/dashboard" className="flex items-center gap-2" title="Dashboard">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                  {(user?.name ?? 'S').charAt(0).toUpperCase()}
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:ml-64 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
            </div>
          ) : (
            <div className="mx-auto max-w-6xl animate-fade-up">{children}</div>
          )}
        </main>
      </div>
    </AppDataContext.Provider>
  );
}
