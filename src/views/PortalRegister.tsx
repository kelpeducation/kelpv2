'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PortalAuthLayout from '@/components/portal/PortalAuthLayout';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useToast } from '@/hooks/use-toast';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PortalRegister = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.password) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    if (!emailRegex.test(form.email)) {
      toast({ title: 'Invalid email address', variant: 'destructive' });
      return;
    }
    if (form.password.length < 6) {
      toast({ title: 'Password too short', description: 'Use at least 6 characters.', variant: 'destructive' });
      return;
    }

    setSubmitting(true);

    const { data, error } = await supabaseBrowser.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          full_name: form.fullName.trim(),
          phone: form.phone.trim(),
        },
      },
    });

    setSubmitting(false);

    if (error) {
      toast({ title: 'Could not create account', description: error.message, variant: 'destructive' });
      return;
    }

    if (data.session) {
      toast({ title: 'Welcome to KELP!', description: 'Your account is ready.' });
      router.push('/portal/dashboard');
    } else {
      setCheckEmail(true);
    }
  };

  if (checkEmail) {
    return (
      <PortalAuthLayout
        eyebrow="English Learning Program"
        title="Check your email"
        description=""
        footer={
          <Link href="/portal/login" className="text-primary font-semibold hover:text-secondary transition-colors">
            Back to login
          </Link>
        }
      >
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <MailCheck size={28} className="text-primary" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We've sent a confirmation link to <span className="font-semibold text-foreground">{form.email}</span>.
            Click it to activate your account, then come back and log in.
          </p>
        </div>
      </PortalAuthLayout>
    );
  }

  return (
    <PortalAuthLayout
      eyebrow="English Learning Program"
      title="Create your account"
      description="Join the platform to book classes, meet your teachers, and stay up to date."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/portal/login" className="text-primary font-semibold hover:text-secondary transition-colors">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reg-name">Full Name</Label>
          <Input
            id="reg-name"
            value={form.fullName}
            onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
            placeholder="Enter your full name"
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-email">Email Address</Label>
          <Input
            id="reg-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email address"
            maxLength={255}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-phone">Phone Number</Label>
          <Input
            id="reg-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            placeholder="078... / 079..."
            maxLength={20}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-password">Password</Label>
          <Input
            id="reg-password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="At least 6 characters"
            maxLength={72}
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting && <Loader2 size={18} className="animate-spin" />}
          {submitting ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </PortalAuthLayout>
  );
};

export default PortalRegister;
