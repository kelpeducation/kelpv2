import type { CourseInput } from '@/lib/portal/coursesStore';
import type { AnnouncementInput } from '@/lib/portal/announcementsStore';

export const parseCourseInput = (body: unknown): CourseInput | { error: string } => {
  const b = body as Record<string, unknown>;
  const title = typeof b?.title === 'string' ? b.title.trim() : '';
  const level = typeof b?.level === 'string' ? b.level.trim() : '';
  const description = typeof b?.description === 'string' ? b.description.trim() : '';
  const teacherName = typeof b?.teacherName === 'string' ? b.teacherName.trim() : '';
  const teacherBio = typeof b?.teacherBio === 'string' ? b.teacherBio.trim() : '';
  const teacherAvatarInitials = typeof b?.teacherAvatarInitials === 'string' ? b.teacherAvatarInitials.trim() : '';
  const price = typeof b?.price === 'number' ? b.price : Number(b?.price);

  if (!title) return { error: 'Course title is required.' };
  if (!level) return { error: 'Level is required.' };
  if (!description) return { error: 'Description is required.' };
  if (!teacherName) return { error: 'Teacher name is required.' };
  if (!teacherBio) return { error: 'Teacher bio is required.' };
  if (!teacherAvatarInitials) return { error: 'Teacher initials are required.' };
  if (!Number.isFinite(price) || price < 0) return { error: 'A valid price is required.' };

  return { title, level, description, teacherName, teacherBio, teacherAvatarInitials, price };
};

export const parseAnnouncementInput = (body: unknown): AnnouncementInput | { error: string } => {
  const b = body as Record<string, unknown>;
  const title = typeof b?.title === 'string' ? b.title.trim() : '';
  const announcementBody = typeof b?.body === 'string' ? b.body.trim() : '';

  if (!title) return { error: 'Announcement title is required.' };
  if (!announcementBody) return { error: 'Announcement body is required.' };

  return { title, body: announcementBody };
};
