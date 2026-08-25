'use client';

import { useState } from 'react';
import { UserPlus, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface EnrollDialogProps {
  programName: string;
  courseOptions: string[];
  triggerLabel?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EnrollDialog = ({ programName, courseOptions, triggerLabel = 'Enroll Now' }: EnrollDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [justEnrolled, setJustEnrolled] = useState<{ name: string; course: string } | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: courseOptions[0] ?? '',
  });

  const resetAndClose = () => {
    setOpen(false);
    setTimeout(() => {
      setJustEnrolled(null);
      setForm({ name: '', email: '', phone: '', course: courseOptions[0] ?? '' });
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.course) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (!emailRegex.test(form.email)) {
      toast({ title: 'Invalid email address', description: 'Please enter a valid email address.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to submit enrollment.');
      }

      setJustEnrolled({ name: form.name.trim(), course: form.course });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : resetAndClose())}>
      <DialogTrigger asChild>
        <Button size="lg" variant="hero">
          <UserPlus size={18} />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {justEnrolled ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
            <DialogTitle className="mb-2">You're enrolled, {justEnrolled.name.split(' ')[0]}!</DialogTitle>
            <DialogDescription className="mb-6">
              You've joined <span className="font-semibold text-foreground">{justEnrolled.course}</span>.
              Our team will reach out with next steps shortly.
            </DialogDescription>
            <Button className="w-full" onClick={resetAndClose}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Join {programName}</DialogTitle>
              <DialogDescription>
                Fill in your details and choose a program below. Our team will reach out to get you started.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="enroll-name">Full Name</Label>
                <Input
                  id="enroll-name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enroll-email">Email Address</Label>
                <Input
                  id="enroll-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email address"
                  maxLength={255}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enroll-phone">Phone Number</Label>
                <Input
                  id="enroll-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="078... / 079..."
                  maxLength={20}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="enroll-course">Program</Label>
                <Select
                  value={form.course}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, course: value }))}
                >
                  <SelectTrigger id="enroll-course">
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && <Loader2 size={18} className="animate-spin" />}
                {submitting ? 'Submitting...' : 'Submit Enrollment'}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnrollDialog;
