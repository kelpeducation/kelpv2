'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CalendarClock, Megaphone, BookOpen, Loader2 } from 'lucide-react';
import { DecorativeBackground } from '@/components/ui/decorative-background';
import { usePortal } from '@/components/portal/PortalContext';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { Booking, Announcement, toBooking, toAnnouncement, Course, toCourse } from '@/lib/portal/types';

const PortalOverview = () => {
  const { session, profile } = usePortal();
  const [loading, setLoading] = useState(true);
  const [nextBooking, setNextBooking] = useState<Booking | null>(null);
  const [nextCourse, setNextCourse] = useState<Course | null>(null);
  const [latestAnnouncement, setLatestAnnouncement] = useState<Announcement | null>(null);
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    if (!session) return;
    let active = true;

    (async () => {
      setLoading(true);
      const today = new Date().toISOString().slice(0, 10);

      const [bookingRes, announcementRes, courseCountRes] = await Promise.all([
        supabaseBrowser
          .from('bookings')
          .select('*')
          .eq('student_id', session.user.id)
          .eq('status', 'confirmed')
          .gte('class_date', today)
          .order('class_date', { ascending: true })
          .limit(1)
          .maybeSingle(),
        supabaseBrowser.from('announcements').select('*').order('created_at', { ascending: false }).limit(1).maybeSingle(),
        supabaseBrowser.from('courses').select('*', { count: 'exact', head: true }),
      ]);

      if (!active) return;

      if (bookingRes.data) {
        const booking = toBooking(bookingRes.data);
        setNextBooking(booking);
        const { data: courseData } = await supabaseBrowser
          .from('courses')
          .select('*')
          .eq('id', booking.courseId)
          .maybeSingle();
        if (courseData && active) setNextCourse(toCourse(courseData));
      }
      if (announcementRes.data) setLatestAnnouncement(toAnnouncement(announcementRes.data));
      if (typeof courseCountRes.count === 'number') setCourseCount(courseCountRes.count);

      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [session]);

  const firstName = profile?.fullName?.split(' ')[0];

  return (
    <div>
      <div className="relative bg-primary text-white overflow-hidden">
        <DecorativeBackground gridOpacity={0.05} gridSize={60} blobs={2} blobColor="secondary" />
        <div className="container-custom relative z-10 py-10 md:py-14 px-6 md:px-10">
          <span className="inline-flex items-center gap-1.5 text-secondary font-semibold text-xs uppercase tracking-wider">
            <Sparkles size={14} />
            Student Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-bold mt-3 mb-2">Welcome{firstName ? `, ${firstName}` : ''}!</h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
            Book a class, meet your teachers, and stay current with announcements — all from one place.
          </p>
        </div>
      </div>

      <div className="container-custom px-6 md:px-10 py-10">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/portal/dashboard/bookings"
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <CalendarClock size={18} />
              </span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Next Class</p>
              {nextBooking && nextCourse ? (
                <>
                  <p className="font-bold text-foreground">{nextCourse.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(`${nextBooking.classDate}T00:00:00`).toLocaleDateString(undefined, {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}{' '}
                    · {nextBooking.timeSlot}
                  </p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No classes booked yet.</p>
              )}
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
                View My Classes <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              href="/portal/dashboard/announcements"
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <Megaphone size={18} />
              </span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Latest Announcement
              </p>
              {latestAnnouncement ? (
                <>
                  <p className="font-bold text-foreground line-clamp-1">{latestAnnouncement.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{latestAnnouncement.body}</p>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No announcements yet.</p>
              )}
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
                View All <ArrowRight size={14} />
              </span>
            </Link>

            <Link
              href="/portal/dashboard/courses"
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                <BookOpen size={18} />
              </span>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Available Courses
              </p>
              <p className="font-bold text-foreground">
                {courseCount} {courseCount === 1 ? 'course' : 'courses'} open
              </p>
              <p className="text-sm text-muted-foreground mt-1">Browse teachers and book your next class.</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
                Browse Courses <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalOverview;
