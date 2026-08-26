import { NextRequest, NextResponse } from 'next/server';
import { isValidCmsKey } from '@/lib/cms/contentStore';
import { updateCourse, deleteCourse } from '@/lib/portal/coursesStore';
import { parseCourseInput } from '@/lib/portal/validators';

export const dynamic = 'force-dynamic';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function PUT(req: NextRequest, context: RouteContext) {
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

    const entry = await updateCourse(context.params.id, parsed);
    return NextResponse.json({ ok: true, data: entry });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update course.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const key = req.headers.get('x-cms-key');

  if (!isValidCmsKey(key)) {
    return NextResponse.json({ error: 'Unauthorized. Invalid admin key.' }, { status: 401 });
  }

  try {
    await deleteCourse(context.params.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete course.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
