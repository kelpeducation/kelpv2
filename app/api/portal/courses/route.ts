import { NextRequest, NextResponse } from 'next/server';
import { isValidCmsKey } from '@/lib/cms/contentStore';
import { readCourses, createCourse } from '@/lib/portal/coursesStore';
import { parseCourseInput } from '@/lib/portal/validators';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const key = req.headers.get('x-cms-key');

  if (!isValidCmsKey(key)) {
    return NextResponse.json({ error: 'Unauthorized. Invalid admin key.' }, { status: 401 });
  }

  try {
    const data = await readCourses();
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to read courses.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const key = req.headers.get('x-cms-key');

  if (!isValidCmsKey(key)) {
    return NextResponse.json({ error: 'Unauthorized. Invalid admin key.' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = parseCourseInput(body);

    if ('error' in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const entry = await createCourse(parsed);
    return NextResponse.json({ ok: true, data: entry });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create course.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
