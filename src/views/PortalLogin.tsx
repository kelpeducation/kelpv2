'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PortalAuthLayout from '@/components/portal/PortalAuthLayout';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useToast } from '@/hooks/use-toast';

const PortalLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      toast({ title: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setSubmitting(true);

    const { error } = await supabaseBrowser.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: 'Could not log in', description: error.message, variant: 'destructive' });
      return;
    }

    router.push('/portal/dashboard');
  };

  return (
    <PortalAuthLayout
      eyebrow="English Learning Program"
      title="Welcome back"
      description="Log in to book classes, view your teachers, and catch up on announcements."
      footer={
        <>
          New here?{' '}
          <Link href="/portal/register" className="text-primary font-semibold hover:text-secondary transition-colors">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email Address</Label>
          <Input
            id="login-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="Enter your email address"
            maxLength={255}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Enter your password"
            maxLength={72}
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting && <Loader2 size={18} className="animate-spin" />}
          {submitting ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
    </PortalAuthLayout>
  );
};

export default PortalLogin;
