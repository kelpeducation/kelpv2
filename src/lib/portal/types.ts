export interface Course {
  id: string;
  title: string;
  level: string;
  description: string;
  teacherName: string;
  teacherBio: string;
  teacherAvatarInitials: string;
  price: number;
}

export interface Booking {
  id: string;
  courseId: string;
  classDate: string;
  timeSlot: string;
  status: 'confirmed' | 'cancelled';
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface CourseRow {
  id: string;
  title: string;
  level: string;
  description: string;
  teacher_name: string;
  teacher_bio: string;
  teacher_avatar_initials: string;
  price: number;
}

export const toCourse = (row: CourseRow): Course => ({
  id: row.id,
  title: row.title,
  level: row.level,
  description: row.description,
  teacherName: row.teacher_name,
  teacherBio: row.teacher_bio,
  price: row.price ?? 0,
  teacherAvatarInitials: row.teacher_avatar_initials,
});

interface BookingRow {
  id: string;
  course_id: string;
  class_date: string;
  time_slot: string;
  status: 'confirmed' | 'cancelled';
}

export const toBooking = (row: BookingRow): Booking => ({
  id: row.id,
  courseId: row.course_id,
  classDate: row.class_date,
  timeSlot: row.time_slot,
  status: row.status,
});

interface AnnouncementRow {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

export const toAnnouncement = (row: AnnouncementRow): Announcement => ({
  id: row.id,
  title: row.title,
  body: row.body,
  createdAt: row.created_at,
});

interface ProfileRow {
  id: string;
  full_name: string;
  email: string;
  phone: string;
}

export const toProfile = (row: ProfileRow): Profile => ({
  id: row.id,
  fullName: row.full_name,
  email: row.email,
  phone: row.phone,
});
