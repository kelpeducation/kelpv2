import { NextRequest, NextResponse } from 'next/server';
import { isValidCmsKey } from '@/lib/cms/contentStore';
import { addSubscriber, readSubscribers } from '@/lib/newsletter/store';

export const dynamic = 'force-dynamic';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(req: NextRequest) {
  const key = req.headers.get('x-cms-key');

  if (!isValidCmsKey(key)) {
    return NextResponse.json({ error: 'Unauthorized. Invalid admin key.' }, { status: 401 });
  }

  try {
    const data = await readSubscribers();
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to read subscribers.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const result = await addSubscriber(email);

    return NextResponse.json({ ok: true, alreadySubscribed: result.alreadySubscribed });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to subscribe.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
