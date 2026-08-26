import { supabasePublic, getSupabaseAdmin } from '@/lib/supabase/server';

export type CmsSection = 'products' | 'chatbot-knowledge' | 'site-settings' | 'pages-content';

const cmsSections: CmsSection[] = ['products', 'chatbot-knowledge', 'site-settings', 'pages-content'];

/**
 * Reads via the public client — CMS content renders the public site, so it
 * must be readable without the admin key. See
 * supabase/migrations/0005_create_cms_content.sql for the "anyone can read"
 * policy backing this.
 */
export const readCmsSection = async <T>(section: CmsSection): Promise<T> => {
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

export const isValidCmsKey = (providedKey: string | null) => {
  const expectedKey = process.env.CMS_ADMIN_PASSWORD;

  if (!expectedKey) {
    return false;
  }

  return providedKey === expectedKey;
};
