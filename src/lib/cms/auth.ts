import { createHash, timingSafeEqual } from 'crypto';

/**
 * Constant-time comparison so response timing can't be used to guess the
 * password one character at a time. Both sides are hashed first so the
 * buffers always have equal length.
 */
export const isValidCmsKey = (providedKey: string | null) => {
  // No password while running locally with `npm run dev`. Production builds
  // (`next build` / the deployed site) always require CMS_ADMIN_PASSWORD.
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const expectedKey = process.env.CMS_ADMIN_PASSWORD;

  if (!expectedKey || !providedKey) {
    return false;
  }

  const provided = createHash('sha256').update(providedKey).digest();
  const expected = createHash('sha256').update(expectedKey).digest();

  return timingSafeEqual(provided, expected);
};
