import { NextResponse } from 'next/server';
import { isServerlessHost, storeName } from '@/lib/store-helpers';

export const dynamic = 'force-dynamic';

/**
 * GET /api/health/storage
 *
 * Public, unauthenticated diagnostics for the storage backend — deliberately
 * so, because the failure it detects makes logging in impossible.
 *
 * Leaks nothing sensitive: reports only WHETHER each env var is present, never
 * its value.
 */
export async function GET() {
  const backend = storeName();
  const serverless = isServerlessHost();
  const hasUrl = Boolean(process.env.SUPABASE_URL);
  const hasKey = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

  const persistent = backend === 'supabase' || !serverless;

  return NextResponse.json({
    backend,
    serverless,
    persistent,
    supabaseUrlSet: hasUrl,
    supabaseServiceRoleKeySet: hasKey,
    status: persistent ? 'ok' : 'misconfigured',
    message: persistent
      ? backend === 'supabase'
        ? 'Using Supabase. Accounts and progress persist.'
        : 'Using the local JSON file store. Fine for local development.'
      : 'Running on a serverless host with no database: the filesystem is ephemeral, so accounts cannot be saved and login will always fail. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then redeploy.',
    ...(persistent
      ? {}
      : {
          missing: [
            ...(hasUrl ? [] : ['SUPABASE_URL']),
            ...(hasKey ? [] : ['SUPABASE_SERVICE_ROLE_KEY']),
          ],
        }),
  });
}
