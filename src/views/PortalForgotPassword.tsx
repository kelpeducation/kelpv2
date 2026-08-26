'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Mail, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PortalAuthLayout from '@/components/portal/PortalAuthLayout';
import IconInput from '@/components/portal/IconInput';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useToast } from '@/hooks/use-toast';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PortalForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !emailRegex.test(email)) {
      toast({ title: 'Enter a valid email address', variant: 'destructive' });
      return;
    }

    setSubmitting(true);

    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/portal/reset-password`,
    });

    setSubmitting(false);

    if (error) {
      if (error.message.toLowerCase().includes('rate limit')) {
        toast({
          title: 'Too many requests',
          description: 'Our email service is briefly rate-limited. Please try again in a few minutes.',
          variant: 'destructive',
        });
        return;
      }
      toast({ title: 'Could not send reset link', description: error.message, variant: 'destructive' });
      return;
    }

    setSent(true);
  };

  if (sent) {
    return (
      <PortalAuthLayout
        eyebrow="English Learning Program"
        title="Check your email"
        description="We just sent you a link to reset your password."
        image="/images/learning2.jpg"
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
            We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>.
            Click it to choose a new password.
          </p>
        </div>
      </PortalAuthLayout>
    );
  }

  return (
    <PortalAuthLayout
      eyebrow="English Learning Program"
      title="Forgot your password?"
      description="Enter your email and we'll send you a link to reset it."
      image="/images/learning2.jpg"
      footer={
        <Link href="/portal/login" className="text-primary font-semibold hover:text-secondary transition-colors">
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="forgot-email">Email Address</Label>
          <IconInput
            id="forgot-email"
            icon={Mail}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            maxLength={255}
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting && <Loader2 size={18} className="animate-spin" />}
          {submitting ? 'Sending link...' : 'Send Reset Link'}
        </Button>
      </form>
    </PortalAuthLayout>
  );
};

export default PortalForgotPassword;
