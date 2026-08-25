import { supabasePublic, getSupabaseAdmin } from '@/lib/supabase/server';

export interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  submittedAt: string;
}

export type NewEnrollment = Pick<Enrollment, 'name' | 'email' | 'phone' | 'course'>;

interface EnrollmentRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  submitted_at: string;
}

const toEnrollment = (row: EnrollmentRow): Enrollment => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  course: row.course,
  submittedAt: row.submitted_at,
});

/**
 * Reads every enrollment. Requires the service_role key (bypasses Row Level
 * Security) since the enrollments table intentionally has no public SELECT
 * policy — see supabase/migrations/0001_create_enrollments.sql.
 */
export const readEnrollments = async (): Promise<Enrollment[]> => {
  const admin = getSupabaseAdmin();

  const { data, error } = await admin
    .from('enrollments')
    .select('*')
    .order('submitted_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to read enrollments: ${error.message}`);
  }

  return (data as EnrollmentRow[]).map(toEnrollment);
};

/**
 * Inserts a new enrollment using the public (RLS-scoped) client — anyone may
 * submit one, per the "Public can submit enrollments" policy.
 */
export const addEnrollment = async (entry: NewEnrollment): Promise<Enrollment> => {
  const { data, error } = await supabasePublic
    .from('enrollments')
    .insert({
      name: entry.name,
      email: entry.email,
      phone: entry.phone,
      course: entry.course,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to submit enrollment: ${error.message}`);
  }

  return toEnrollment(data as EnrollmentRow);
};
