'use client';

import { useCallback, useEffect, useState } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import { usePortal } from '@/components/portal/PortalContext';
import PortalPageHeader from '@/components/portal/PortalPageHeader';
import CourseCard from '@/components/portal/CourseCard';
import BookingDialog from '@/components/portal/BookingDialog';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { Course, toCourse } from '@/lib/portal/types';

const PortalCoursesView = () => {
  const { session } = usePortal();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingCourse, setBookingCourse] = useState<Course | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    const { data } = await supabaseBrowser.from('courses').select('*').order('created_at', { ascending: true });
    if (data) setCourses(data.map(toCourse));
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadCourses();
  }, [loadCourses]);

  if (!session) return null;

  return (
    <div className="px-6 md:px-10 py-10 container-custom">
      <PortalPageHeader
        icon={BookOpen}
        title="Available Courses"
        description="Browse teachers and book your next English class."
        action={
          !loading && (
            <span className="inline-flex items-center rounded-full bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1.5">
              {courses.length} {courses.length === 1 ? 'course' : 'courses'} open
            </span>
          )
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BookOpen size={22} className="text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">No courses are open just yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onBook={(c) => {
                setBookingCourse(c);
                setBookingOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <BookingDialog
        course={bookingCourse}
        studentId={session.user.id}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        onBooked={() => {}}
      />
    </div>
  );
};

export default PortalCoursesView;
