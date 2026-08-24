import { promises as fs } from 'fs';
import path from 'path';

export interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  submittedAt: string;
}

export type NewEnrollment = Pick<Enrollment, 'name' | 'email' | 'phone' | 'course'>;

const filePath = path.join(process.cwd(), 'src', 'content', 'enrollments.json');

export const readEnrollments = async (): Promise<Enrollment[]> => {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as Enrollment[];
  } catch {
    return [];
  }
};

export const addEnrollment = async (entry: NewEnrollment): Promise<Enrollment> => {
  const enrollments = await readEnrollments();

  const newEntry: Enrollment = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
  };

  enrollments.push(newEntry);
  await fs.writeFile(filePath, `${JSON.stringify(enrollments, null, 2)}\n`, 'utf-8');

  return newEntry;
};
