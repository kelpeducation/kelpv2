import { NextRequest, NextResponse } from 'next/server';
import { isValidCmsKey } from '@/lib/cms/contentStore';
import { addEnrollment, readEnrollments } from '@/lib/enrollments/store';

export const dynamic = 'force-dynamic';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(req: NextRequest) {
  const key = req.headers.get('x-cms-key');

  if (!isValidCmsKey(key)) {
    return NextResponse.json({ error: 'Unauthorized. Invalid admin key.' }, { status: 401 });
  }

  try {
    const data = await readEnrollments();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Failed to read enrollments.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    const course = typeof body?.course === 'string' ? body.course.trim() : '';

    if (!name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }
    if (!course) {
      return NextResponse.json({ error: 'Please select a program.' }, { status: 400 });
    }

    const entry = await addEnrollment({ name, email, phone, course });

    return NextResponse.json({ ok: true, data: entry });
  } catch {
    return NextResponse.json({ error: 'Failed to submit enrollment.' }, { status: 500 });
  }
}
