'use client';

// Importing this module installs the authenticated-fetch patch as a side
// effect, at module-evaluation time — before any component renders. That
// ordering matters: see the comment in lib/auth-fetch.ts for why doing this
// inside a useEffect caused pages to fire their first /api/auth/me call
// unauthenticated and get bounced to /login.
import '@/lib/auth-fetch';

export default function AuthTokenBridge() {
  return null;
}
