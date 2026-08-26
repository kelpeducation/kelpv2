import { getSupabaseAdmin } from '@/lib/supabase/server';
import { Course, toCourse } from '@/lib/portal/types';

export type CourseInput = Omit<Course, 'id'>;

export const readCourses = async (): Promise<Course[]> => {
  const admin = getSupabaseAdmin();

  const { data, error } = await admin.from('courses').select('*').order('created_at', { ascending: true });

  if (error) {
    throw new Error(`Failed to read courses: ${error.message}`);
  }

  return data.map(toCourse);
};

const toRow = (input: CourseInput) => ({
  title: input.title,
  level: input.level,
  description: input.description,
  teacher_name: input.teacherName,
  teacher_bio: input.teacherBio,
  teacher_avatar_initials: input.teacherAvatarInitials,
  price: input.price,
});

export const createCourse = async (input: CourseInput): Promise<Course> => {
  const admin = getSupabaseAdmin();

  const { data, error } = await admin.from('courses').insert(toRow(input)).select().single();

  if (error) {
    throw new Error(`Failed to create course: ${error.message}`);
  }

  return toCourse(data);
};

export const updateCourse = async (id: string, input: CourseInput): Promise<Course> => {
  const admin = getSupabaseAdmin();

  const { data, error } = await admin.from('courses').update(toRow(input)).eq('id', id).select().single();

  if (error) {
    throw new Error(`Failed to update course: ${error.message}`);
  }

  return toCourse(data);
};

export const deleteCourse = async (id: string): Promise<void> => {
  const admin = getSupabaseAdmin();

  const { error } = await admin.from('courses').delete().eq('id', id);

  if (error) {
    throw new Error(`Failed to delete course: ${error.message}`);
  }
};
