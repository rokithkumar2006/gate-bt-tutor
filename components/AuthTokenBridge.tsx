'use client';

import { useEffect } from 'react';

// Keeps the session working when cookies cannot be relied on.
//
// In the sandbox preview the app is served inside a cross-site iframe. Browsers
// that block third-party cookies (Chrome incognito, Safari ITP, Firefox ETP)
// silently drop the session cookie even though the server issues it correctly
// as `SameSite=None; Secure`. The result: login succeeds, then every following
// request looks unauthenticated and the user appears logged out.
//
// The fix is a belt-and-braces second channel. `/api/auth/login` and
// `/api/auth/signup` now return the session token in their JSON body; we stash
// it in localStorage and attach it to every same-origin `/api/...` request as
// `Authorization: Bearer <token>`. Bearer headers are unaffected by cookie
// policy, so auth survives even with cookies fully blocked. When cookies do
// work, both channels agree and nothing changes.
//
// Patching window.fetch once here means none of the ~20 existing pages need to
// be touched.
const STORAGE_KEY = 'gbt_token';

export default function AuthTokenBridge() {
  useEffect(() => {
    const w = window as typeof window & { __gbtFetchPatched?: boolean };
    if (w.__gbtFetchPatched) return;
    w.__gbtFetchPatched = true;

    const originalFetch = window.fetch.bind(window);

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      // Only touch our own API calls, never third-party requests.
      let url = '';
      if (typeof input === 'string') url = input;
      else if (input instanceof URL) url = input.toString();
      else if (input instanceof Request) url = input.url;

      const isOwnApi =
        url.startsWith('/api/') ||
        (typeof window !== 'undefined' && url.startsWith(`${window.location.origin}/api/`));

      if (!isOwnApi) return originalFetch(input as RequestInfo, init);

      const token = window.localStorage.getItem(STORAGE_KEY);
      const nextInit: RequestInit = { credentials: 'same-origin', ...init };
      if (token) {
        const merged = new Headers(nextInit.headers ?? (input instanceof Request ? input.headers : undefined));
        if (!merged.has('authorization')) merged.set('Authorization', `Bearer ${token}`);
        nextInit.headers = merged;
      }

      const res = await originalFetch(input as RequestInfo, nextInit);

      // Capture the token minted by login/signup, and drop it on logout.
      try {
        if (/\/api\/auth\/(login|signup)$/.test(url) && res.ok) {
          const data = await res.clone().json();
          if (data?.token) window.localStorage.setItem(STORAGE_KEY, data.token);
        } else if (/\/api\/auth\/logout$/.test(url)) {
          window.localStorage.removeItem(STORAGE_KEY);
        } else if (res.status === 401) {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // Non-JSON body — nothing to capture.
      }

      return res;
    };
  }, []);

  return null;
}
