'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, X } from 'lucide-react';
import { usePortal } from '@/components/portal/PortalContext';
import { useToast } from '@/hooks/use-toast';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { Booking, Course, toBooking, toCourse } from '@/lib/portal/types';

const PortalBookingsView = () => {
  const { session } = usePortal();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    if (!session) return;
    setLoading(true);

    const [bookingsRes, coursesRes] = await Promise.all([
      supabaseBrowser
        .from('bookings')
        .select('*')
        .eq('student_id', session.user.id)
        .eq('status', 'confirmed')
        .order('class_date', { ascending: true }),
      supabaseBrowser.from('courses').select('*'),
    ]);

    if (bookingsRes.data) setBookings(bookingsRes.data.map(toBooking));
    if (coursesRes.data) setCourses(coursesRes.data.map(toCourse));
    setLoading(false);
  }, [session]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleCancel = async (bookingId: string) => {
    const { error } = await supabaseBrowser.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId);

    if (error) {
      toast({ title: 'Could not cancel booking', description: error.message, variant: 'destructive' });
      return;
    }

    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    toast({ title: 'Booking cancelled' });
  };

  const courseById = (id: string) => courses.find((c) => c.id === id);

  return (
    <div className="px-6 md:px-10 py-10 container-custom">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">My Classes</h1>
        <p className="text-muted-foreground text-sm">Your upcoming booked classes.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <p className="text-muted-foreground text-sm">You haven&apos;t booked any classes yet.</p>
          <Link
            href="/portal/dashboard/courses"
            className="inline-block mt-4 text-primary font-semibold text-sm hover:text-secondary transition-colors"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((b) => {
            const course = courseById(b.courseId);
            const classDate = new Date(`${b.classDate}T00:00:00`);
            return (
              <div
                key={b.id}
                className="bg-card border border-border rounded-2xl p-5 relative flex gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary text-white flex flex-col items-center justify-center leading-none">
                  <span className="text-[10px] font-semibold uppercase tracking-wide opacity-80">
                    {classDate.toLocaleDateString(undefined, { month: 'short' })}
                  </span>
                  <span className="text-xl font-bold mt-0.5">{classDate.getDate()}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground text-sm truncate pr-6">{course?.title ?? 'Class'}</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {classDate.toLocaleDateString(undefined, { weekday: 'long' })}
                  </p>
                  <p className="text-primary text-sm font-medium mt-1">{b.timeSlot}</p>
                </div>
                <button
                  onClick={() => handleCancel(b.id)}
                  className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors"
                  aria-label="Cancel booking"
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PortalBookingsView;
