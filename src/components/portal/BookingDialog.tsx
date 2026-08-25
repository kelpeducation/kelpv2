'use client';

import { useState } from 'react';
import { CalendarCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useToast } from '@/hooks/use-toast';
import type { Course } from '@/lib/portal/types';

interface BookingDialogProps {
  course: Course | null;
  studentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBooked: () => void;
}

const TIME_SLOTS = ['09:00 - 10:00', '11:00 - 12:00', '14:00 - 15:00', '16:00 - 17:00'];

// Tuesday(2) through Saturday(6); JS getDay(): Sunday = 0.
const isTeachingDay = (dateStr: string) => {
  const day = new Date(`${dateStr}T00:00:00`).getDay();
  return day >= 2 && day <= 6;
};

const BookingDialog = ({ course, studentId, open, onOpenChange, onBooked }: BookingDialogProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const resetAndClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setConfirmed(false);
      setDate('');
      setTimeSlot(TIME_SLOTS[0]);
    }, 200);
  };

  const handleConfirm = async () => {
    if (!course) return;

    if (!date) {
      toast({ title: 'Pick a class date', variant: 'destructive' });
      return;
    }
    if (!isTeachingDay(date)) {
      toast({
        title: 'That day isn’t available',
        description: 'Classes run Tuesday through Saturday. Please pick another date.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    const { error } = await supabaseBrowser.from('bookings').insert({
      student_id: studentId,
      course_id: course.id,
      class_date: date,
      time_slot: timeSlot,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: 'Could not book class', description: error.message, variant: 'destructive' });
      return;
    }

    setConfirmed(true);
    onBooked();
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? onOpenChange(true) : resetAndClose())}>
      <DialogContent className="sm:max-w-md">
        {!course ? null : confirmed ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
            <DialogTitle className="mb-2">Class booked!</DialogTitle>
            <DialogDescription className="mb-6">
              You're booked for <span className="font-semibold text-foreground">{course.title}</span> on{' '}
              <span className="font-semibold text-foreground">
                {new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </span>{' '}
              at <span className="font-semibold text-foreground">{timeSlot}</span> with {course.teacherName} —{' '}
              <span className="font-semibold text-foreground">{course.price.toLocaleString()} RWF</span> (negotiable).
            </DialogDescription>
            <Button className="w-full" onClick={resetAndClose}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between gap-3">
                <span>Book {course.title}</span>
                <span className="text-primary text-base whitespace-nowrap">
                  {course.price.toLocaleString()} RWF
                </span>
              </DialogTitle>
              <DialogDescription>Classes run Tuesday through Saturday.</DialogDescription>
            </DialogHeader>

            {/* Teacher bio */}
            <div className="flex gap-4 items-start bg-muted/50 rounded-2xl p-4 border border-border">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                {course.teacherAvatarInitials}
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{course.teacherName}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mt-1">{course.teacherBio}</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="booking-date">Class Date</Label>
                <input
                  id="booking-date"
                  type="date"
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CalendarCheck size={13} />
                  Available Tuesday - Saturday only
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="booking-time">Time Slot</Label>
                <Select value={timeSlot} onValueChange={setTimeSlot}>
                  <SelectTrigger id="booking-time">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">Class fee</span>
                <span className="font-bold text-foreground">{course.price.toLocaleString()} RWF</span>
              </div>

              <Button className="w-full" onClick={handleConfirm} disabled={submitting}>
                {submitting && <Loader2 size={18} className="animate-spin" />}
                {submitting ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
