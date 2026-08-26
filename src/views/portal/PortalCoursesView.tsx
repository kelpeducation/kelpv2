'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { usePortal } from '@/components/portal/PortalContext';
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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Available Courses</h1>
        <p className="text-muted-foreground text-sm">Browse teachers and book your next English class.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
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
