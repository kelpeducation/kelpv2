'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, X } from 'lucide-react';
import { usePortal } from '@/components/portal/PortalContext';
import { useToast } from '@/hooks/use-toast';
import { supabaseBrowser } from '@/lib/supabase/browser';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Booking, Course, toBooking, toCourse } from '@/lib/portal/types';

const PortalBookingsView = () => {
  const { session } = usePortal();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);
  const [cancelling, setCancelling] = useState(false);

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

  const courseById = (id: string) => courses.find((c) => c.id === id);

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    setCancelling(true);

    const { error } = await supabaseBrowser
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', cancelTarget.id);

    setCancelling(false);

    if (error) {
      toast({ title: 'Could not cancel booking', description: error.message, variant: 'destructive' });
      setCancelTarget(null);
      return;
    }

    setBookings((prev) => prev.filter((b) => b.id !== cancelTarget.id));
    toast({ title: 'Booking cancelled' });
    setCancelTarget(null);
  };

  const cancelCourse = cancelTarget ? courseById(cancelTarget.courseId) : undefined;
  const cancelDate = cancelTarget ? new Date(`${cancelTarget.classDate}T00:00:00`) : null;

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
                  onClick={() => setCancelTarget(b)}
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

      <AlertDialog open={cancelTarget !== null} onOpenChange={(open) => !open && setCancelTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this class?</AlertDialogTitle>
            <AlertDialogDescription>
              {cancelCourse && cancelDate ? (
                <>
                  You&apos;re about to cancel <span className="font-semibold text-foreground">{cancelCourse.title}</span>{' '}
                  on{' '}
                  <span className="font-semibold text-foreground">
                    {cancelDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>{' '}
                  at <span className="font-semibold text-foreground">{cancelTarget?.timeSlot}</span>. This cannot be
                  undone — you&apos;ll need to book a new slot if you change your mind.
                </>
              ) : (
                'This cannot be undone.'
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelling}>Keep Class</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmCancel}
              disabled={cancelling}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {cancelling && <Loader2 className="h-4 w-4 animate-spin" />}
              Cancel Class
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PortalBookingsView;
