'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface NewsletterFormProps {
  placeholder: string;
  buttonLabel: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterForm = ({ placeholder, buttonLabel }: NewsletterFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();

    if (!trimmed || !emailRegex.test(trimmed)) {
      toast({
        title: 'Invalid email address',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to subscribe.');
      }

      setSubscribed(true);
      setEmail('');
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

  if (subscribed) {
    return (
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto h-14 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground px-6">
        <CheckCircle2 size={20} className="text-accent flex-shrink-0" />
        <span className="text-sm font-medium">You're subscribed! Watch your inbox for updates from KELP.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary-foreground/50" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          maxLength={255}
          disabled={submitting}
          className="w-full h-14 pl-12 pr-6 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 disabled:opacity-60"
        />
      </div>
      <Button type="submit" variant="gold" size="lg" disabled={submitting}>
        {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
        {submitting ? 'Subscribing...' : buttonLabel}
      </Button>
    </form>
  );
};

export default NewsletterForm;
