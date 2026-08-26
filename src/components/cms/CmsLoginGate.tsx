'use client';

import { useState } from 'react';
import { Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/portal/PasswordInput';

interface CmsLoginGateProps {
  onSuccess: (key: string) => void;
}

const CmsLoginGate = ({ onSuccess }: CmsLoginGateProps) => {
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError('Enter the admin password.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/cms/verify', {
        method: 'POST',
        headers: { 'x-cms-key': password },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Incorrect password.');
      }

      onSuccess(password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not verify password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
        <div className="flex flex-col items-center text-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-side.png" alt="KELP Education" className="h-16 w-auto object-contain mb-4" />
          <span className="inline-flex items-center gap-1.5 text-secondary font-semibold text-xs uppercase tracking-wider">
            <ShieldCheck size={14} />
            Admin Access
          </span>
          <h1 className="text-xl font-bold text-slate-900 mt-2">Content Management</h1>
          <p className="text-sm text-slate-500 mt-1">Enter the admin password to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cms-login-password">Admin Password</Label>
            <PasswordInput
              id="cms-login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={submitting}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? 'Verifying...' : 'Log In'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CmsLoginGate;
