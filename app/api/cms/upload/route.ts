import { NextRequest, NextResponse } from 'next/server';
import { isValidCmsKey } from '@/lib/cms/contentStore';
import { uploadCmsImage } from '@/lib/cms/storage';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const key = req.headers.get('x-cms-key');

  if (!isValidCmsKey(key)) {
    return NextResponse.json({ error: 'Unauthorized. Invalid admin key.' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    const url = await uploadCmsImage(file);
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to upload image.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
