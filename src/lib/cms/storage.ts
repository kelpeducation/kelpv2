import { getSupabaseAdmin } from '@/lib/supabase/server';

const BUCKET = 'cms-uploads';
const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']);

const extensionForType = (type: string) => {
  switch (type) {
    case 'image/png':
      return 'png';
    case 'image/jpeg':
      return 'jpg';
    case 'image/webp':
      return 'webp';
    case 'image/gif':
      return 'gif';
    case 'image/svg+xml':
      return 'svg';
    default:
      return 'bin';
  }
};

export const uploadCmsImage = async (file: File): Promise<string> => {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error('Unsupported file type. Use PNG, JPG, WEBP, GIF, or SVG.');
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('Image is too large. Maximum size is 5MB.');
  }

  const admin = getSupabaseAdmin();
  const path = `${crypto.randomUUID()}.${extensionForType(file.type)}`;

  const { error } = await admin.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  const { data } = admin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
};
