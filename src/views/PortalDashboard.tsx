'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut, Megaphone, CalendarClock, X, BookOpen, Sparkles } from 'lucide-react';
import logo from '@/assets/logo 0.2.png';
import { Button } from '@/components/ui/button';
import { DecorativeBackground } from '@/components/ui/decorative-background';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { usePortalSession } from '@/hooks/usePortalSession';
import { useToast } from '@/hooks/use-toast';
import CourseCard from '@/components/portal/CourseCard';
import BookingDialog from '@/components/portal/BookingDialog';
import {
  Course,
  Booking,
  Announcement,
  Profile,
  toCourse,
  toBooking,
  toAnnouncement,
  toProfile,
} from '@/lib/portal/types';

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const PortalDashboard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { session, loading: sessionLoading } = usePortalSession();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [bookingCourse, setBookingCourse] = useState<Course | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push('/portal/login');
    }
  }, [sessionLoading, session, router]);

  const loadData = useCallback(async () => {
    if (!session) return;
    setDataLoading(true);

    const [profileRes, coursesRes, announcementsRes, bookingsRes] = await Promise.all([
      supabaseBrowser.from('profiles').select('*').eq('id', session.user.id).single(),
      supabaseBrowser.from('courses').select('*').order('created_at', { ascending: true }),
      supabaseBrowser.from('announcements').select('*').order('created_at', { ascending: false }),
      supabaseBrowser
        .from('bookings')
        .select('*')
        .eq('student_id', session.user.id)
        .eq('status', 'confirmed')
        .order('class_date', { ascending: true }),
    ]);

    if (profileRes.data) setProfile(toProfile(profileRes.data));
    if (coursesRes.data) setCourses(coursesRes.data.map(toCourse));
    if (announcementsRes.data) setAnnouncements(announcementsRes.data.map(toAnnouncement));
    if (bookingsRes.data) setBookings(bookingsRes.data.map(toBooking));

    setDataLoading(false);
  }, [session]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleLogout = async () => {
    await supabaseBrowser.auth.signOut();
    router.push('/portal/login');
  };

  const handleCancelBooking = async (bookingId: string) => {
    const { error } = await supabaseBrowser
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId);

    if (error) {
      toast({ title: 'Could not cancel booking', description: error.message, variant: 'destructive' });
      return;
    }

    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    toast({ title: 'Booking cancelled' });
  };

  const courseById = (id: string) => courses.find((c) => c.id === id);

  if (sessionLoading || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const displayName = profile?.fullName || session.user.email || 'Student';

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="container-custom flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <Image src={logo} alt="KELP Education" className="h-10 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {getInitials(displayName) || 'S'}
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-tight">{displayName}</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="ml-1">
              <LogOut size={14} />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      {/* Welcome hero */}
      <div className="relative bg-primary text-white overflow-hidden">
        <DecorativeBackground gridOpacity={0.05} gridSize={60} blobs={2} blobColor="secondary" />
        <div className="container-custom relative z-10 py-10 md:py-14">
          <span className="inline-flex items-center gap-1.5 text-secondary font-semibold text-xs uppercase tracking-wider">
            <Sparkles size={14} />
            Student Portal
          </span>
          <h1 className="text-2xl md:text-4xl font-bold mt-3 mb-2">
            Welcome{profile?.fullName ? `, ${profile.fullName.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
            Book a class, meet your teachers, and stay current with announcements below.
          </p>
        </div>
      </div>

      <main className="section-padding">
        <div className="container-custom space-y-12">
          {dataLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {/* Announcements */}
              {announcements.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                      <Megaphone size={16} />
                    </span>
                    Announcements
                  </h2>
                  <div className="space-y-3">
                    {announcements.map((a) => (
                      <div
                        key={a.id}
                        className="bg-card border border-border border-l-4 border-l-secondary rounded-2xl p-5 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <p className="font-semibold text-foreground text-sm">{a.title}</p>
                          <p className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0">
                            {new Date(a.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mt-2">{a.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* My upcoming bookings */}
              {bookings.length > 0 && (
                <section>
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                      <CalendarClock size={16} />
                    </span>
                    Your Upcoming Classes
                  </h2>
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
                            <p className="font-semibold text-foreground text-sm truncate pr-6">
                              {course?.title ?? 'Class'}
                            </p>
                            <p className="text-muted-foreground text-xs mt-1">
                              {classDate.toLocaleDateString(undefined, { weekday: 'long' })}
                            </p>
                            <p className="text-primary text-sm font-medium mt-1">{b.timeSlot}</p>
                          </div>
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Cancel booking"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Courses */}
              <section>
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                    <BookOpen size={16} />
                  </span>
                  Available Courses
                </h2>
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
              </section>
            </>
          )}
        </div>
      </main>

      <BookingDialog
        course={bookingCourse}
        studentId={session.user.id}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        onBooked={loadData}
      />
    </div>
  );
};

export default PortalDashboard;
