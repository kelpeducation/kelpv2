import { getSupabaseAdmin } from '@/lib/supabase/server';
import { Announcement, toAnnouncement } from '@/lib/portal/types';

export type AnnouncementInput = Pick<Announcement, 'title' | 'body'>;

export const readAnnouncements = async (): Promise<Announcement[]> => {
  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from('announcements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to read announcements: ${error.message}`);
  }

  return data.map(toAnnouncement);
};

export const createAnnouncement = async (input: AnnouncementInput): Promise<Announcement> => {
  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from('announcements')
    .insert({ title: input.title, body: input.body })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create announcement: ${error.message}`);
  }

  return toAnnouncement(data);
};

export const updateAnnouncement = async (id: string, input: AnnouncementInput): Promise<Announcement> => {
  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from('announcements')
    .update({ title: input.title, body: input.body })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update announcement: ${error.message}`);
  }

  return toAnnouncement(data);
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  const admin = getSupabaseAdmin();

  const { error } = await admin.from('announcements').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete announcement: ${error.message}`);
  }
};
