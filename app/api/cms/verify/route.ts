import { NextRequest, NextResponse } from 'next/server';
import { isValidCmsKey } from '@/lib/cms/auth';

export const dynamic = 'force-dynamic';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000;

/**
 * Best-effort brute-force protection: failed attempts are tracked per IP in
 * memory. On serverless hosts each instance keeps its own counter, so this
 * slows guessing down rather than being a hard guarantee.
 */
const failedAttempts = new Map<string, { count: number; firstAt: number }>();

const getClientIp = (req: NextRequest) =>
  req.headers.get('x-forwarded-for')?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const now = Date.now();
  const record = failedAttempts.get(ip);

  if (record && now - record.firstAt > LOCKOUT_WINDOW_MS) {
    failedAttempts.delete(ip);
  } else if (record && record.count >= MAX_FAILED_ATTEMPTS) {
    const minutesLeft = Math.ceil((LOCKOUT_WINDOW_MS - (now - record.firstAt)) / 60000);
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${minutesLeft} minute${minutesLeft === 1 ? '' : 's'}.` },
      { status: 429 },
    );
  }

  const key = req.headers.get('x-cms-key');

  if (!isValidCmsKey(key)) {
    const current = failedAttempts.get(ip);
    failedAttempts.set(ip, current ? { ...current, count: current.count + 1 } : { count: 1, firstAt: now });
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  failedAttempts.delete(ip);
  return NextResponse.json({ ok: true });
}
