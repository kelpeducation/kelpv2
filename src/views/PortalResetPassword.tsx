'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PortalAuthLayout from '@/components/portal/PortalAuthLayout';
import PasswordInput from '@/components/portal/PasswordInput';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useToast } from '@/hooks/use-toast';

const PortalResetPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const { data: listener } = supabaseBrowser.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
      }
    });

    supabaseBrowser.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({ title: 'Password too short', description: 'Use at least 6 characters.', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const { error } = await supabaseBrowser.auth.updateUser({ password });
    setSubmitting(false);

    if (error) {
      toast({ title: 'Could not update password', description: error.message, variant: 'destructive' });
      return;
    }

    setDone(true);
    toast({ title: 'Password updated', description: 'You can now log in with your new password.' });
    setTimeout(() => router.push('/portal/dashboard'), 1500);
  };

  if (done) {
    return (
      <PortalAuthLayout
        eyebrow="English Learning Program"
        title="Password updated"
        description="Redirecting you to your dashboard..."
        image="/images/learning2.jpg"
        footer={null}
      >
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle2 size={28} className="text-primary" />
          </div>
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      </PortalAuthLayout>
    );
  }

  if (!ready) {
    return (
      <PortalAuthLayout
        eyebrow="English Learning Program"
        title="Checking your link..."
        description="This will only take a moment."
        image="/images/learning2.jpg"
        footer={null}
      >
        <div className="flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </PortalAuthLayout>
    );
  }

  return (
    <PortalAuthLayout
      eyebrow="English Learning Program"
      title="Set a new password"
      description="Choose a new password for your account."
      image="/images/learning2.jpg"
      footer={null}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-password">New Password</Label>
          <PasswordInput
            id="reset-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            maxLength={72}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reset-confirm-password">Confirm New Password</Label>
          <PasswordInput
            id="reset-confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your new password"
            maxLength={72}
          />
        </div>

        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting && <Loader2 size={18} className="animate-spin" />}
          {submitting ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </PortalAuthLayout>
  );
};

export default PortalResetPassword;
