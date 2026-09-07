// Attaches the session token to same-origin /api/* requests.
//
// WHY THIS EXISTS
// In the sandbox preview the app runs inside a cross-site iframe. Browsers that
// block third-party cookies (Chrome incognito, Safari ITP, Firefox ETP) drop
// the session cookie even though the server issues it correctly as
// `SameSite=None; Secure`. So login succeeds, then every subsequent request
// looks unauthenticated and the app bounces the user back to /login.
//
// The fix is a second, cookie-independent channel: /api/auth/login and
// /api/auth/signup return the session token in their JSON body, we keep it in
// localStorage, and send it as `Authorization: Bearer <token>`.
//
// WHY IT IS IMPORTED FOR SIDE EFFECTS RATHER THAN RUN IN A useEffect
// React runs child effects BEFORE parent effects. When the patch lived in a
// <AuthTokenBridge/> component in the root layout, pages like /dashboard fired
// their own `/api/auth/me` fetch first — unpatched, so without the bearer
// header. That 401'd and AppShell redirected to /login before the patch had
// even been installed. Running at module-evaluation time means the patch is in
// place before any component renders.
const STORAGE_KEY = 'gbt_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage can throw in locked-down privacy modes
  }
}

export function setToken(token: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, token);
  } catch {
    /* ignore */
  }
}

export function clearToken() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function urlOf(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input;
  if (input instanceof URL) return input.toString();
  if (input instanceof Request) return input.url;
  return '';
}

function isOwnApi(url: string): boolean {
  if (url.startsWith('/api/')) return true;
  if (typeof window !== 'undefined' && url.startsWith(`${window.location.origin}/api/`)) return true;
  return false;
}

export function installAuthFetch() {
  if (typeof window === 'undefined') return;
  const w = window as typeof window & { __gbtFetchPatched?: boolean };
  if (w.__gbtFetchPatched) return;
  w.__gbtFetchPatched = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = urlOf(input);
    if (!isOwnApi(url)) return originalFetch(input as RequestInfo, init);

    const token = getToken();
    const nextInit: RequestInit = { credentials: 'same-origin', ...init };
    if (token) {
      const merged = new Headers(
        nextInit.headers ?? (input instanceof Request ? input.headers : undefined),
      );
      if (!merged.has('authorization')) merged.set('Authorization', `Bearer ${token}`);
      nextInit.headers = merged;
    }

    const res = await originalFetch(input as RequestInfo, nextInit);

    try {
      if (/\/api\/auth\/(login|signup)$/.test(url) && res.ok) {
        const data = await res.clone().json();
        if (data?.token) setToken(data.token);
      } else if (/\/api\/auth\/logout$/.test(url)) {
        clearToken();
      } else if (res.status === 401) {
        clearToken();
      }
    } catch {
      // Non-JSON body — nothing to capture.
    }

    return res;
  };
}

// Install immediately on import, before any component renders.
installAuthFetch();
