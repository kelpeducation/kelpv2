import { NextRequest, NextResponse } from 'next/server';
import {
  isCmsSection,
  isValidCmsKey,
  readCmsSection,
  writeCmsSection,
} from '@/lib/cms/contentStore';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    section: string;
  };
}

const resolveSection = (section: string) => {
  if (!isCmsSection(section)) {
    return null;
  }
  return section;
};

export async function GET(_req: NextRequest, context: RouteContext) {
  const section = resolveSection(context.params.section);

  if (!section) {
    return NextResponse.json({ error: 'Invalid CMS section.' }, { status: 404 });
  }

  try {
    const data = await readCmsSection(section);
    return NextResponse.json({ section, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read CMS section.' },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, context: RouteContext) {
  const section = resolveSection(context.params.section);

  if (!section) {
    return NextResponse.json({ error: 'Invalid CMS section.' }, { status: 404 });
  }

  const key = req.headers.get('x-cms-key');

  if (!isValidCmsKey(key)) {
    return NextResponse.json(
      { error: 'Unauthorized. Invalid CMS key.' },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();

    if (!body || typeof body !== 'object' || !('data' in body)) {
      return NextResponse.json(
        { error: 'Invalid payload. Expected { data: ... }.' },
        { status: 400 },
      );
    }

    await writeCmsSection(section, body.data);

    return NextResponse.json({ ok: true, section });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to write CMS section.' },
      { status: 500 },
    );
  }
}
