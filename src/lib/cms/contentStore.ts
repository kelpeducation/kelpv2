import { promises as fs } from 'fs';
import path from 'path';

export type CmsSection = 'products' | 'site-settings' | 'pages-content';

const cmsSections: CmsSection[] = ['products', 'site-settings', 'pages-content'];

/**
 * When Supabase isn't configured (e.g. local development without keys), CMS
 * content is read from and written to the JSON files in src/content/cms
 * instead. The Supabase client is imported lazily so a missing config doesn't
 * crash this module on load.
 */
export const isSupabaseConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

const localSectionPath = (section: CmsSection) =>
  path.join(process.cwd(), 'src', 'content', 'cms', `${section}.json`);

/**
 * Reads via the public client — CMS content renders the public site, so it
 * must be readable without the admin key. See
 * supabase/migrations/0005_create_cms_content.sql for the "anyone can read"
 * policy backing this.
 */
export const readCmsSection = async <T>(section: CmsSection): Promise<T> => {
  if (!isSupabaseConfigured()) {
    const raw = await fs.readFile(localSectionPath(section), 'utf-8');
    return JSON.parse(raw) as T;
  }

  const { supabasePublic } = await import('@/lib/supabase/server');
  const { data, error } = await supabasePublic
    .from('cms_content')
    .select('data')
    .eq('section', section)
    .single();

  if (error) {
    throw new Error(`Failed to read CMS section "${section}": ${error.message}`);
  }

  return data.data as T;
};

/**
 * Writes via the service_role client (bypasses RLS) — there is no public
 * write policy on cms_content on purpose. The only gate on this function
 * being called is the CMS_ADMIN_PASSWORD check in the API route.
 */
export const writeCmsSection = async <T>(section: CmsSection, value: T) => {
  if (!isSupabaseConfigured()) {
    await fs.writeFile(localSectionPath(section), `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
    return;
  }

  const { getSupabaseAdmin } = await import('@/lib/supabase/server');
  const admin = getSupabaseAdmin();

  const { error } = await admin
    .from('cms_content')
    .upsert({ section, data: value, updated_at: new Date().toISOString() }, { onConflict: 'section' });

  if (error) {
    throw new Error(`Failed to write CMS section "${section}": ${error.message}`);
  }
};

export const isCmsSection = (value: string): value is CmsSection => {
  return cmsSections.includes(value as CmsSection);
};

export { isValidCmsKey } from './auth';
