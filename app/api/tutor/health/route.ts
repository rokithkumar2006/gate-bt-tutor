import { NextResponse } from 'next/server';
import { currentUser, storeName, unauthorized } from '@/lib/store-helpers';
import { llmAvailable, llmPing, getLastLlmError } from '@/lib/ai/tutor';

export const dynamic = 'force-dynamic';

/**
 * GET /api/tutor/health
 *
 * Diagnostics for the AI backend. Requires a logged-in user and never returns
 * the API key itself — only whether one is configured, the base URL, the model
 * and the provider's error message if the probe fails.
 */
export async function GET() {
  const user = await currentUser();
  if (!user) return unauthorized();

  const cfg = llmAvailable();
  if (!cfg) {
    return NextResponse.json({
      configured: false,
      storage: storeName(),
      engine: 'deterministic',
      message:
        'No GATE_BT_LLM_API_KEY set. The tutor is answering from the built-in syllabus engine. Add the key to .env.local and restart the dev server.',
    });
  }

  const ping = await llmPing();

  return NextResponse.json({
    configured: true,
    storage: storeName(),
    engine: ping.ok ? 'llm' : 'deterministic (LLM unreachable)',
    baseUrl: cfg.baseUrl,
    model: cfg.model,
    keyPreview: `${cfg.apiKey.slice(0, 6)}…${cfg.apiKey.slice(-4)}`,
    reachable: ping.ok,
    error: ping.error ?? getLastLlmError(),
  });
}
